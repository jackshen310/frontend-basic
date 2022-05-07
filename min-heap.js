/**
 * 
 * 添加数据:
1. 在堆的最后添加数据后，数据会一边比较它与父结点数据的大小，一边往上移动，
2. 直到满足堆的条件为止，所以添加数据需要的运行时间与树的高度成正比，也是O（logn）。
取出顶端数据:
1. 取出数据后需要将最后的数据移到最顶端，然后一边比较它与子结点数据的大小，一边往下移动，
2. 所以取出数据需要的运行时间和树的高度成正比。
3. 假设数据量为n，根据堆的形状特点可知树的高度为log2n，那么重构树的时间复杂度便为O（logn）。
 */
class MaxHeap {
  constructor() {
    this.data = [];
  }
  _swap(data, i, j) {
    let tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
  }
  _up(data) {
    let curIndex = data.length - 1;
    let pIndex = (curIndex - 1) >> 1;
    while (pIndex >= 0 && data[curIndex] > data[pIndex]) {
      // 如果节点小于父节点，则和父节点替换
      this._swap(data, curIndex, pIndex);
      curIndex = pIndex;
      pIndex = (curIndex - 1) >> 1;
    }
  }
  _down(data) {
    let curIndex = 0;
    let cIndex = curIndex * 2 + 1;
    while (cIndex < data.length) {
      // 先找出左右节点的较小值
      if (data[cIndex] < data[cIndex + 1]) {
        cIndex = cIndex + 1;
      }
      if (data[curIndex] < data[cIndex]) {
        // 节点和左右节点的较小值替换
        this._swap(data, curIndex, cIndex);
        curIndex = cIndex;
        cIndex = curIndex * 2 + 1;
      } else {
        return;
      }
    }
  }
  push(num) {
    this.data.push(num);
    this._up(this.data);
  }
  pop() {
    let num = this.data[0];
    this._swap(this.data, this.data.length - 1, 0);
    this.data.pop();
    this._down(this.data);
    return num;
  }
  top() {
    return this.data[0];
  }
}

let heap = new MaxHeap();
heap.push(4);
heap.push(2);
heap.push(7);
heap.push(9);
heap.push(1);
heap.push(5);
heap.push(10);
heap.push(3);
heap.push(2);
console.log(heap.data);
for (let i = 0; i < 9; i++) {
  console.log(heap.pop());
}

function findLeastNumbers(numbers, k) {
    if(numbers.length <= k) {
        return numbers;
    }
    let heap = new MaxHeap();
    numbers.forEach((v,i) => {
        if(i < k) {
            heap.push(v);
            return;
        }
        if(v < heap.top()) {
            heap.pop();
            heap.push(v);
        }
    });
    return heap.data;
}
console.log(findLeastNumbers([4,5,1,6,2,7,3,8],4));
