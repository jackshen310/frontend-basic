/**
 * 给定一个升序整型数组[0,1,2,4,5,7,13,15,16],找出其中连续出现的数字区间，
 * 输出为["0->2","4->5","7","13","15->16"]
 */
// todo：处理空数组
var arr = [0,1,2,4,5,7,13,15,16];
var result = [];
var index = -1;
for(let i = 0; i < arr.length; i++) {
    if(i == 0) {
        result.push({
            start: arr[i]
        });
        index++;
    } else {
        if(arr[i] - arr[i-1] == 1) {
            result[index].end = arr[i];
        } else {
            result.push({
                start: arr[i]
            });
            index++;
        }
    }
}
let output = [];
result.forEach(item => {
    if(item.end) {
        output.push(item.start + '->' + item.end);
    } else {
        output.push(item.start + '');
    }
});
console.log(output);

