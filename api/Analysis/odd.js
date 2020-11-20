Iroh = require('./node_modules/iroh');

const program = 'const isOdd = require(\'./node_modules/is-odd\')\n' +
    '\n' +
    'function odd(num) {\n' +
    '    return isOdd(num);\n' +
    '}\n' +
    '\n' +
    'for (let i = 0; i < 5; i++) {\n' +
    '    console.log(odd(i));\n' +
    '}'

const stage = new Iroh.Stage(program);

stage.addListener(Iroh.VAR).on("after", function(e) {
    console.log(e.name, "=>", e.value);
});

stage.addListener(Iroh.LOOP)
    .on("enter", function(e) {
        // we enter the loop
        console.log(" ".repeat(e.indent) + "loop enter");
    })
    .on("leave", function(e) {
        // we leave the loop
        console.log(" ".repeat(e.indent) + "loop leave");
    });

eval(stage.script);