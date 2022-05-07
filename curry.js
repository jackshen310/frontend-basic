
function curry(fn) {
    return function _curry(...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return _curry.apply(this, [...args, ...args2]);
            }
        }
    }
}

function fn(a,b,c,d,e){
    console.log(this, a,b,c,d,e)
}
let _fn = curry(fn);
// test
_fn(1,2,3,4,5);     // print: 1,2,3,4,5
_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5

