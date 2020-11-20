const isOdd = require('./node_modules/is-odd')

function odd(num) {
    return isOdd(num);
}

for (let i = 0; i < 5; i++) {
    console.log(odd(i));
}
