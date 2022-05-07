
function test() {
    const p1 = Promise.resolve(1)
    const p2 = new Promise((resolve,reject) => {
        try {
            setTimeout(() => resolve(2), 1000)
        } catch (error) {
            reject(error);
        }
      
    })
    const p3 = new Promise((resolve,reject) => {
        try {
            setTimeout(() => resolve(3), 3000)
        } catch (error) {
            reject(error);
        }
     
    })
    
   
    
    Promise.myAll = (promises) => {
        return new Promise((rs, rj) => {
          // 计数器
          let count = 0
          // 存放结果
          let result = []
          const len = promises.length
          
          if (len === 0) {
            return rs([])
          }
          
          promises.forEach((p, i) => {
            // 注意有的数组项有可能不是Promise，需要手动转化一下
            Promise.resolve(p).then((res) => {
              count += 1
              // 收集每个Promise的返回值 
              result[ i ] = res
              // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
              if (count === len) {
                rs(result)
              }
              // 监听数组项中的Promise catch只要有一个失败，那么我们自己返回的Promise也会失败
            }).catch(() => {})
          })
        })
      }
    Promise.myAll([p1,p2,p3]).then(console.log);
    
    
}
try {
    test(); 
} catch (error) {
    
}

