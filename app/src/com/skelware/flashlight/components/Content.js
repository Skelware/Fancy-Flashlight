define(function(require, exports, module) {

    var Flashlight = require('flashlight/cordova/Flashlight');
    var Vibrator = require('flashlight/cordova/Vibrator');
    var profiles = require('flashlight/data/profiles');
    var Timer = require('famous/utilities/Timer');

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var FlexScrollView = require('famous-flex/FlexScrollView');
    var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
    var ListLayout = require('famous-flex/layouts/ListLayout');

    // import vanilla famo.us
    var Transform = require('famous/core/Transform');
    var Lightbox = require('famous/views/Lightbox');
    var Utility = require('famous/utilities/Utility');

    var activeButton;
    var callback;
    var sequence = [];

    var Content = new FlexScrollView({
        flow : true,
        autoPipeEvents : true,
        layout : CollectionLayout,
        layoutOptions : {
            itemSize : [150, 150],
            margins : [10, 10],
            spacing : [10, 10, 10, 10],
            justify : [true, false]
        }
    });

    Content.addProfile = function(profile) {
        profile = profile || {
            name : 'HOLD TO EDIT',
            repeat : false,
            interval : undefined,
            editable : true
        };

        var button = new Paper({
            content : profile.name,
            type : Paper.TYPE_TILE,
            classes : ['fastanimation'],
            properties : {
                lineHeight : '150px'
            }
        });

        button.profile = profile;

        button.mixin(TouchEffect).mixin(ButtonEffect, {
            type : ButtonEffect.TYPE_RAISED
        });

        button.addEventListeners(function(data) {
            if (this.skelware.touchStart) {
                return;
            }

            this.skelware.touchStart = Date.now();
            this.skelware.touchEnd = undefined;

            if (callback) {
                Timer.clear(callback);
            }

            if (activeButton) {
                Flashlight.disable();
                activeButton.getBacking().removeClass('active');

                if (activeButton === this) {
                    activeButton = undefined;

                    if (Content.zoomedIn) {
                        Content.setLayoutOptions({
                            itemSize : [150, 150]
                        });
                        Content.sequenceFrom(sequence);
                        Content.zoomedIn = false;
                    }
                    return;
                }
            }

            activeButton = this;

            if (this.profile.editable) {
                callback = Timer.setTimeout(function() {
                    if (!this.skelware.touchEnd) {
                        Vibrator.vibrate();
                    }
                }.bind(this), 650);
            }
        }.bind(button), App._local ? 'mousedown' : 'touchstart');

        button.addEventListeners(function(data) {
            if (!this.skelware.touchStart) {
                return;
            }

            this.skelware.touchEnd = Date.now();
            var duration = this.skelware.touchEnd - this.skelware.touchStart;
            this.skelware.touchStart = false;

            if (this.profile.editable && duration >= 600) {
                if (Content.zoomedIn) {
                    return;
                }

                this.getBacking().setContent('Coming soon');
                this.getBacking().addClass('active');

                Content.zoomedIn = true;
                Content.sequenceFrom([this]);
                Content.setLayoutOptions({
                    itemSize : [window.innerWidth - 20,
                            window.innerHeight - 56 - 32 - 20]
                });
            } else if (activeButton === this) {
                this.getBacking().addClass('active');
                if (this.profile.interval) {
                    Flashlight.setInterval(this.profile.interval, undefined,
                            this.profile.repeat);
                } else {
                    Flashlight.enable();
                }
            }
        }.bind(button), App._local ? 'mouseup' : 'touchend');

        sequence.push(button);
        Content.push(button, {
            transform : Transform.multiply(Transform.rotateZ(Math.PI / 2),
                    Transform.scale(2, 2))
        });
    };

    for (var i = 0; i < profiles.length; i++) {
        Timer.setTimeout(Content.addProfile.bind(Content, profiles[i]),
                i * 100 + 500);
    }

    module.exports = Content;
});
