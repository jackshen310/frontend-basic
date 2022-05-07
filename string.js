/**
 * 题目：字符串出现的不重复最长长度
 * 整体思路：
 * 用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可
 * 对于遇到重复字符如何收缩窗口大小？
 * 我们可以用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可
 * 挪动的过程中记录最大长度
 */
 var lengthOfLongestSubstring = function (s) {
    const map = new Map();
    let l = 0;
    let r = 0;
    let max = -1;
    while(l <= r && r < s.length) {
        if(map.has(s[r])) {
            l = Math.max(l, map.get(s[r]) + 1)
        } 
        map.set(s[r], r);
        
        max = Math.max(max, r - l + 1);

        r++;
    }
    return max;
 }

console.log(lengthOfLongestSubstring("aaaaa"))
console.log(lengthOfLongestSubstring("dvdf"))
console.log(lengthOfLongestSubstring("adfafwefffdasdcx"))

var obj = {
    length: 3,
    "0":1,
    "1":2,
    "2":3
}
console.log(Array.prototype.slice.call(obj));