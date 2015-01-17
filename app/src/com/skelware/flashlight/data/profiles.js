define(function(require, exports, module) {

    var Morse = require('flashlight/data/Morse');

    var toggle = {
        name : 'On / Off',
        repeat : false,
        editable : false,
        interval : undefined
    };

    var flash = {
        name : 'Flash',
        repeat : true,
        editable : false,
        interval : [15]
    };

    var rapidFlash = {
        name : 'Rapid Flash',
        repeat : true,
        editable : false,
        interval : [1]
    };

    var sos = {
        name : '<span style="text-decoration: overline;">SOS</span>',
        repeat : true,
        editable : false,
        interval : Morse.translate('sos')
    };

    module.exports = [toggle, flash, rapidFlash, sos];
});
