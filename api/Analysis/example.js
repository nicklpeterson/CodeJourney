Iroh = require('./node_modules/iroh');

const code = `
		const foo = 42;
		const bar = 84;
		function add(a, b) {
  			return a + b;
		};
		console.log(add(42, 84));
		`;

const stage = new Iroh.Stage(code);

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

// if, else if
stage.addListener(Iroh.IF)
.on("enter", function(e) {
  // we enter the if
  console.log(" ".repeat(e.indent) + "if enter");
})
.on("leave", function(e) {
  // we leave the if
  console.log(" ".repeat(e.indent) + "if leave");
});

let listener = stage.addListener(Iroh.FUNCTION);
// this specifies to listen for all function returns
listener.on("return", (e) => {
  // make sure we only change the return value of the function 'add'
  console.log(e.name, "=>", e.return);
});
eval(stage.script);