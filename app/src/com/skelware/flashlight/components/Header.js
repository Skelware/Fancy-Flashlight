define(function(require, exports, module) {

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var LayoutController = require('famous-flex/LayoutController');
    var NavBarLayout = require('famous-flex/layouts/NavBarLayout');

    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Timer = require('famous/utilities/Timer');

    var menuButton = new Paper({
        depth : 100,
        size : [48, 48],
        type : Paper.TYPE_CLEAR,
        classes : ['header', 'round'],
        backing : new ImageSurface({
            content : 'content/images/icons/hamburger.svg'
        })
    });

    var click = function() {
        if (!App.Menu.transitioning && !App.Content.zoomedIn) {
            App.Menu.toggle();
        }
    };

    menuButton.mixin(TouchEffect).mixin(ButtonEffect).on('click', click);

    var title = new Paper({
        depth : 100,
        size : [undefined, 48],
        type : Paper.TYPE_CLEAR,
        classes : ['header'],
        content : 'Fancy Flashlight'
    });

    var background = new Paper({
        depth : 95,
        size : [undefined, 56],
        type : Paper.TYPE_TILE,
        classes : ['header']
    });

    var Header = new LayoutController({
        layout : NavBarLayout,
        layoutOptions : {
            margins : 4,
            itemSpacer : 4
        },
        dataSource : {
            title : title,
            background : background,
            leftItems : [menuButton]
        }
    });

    /**
     * Sets a new title for the header.
     *
     * @method setTitle
     * @param title
     *            {String} The title to set.
     * @chainable
     */
    Header.setTitle = function setTitle(title) {
        title.setContent(title);
        return Header;
    };

    module.exports = Header;
});
