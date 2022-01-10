// ex.1)
function ready(callback) {
    console.log('식사를 준비 합니다.');
    callback();
}

ready(function() {
    console.log('식사를 합니다.');
});

// ex.2)
function add(a, b, callback) {
    callback(a, b);
}

function print(a, b) {
    console.log('added value is ' + (a + b));
}

add(1, 100, print);