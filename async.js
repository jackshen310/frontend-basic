
let sleep = function(delay) {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}
// 使用async/await实现
async function fn() {
    console.log(1);
    await sleep(1000);
    console.log(2);
    let a = await 3;
    console.log(a);
}
fn();

// https://juejin.cn/post/6844903902849007624
// 使用genrator实现
function fna(args) {
  return spawn(function* () {
    /**以下这段代码跟上面是类似的，只是把await换成yield */
    console.log(1);
    yield sleep(1000);
    console.log(2);
    let a = yield 3;
    console.log(a);
  });
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF(); // 先将Generator函数执行下，拿到遍历器对象
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      // 不管next.value是不是promise对象，都统一封装成promise对象
      Promise.resolve(next.value).then(
        (v) => {
            // 自执行
          step(() => {
            return gen.next(v);
          });
        },
        (e) => {
          step(() => {
            return gen.throw(e);
          });
        }
      );
    }
    step(() => {
      return gen.next(undefined);
    });
  });
}
setTimeout(fna, 3000);