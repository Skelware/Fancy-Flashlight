define(function(require, exports, module) {

    /**
     * Contains information about the vibrator of the mobile device.
     *
     * @static
     * @class Vibrator
     * @namespace cordova
     */
    var Vibrator = {};
    /**
     * Vibrates for 100 milliseconds.
     *
     * @static
     * @method vibrate
     * @chainable
     */
    Vibrator.vibrate = function vibrate() {
        navigator.vibrate && navigator.vibrate(100);
        return Vibrator;
    };

    module.exports = Vibrator;
});
