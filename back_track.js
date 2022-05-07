/** 字符串全排列（包含重复元素）
思路：回溯法
1. 取第一个元素，相当于将第一个元素加入到后续递归的问题中，即后续递归解中一定包含第一个元素；
2. 不取第一个元素，那其实更简单，只需要递归求解剩下的所有元素，即略过第一个元素。
**/
function Permutation(str) {
  // write code here
  let result = new Set();
  let strArr = str.split("");
  // 排序方便去重
  strArr.sort((a, b) => (a > b ? 1 : a == b ? 0 : -1));

  // abc
  // => a、b、c、ab、ac、bc、abc
  function PermutationSun(strArr, sub, start) {
    if (sub.length > 0) {
      result.add(sub.join(""));
    }
    for (let i = start; i < strArr.length; i++) {
      // 这里要注意 i > start
      if (i > start && strArr[i] == strArr[i - 1]) {
        continue;
      }
      // 取第一个元素
      sub.push(strArr[i]);
      PermutationSun(strArr, sub, i + 1);
      // 不取第一个元素
      sub.pop();
    }
  }
  PermutationSun(strArr, [], 0);

  return Array.from(result);
}
console.log(Permutation("acca"));

/**
 * 数组全排列
 */
function backTrack(arr) {
  const result = [];
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function _backTrack(arr, start) {
    if (start == arr.length - 1) {
      result.push(arr.slice());
    }
    for (let i = start; i < arr.length; i++) {
      swap(arr, i, start);
      _backTrack(arr, start + 1);
      swap(arr, start, i);
    }
  }

  _backTrack(arr, 0);

  /**
   * a1+a2+a3+a4==a5+a6+a7+a8，a1+a3+a5+a7==a2+a4+a6+a8，并且a1+a2+a5+a6==a3+a4+a7+a8。
   */
  return result.filter((v) => {
    return (
      v[0] + v[1] + v[2] + v[3] == v[4] + v[5] + v[6] + v[7] &&
      v[0] + v[2] + v[4] + v[6] == v[1] + v[3] + v[5] + v[7] &&
      v[0] + v[1] + v[3] + v[4] == v[2] + v[3] + v[6] + v[7]
    );
  });
}

// console.log(backTrack([1,2,3,10,5,6,7,8]));

/**
 * 八皇后问题
 * 思路：
 * 由于 8 个皇后的任意两个不能处在同一行，那么肯定是每一个皇后占据一行。
 * 于是我们可以定义一个数组arr[8]，用0~7初始化，数组中第i个数字表示位于第i行的皇后的列号。
 * 接下来就是对数组arr做全排列。
 * 因为我们是用不同的数字初始化数组，所以任意两个皇后肯定不同列。
 * 我们只需判断每一个排列对应的8个皇后是不是在同一对角线上，也就是对于数组的两个下标 i 和 j，
 * 是不是i-j==arr[i]-arr[j]或者j-i==arr[i]-arr[j]。
 */
function findQueue(arr) {
  const result = [];
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function _backTrack(arr, start) {
    if (start == arr.length - 1) {
      let isOk = true;
      for (let i = 0; i < arr.length && isOk; i++) {
        for (let j = i + 1; j < arr.length && isOk; j++) {
          // i-j==ColumnIndex[i]-ColumnIndex[j]或者j-i==ColumnIndex[i]-ColumnIndex[j]
          if (j - i == Math.abs(arr[i] - arr[j])) {
            isOk = false;
          }
        }
      }
      if (isOk) {
        result.push(arr.slice());
      }
    }
    for (let i = start; i < arr.length; i++) {
      swap(arr, i, start);
      _backTrack(arr, start + 1);
      swap(arr, start, i);
    }
  }

  _backTrack(arr, 0);
  return result;
}

console.log(findQueue([0, 1, 2, 3, 4, 5, 6, 7])); // 92

/**
 * 数组子集的和为指定元素的全部组合（数组元素可重复使用）
 * For example, given candidate set [2, 3, 6, 7] and target 7, 
 * A solution set is: 
    [
        [7],
        [2, 2, 3]
    ]
 */
function combinationSum(arr, target) {
  const result = [];
  function _backTrack(arr, sub, target, start) {
    if (target == 0) {
      result.push(sub.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (target >= arr[i]) {
        sub.push(arr[i]);
        _backTrack(arr, sub, target - arr[i], i);
        sub.pop();
      }
    }
  }
  _backTrack(arr, [], target, 0);
  return result;
}
console.log(combinationSum([2, 3, 6, 7], 7));

/**
 * 数组子集的和为指定元素的全部组合（数组元素不可重复使用）
For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8, 
A solution set is: 
    [
        [1, 7],
        [1, 2, 5],
        [2, 6],
        [1, 1, 6]
    ]
 */
function combinationSum2(arr, target) {
  const result = [];
  arr.sort((a, b) => (a > b ? 1 : a == b ? 0 : -1)); // 先排序

  function _backTrack(arr, sub, target, start) {
    if (target == 0) {
      result.push(sub.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      // 去重关键
      if (i > start && arr[i] == arr[i - 1]) {
        continue;
      }
      if (target >= arr[i]) {
        sub.push(arr[i]);
        _backTrack(arr, sub, target - arr[i], i + 1);
        sub.pop();
      }
    }
  }
  _backTrack(arr, [], target, 0);
  return result;
}
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));

/**
 * 回文分区问题
给出一个字符串，找出其所有的回文分割情况
For example, given s = "aab",
Return
    [
    ["aa","b"],
    ["a","a","b"]
    ]
 */
function findTargetSet3(str) {
  const result = [];

  function is_ok(str, i, j) {
    while (i < j) {
      if (str[i] == str[j]) {
        i++;
        j--;
      } else {
        return false;
      }
    }
    return true;
  }
  function _backTrack(str, sub, start) {
    if (start == str.length) {
      result.push(sub.slice());
      return;
    }
    // aab
    for (let i = start; i < str.length; i++) {
      if (is_ok(str, start, i)) {
        sub.push(str.substring(start, i + 1));
        _backTrack(str, sub, i + 1);
        sub.pop();
      }
    }
  }

  _backTrack(str, [], 0);
  return result;
}
console.log(findTargetSet3("aab"));

/**
 * 迷宫问题
问题描述：定义一个二维数组：
int maze[5][5] = {
	0, 1, 0, 0, 0,
	0, 1, 0, 1, 0,
	0, 0, 0, 0, 0,
	0, 1, 1, 1, 0,
	0, 0, 0, 1, 0,
};
它表示一个迷宫，其中的1表示墙壁，0表示可以走的路，只能横着走或竖着走，不能斜着走，
要求编程序找出从左上角到右下角的最短路线。
 */

function findPath(maze) {
  const result = [];
  const rows = maze.length;
  const cols = maze[0].length;
  const visited = [];
  for (let i = 0; i < rows; i++) {
    visited.push(new Array(cols).fill(false));
  }
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // 当前节点可走的4个方向，分别对应右，左，上，下
  function backTrack(maze, sub, i, j) {
    if (i == 0 && j == 0) {
      sub.push([i, j]);
      visited[i][j] = true;
    }

    if (i == rows - 1 && j == cols - 1) {
      result.push(sub.slice());
      return;
    }
    dirs.forEach((dir) => {
      let r = i + dir[0];
      let c = j + dir[1];

      if (
        c < cols &&
        c >= 0 &&
        r < rows &&
        r >= 0 &&
        maze[r][c] == 0 &&
        !visited[r][c]
      ) {
        sub.push([r, c]);
        visited[r][c] = true;
        backTrack(maze, sub, r, c);
        visited[r][c] = false;
        sub.pop();
      }
    });
  }
  backTrack(maze, [], 0, 0);
  return result;
}
const maze = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
];
console.log(findPath(maze));

/**
 * 解数独
 * 思路：
 * 1. 数独首先行，列，还有 3*3 的方格内数字是 1~9 不能重复。
 * 2. 声明布尔数组，表明行列中某个数字是否被使用了， 被用过视为 true，没用过为 false。
 * 3. 初始化布尔数组，表明哪些数字已经被使用过了。
 * 4. 尝试去填充数组，只要行，列， 还有 3*3 的方格内 出现已经被使用过的数字，我们就不填充，否则尝试填充。
 * 5. 如果填充失败，那么我们需要回溯。将原来尝试填充的地方改回来。
 * 6. 递归直到数独被填充完成。
 */
function solveSudoku(board) {
  // 2. 声明布尔数组，表明行列中某个数字是否被使用了， 被用过视为 true，没用过为 false。
  const rowUsed = new Array(9).fill(null).map((v) => new Array(9).fill(false));
  const colUsed = new Array(9).fill(null).map((v) => new Array(9).fill(false));
  const boxUsed = new Array(9).fill(null).map((v) => new Array(9).fill(false));

  // 3. 初始化布尔数组，表明哪些数字已经被使用过了
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] != ".") {
        let v = +board[i][j] - 1; // 变为整数
        rowUsed[i][v] = true;
        colUsed[j][v] = true;
        let k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        boxUsed[k][v] = true;
      }
    }
  }
  recusiveSolveSudoku(board, rowUsed, colUsed, boxUsed, 0, 0);

  function recusiveSolveSudoku(board, rowUsed, colUsed, boxUsed, i, j) {
    // 填充顺序从左上角开始，先每一行，再每一列
    if (j == board[0].length) {
      j = 0;
      i++; // 下一列
      if (i == board.length) {
        console.log(board);
        return true;
      }
    }
    if (board[i][j] != ".") {
      return recusiveSolveSudoku(board, rowUsed, colUsed, boxUsed, i, j + 1);
    }

    for (let num = 0; num < 9; num++) {
      let k = Math.floor(i /3 ) * 3 + Math.floor(j / 3);
      let canUsed = !(rowUsed[i][num] || colUsed[j][num] || boxUsed[k][num]);

      if (canUsed) {
        rowUsed[i][num] = true;
        colUsed[j][num] = true;
        boxUsed[k][num] = true;
        board[i][j] = "" + (num + 1);

        if (recusiveSolveSudoku(board, rowUsed, colUsed, boxUsed, i, j + 1)) {
          return true;
        }

        rowUsed[i][num] = false;
        colUsed[j][num] = false;
        boxUsed[k][num] = false;
        board[i][j] = ".";
      }
    }
    return false;
  }

  return board;
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(solveSudoku(board));
