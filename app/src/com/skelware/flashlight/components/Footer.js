define(function(require, exports, module) {

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');

    // import famous flex
    var LayoutController = require('famous-flex/LayoutController');
    var GridLayout = require('famous-flex/layouts/GridLayout');
    var NavBarLayout = require('famous-flex/layouts/NavBarLayout');

    var ImageSurface = require('famous/surfaces/ImageSurface');

    var background = new Paper({
        depth : 95,
        size : [undefined, 32],
        type : Paper.TYPE_TILE,
        classes : ['footer']
    });

    var share = new Paper({
        depth : 100,
        size : [undefined, 24],
        type : Paper.TYPE_CLEAR,
        classes : ['footer'],
        backing : new ImageSurface({
            content : 'content/images/icons/share.svg'
        })
    });

    var buttons = new LayoutController({
        layout : GridLayout,
        layoutOptions : {
            cells : [3, 1],
            margins : 4,
            spacing : 4
        },
        dataSource : [share]
    });

    var Footer = new LayoutController({
        layout : NavBarLayout,
        dataSource : {
            title : buttons,
            background : background
        }
    });

    share.mixin(TouchEffect).on('click', shareMe);

    function shareMe() {
        if (!window.plugins || !plugins.socialsharing) {
            return;
        }

        var title = 'Fancy Flashlight';
        var message = 'You have flashlight apps and you have this, WOW!';
        var url = 'https://play.google.com/store/apps/details?id=com.skelware.flashlight';
        App.Flashlight.ignoreNextEvent = true;
        plugins.socialsharing.share(message, title, null, url);
    }

    module.exports = Footer;
});
