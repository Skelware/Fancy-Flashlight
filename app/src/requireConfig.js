require.config({
    shim : {

    },
    paths : {
        famous : '../lib/famous/src',
        requirejs : '../lib/requirejs/require',
        almond : '../lib/almond/almond',
        flashlight : 'com/skelware/flashlight',
        'famous-flex' : '../lib/famous-flex/src',
        'famous-material' : '../lib/famous-material/src'
    },
    packages : [

    ]
});
require(['main']);
