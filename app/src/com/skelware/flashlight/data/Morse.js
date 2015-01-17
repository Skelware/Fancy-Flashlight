define(function(require, exports, module) {

    var DOT = 10;
    var DASH = 30;
    var SPACE_PART = DOT;
    var SPACE_CHARACTER = DASH;
    var SPACE_WORD = 2 * DASH + DOT;

    var KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
            'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    var DICTIONARY = {
        'a' : [DOT, DASH],
        'b' : [DASH, DOT, DOT, DOT],
        'c' : [DASH, DOT, DASH, DOT],
        'd' : [DASH, DOT, DASH, DOT],
        'e' : [DOT],
        'f' : [DOT, DOT, DASH, DOT],
        'g' : [DASH, DASH, DOT],
        'h' : [DOT, DOT, DOT, DOT],
        'i' : [DOT, DOT],
        'j' : [DOT, DASH, DASH, DASH],
        'k' : [DASH, DOT, DASH],
        'l' : [DOT, DASH, DOT, DOT],
        'm' : [DASH, DASH],
        'n' : [DASH, DOT],
        'o' : [DASH, DASH, DASH],
        'p' : [DOT, DASH, DASH, DOT],
        'q' : [DASH, DASH, DOT, DASH],
        'r' : [DOT, DASH, DOT],
        's' : [DOT, DOT, DOT],
        't' : [DASH],
        'u' : [DOT, DOT, DASH],
        'v' : [DOT, DOT, DOT, DASH],
        'w' : [DOT, DASH, DASH],
        'x' : [DASH, DOT, DOT, DASH],
        'y' : [DASH, DOT, DASH, DASH],
        'z' : [DASH, DASH, DOT, DOT],
        '1' : [DOT, DASH, DASH, DASH, DASH],
        '2' : [DOT, DOT, DASH, DASH, DASH],
        '3' : [DOT, DOT, DOT, DASH, DASH],
        '4' : [DOT, DOT, DOT, DOT, DASH],
        '5' : [DOT, DOT, DOT, DOT, DOT],
        '6' : [DASH, DOT, DOT, DOT, DOT],
        '7' : [DASH, DASH, DOT, DOT, DOT],
        '8' : [DASH, DASH, DASH, DOT, DOT],
        '9' : [DASH, DASH, DASH, DASH, DOT],
        '0' : [DOT, DASH, DASH, DASH, DASH]
    };

    var Morse = {
        DOT : DOT,
        DASH : DASH,
        DICTIONARY : DICTIONARY
    };

    Morse.trim = function(string) {
        return string.toLowerCase().replace(/[^a-z0-9 ]/gi, '').trim();
    };

    Morse.translate = function(data) {
        var output = [];
        var input = Morse.trim(data);
        var words = input.split(' ');

        for (var i = 0; i < words.length; i++) {
            var characters = words[i].split('');

            for (var j = 0; j < characters.length; j++) {
                var character = characters[j];
                var parts = DICTIONARY[character];

                for (var k = 0; k < parts.length; k++) {
                    output.push(parts[k]);

                    if (k + 1 < characters.length) {
                        output.push(SPACE_PART);
                    }
                }

                if (j + 1 < characters.length) {
                    output.push(SPACE_CHARACTER);
                }
            }

            output.push(SPACE_WORD);
        }
        return output;
    };

    module.exports = Morse;
});
