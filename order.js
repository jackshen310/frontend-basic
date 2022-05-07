function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
/**
 * 冒泡排序，按从小到大排序
 * 思路：
 * 1. 从数组右边开始比较相邻两个数字的大小
 * 2. 如果左边的数字比右边的大，则交换这两个数字，遍历n-1次
 * 3. 遍历一轮之后，数组第一个元素肯定是最小值
 * 4. 重新从步骤1开始，这次遍历仅n-2个元素，直至数组只剩下两个元素
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
  return arr;
}
var arr = [5, 9, 3, 1, 2, 8, 4, 7, 6];
var result = bubbleSort([...arr]);
console.log(result);

/**
 * 选择排序，按从小到大排序
 * 思路：
 * 1. 从待排序的数组中寻找最小值，将其与数组最左边的数字进行交换
 */
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
  return arr;
}
console.log(selectionSort([...arr]));

/**
 * 插入排序
 * 思路：
 * 1. 将元素插入已排序的数组中
 * 2. 已排序数组右边两两比较，如果左边的数值比右边大，则交互位置
 *  */
function insertSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    while (j) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
        j--;
      } else {
        break;
      }
    }
  }
  return arr;
}
console.log(insertSort([...arr]));

/**
 * 归并排序
 * 思路：把数组分成长度相同的两个子数组，当无法继续往下分时（也就是每个子数组中只有一个数据时），就对子数组进行归并
 * 1. 如果数组长度大于1，将数组拆成两个子数组，递归调用，然后合并两个有序子数组
 * 2. 如果数组长度等于1，则递归结束，并返回
 */
function mergeSort(arr, i, j) {
  // [1,2,3]
  if (i == j) {
    return [arr[i]];
  }
  let mid = (i + j) >> 1;
  return merge(mergeSort(arr, i, mid), mergeSort(arr, mid + 1, j));
}
// 合并两个有序数组
function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  if (i == arr1.length) {
    return result.concat(arr2.slice(j));
  } else {
    return result.concat(arr1.slice(i));
  }
}
console.log(mergeSort([...arr], 0, [...arr].length - 1));
/**
 * 快速排序
 * 思路：
 * 随机找一个基准值（比如第一个元素），将数组分成两部分，左边的值都小于该基准值，右边的值都大于该基准值
 * 继续对两个子数组进行拆分，直至数组只有有个元素，递归结束
 */
function quickSort(arr, left, right) {
  if (left <= right) {
    let index = partition2(arr, left, right);
    quickSort(arr, left, index - 1);
    quickSort(arr, index + 1, right);
    return arr;
  }
}
// 最经典分区算法
function partition(arr, left, right) {
  // pivot为基数，即待排序数组的第一个数
  let pivot = arr[left];
  let i = left;
  let j = right;
  while (i < j) {
    // 从右往左找第一个小于基数的数
    while (i < j && arr[j] >= pivot) {
      j--;
    }
    // 从左往右找第一个大于基数的数
    while (i < j && arr[i] <= pivot) {
      i++;
    }
    // 找到后交换两个数
    if (i < j) {
      swap(arr, i, j);
    }
  }
  // 使划分好的数分布在基数两侧
  swap(arr, i, left);
  return i;
}
// 简单分区算法
// 数组的最后一个数作为基数，将小于这个基数放在左边
function partition2(arr, left, right) {
  let pivot = arr[right];
  let i = left;
  let j = i;
  while (j < right) {
    if (arr[j] < pivot) {
      // 这里存在i和j相等的情况，交换也没关系
      swap(arr, i, j);
      i++;
    }
    j++;
  }
  // 这里存在i和right相等情况，交换也没关系
  swap(arr, i, right);

  return i;
}
/**
 * 快速排序简单实现，空间复杂度为O(n）
 */
function quickSort2(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let pivot = arr[0];
  let left = arr.filter((v, i) => i != 0 && v <= pivot);
  let right = arr.filter((v) => v > pivot);
  return [...quickSort2(left), pivot, ...quickSort2(right)];
}
console.log(quickSort2([...arr], 0, [...arr].length - 1));


function InversePairs(data)
{
    // 升序的来
    function merge(arr1, arr2) {
        let ret = [];
        let i = 0;
        let j = 0;
        while(i < arr1.length && j < arr2.length) {
            if(arr1[i] < arr2[j]) {
                ret.push(arr1[i])
                i++;
            } else {
                ret.push(arr2[j]);
                j++;
            }
        }
        if( i == arr1.length) {
            ret.push(...arr2.slice(j));
        } else {
            ret.push(...arr1.slice(i));
        }
        return ret;
    }
    function dfs(data, i, j) {
        if(i == j) {
            return [data[i]];
        }
        let m = (i + j) >> 1;
         console.log(m);
        return merge(dfs(data, i, m), dfs(data, m + 1, j));
    }
    const result = dfs(data, 0, data.length-1);
    return 0
}
InversePairs([7,5,6,4]);
