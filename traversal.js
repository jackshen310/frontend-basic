function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function buildTree(arr) {
    let queue = [];
    let i = 0;
    let root = new TreeNode(arr[i]);
    queue.push(root);
    while(queue.length) {
        let node = queue.shift();
        if(i+1 < arr.length) {
            i++;
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        if(i+1 < arr.length) {
            i++;
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
    }
    return root;
}
/**
            1
        2        3
      4   5    6   7
    8  
 */
const root = buildTree([1,2,3,4,5,6,7,8]);
console.log(buildTree([1,2,3,4,5,6,7,8]));

// 前序遍历：根结点 ---> 左子树 ---> 右子树
function preorderTraversal(root) {
    const result = [];
    function preorder(root) {
        if(root == null) {
            return;
        }
        result.push(root.val);
        
        preorder(root.left);
        preorder(root.right);
    }
    preorder(root);
    return result;
}

// 非递归：使用栈来实现。
// 由于出栈顺序和入栈顺序相反，所以每次添加节点的时候先添加右节点，再添加左节点。
// 这样在下一轮访问子树的时候，就会先访问左子树，再访问右子树
function preorderTraversal2(root) {
    const result = [];
    
    const stack = [];
    stack.push(root);
    while(stack.length) {
        let node = stack.pop();
        result.push(node.val);
        
        if(node.right) {
            stack.push(node.right);
        }
        // 先出栈的放在下面
        if(node.left) {
            stack.push(node.left);
        }
    }
    return result;
}

console.log(preorderTraversal2(root)); // [1, 2, 4, 8, 5, 3, 6, 7]

// 中序遍历：左子树---> 根结点 ---> 右子树
function inorderTraversal(root) {
    const result = [];
    function inorder(root) {
        if(root.left) {
            inorder(root.left);
        }
        result.push(root.val);

        if(root.right) {
            inorder(root.right); 
        }
    }
    inorder(root);
    return result;
}

// 中序遍历：左子树---> 根结点 ---> 右子树
// 非递归：使用栈来实现。
// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/jian-dan-yi-dong-javac-pythonjs-er-cha-s-w80i/
function inorderTraversal2(root) {
    const result = [];
    const queue = [];
    let cur = root;
    while(cur || queue.length) {
        while(cur) {
            queue.push(cur); // 添加根节点
            cur = cur.left;// 循环添加左节点
        }
        
        let node = queue.pop();// 当前栈顶已经是最底层的左节点了，取出栈顶元素，访问该节点
        result.push(node.val);

        cur = node.right;// 添加右节点
    }
    return result;
}

console.log(inorderTraversal2(root)); // 8, 4, 2, 5,1, 6, 3, 7

// 后序遍历：左子树 ---> 右子树 ---> 根结点
function postorderTraversal(root) {
    const result = [];
    function postorder(root) {
        if(root.left) {
            postorder(root.left);
        }
        if(root.right) {
            postorder(root.right); 
        }
        result.push(root.val);
    
    }
    postorder(root);
    return result;
}
// https://segmentfault.com/a/1190000016674584
/**
 * 思路：基于前序遍历的变种来实现
 * 前序遍历：根节点 -> 左子树 -> 右子树
 * 变种：   根节点 -> 右子树 -> 左子树
 * 反转一下就是后续遍历了：左子树 -> 右子树 -> 根结点
 * 参考：https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/jian-dan-yi-dong-javac-pythonjs-er-cha-s-btwx/
 */
function postorderTraversal2(root) {
    const result = [];
    const stack = [];
    stack.push(root);
    while(stack.length) {
        let node = stack.pop();
        result.push(node.val);

        if(node.left) {
            stack.push(node.left);
        }
        if(node.right) {
            stack.push(node.right);
        }
    }
    return result.reverse();
}
console.log(postorderTraversal(root)); // 8, 4, 5, 2, 6, 7, 3, 1