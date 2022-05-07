// instanceof 的内部实现
function instance_of(L, R) {
  //L 表左表达式，R 表示右表达式，即L为变量，R为类型
  // 取 R 的显示原型
  var prototype = R.prototype;
  // 取 L 的隐式原型
  L = L.__proto__;
  // 判断对象（L）的类型是否严格等于类型（R）的显式原型
  while (true) {
    if (L === null) {
      return false;
    }

    // 这里重点：当 prototype 严格等于 L 时，返回 true
    if (prototype === L) {
      return true;
    }

    L = L.__proto__;
  }
}

// 判断 f 是否是 Foo 类的实例 , 并且是否是其父类型的实例
function Aoo() {}
function Foo() {}
//JavaScript 原型继承
Foo.prototype = new Aoo();

console.log(instance_of(new Foo(), Aoo));

// https://juejin.cn/post/6847902225423925255
// 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
function mySetInterVal(fn, a, b) {
  let timer = null;
  function myTimeout(fn, a, b) {
    timer = setTimeout(function () {
      fn();
      myTimeout(fn, a + b, b);
    }, a);
  }
  myTimeout(fn, a, b);
  return function myClear() {
    timer && clearTimeout(timer);
  };
}
function myFn() {
  // console.log(new Date());
}
// let myClear = mySetInterVal(myFn, 1, 1);
// setTimeout(myClear, 5000);

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

// 防抖
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      // timer为null
      !timer && fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
// 节流
function throttle(fn, delay) {
  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0,
    timer = null;
  return function (...args) {
    let now = +new Date();
    if (now - previous < delay) {
      // 如果小于，则为本次触发操作设立一个新的定时器
      // 定时器时间结束后执行函数 fn
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fn.apply(this, args);
      }, wait);
    } else {
      previous = now;
      fn.apply(this, args);
    }
  };
}

function curry(fn, ...params) {
  function _curry(params) {
    if (params.length >= fn.length) {
      return fn.apply(this, params);
    }
    return (...args) => {
      return _curry([...params, ...args]);
    };
  }
  return _curry(params);
}
function fn(a, b, c) {
  console.log(a, b, c);
}
let fn2 = curry(fn);
fn2(1, 2, 3);
fn2(1, 2)(2);

// 实现compose
let middlewares = [];
middlewares.push(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(6);
});

middlewares.push(async (ctx, next) => {
  console.log(2);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.log("hello");
    }, 3000);
  });
  await next();
  console.log(5);
});

middlewares.push(async (ctx, next) => {
  console.log(3);
  ctx.body = "hello world";
  console.log(4);
});

function compose() {
  return (ctx) => {
    let lastIndex = 0;
    function dispatch(i) {
      // 防止next() 在一个中间件中调用多次
      if(lastIndex != i) {
        return Promise.reject(new Error('next() called multiple times'));
      } else {
        lastIndex = i + 1;
      }
      let middleware = middlewares[i];
      if(i == middlewares.length) {
        return Promise.resolve()
      }
      try {
        // 这里需注意，next函数只能用dispatch.bind(this,i+1)写法
        // 不能用 () => {dispatch(i+1)} 写法
        return Promise.resolve(middleware(ctx, dispatch.bind(this,i+1)));
      } catch(err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

const ctx = {};
compose()(ctx)
  .then(() => {
     console.log(ctx);
  })
  .catch((err) => {
     console.log(err);
  });

function arrowFunc() {
  function abc() {
    this.a = 123;
    let obj = {
      a: 1,
      fn: () => {
        console.log(this);
      }
    }
    return obj;
  }
  abc = abc.bind({});
  let obj = abc();
  obj.fn();
}
arrowFunc();


// promisify
const fs = require('fs');
function loadImg(src, callback) {
  fs.readFile(src, (err, data) => {
    callback(err,data);
  });
}
// loadImg('./tt.js', (err, data) => {
//   if(!err) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
// });

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, ...values) => {
        if(err) {
          reject(err);
        } else {
          resolve(values);
        }
      })
    });
  }
}

(() => {
  let fn2 = promisify(loadImg);
  fn2('./tt.js2').then(console.log,console.error);
})();


function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}





var vDom = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [1,2] },
        { tag: 'A', children: [] }
      ]
    }
  ]
};

function render(node) {
    if(typeof node === 'number') {
        node = node+'';
    }
     // 创建文本元素
    if(typeof node === 'string') {
        return document.createTextNode(node);
    }
    let child = [];
    if(node.children) {
        node.children.forEach((v) => {
            child.push(render(v));
        });
    }
    // 创建普通元素
    let dom = document.createElement(node.tag);
    if(node.attrs) {
        for(let p in node.attrs) {
            dom.setAttribute(p, node.attrs[p]);
        }
    }
    
    if(child.length) {
        child.forEach((v) => {
           dom.appendChild(v);
        });
       
    }
    return dom;
}
// var dom = render(vDom);
// console.log(dom);

const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 function flatten(obj) {
    let result = {};
    function dfs(obj, path) {
      if(typeof obj !== 'object') {
        result[path.join('.')] = obj;
        return;
      }
      for(let p in obj) {
        let p2 = p;
        if(Array.isArray(obj)) {
          p2 = '[' + p + ']';
        }
        dfs(obj[p], [...path,p2])
      }
    }
    dfs(obj, []);
    return result;
 }
 console.log(flatten(obj));
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }
 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

示例 1：

输入：nums = [1,2,0]
输出：3

示例 2：

输入：nums = [3,4,-1,1]
输出：2

示例 3：

输入：nums = [7,8,9,11,12]
输出：1
