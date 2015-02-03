define(function(require, exports, module) {

    var Timer = require('famous/utilities/Timer');

    var Flashlight = {
        OFF : -1,
        INTERVAL : 0,
        ON : 1
    };

    var _callback;
    var _interval = [];
    var _repeat = false;

    var ticks = 0;
    var index = 0;
    var isEnabled = false;
    var isAvailable = false;
    var mode = Flashlight.OFF;

    Flashlight.getMode = function() {
        return mode;
    };

    Flashlight.isSupported = function() {
        return _get().isSupported(function(supported) {
            if (supported) {
                cordova.plugins.backgroundMode.enable();
            }
        });
    };

    Flashlight.request = function() {
        return _get().request(function() {
            cordova.plugins.backgroundMode.enable();
        });
    };

    Flashlight.release = function(callback) {
        return _get().release(function() {
            cordova.plugins.backgroundMode.disable();
            callback && callback();
        });
    };

    Flashlight.isEnabled = function() {
        return _get().isEnabled();
    };

    Flashlight.setEnabled = function(enabled, duration, callback) {
        mode = enabled ? Flashlight.ON : Flashlight.OFF;
        _callback = callback || (duration ? Flashlight.toggle : undefined);

        ticks = duration;
        return Flashlight;
    };

    Flashlight.enable = Flashlight.setEnabled.bind(Flashlight, true);

    Flashlight.disable = Flashlight.setEnabled.bind(Flashlight, false);

    Flashlight.toggle = function(duration, callback) {
        return Flashlight.setEnabled(!isEnabled, duration, callback);
    };

    Flashlight.setInterval = function(interval, callback, repeat) {
        if (callback !== undefined && repeat === undefined
                && typeof callback === 'boolean') {
            repeat = callback;
            callback = undefined;
        }

        _interval = interval;
        _repeat = !!repeat;
        _callback = callback;

        index = -1;
        ticks = 0;
        mode = Flashlight.INTERVAL;
        return Flashlight;
    };

    Timer.every(function() {
        if (ticks) {
            ticks--;
        }

        if (mode === Flashlight.INTERVAL) {
            if (!ticks) {
                index++;
                if (index >= _interval.length) {
                    if (_repeat) {
                        index %= _interval.length;
                    } else {
                        mode = undefined;
                        _callback && _callback();
                        return;
                    }
                }

                ticks = _interval[index];
                _setEnabled(!isEnabled);
            }
        } else if (mode !== undefined) {
            if (mode === Flashlight.OFF) {
                isEnabled && _setEnabled(false);
            } else if (mode === Flashlight.ON) {
                !isEnabled && _setEnabled(true);
            }

            if (ticks === 0 && _callback) {
                _callback();
                mode = undefined;
            }
        }
    }, 1);

    function _get() {
        return (window.plugins && window.plugins.flashlight) || {
            isSupported : function() {
                return false;
            },
            isReady : function() {
                return false;
            },
            isEnabled : function() {
                return false;
            },
            setEnabled : function(enabled, callback) {

            },
            toggle : function(callback) {

            },
            request : function(callback) {

            },
            release : function(callack) {

            }
        };
    }

    function _setEnabled(enabled) {
        isEnabled = enabled;
        _get().setEnabled(enabled);
        document.body.style.background = enabled ? '#FFFFFF' : '#EEEEEE';
    }

    function _shutDown() {
        if (Flashlight.ignoreNextEvent) {
            Flashlight.ignoreNextEvent = false;
        } else if (navigator.app) {
            navigator.app.exitApp();
        }
    }

    var _backButton = Flashlight.release.bind(Flashlight, _shuwDown);

    document.addEventListener('pause', Flashlight.release);
    document.addEventListener('resume', Flashlight.request);
    document.addEventListener('backbutton', _backButton);

    module.exports = Flashlight;
});
