const target = {
  x: 1,
  y: {
    z: 2,
  },
  z: [3],
  f: () => {},
};

/**
 * 乞丐版
 * 问题：
 * 1. 拷贝其他引用类型
 * 2. 拷贝函数
 * 3. 循环引用
 */
let cloneTarget = JSON.parse(JSON.stringify(target));
console.log(cloneTarget);

/**
 * 基础版本
 * 问题：
 * 1. 循环引用
 */
function clone(target) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (let key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
cloneTarget = clone(target);
console.log(cloneTarget);

/**
 * 可用版本
 * 1. 解决循环引用
 * 2. 使用weakMap
 */
function clone2(target) {
  let map = new WeakMap();
  function _clone(target) {
    if (typeof target === "object") {
      if (map.has(target)) {
        return map.get(target);
      }
      let cloneTarget = Array.isArray(target) ? [] : {};
      map.set(target, cloneTarget);
      for (let key in target) {
        cloneTarget[key] = _clone(target[key]);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  return _clone(target);
}

target.c = target;

cloneTarget = clone2(target);
console.log(cloneTarget);

function fn(a, b, c) {
  console.log(a, b, c);
  return a + b + c;
}
// 函数复制
let copyFn = new Function("return " + fn.toString())();
let copyFn2 = fn.bind({}); // 这个不行

copyFn(1, 2, 3);
copyFn2(1, 2, 3);
console.log(copyFn2.toString());
console.log(copyFn2.abc);

let sym = Symbol();
target.s = sym;

// Symbol对象复制
function cloneSymbol(target) {
  // Object.prototype.valueOf() 返回对象的原始值
  // Object() 返回封装对象（wrapper），如 bool => Boolean
  return Object(Symbol.prototype.valueOf.call(target));
}

let sym2 = cloneSymbol(sym);
console.log(sym == sym2);

// WeakMap  https://www.bookstack.cn/read/es6-3rd/spilt.4.docs-set-map.md
// 1. key必须是对象
// 2. key是一个弱引用，引用计数不会增加1
// 3. 没有遍历操作，只有set,get/has/delete这四个操作
// 应用场景：dom对象引用，当dom对象销毁时，weakMap中的key自动销毁
