
var arr = [1,2,3,3,3,3,4,5];

// 找target在数组中的位置
function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length; // 闭区间
    while(low < high) {
        let mid = (low + high) >> 1;
        if(arr[mid] == target) {
            return mid;
        } else if(arr[mid] > target) {
            // target在[low...mid)之间
            high = mid;
        } else {
            // target在[mid+1,high）之间
            low = mid+1;
        }
    }
    return -1;
}
console.log(binarySearch(arr, 5));

// 变种：找到target的第一个数,或者比target大的第一个数
function binarySearch2(arr, target) {
    let low = 0;
    let high = arr.length; // 闭区间
    while(low < high) {
        let mid = (low + high) >> 1;
        if(arr[mid] >= target) {
            // target在[low...mid)之间
            high = mid;
        }  else {
            // target在[mid+1,high）之间
            low = mid+1;
        }
    }
    return low;
}
console.log(binarySearch2(arr, 6));