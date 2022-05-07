function Father() {
  this.name = "father";
  this.colors = [];
  this.methodA = function () {
    return this.colors;
  };
}
function Son() {
  this.name = "son";

  Father.call(this);
  this.methodB = function () {
    return this.name;
  };
}

Son.prototype = new Father();
// 修正原型
Son.prototype.constructor = Son;

let son = new Son();
son.colors.push("red");
console.log(son.colors);

let son2 = new Son();
son2.colors.push("blue");
console.log(son2.colors);

// 实现new操作符
function mynew(fn, ...args) {
  //
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args);
  if (res && (typeof res == "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}

// 实现JSON.parse，用new Function 或 eval
let str = JSON.stringify({x:1,y:2});
let fn = new Function('return ' + str);
console.log(fn());

// 实现一个call， fn.call(this,...params);
function mycall(fn, context = window, ...params) {
    let p = Symbol();
    context[p] = fn;
    let res = context[p](...params);
    delete context[p];
    return res;
}
function foo() {
    console.log(this);
}
mycall(foo, {x:2})

// 实现bind
Function.prototype.bind = function(context, ...args) {
    let fn = this;
    context = context || global; // 如果在浏览器上就是 window
    
    let res =  function(...args2) {
      // this只和运行的时候有关系，所以这里的this和上面的fn不是一码事，new res()和res()在调用的时候，res中的this是不同的东西
      if(this instanceof res) {
         fn.apply(this, [...args, ...args2])
      } else {
         fn.apply(context, [...args, ...args2]);
      }
    }
     // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
     // 实现继承的方式: 使用Object.create
     res.prototype = Object.create(this.prototype);
 
     return res;
 }
function Bar(a , b) {
    console.log('Bar ==> ', this, a, b);
}
// 绑定bind
Bar.bind({x:'1'}, 1)(2);
Bar.bind(null, 1)(2);
// 特殊case，绑定后作为新的构造函数，则原先绑定的this无生效
let bar =  Bar.bind({x: 1});
new bar(1,2);
new Bar(1,2);
