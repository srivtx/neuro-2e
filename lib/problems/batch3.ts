// @ts-nocheck
export interface TestCase {
  input: string;
  expected: string;
  args: any[];
  expectedValue: any;
}

export interface Problem {
  id: string;
  patternId: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  number: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  why: string;
}

const p1: Problem = {
  id: "invert-binary-tree",
  patternId: "trees",
  name: "Invert Binary Tree",
  difficulty: "Easy",
  number: 226,
  description: "Given the root of a binary tree, invert the tree, and return its root.",
  examples: [
    { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    { input: "root = [2,1,3]", output: "[2,3,1]" },
    { input: "root = []", output: "[]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 <= Node.val <= 100"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {TreeNode}\\n */\\nvar invertTree = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar invertTree = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        var r = invertTree(t);\n        return treeToArray(r);\n    }\n    if (!root) return null;\n    var tmp = root.left;\n    root.left = invertTree(root.right);\n    root.right = invertTree(tmp);\n    return root;\n};",
  testCases: [
    { input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]", args: [[4, 2, 7, 1, 3, 6, 9]], expectedValue: [4, 7, 2, 9, 6, 3, 1] },
    { input: "[2,1,3]", expected: "[2,3,1]", args: [[2, 1, 3]], expectedValue: [2, 3, 1] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] }
  ],
  why: "Inverting a binary tree is the quintessential introduction to tree recursion and pointer swapping."
};

const p2: Problem = {
  id: "maximum-depth-of-binary-tree",
  patternId: "trees",
  name: "Maximum Depth of Binary Tree",
  difficulty: "Easy",
  number: 104,
  description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "3" },
    { input: "root = [1,null,2]", output: "2" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-100 <= Node.val <= 100"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar maxDepth = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar maxDepth = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return maxDepth(t);\n    }\n    if (!root) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n};",
  testCases: [
    { input: "[3,9,20,null,null,15,7]", expected: "3", args: [[3, 9, 20, null, null, 15, 7]], expectedValue: 3 },
    { input: "[1,null,2]", expected: "2", args: [[1, null, 2]], expectedValue: 2 },
    { input: "[]", expected: "0", args: [[]], expectedValue: 0 }
  ],
  why: "Maximum depth teaches the fundamental post-order traversal pattern for aggregating values up the tree."
};

const p3: Problem = {
  id: "same-tree",
  patternId: "trees",
  name: "Same Tree",
  difficulty: "Easy",
  number: 100,
  description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
  examples: [
    { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
    { input: "p = [1,2], q = [1,null,2]", output: "false" },
    { input: "p = [], q = []", output: "true" }
  ],
  constraints: [
    "The number of nodes in both trees is in the range [0, 100].",
    "-10^4 <= Node.val <= 10^4"
  ],
  starterCode: "/**\\n * @param {TreeNode} p\\n * @param {TreeNode} q\\n * @return {boolean}\\n */\\nvar isSameTree = function(p, q) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isSameTree = function(p, q) {\n    if (Array.isArray(p)) {\n        var tp = buildTree(p);\n        var tq = buildTree(q);\n        return isSameTree(tp, tq);\n    }\n    if (!p && !q) return true;\n    if (!p || !q) return false;\n    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n};",
  testCases: [
    { input: "p = [1,2,3], q = [1,2,3]", expected: "true", args: [[1, 2, 3], [1, 2, 3]], expectedValue: true },
    { input: "p = [1,2], q = [1,null,2]", expected: "false", args: [[1, 2], [1, null, 2]], expectedValue: false },
    { input: "p = [], q = []", expected: "true", args: [[], []], expectedValue: true }
  ],
  why: "Same Tree establishes the divide-and-conquer pattern by comparing subtrees recursively."
};

const p4: Problem = {
  id: "path-sum",
  patternId: "trees",
  name: "Path Sum",
  difficulty: "Easy",
  number: 112,
  description: "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum. A leaf is a node with no children.",
  examples: [
    { input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", output: "true", explanation: "The root-to-leaf path with the target sum is shown." },
    { input: "root = [1,2,3], targetSum = 5", output: "false" },
    { input: "root = [], targetSum = 0", output: "false" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 5000].",
    "-1000 <= Node.val <= 1000",
    "-1000 <= targetSum <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {number} targetSum\\n * @return {boolean}\\n */\\nvar hasPathSum = function(root, targetSum) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar hasPathSum = function(root, targetSum) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return hasPathSum(t, targetSum);\n    }\n    if (!root) return false;\n    if (!root.left && !root.right) return root.val === targetSum;\n    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n};",
  testCases: [
    { input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", expected: "true", args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22], expectedValue: true },
    { input: "root = [1,2,3], targetSum = 5", expected: "false", args: [[1, 2, 3], 5], expectedValue: false },
    { input: "root = [], targetSum = 0", expected: "false", args: [[], 0], expectedValue: false }
  ],
  why: "Path Sum introduces root-to-leaf recursion with accumulating state passed down each level."
};

const p5: Problem = {
  id: "balanced-binary-tree",
  patternId: "trees",
  name: "Balanced Binary Tree",
  difficulty: "Easy",
  number: 110,
  description: "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "true" },
    { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 5000].",
    "-10^4 <= Node.val <= 10^4"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {boolean}\\n */\\nvar isBalanced = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isBalanced = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return isBalanced(t);\n    }\n    function height(node) {\n        if (!node) return 0;\n        var lh = height(node.left);\n        if (lh === -1) return -1;\n        var rh = height(node.right);\n        if (rh === -1) return -1;\n        if (Math.abs(lh - rh) > 1) return -1;\n        return 1 + Math.max(lh, rh);\n    }\n    return height(root) !== -1;\n};",
  testCases: [
    { input: "[3,9,20,null,null,15,7]", expected: "true", args: [[3, 9, 20, null, null, 15, 7]], expectedValue: true },
    { input: "[1,2,2,3,3,null,null,4,4]", expected: "false", args: [[1, 2, 2, 3, 3, null, null, 4, 4]], expectedValue: false },
    { input: "[]", expected: "true", args: [[]], expectedValue: true }
  ],
  why: "Balanced tree checks combine height computation with validation in a single post-order pass."
};

const p6: Problem = {
  id: "diameter-of-binary-tree",
  patternId: "trees",
  name: "Diameter of Binary Tree",
  difficulty: "Easy",
  number: 543,
  description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.",
  examples: [
    { input: "root = [1,2,3,4,5]", output: "3", explanation: "The longest path is [4,2,1,3] or [5,2,1,3]." },
    { input: "root = [1,2]", output: "1" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4].",
    "-100 <= Node.val <= 100"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar diameterOfBinaryTree = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar diameterOfBinaryTree = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return diameterOfBinaryTree(t);\n    }\n    var maxD = 0;\n    function depth(node) {\n        if (!node) return 0;\n        var left = depth(node.left);\n        var right = depth(node.right);\n        maxD = Math.max(maxD, left + right);\n        return 1 + Math.max(left, right);\n    }\n    depth(root);\n    return maxD;\n};",
  testCases: [
    { input: "[1,2,3,4,5]", expected: "3", args: [[1, 2, 3, 4, 5]], expectedValue: 3 },
    { input: "[1,2]", expected: "1", args: [[1, 2]], expectedValue: 1 },
    { input: "[1]", expected: "0", args: [[1]], expectedValue: 0 }
  ],
  why: "Diameter of Binary Tree shows how to use post-order traversal to compute global optima from local subtree information."
};

const p7: Problem = {
  id: "symmetric-tree",
  patternId: "trees",
  name: "Symmetric Tree",
  difficulty: "Easy",
  number: 101,
  description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
  examples: [
    { input: "root = [1,2,2,3,4,4,3]", output: "true" },
    { input: "root = [1,2,2,null,3,null,3]", output: "false" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 1000].",
    "-100 <= Node.val <= 100"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {boolean}\\n */\\nvar isSymmetric = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isSymmetric = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return isSymmetric(t);\n    }\n    function check(l, r) {\n        if (!l && !r) return true;\n        if (!l || !r) return false;\n        return l.val === r.val && check(l.left, r.right) && check(l.right, r.left);\n    }\n    return check(root, root);\n};",
  testCases: [
    { input: "[1,2,2,3,4,4,3]", expected: "true", args: [[1, 2, 2, 3, 4, 4, 3]], expectedValue: true },
    { input: "[1,2,2,null,3,null,3]", expected: "false", args: [[1, 2, 2, null, 3, null, 3]], expectedValue: false },
    { input: "[1]", expected: "true", args: [[1]], expectedValue: true }
  ],
  why: "Symmetric Tree demonstrates how to compare two trees traversing in opposite directions simultaneously."
};

const p8: Problem = {
  id: "validate-binary-search-tree",
  patternId: "trees",
  name: "Validate Binary Search Tree",
  difficulty: "Medium",
  number: 98,
  description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key. The right subtree of a node contains only nodes with keys strictly greater than the node's key. Both the left and right subtrees must also be binary search trees.",
  examples: [
    { input: "root = [2,1,3]", output: "true" },
    { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "The root node's value is 5 but its right child's value is 4." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4].",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {boolean}\\n */\\nvar isValidBST = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isValidBST = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return isValidBST(t);\n    }\n    function validate(node, low, high) {\n        if (!node) return true;\n        if (node.val <= low || node.val >= high) return false;\n        return validate(node.left, low, node.val) && validate(node.right, node.val, high);\n    }\n    return validate(root, -Infinity, Infinity);\n};",
  testCases: [
    { input: "[2,1,3]", expected: "true", args: [[2, 1, 3]], expectedValue: true },
    { input: "[5,1,4,null,null,3,6]", expected: "false", args: [[5, 1, 4, null, null, 3, 6]], expectedValue: false },
    { input: "[1,1]", expected: "false", args: [[1, 1]], expectedValue: false }
  ],
  why: "Validating a BST teaches the crucial interval-based recursion pattern for enforcing ordering constraints."
};

const p9: Problem = {
  id: "subtree-of-another-tree",
  patternId: "trees",
  name: "Subtree of Another Tree",
  difficulty: "Medium",
  number: 572,
  description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise. A subtree of a binary tree is a tree that consists of a node in tree and all of this node's descendants.",
  examples: [
    { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
    { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" }
  ],
  constraints: [
    "The number of nodes in the root tree is in the range [1, 2000].",
    "The number of nodes in the subRoot tree is in the range [1, 1000].",
    "-10^4 <= root.val <= 10^4",
    "-10^4 <= subRoot.val <= 10^4"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {TreeNode} subRoot\\n * @return {boolean}\\n */\\nvar isSubtree = function(root, subRoot) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isSubtree = function(root, subRoot) {\n    if (Array.isArray(root)) {\n        var t1 = buildTree(root);\n        var t2 = buildTree(subRoot);\n        return isSubtree(t1, t2);\n    }\n    function same(a, b) {\n        if (!a && !b) return true;\n        if (!a || !b) return false;\n        return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);\n    }\n    if (!root) return false;\n    return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n};",
  testCases: [
    { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", expected: "true", args: [[3, 4, 5, 1, 2], [4, 1, 2]], expectedValue: true },
    { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", expected: "false", args: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], expectedValue: false },
    { input: "root = [1], subRoot = [2]", expected: "false", args: [[1], [2]], expectedValue: false }
  ],
  why: "Subtree checking combines tree equality with traversal to find a matching starting node."
};

const p10: Problem = {
  id: "lowest-common-ancestor-of-a-binary-search-tree",
  patternId: "trees",
  name: "Lowest Common Ancestor of a Binary Search Tree",
  difficulty: "Medium",
  number: 235,
  description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).",
  examples: [
    { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6", explanation: "The LCA of nodes 2 and 8 is 6." },
    { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2", explanation: "The LCA of nodes 2 and 4 is 2." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [2, 10^5].",
    "-10^9 <= Node.val <= 10^9",
    "All Node.val are unique.",
    "p != q",
    "p and q will exist in the BST."
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {TreeNode} p\\n * @param {TreeNode} q\\n * @return {TreeNode}\\n */\\nvar lowestCommonAncestor = function(root, p, q) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar lowestCommonAncestor = function(root, p, q) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        function find(node, val) {\n            if (!node) return null;\n            if (node.val === val) return node;\n            return find(node.left, val) || find(node.right, val);\n        }\n        var np = find(t, p);\n        var nq = find(t, q);\n        var r = lowestCommonAncestor(t, np, nq);\n        return r ? r.val : null;\n    }\n    if (p.val > root.val && q.val > root.val) {\n        return lowestCommonAncestor(root.right, p, q);\n    } else if (p.val < root.val && q.val < root.val) {\n        return lowestCommonAncestor(root.left, p, q);\n    } else {\n        return root;\n    }\n};",
  testCases: [
    { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", expected: "6", args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], expectedValue: 6 },
    { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", expected: "2", args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], expectedValue: 2 },
    { input: "root = [2,1], p = 2, q = 1", expected: "2", args: [[2, 1], 2, 1], expectedValue: 2 }
  ],
  why: "LCA in a BST leverages the ordering property to eliminate entire subtrees without exhaustive search."
};

const p11: Problem = {
  id: "lowest-common-ancestor-of-a-binary-tree",
  patternId: "trees",
  name: "Lowest Common Ancestor of a Binary Tree",
  difficulty: "Medium",
  number: 236,
  description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).",
  examples: [
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3", explanation: "The LCA of nodes 5 and 1 is 3." },
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5", explanation: "The LCA of nodes 5 and 4 is 5." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [2, 10^5].",
    "-10^9 <= Node.val <= 10^9",
    "All Node.val are unique.",
    "p != q",
    "p and q will exist in the tree."
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {TreeNode} p\\n * @param {TreeNode} q\\n * @return {TreeNode}\\n */\\nvar lowestCommonAncestor = function(root, p, q) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar lowestCommonAncestor = function(root, p, q) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        function find(node, val) {\n            if (!node) return null;\n            if (node.val === val) return node;\n            return find(node.left, val) || find(node.right, val);\n        }\n        var np = find(t, p);\n        var nq = find(t, q);\n        var r = lowestCommonAncestor(t, np, nq);\n        return r ? r.val : null;\n    }\n    if (!root || root === p || root === q) return root;\n    var left = lowestCommonAncestor(root.left, p, q);\n    var right = lowestCommonAncestor(root.right, p, q);\n    if (left && right) return root;\n    return left || right;\n};",
  testCases: [
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", expected: "3", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expectedValue: 3 },
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", expected: "5", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expectedValue: 5 },
    { input: "root = [1,2], p = 1, q = 2", expected: "1", args: [[1, 2], 1, 2], expectedValue: 1 }
  ],
  why: "LCA in a general binary tree shows how to bubble up findings from left and right subtrees to identify the split point."
};

const p12: Problem = {
  id: "binary-tree-level-order-traversal",
  patternId: "trees",
  name: "Binary Tree Level Order Traversal",
  difficulty: "Medium",
  number: 102,
  description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    { input: "root = [1]", output: "[[1]]" },
    { input: "root = []", output: "[]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 2000].",
    "-1000 <= Node.val <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number[][]}\\n */\\nvar levelOrder = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar levelOrder = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return levelOrder(t);\n    }\n    var res = [];\n    if (!root) return res;\n    var q = [root];\n    while (q.length) {\n        var level = [];\n        var size = q.length;\n        for (var i = 0; i < size; i++) {\n            var node = q.shift();\n            level.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n        res.push(level);\n    }\n    return res;\n};",
  testCases: [
    { input: "[3,9,20,null,null,15,7]", expected: "[[3],[9,20],[15,7]]", args: [[3, 9, 20, null, null, 15, 7]], expectedValue: [[3], [9, 20], [15, 7]] },
    { input: "[1]", expected: "[[1]]", args: [[1]], expectedValue: [[1]] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] }
  ],
  why: "Level order traversal is the foundation for BFS on trees and pattern recognition across horizontal layers."
};

const p13: Problem = {
  id: "construct-binary-tree-from-preorder-and-inorder-traversal",
  patternId: "trees",
  name: "Construct Binary Tree from Preorder and Inorder Traversal",
  difficulty: "Medium",
  number: 105,
  description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal, construct the binary tree and return its root.",
  examples: [
    { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" },
    { input: "preorder = [-1], inorder = [-1]", output: "[-1]" }
  ],
  constraints: [
    "1 <= preorder.length <= 3000",
    "inorder.length == preorder.length",
    "-3000 <= preorder[i], inorder[i] <= 3000",
    "preorder and inorder consist of unique values.",
    "Each value of inorder also appears in preorder.",
    "preorder is guaranteed to be the preorder traversal of the tree.",
    "inorder is guaranteed to be the inorder traversal of the tree."
  ],
  starterCode: "/**\\n * @param {number[]} preorder\\n * @param {number[]} inorder\\n * @return {TreeNode}\\n */\\nvar buildTree = function(preorder, inorder) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar buildTree = function(preorder, inorder) {\n    var map = {};\n    for (var i = 0; i < inorder.length; i++) map[inorder[i]] = i;\n    var idx = 0;\n    function helper(left, right) {\n        if (left > right) return null;\n        var val = preorder[idx++];\n        var node = new TreeNode(val);\n        node.left = helper(left, map[val] - 1);\n        node.right = helper(map[val] + 1, right);\n        return node;\n    }\n    var res = helper(0, inorder.length - 1);\n    return treeToArray(res);\n};",
  testCases: [
    { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", expected: "[3,9,20,null,null,15,7]", args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expectedValue: [3, 9, 20, null, null, 15, 7] },
    { input: "preorder = [-1], inorder = [-1]", expected: "[-1]", args: [[-1], [-1]], expectedValue: [-1] },
    { input: "preorder = [1,2,3], inorder = [3,2,1]", expected: "[1,2,null,3]", args: [[1, 2, 3], [3, 2, 1]], expectedValue: [1, 2, null, 3] }
  ],
  why: "Reconstructing a tree from traversals demonstrates how to partition problems using index maps and recursive ranges."
};

const p14: Problem = {
  id: "path-sum-ii",
  patternId: "trees",
  name: "Path Sum II",
  difficulty: "Medium",
  number: 113,
  description: "Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.",
  examples: [
    { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22", output: "[[5,4,11,2],[5,8,4,5]]" },
    { input: "root = [1,2,3], targetSum = 5", output: "[]" },
    { input: "root = [1,2], targetSum = 0", output: "[]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 5000].",
    "-1000 <= Node.val <= 1000",
    "-1000 <= targetSum <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {number} targetSum\\n * @return {number[][]}\\n */\\nvar pathSum = function(root, targetSum) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar pathSum = function(root, targetSum) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return pathSum(t, targetSum);\n    }\n    var res = [];\n    function dfs(node, sum, path) {\n        if (!node) return;\n        path.push(node.val);\n        if (!node.left && !node.right && node.val === sum) {\n            res.push(path.slice());\n        }\n        dfs(node.left, sum - node.val, path);\n        dfs(node.right, sum - node.val, path);\n        path.pop();\n    }\n    dfs(root, targetSum, []);\n    return res;\n};",
  testCases: [
    { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22", expected: "[[5,4,11,2],[5,8,4,5]]", args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22], expectedValue: [[5, 4, 11, 2], [5, 8, 4, 5]] },
    { input: "root = [1,2,3], targetSum = 5", expected: "[]", args: [[1, 2, 3], 5], expectedValue: [] },
    { input: "root = [1,2], targetSum = 0", expected: "[]", args: [[1, 2], 0], expectedValue: [] }
  ],
  why: "Path Sum II extends the root-to-leaf pattern by collecting all valid paths using backtracking."
};

const p15: Problem = {
  id: "sum-root-to-leaf-numbers",
  patternId: "trees",
  name: "Sum Root to Leaf Numbers",
  difficulty: "Medium",
  number: 129,
  description: "You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.",
  examples: [
    { input: "root = [1,2,3]", output: "25", explanation: "The root-to-leaf path 1->2 represents the number 12. The root-to-leaf path 1->3 represents the number 13. Therefore, sum = 12 + 13 = 25." },
    { input: "root = [4,9,0,5,1]", output: "1026", explanation: "The root-to-leaf path 4->9->5 represents the number 495. The root-to-leaf path 4->9->1 represents the number 491. The root-to-leaf path 4->0 represents the number 40. Therefore, sum = 495 + 491 + 40 = 1026." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 1000].",
    "0 <= Node.val <= 9",
    "The depth of the tree will not exceed 10."
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar sumNumbers = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar sumNumbers = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return sumNumbers(t);\n    }\n    var total = 0;\n    function dfs(node, curr) {\n        if (!node) return;\n        curr = curr * 10 + node.val;\n        if (!node.left && !node.right) {\n            total += curr;\n            return;\n        }\n        dfs(node.left, curr);\n        dfs(node.right, curr);\n    }\n    dfs(root, 0);\n    return total;\n};",
  testCases: [
    { input: "[1,2,3]", expected: "25", args: [[1, 2, 3]], expectedValue: 25 },
    { input: "[4,9,0,5,1]", expected: "1026", args: [[4, 9, 0, 5, 1]], expectedValue: 1026 },
    { input: "[0]", expected: "0", args: [[0]], expectedValue: 0 }
  ],
  why: "This problem shows how to accumulate running state during DFS and aggregate results at leaf nodes."
};

const p16: Problem = {
  id: "populating-next-right-pointers-in-each-node",
  patternId: "trees",
  name: "Populating Next Right Pointers in Each Node",
  difficulty: "Medium",
  number: 116,
  description: "You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Initially, all next pointers are set to NULL.",
  examples: [
    { input: "root = [1,2,3,4,5,6,7]", output: "[1,#,2,3,#,4,5,6,7,#]", explanation: "Given the above perfect binary tree, your function should populate each next pointer to point to its next right node, just like in the figure. The serialized output is in level order, with '#' signifying the end of each level." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 212 - 1].",
    "-1000 <= Node.val <= 1000"
  ],
  starterCode: "/**\\n * @param {Node} root\\n * @return {Node}\\n */\\nvar connect = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar connect = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        var r = connect(t);\n        return treeToArray(r);\n    }\n    if (!root) return root;\n    var leftmost = root;\n    while (leftmost.left) {\n        var head = leftmost;\n        while (head) {\n            head.left.next = head.right;\n            if (head.next) {\n                head.right.next = head.next.left;\n            }\n            head = head.next;\n        }\n        leftmost = leftmost.left;\n    }\n    return root;\n};",
  testCases: [
    { input: "[1,2,3,4,5,6,7]", expected: "[1,2,3,4,5,6,7]", args: [[1, 2, 3, 4, 5, 6, 7]], expectedValue: [1, 2, 3, 4, 5, 6, 7] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] },
    { input: "[1]", expected: "[1]", args: [[1]], expectedValue: [1] }
  ],
  why: "Populating next pointers teaches level-wise linkage and pointer manipulation without extra space."
};

const p17: Problem = {
  id: "kth-smallest-element-in-a-bst",
  patternId: "trees",
  name: "Kth Smallest Element in a BST",
  difficulty: "Medium",
  number: 230,
  description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
  examples: [
    { input: "root = [3,1,4,null,2], k = 1", output: "1" },
    { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" }
  ],
  constraints: [
    "The number of nodes in the tree is n.",
    "1 <= k <= n <= 10^4",
    "0 <= Node.val <= 10^4"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {number} k\\n * @return {number}\\n */\\nvar kthSmallest = function(root, k) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar kthSmallest = function(root, k) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return kthSmallest(t, k);\n    }\n    var count = 0;\n    var res = 0;\n    function inorder(node) {\n        if (!node) return;\n        inorder(node.left);\n        count++;\n        if (count === k) {\n            res = node.val;\n            return;\n        }\n        inorder(node.right);\n    }\n    inorder(root);\n    return res;\n};",
  testCases: [
    { input: "root = [3,1,4,null,2], k = 1", expected: "1", args: [[3, 1, 4, null, 2], 1], expectedValue: 1 },
    { input: "root = [5,3,6,2,4,null,null,1], k = 3", expected: "3", args: [[5, 3, 6, 2, 4, null, null, 1], 3], expectedValue: 3 },
    { input: "root = [1], k = 1", expected: "1", args: [[1], 1], expectedValue: 1 }
  ],
  why: "Finding the kth smallest element leverages the in-order traversal property of BSTs for efficient order statistics."
};

const p18: Problem = {
  id: "delete-node-in-a-bst",
  patternId: "trees",
  name: "Delete Node in a BST",
  difficulty: "Medium",
  number: 450,
  description: "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.",
  examples: [
    { input: "root = [5,3,6,2,4,null,7], key = 3", output: "[5,4,6,2,null,null,7]", explanation: "Given key to delete is 3. So we find the node with value 3 and delete it. One valid answer is [5,4,6,2,null,null,7]." },
    { input: "root = [5,3,6,2,4,null,7], key = 0", output: "[5,3,6,2,4,null,7]", explanation: "The tree does not contain a node with value = 0." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-10^5 <= Node.val <= 10^5",
    "Each node has a unique value.",
    "root is a valid binary search tree.",
    "-10^5 <= key <= 10^5"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {number} key\\n * @return {TreeNode}\\n */\\nvar deleteNode = function(root, key) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar deleteNode = function(root, key) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        var r = deleteNode(t, key);\n        return treeToArray(r);\n    }\n    if (!root) return null;\n    if (key < root.val) {\n        root.left = deleteNode(root.left, key);\n    } else if (key > root.val) {\n        root.right = deleteNode(root.right, key);\n    } else {\n        if (!root.left) return root.right;\n        if (!root.right) return root.left;\n        var minNode = root.right;\n        while (minNode.left) minNode = minNode.left;\n        root.val = minNode.val;\n        root.right = deleteNode(root.right, minNode.val);\n    }\n    return root;\n};",
  testCases: [
    { input: "root = [5,3,6,2,4,null,7], key = 3", expected: "[5,4,6,2,null,null,7]", args: [[5, 3, 6, 2, 4, null, 7], 3], expectedValue: [5, 4, 6, 2, null, null, 7] },
    { input: "root = [5,3,6,2,4,null,7], key = 0", expected: "[5,3,6,2,4,null,7]", args: [[5, 3, 6, 2, 4, null, 7], 0], expectedValue: [5, 3, 6, 2, 4, null, 7] },
    { input: "root = [], key = 0", expected: "[]", args: [[], 0], expectedValue: [] }
  ],
  why: "Deleting a BST node requires understanding how to rewire children while preserving the BST invariant."
};

const p19: Problem = {
  id: "binary-tree-right-side-view",
  patternId: "trees",
  name: "Binary Tree Right Side View",
  difficulty: "Medium",
  number: 199,
  description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
  examples: [
    { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
    { input: "root = [1,null,3]", output: "[1,3]" },
    { input: "root = []", output: "[]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 <= Node.val <= 100"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number[]}\\n */\\nvar rightSideView = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar rightSideView = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return rightSideView(t);\n    }\n    var res = [];\n    if (!root) return res;\n    var q = [root];\n    while (q.length) {\n        var size = q.length;\n        for (var i = 0; i < size; i++) {\n            var node = q.shift();\n            if (i === size - 1) res.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n    }\n    return res;\n};",
  testCases: [
    { input: "[1,2,3,null,5,null,4]", expected: "[1,3,4]", args: [[1, 2, 3, null, 5, null, 4]], expectedValue: [1, 3, 4] },
    { input: "[1,null,3]", expected: "[1,3]", args: [[1, null, 3]], expectedValue: [1, 3] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] }
  ],
  why: "Right side view is a classic BFS problem that captures the last node at each depth level."
};

const p20: Problem = {
  id: "house-robber-iii",
  patternId: "trees",
  name: "House Robber III",
  difficulty: "Medium",
  number: 337,
  description: "The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root. Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night. Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.",
  examples: [
    { input: "root = [3,2,3,null,3,null,1]", output: "7", explanation: "Maximum amount of money the thief can rob = 3 + 3 + 1 = 7." },
    { input: "root = [3,4,5,1,3,null,1]", output: "9", explanation: "Maximum amount of money the thief can rob = 4 + 5 = 9." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4].",
    "0 <= Node.val <= 10^4"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar rob = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar rob = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return rob(t);\n    }\n    function dfs(node) {\n        if (!node) return [0, 0];\n        var left = dfs(node.left);\n        var right = dfs(node.right);\n        var robCurr = node.val + left[1] + right[1];\n        var notRobCurr = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\n        return [robCurr, notRobCurr];\n    }\n    var res = dfs(root);\n    return Math.max(res[0], res[1]);\n};",
  testCases: [
    { input: "[3,2,3,null,3,null,1]", expected: "7", args: [[3, 2, 3, null, 3, null, 1]], expectedValue: 7 },
    { input: "[3,4,5,1,3,null,1]", expected: "9", args: [[3, 4, 5, 1, 3, null, 1]], expectedValue: 9 },
    { input: "[1]", expected: "1", args: [[1]], expectedValue: 1 }
  ],
  why: "House Robber III introduces tree DP by returning multiple states from each subtree to make optimal parent decisions."
};

const p21: Problem = {
  id: "cousins-in-binary-tree",
  patternId: "trees",
  name: "Cousins in Binary Tree",
  difficulty: "Easy",
  number: 993,
  description: "Given the root of a binary tree with unique values, and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise. Two nodes of a binary tree are cousins if they have the same depth with different parents.",
  examples: [
    { input: "root = [1,2,3,4], x = 4, y = 3", output: "false" },
    { input: "root = [1,2,3,null,4,null,5], x = 5, y = 4", output: "true" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [2, 100].",
    "1 <= Node.val <= 100",
    "Each node has a unique value.",
    "x != y",
    "x and y are existing values in the tree."
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @param {number} x\\n * @param {number} y\\n * @return {boolean}\\n */\\nvar isCousins = function(root, x, y) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar isCousins = function(root, x, y) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return isCousins(t, x, y);\n    }\n    var px = null, py = null, dx = -1, dy = -1;\n    function dfs(node, parent, depth) {\n        if (!node) return;\n        if (node.val === x) { px = parent; dx = depth; }\n        if (node.val === y) { py = parent; dy = depth; }\n        dfs(node.left, node, depth + 1);\n        dfs(node.right, node, depth + 1);\n    }\n    dfs(root, null, 0);\n    return dx === dy && px !== py;\n};",
  testCases: [
    { input: "root = [1,2,3,4], x = 4, y = 3", expected: "false", args: [[1, 2, 3, 4], 4, 3], expectedValue: false },
    { input: "root = [1,2,3,null,4,null,5], x = 5, y = 4", expected: "true", args: [[1, 2, 3, null, 4, null, 5], 5, 4], expectedValue: true },
    { input: "root = [1,2,3,null,4], x = 2, y = 3", expected: "false", args: [[1, 2, 3, null, 4], 2, 3], expectedValue: false }
  ],
  why: "Cousins in a binary tree requires tracking both depth and parent during traversal to validate relationships."
};

const p22: Problem = {
  id: "serialize-and-deserialize-binary-tree",
  patternId: "trees",
  name: "Serialize and Deserialize Binary Tree",
  difficulty: "Hard",
  number: 297,
  description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree.",
  examples: [
    { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-1000 <= Node.val <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {string}\\n */\\nvar serialize = function(root) {\\n    // Write your code here\\n    \\n};\n\n/**\\n * @param {string} data\\n * @return {TreeNode}\\n */\\nvar deserialize = function(data) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar serialize = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return serialize(t);\n    }\n    var res = [];\n    function pre(node) {\n        if (!node) { res.push('N'); return; }\n        res.push(String(node.val));\n        pre(node.left);\n        pre(node.right);\n    }\n    pre(root);\n    return res.join(',');\n};\nvar deserialize = function(data) {\n    if (typeof data === 'string') {\n        var vals = data.split(',');\n        var i = 0;\n        function build() {\n            if (vals[i] === 'N') { i++; return null; }\n            var node = new TreeNode(parseInt(vals[i]));\n            i++;\n            node.left = build();\n            node.right = build();\n            return node;\n        }\n        var t = build();\n        return treeToArray(t);\n    }\n    return null;\n};",
  testCases: [
    { input: "[1,2,3,null,null,4,5]", expected: "serialized string round-trips to same array", args: [[1, 2, 3, null, null, 4, 5]], expectedValue: [1, 2, 3, null, null, 4, 5] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] },
    { input: "[1]", expected: "[1]", args: [[1]], expectedValue: [1] }
  ],
  why: "Serialization problems test the ability to design compact encodings and reconstruct trees from linear data."
};

const p23: Problem = {
  id: "binary-tree-maximum-path-sum",
  patternId: "trees",
  name: "Binary Tree Maximum Path Sum",
  difficulty: "Hard",
  number: 124,
  description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
  examples: [
    { input: "root = [1,2,3]", output: "6", explanation: "The optimal path is 2->1->3 with a sum of 6." },
    { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The optimal path is 15->20->7 with a sum of 42." }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 3 * 10^4].",
    "-1000 <= Node.val <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar maxPathSum = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar maxPathSum = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return maxPathSum(t);\n    }\n    var maxSum = -Infinity;\n    function gain(node) {\n        if (!node) return 0;\n        var left = Math.max(gain(node.left), 0);\n        var right = Math.max(gain(node.right), 0);\n        var priceNewPath = node.val + left + right;\n        maxSum = Math.max(maxSum, priceNewPath);\n        return node.val + Math.max(left, right);\n    }\n    gain(root);\n    return maxSum;\n};",
  testCases: [
    { input: "[1,2,3]", expected: "6", args: [[1, 2, 3]], expectedValue: 6 },
    { input: "[-10,9,20,null,null,15,7]", expected: "42", args: [[-10, 9, 20, null, null, 15, 7]], expectedValue: 42 },
    { input: "[-3]", expected: "-3", args: [[-3]], expectedValue: -3 }
  ],
  why: "Maximum path sum is a challenging post-order problem where local gains must be combined without forming cycles."
};

const p24: Problem = {
  id: "binary-tree-cameras",
  patternId: "trees",
  name: "Binary Tree Cameras",
  difficulty: "Hard",
  number: 968,
  description: "You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.",
  examples: [
    { input: "root = [0,0,null,0,0]", output: "1" },
    { input: "root = [0,0,null,0,null,0,null,null,0]", output: "2" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 1000].",
    "Node.val == 0",
    "The root is guaranteed to be a binary tree."
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number}\\n */\\nvar minCameraCover = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar minCameraCover = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return minCameraCover(t);\n    }\n    var cameras = 0;\n    function dfs(node) {\n        if (!node) return 2;\n        var left = dfs(node.left);\n        var right = dfs(node.right);\n        if (left === 0 || right === 0) {\n            cameras++;\n            return 1;\n        }\n        if (left === 1 || right === 1) {\n            return 2;\n        }\n        return 0;\n    }\n    if (dfs(root) === 0) cameras++;\n    return cameras;\n};",
  testCases: [
    { input: "[0,0,null,0,0]", expected: "1", args: [[0, 0, null, 0, 0]], expectedValue: 1 },
    { input: "[0,0,null,0,null,0,null,null,0]", expected: "2", args: [[0, 0, null, 0, null, 0, null, null, 0]], expectedValue: 2 },
    { input: "[0]", expected: "1", args: [[0]], expectedValue: 1 }
  ],
  why: "Binary Tree Cameras is a classic tree DP problem where each node reports its coverage state to its parent."
};

const p25: Problem = {
  id: "vertical-order-traversal-of-a-binary-tree",
  patternId: "trees",
  name: "Vertical Order Traversal of a Binary Tree",
  difficulty: "Hard",
  number: 987,
  description: "Given the root of a binary tree, calculate the vertical order traversal of the binary tree. For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0). The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.",
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "[[9],[3,15],[20],[7]]" },
    { input: "root = [1,2,3,4,5,6,7]", output: "[[4],[2],[1,5,6],[3],[7]]" }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 1000].",
    "0 <= Node.val <= 1000"
  ],
  starterCode: "/**\\n * @param {TreeNode} root\\n * @return {number[][]}\\n */\\nvar verticalTraversal = function(root) {\\n    // Write your code here\\n    \\n};",
  solution: "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0) return null;\n    var root = new TreeNode(arr[0]);\n    var q = [root];\n    var i = 1;\n    while (q.length && i < arr.length) {\n        var node = q.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            node.left = new TreeNode(arr[i]);\n            q.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            node.right = new TreeNode(arr[i]);\n            q.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArray(root) {\n    if (!root) return [];\n    var res = [];\n    var q = [root];\n    while (q.length) {\n        var node = q.shift();\n        if (node) {\n            res.push(node.val);\n            q.push(node.left);\n            q.push(node.right);\n        } else {\n            res.push(null);\n        }\n    }\n    while (res.length && res[res.length - 1] === null) res.pop();\n    return res;\n}\nvar verticalTraversal = function(root) {\n    if (Array.isArray(root)) {\n        var t = buildTree(root);\n        return verticalTraversal(t);\n    }\n    var nodes = [];\n    function dfs(node, row, col) {\n        if (!node) return;\n        nodes.push({val: node.val, row: row, col: col});\n        dfs(node.left, row + 1, col - 1);\n        dfs(node.right, row + 1, col + 1);\n    }\n    dfs(root, 0, 0);\n    nodes.sort(function(a, b) {\n        if (a.col !== b.col) return a.col - b.col;\n        if (a.row !== b.row) return a.row - b.row;\n        return a.val - b.val;\n    });\n    var res = [];\n    var prevCol = null;\n    for (var i = 0; i < nodes.length; i++) {\n        if (nodes[i].col !== prevCol) {\n            res.push([]);\n            prevCol = nodes[i].col;\n        }\n        res[res.length - 1].push(nodes[i].val);\n    }\n    return res;\n};",
  testCases: [
    { input: "[3,9,20,null,null,15,7]", expected: "[[9],[3,15],[20],[7]]", args: [[3, 9, 20, null, null, 15, 7]], expectedValue: [[9], [3, 15], [20], [7]] },
    { input: "[1,2,3,4,5,6,7]", expected: "[[4],[2],[1,5,6],[3],[7]]", args: [[1, 2, 3, 4, 5, 6, 7]], expectedValue: [[4], [2], [1, 5, 6], [3], [7]] },
    { input: "[1]", expected: "[[1]]", args: [[1]], expectedValue: [[1]] }
  ],
  why: "Vertical order traversal combines coordinate mapping with custom sorting to produce spatial tree views."
};

const p26: Problem = {
  id: "last-stone-weight",
  patternId: "heap",
  name: "Last Stone Weight",
  difficulty: "Easy",
  number: 1046,
  description: "You are given an array of integers stones where stones[i] is the weight of the ith stone. We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is: If x == y, both stones are destroyed; If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x. At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.",
  examples: [
    { input: "stones = [2,7,4,1,8,1]", output: "1", explanation: "We combine 7 and 8 to get 1, so the array converts to [2,4,1,1,1]. Then we combine 2 and 4 to get 2, so the array converts to [2,1,1,1]. Then we combine 2 and 1 to get 1, so the array converts to [1,1,1]. Then we combine 1 and 1 to get 0, so the array converts to [1]. That's the value of the last stone." },
    { input: "stones = [1]", output: "1" }
  ],
  constraints: [
    "1 <= stones.length <= 30",
    "1 <= stones[i] <= 1000"
  ],
  starterCode: "/**\\n * @param {number[]} stones\\n * @return {number}\\n */\\nvar lastStoneWeight = function(stones) {\\n    // Write your code here\\n    \\n};",
  solution: "function lastStoneWeight(stones) {\n    var maxHeap = stones.slice().sort(function(a,b){return b-a;});\n    while (maxHeap.length > 1) {\n        var y = maxHeap.shift();\n        var x = maxHeap.shift();\n        if (y !== x) {\n            var diff = y - x;\n            maxHeap.push(diff);\n            maxHeap.sort(function(a,b){return b-a;});\n        }\n    }\n    return maxHeap.length ? maxHeap[0] : 0;\n}",
  testCases: [
    { input: "[2,7,4,1,8,1]", expected: "1", args: [[2, 7, 4, 1, 8, 1]], expectedValue: 1 },
    { input: "[1]", expected: "1", args: [[1]], expectedValue: 1 },
    { input: "[2,2]", expected: "0", args: [[2, 2]], expectedValue: 0 }
  ],
  why: "Last Stone Weight introduces the max-heap pattern for repeatedly extracting the largest elements."
};

const p27: Problem = {
  id: "kth-largest-element-in-a-stream",
  patternId: "heap",
  name: "Kth Largest Element in a Stream",
  difficulty: "Easy",
  number: 703,
  description: "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element. Implement KthLargest class: KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums. int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.",
  examples: [
    { input: "['KthLargest', 'add', 'add', 'add', 'add', 'add']\\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]", output: "[null, 4, 5, 5, 8, 8]" }
  ],
  constraints: [
    "1 <= k <= 10^4",
    "0 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "-10^4 <= val <= 10^4",
    "At most 10^4 calls will be made to add."
  ],
  starterCode: "/**\\n * @param {number} k\\n * @param {number[]} nums\\n */\\nvar KthLargest = function(k, nums) {\\n    // Write your code here\\n    \\n};\\n\\n/**\\n * @param {number} val\\n * @return {number}\\n */\\nKthLargest.prototype.add = function(val) {\\n    // Write your code here\\n    \\n};",
  solution: "var KthLargest = function(k, nums) {\n    this.k = k;\n    this.minHeap = nums.slice().sort(function(a,b){return a-b;});\n    while (this.minHeap.length > this.k) {\n        this.minHeap.shift();\n    }\n};\nKthLargest.prototype.add = function(val) {\n    this.minHeap.push(val);\n    this.minHeap.sort(function(a,b){return a-b;});\n    if (this.minHeap.length > this.k) {\n        this.minHeap.shift();\n    }\n    return this.minHeap[0];\n};",
  testCases: [
    { input: "k=3, nums=[4,5,8,2], add(3)", expected: "4", args: [3, [4, 5, 8, 2], 3], expectedValue: 4 },
    { input: "k=3, nums=[4,5,8,2], add(3), add(5)", expected: "5", args: [3, [4, 5, 8, 2], 5], expectedValue: 5 },
    { input: "k=1, nums=[], add(1)", expected: "1", args: [1, [], 1], expectedValue: 1 }
  ],
  why: "Kth Largest in a Stream demonstrates maintaining a fixed-size min-heap for order statistics over streaming data."
};

const p28: Problem = {
  id: "kth-largest-element-in-an-array",
  patternId: "heap",
  name: "Kth Largest Element in an Array",
  difficulty: "Medium",
  number: 215,
  description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?",
  examples: [
    { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
    { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" }
  ],
  constraints: [
    "1 <= k <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  starterCode: "/**\\n * @param {number[]} nums\\n * @param {number} k\\n * @return {number}\\n */\\nvar findKthLargest = function(nums, k) {\\n    // Write your code here\\n    \\n};",
  solution: "function findKthLargest(nums, k) {\n    var minHeap = nums.slice(0, k).sort(function(a,b){return a-b;});\n    for (var i = k; i < nums.length; i++) {\n        if (nums[i] > minHeap[0]) {\n            minHeap[0] = nums[i];\n            minHeap.sort(function(a,b){return a-b;});\n        }\n    }\n    return minHeap[0];\n}",
  testCases: [
    { input: "[3,2,1,5,6,4], k = 2", expected: "5", args: [[3, 2, 1, 5, 6, 4], 2], expectedValue: 5 },
    { input: "[3,2,3,1,2,4,5,5,6], k = 4", expected: "4", args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expectedValue: 4 },
    { input: "[1], k = 1", expected: "1", args: [[1], 1], expectedValue: 1 }
  ],
  why: "Finding the kth largest element is the canonical heap problem for understanding size-k min-heaps."
};

const p29: Problem = {
  id: "top-k-frequent-elements",
  patternId: "heap",
  name: "Top K Frequent Elements",
  difficulty: "Medium",
  number: 347,
  description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
  examples: [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
    { input: "nums = [1], k = 1", output: "[1]" }
  ],
  constraints: [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
    "k is in the range [1, the number of unique elements in the array].",
    "It is guaranteed that the answer is unique."
  ],
  starterCode: "/**\\n * @param {number[]} nums\\n * @param {number} k\\n * @return {number[]}\\n */\\nvar topKFrequent = function(nums, k) {\\n    // Write your code here\\n    \\n};",
  solution: "function topKFrequent(nums, k) {\n    var freq = {};\n    for (var i = 0; i < nums.length; i++) {\n        freq[nums[i]] = (freq[nums[i]] || 0) + 1;\n    }\n    var entries = Object.keys(freq).map(function(key) {\n        return [parseInt(key), freq[key]];\n    });\n    entries.sort(function(a, b) { return b[1] - a[1]; });\n    var res = [];\n    for (var i = 0; i < k; i++) {\n        res.push(entries[i][0]);\n    }\n    return res;\n}",
  testCases: [
    { input: "[1,1,1,2,2,3], k = 2", expected: "[1,2]", args: [[1, 1, 1, 2, 2, 3], 2], expectedValue: [1, 2] },
    { input: "[1], k = 1", expected: "[1]", args: [[1], 1], expectedValue: [1] },
    { input: "[4,4,4,2,2,1], k = 1", expected: "[4]", args: [[4, 4, 4, 2, 2, 1], 1], expectedValue: [4] }
  ],
  why: "Top K Frequent pairs counting with a heap to efficiently extract the most common items."
};

const p30: Problem = {
  id: "sort-characters-by-frequency",
  patternId: "heap",
  name: "Sort Characters By Frequency",
  difficulty: "Medium",
  number: 451,
  description: "Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string. Return the sorted string. If there are multiple answers, return any of them.",
  examples: [
    { input: "s = \"tree\"", output: "\"eert\"", explanation: "'e' appears twice, while 'r' and 't' both appear once." },
    { input: "s = \"cccaaa\"", output: "\"aaaccc\"", explanation: "Both 'c' and 'a' appear three times." }
  ],
  constraints: [
    "1 <= s.length <= 5 * 10^5",
    "s consists of uppercase and lowercase English letters and digits."
  ],
  starterCode: "/**\\n * @param {string} s\\n * @return {string}\\n */\\nvar frequencySort = function(s) {\\n    // Write your code here\\n    \\n};",
  solution: "function frequencySort(s) {\n    var freq = {};\n    for (var i = 0; i < s.length; i++) {\n        freq[s[i]] = (freq[s[i]] || 0) + 1;\n    }\n    var entries = Object.keys(freq).map(function(ch) {\n        return [ch, freq[ch]];\n    });\n    entries.sort(function(a, b) { return b[1] - a[1]; });\n    var res = \"\";\n    for (var i = 0; i < entries.length; i++) {\n        for (var j = 0; j < entries[i][1]; j++) {\n            res += entries[i][0];\n        }\n    }\n    return res;\n}",
  testCases: [
    { input: "\"tree\"", expected: "\"eert\"", args: ["tree"], expectedValue: "eert" },
    { input: "\"cccaaa\"", expected: "\"aaaccc\"", args: ["cccaaa"], expectedValue: "aaaccc" },
    { input: "\"Aabb\"", expected: "\"bbAa\"", args: ["Aabb"], expectedValue: "bbAa" }
  ],
  why: "Sorting by frequency is a classic application of frequency maps combined with heap ordering."
};

const p31: Problem = {
  id: "reorganize-string",
  patternId: "heap",
  name: "Reorganize String",
  difficulty: "Medium",
  number: 767,
  description: "Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return \"\" if not possible.",
  examples: [
    { input: "s = \"aab\"", output: "\"aba\"" },
    { input: "s = \"aaab\"", output: "\"\"" }
  ],
  constraints: [
    "1 <= s.length <= 500",
    "s consists of lowercase English letters."
  ],
  starterCode: "/**\\n * @param {string} s\\n * @return {string}\\n */\\nvar reorganizeString = function(s) {\\n    // Write your code here\\n    \\n};",
  solution: "function reorganizeString(s) {\n    var freq = {};\n    for (var i = 0; i < s.length; i++) {\n        freq[s[i]] = (freq[s[i]] || 0) + 1;\n    }\n    var maxFreq = 0;\n    for (var ch in freq) {\n        if (freq[ch] > maxFreq) maxFreq = freq[ch];\n    }\n    if (maxFreq > Math.ceil(s.length / 2)) return \"\";\n    var entries = Object.keys(freq).map(function(ch) {\n        return [ch, freq[ch]];\n    });\n    entries.sort(function(a, b) { return b[1] - a[1]; });\n    var res = new Array(s.length);\n    var idx = 0;\n    for (var i = 0; i < entries.length; i++) {\n        for (var j = 0; j < entries[i][1]; j++) {\n            res[idx] = entries[i][0];\n            idx += 2;\n            if (idx >= s.length) idx = 1;\n        }\n    }\n    return res.join(\"\");\n}",
  testCases: [
    { input: "\"aab\"", expected: "\"aba\"", args: ["aab"], expectedValue: "aba" },
    { input: "\"aaab\"", expected: "\"\"", args: ["aaab"], expectedValue: "" },
    { input: "\"vvvlo\"", expected: "\"vlvov\"", args: ["vvvlo"], expectedValue: "vlvov" }
  ],
  why: "Reorganize String uses a greedy heap approach to place the most frequent characters apart from each other."
};

const p32: Problem = {
  id: "task-scheduler",
  patternId: "heap",
  name: "Task Scheduler",
  difficulty: "Hard",
  number: 621,
  description: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks. Return the least number of units of time that the CPU will take to finish all the given tasks.",
  examples: [
    { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B. There are at least 2 units of time between any two same tasks." },
    { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0", output: "6" }
  ],
  constraints: [
    "1 <= tasks.length <= 10^4",
    "tasks[i] is upper-case English letter.",
    "0 <= n <= 100"
  ],
  starterCode: "/**\\n * @param {string[]} tasks\\n * @param {number} n\\n * @return {number}\\n */\\nvar leastInterval = function(tasks, n) {\\n    // Write your code here\\n    \\n};",
  solution: "function leastInterval(tasks, n) {\n    var freq = {};\n    for (var i = 0; i < tasks.length; i++) {\n        freq[tasks[i]] = (freq[tasks[i]] || 0) + 1;\n    }\n    var maxFreq = 0;\n    for (var t in freq) {\n        if (freq[t] > maxFreq) maxFreq = freq[t];\n    }\n    var maxCount = 0;\n    for (var t in freq) {\n        if (freq[t] === maxFreq) maxCount++;\n    }\n    var partCount = maxFreq - 1;\n    var partLength = n - (maxCount - 1);\n    var emptySlots = partCount * partLength;\n    var availableTasks = tasks.length - maxFreq * maxCount;\n    var idles = Math.max(0, emptySlots - availableTasks);\n    return tasks.length + idles;\n}",
  testCases: [
    { input: "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", expected: "8", args: [["A", "A", "A", "B", "B", "B"], 2], expectedValue: 8 },
    { input: "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0", expected: "6", args: [["A", "A", "A", "B", "B", "B"], 0], expectedValue: 6 },
    { input: "[\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"], n = 2", expected: "16", args: [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2], expectedValue: 16 }
  ],
  why: "Task Scheduler uses frequency analysis and greedy scheduling to minimize idle time between repeated tasks."
};

const p33: Problem = {
  id: "merge-k-sorted-lists",
  patternId: "heap",
  name: "Merge k Sorted Lists",
  difficulty: "Hard",
  number: 23,
  description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked list and return it.",
  examples: [
    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    { input: "lists = []", output: "[]" },
    { input: "lists = [[]]", output: "[]" }
  ],
  constraints: [
    "k == lists.length",
    "0 <= k <= 10^4",
    "0 <= lists[i].length <= 500",
    "-10^4 <= lists[i][j] <= 10^4",
    "lists[i] is sorted in ascending order.",
    "The sum of lists[i].length will not exceed 10^4."
  ],
  starterCode: "/**\\n * @param {ListNode[]} lists\\n * @return {ListNode}\\n */\\nvar mergeKLists = function(lists) {\\n    // Write your code here\\n    \\n};",
  solution: "function ListNode(val, next) {\n    this.val = (val===undefined ? 0 : val);\n    this.next = (next===undefined ? null : next);\n}\nfunction buildList(arr) {\n    if (!arr || arr.length === 0) return null;\n    var head = new ListNode(arr[0]);\n    var cur = head;\n    for (var i = 1; i < arr.length; i++) {\n        cur.next = new ListNode(arr[i]);\n        cur = cur.next;\n    }\n    return head;\n}\nfunction listToArray(head) {\n    var res = [];\n    while (head) {\n        res.push(head.val);\n        head = head.next;\n    }\n    return res;\n}\nfunction mergeKLists(lists) {\n    if (Array.isArray(lists) && lists.length > 0 && Array.isArray(lists[0])) {\n        var ll = lists.map(function(arr){ return buildList(arr); });\n        var res = mergeKLists(ll);\n        return listToArray(res);\n    }\n    var arr = [];\n    for (var i = 0; i < lists.length; i++) {\n        var node = lists[i];\n        while (node) {\n            arr.push(node.val);\n            node = node.next;\n        }\n    }\n    arr.sort(function(a,b){return a-b;});\n    return buildList(arr);\n}",
  testCases: [
    { input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]", args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expectedValue: [1, 1, 2, 3, 4, 4, 5, 6] },
    { input: "[]", expected: "[]", args: [[]], expectedValue: [] },
    { input: "[[]]", expected: "[]", args: [[[]]], expectedValue: [] }
  ],
  why: "Merging k sorted lists is the classic problem for understanding how a heap efficiently manages multiple sorted streams."
};

const p34: Problem = {
  id: "find-median-from-data-stream",
  patternId: "heap",
  name: "Find Median from Data Stream",
  difficulty: "Hard",
  number: 295,
  description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values. Implement the MedianFinder class: MedianFinder() initializes the MedianFinder object. void addNum(int num) adds the integer num from the data stream to the data structure. double findMedian() returns the median of all elements so far.",
  examples: [
    { input: "['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian']\\n[[], [1], [2], [], [3], []]", output: "[null, null, null, 1.5, null, 2.0]" }
  ],
  constraints: [
    "-10^5 <= num <= 10^5",
    "There will be at least one element in the data structure before calling findMedian.",
    "At most 5 * 10^4 calls will be made to addNum and findMedian."
  ],
  starterCode: "/**\\n * MedianFinder\\n */\\nvar MedianFinder = function() {\\n    // Write your code here\\n    \\n};\\n\\n/**\\n * @param {number} num\\n * @return {void}\\n */\\nMedianFinder.prototype.addNum = function(num) {\\n    // Write your code here\\n    \\n};\\n\\n/**\\n * @return {number}\\n */\\nMedianFinder.prototype.findMedian = function() {\\n    // Write your code here\\n    \\n};",
  solution: "var MedianFinder = function() {\n    this.small = []; // max heap (inverted, largest at end)\n    this.large = []; // min heap (smallest at front)\n};\nMedianFinder.prototype.addNum = function(num) {\n    this.small.push(num);\n    this.small.sort(function(a,b){return a-b;});\n    if (this.small.length > 0 && this.large.length > 0 && this.small[this.small.length - 1] > this.large[0]) {\n        var val = this.small.pop();\n        this.large.push(val);\n        this.large.sort(function(a,b){return a-b;});\n    }\n    if (this.small.length > this.large.length + 1) {\n        var val = this.small.pop();\n        this.large.push(val);\n        this.large.sort(function(a,b){return a-b;});\n    }\n    if (this.large.length > this.small.length + 1) {\n        var val = this.large.shift();\n        this.small.push(val);\n        this.small.sort(function(a,b){return a-b;});\n    }\n};\nMedianFinder.prototype.findMedian = function() {\n    if (this.small.length > this.large.length) {\n        return this.small[this.small.length - 1];\n    }\n    if (this.large.length > this.small.length) {\n        return this.large[0];\n    }\n    return (this.small[this.small.length - 1] + this.large[0]) / 2.0;\n};",
  testCases: [
    { input: "add 1, add 2, findMedian", expected: "1.5", args: [1, 2], expectedValue: 1.5 },
    { input: "add 1, add 2, add 3, findMedian", expected: "2.0", args: [1, 2, 3], expectedValue: 2.0 },
    { input: "add 5, findMedian", expected: "5", args: [5], expectedValue: 5 }
  ],
  why: "Finding the median from a stream teaches how to balance two heaps to maintain order statistics in real time."
};

const p35: Problem = {
  id: "meeting-rooms-ii",
  patternId: "heap",
  name: "Meeting Rooms II",
  difficulty: "Medium",
  number: 253,
  description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
  examples: [
    { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
    { input: "intervals = [[7,10],[2,4]]", output: "1" }
  ],
  constraints: [
    "1 <= intervals.length <= 10^4",
    "0 <= starti < endi <= 10^6"
  ],
  starterCode: "/**\\n * @param {number[][]} intervals\\n * @return {number}\\n */\\nvar minMeetingRooms = function(intervals) {\\n    // Write your code here\\n    \\n};",
  solution: "function minMeetingRooms(intervals) {\n    if (!intervals.length) return 0;\n    var starts = intervals.map(function(x){ return x[0]; }).sort(function(a,b){return a-b;});\n    var ends = intervals.map(function(x){ return x[1]; }).sort(function(a,b){return a-b;});\n    var rooms = 0;\n    var endPtr = 0;\n    for (var i = 0; i < starts.length; i++) {\n        if (starts[i] >= ends[endPtr]) {\n            endPtr++;\n        } else {\n            rooms++;\n        }\n    }\n    return rooms;\n}",
  testCases: [
    { input: "[[0,30],[5,10],[15,20]]", expected: "2", args: [[[0, 30], [5, 10], [15, 20]]], expectedValue: 2 },
    { input: "[[7,10],[2,4]]", expected: "1", args: [[[7, 10], [2, 4]]], expectedValue: 1 },
    { input: "[[0,30],[5,10],[15,20],[25,35]]", expected: "2", args: [[[0, 30], [5, 10], [15, 20], [25, 35]]], expectedValue: 2 }
  ],
  why: "Meeting Rooms II uses a min-heap to track the earliest ending meeting and greedily allocate rooms."
};

export const batch3Problems: Problem[] = [
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16,
  p17,
  p18,
  p19,
  p20,
  p21,
  p22,
  p23,
  p24,
  p25,
  p26,
  p27,
  p28,
  p29,
  p30,
  p31,
  p32,
  p33,
  p34,
  p35
];
