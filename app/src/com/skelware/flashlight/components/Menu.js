define(function(require, exports, module) {

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var FlexScrollView = require('famous-flex/FlexScrollView');
    var CollectionLayout = require('famous-flex/layouts/CollectionLayout');

    // import vanilla famo.us
    var Transform = require('famous/core/Transform');
    var View = require('famous/core/View');
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var TransitionableTransform = require('famous/transitions/TransitionableTransform');

    var sequence = [];
    var visible = false;
    var width = Math.min(window.innerWidth, window.innerHeight) * 3 / 4;
    var transformer = new TransitionableTransform(Transform.translate(-width,
            56));

    var buttons = [{
        name : 'New Profile',
        action : function() {
            // App.Content.addProfile();
            alert('You will be able to add custom profiles soon!');
            Menu.toggle();
        }
    }, {
        name : 'Fancy Bartender',
        action : function() {
            alert('Fancy Bartender will be released soon!');
            Menu.toggle();
        }
    }];

    for (var i = 0; i < buttons.length; i++) {
        var paper = new Paper({
            depth : 50,
            type : Paper.TYPE_TILE,
            content : buttons[i].name
        });

        paper.mixin(TouchEffect).mixin(ButtonEffect).on('click',
                buttons[i].action);
        sequence.push(paper);
    }

    var scroller = new FlexScrollView({
        flow : false,
        paginated : false,
        autoPipeEvents : true,
        useContainer : true,
        container : {
            attributes : {
                id : 'menu'
            }
        },
        dataSource : sequence,
        layoutOptions : {
            itemSize : 48,
            margins : 4,
            spacing : 1
        }
    });

    var Menu = new View();

    Menu.render = function render() {
        if (visible || Menu.transitioning) {
            return View.prototype.render.apply(Menu, arguments);
        }
    };

    Menu.add(new Modifier({
        size : [width, window.innerHeight - 56 - 32],
        transform : transformer
    })).add(scroller);

    Menu.toggle = function toggle() {
        Menu.transitioning = true;
        visible = !visible;
        transformer.setTranslate([visible ? 0 : -width, 56], {
            method : 'snap'
        }, function() {
            Menu.transitioning = false;
        });
        return Menu;
    };

    module.exports = Menu;
});
