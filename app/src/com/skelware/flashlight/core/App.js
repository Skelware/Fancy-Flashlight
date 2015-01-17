define(function(require, exports, module) {

    var Flashlight = require('flashlight/cordova/Flashlight');

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var LayoutController = require('famous-flex/LayoutController');
    var HeaderFooterLayout = require('famous-flex/layouts/HeaderFooterLayout');

    // import vanilla famo.us
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var Timer = require('famous/utilities/Timer');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    var App = {
        _context : Engine.createContext(),
        _local : !!location.href.match(/(192.168|localhost).*:1337/),
        Menu : require('flashlight/components/Menu'),
        Header : require('flashlight/components/Header'),
        Footer : require('flashlight/components/Footer'),
        Content : require('flashlight/components/Content'),
        Flashlight : require('flashlight/cordova/Flashlight'),
        Vibrator : require('flashlight/cordova/Vibrator')
    };

    App.isLocal = function() {
        return App._local;
    };

    App.getContext = function() {
        return App._context;
    };

    App.prepare = function() {
        document.addEventListener('deviceready', _deviceReady, false);
    };

    App.start = function() {
        if (!App._local) {
            cordova.plugins.backgroundMode.setDefaults({
                title : 'Fancy Flashlight',
                ticker : 'Fancy Flashlight: Goodbye!',
                text : 'Fancy Flashlight is using the camera.'
            });
        }

        var context = App.getContext();

        var layout = new LayoutController({
            layout : HeaderFooterLayout,
            layoutOptions : {
                headerSize : 56,
                footerSize : 32,
                margins : 0
            },
            dataSource : {
                header : App.Header,
                content : App.Content,
                footer : App.Footer
            }
        });

        context.add(layout);
        context.add(App.Menu);
    };

    function _deviceReady() {
        App.start();
        navigator.splashscreen.hide();
        document.removeEventListener('deviceready', _deviceReady, false);
        Flashlight.request();
    }

    module.exports = App;
});
