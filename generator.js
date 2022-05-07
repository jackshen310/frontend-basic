// https://zhuanlan.zhihu.com/p/216060145
/**
Generator 函数的特点就是
1、分段执行，可以暂停
2、可以控制阶段和每个阶段的返回值
3、可以知道是否执行到结尾

Generator 函数的核心实现
1、使用switch case 组成的状态机模型
2、利用闭包技巧，保存生成器函数上下文信息
 */

function* g1() {
  yield "result1";
  var a = yield "result2";
  console.log(a);
  yield "result3";
  return "ending";
}

// Generator 函数神奇之一：g()并不执行g函数
var gen = g1();
console.log(gen.next()); // { value: 'result1', done: false }
console.log(gen.next()); // { value: 'result2', done: false }
console.log(gen.next("result2")); // { value: 'result3', done: false }
console.log(gen.next()); // { value: 'ending', done: true }

// 循环
for (let v of g1()) {
  // a,b,c
  console.log(v);
}

// function* g2() {
//     yield "result1";
//     let a = yield "result2";
//     console.log(a);
//     yield "result3";
//     return "ending";
// }
class Context {
  constructor() {
    this.next = 0;
    this.prev = 0;
    this.done = false;
    this.send = null;
  }
  stop() {
    this.done = true;
  }
}
function g2() {
  var a; //  利用闭包特性，将变量提升，这样就可以在case语句访问到了。
  function g2$(context) {
    while (1) {
      switch ((context.prev = context.next)) {
        case 0:
          context.next = 2;
          return "result1";
        case 2:
          context.next = 4;
          return "result2";
        case 4:
          a = context.send;
          console.log(a);
          context.next = 6;
          return "result3";
        case 6:
          context.stop();
          return undefined;
      }
    }
  }
  var context = new Context();
  return {
    next: function (v) {
      let prev = context.next;
      context.send = v; // 传入上一次yield后面的值
      value = g2$(context);
      done = context.done;
      context.prev = prev;
      return {
        value,
        done,
      };
    },
  };
}

var g = g2();
console.log(g.next());
console.log(g.next());
console.log(g.next("result2"));
console.log(g.next());
