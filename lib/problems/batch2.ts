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

export const batch2Problems: Problem[] = [
  {
    id: "valid-parentheses",
    patternId: "stack",
    name: "Valid Parentheses",
    difficulty: "Easy",
    number: 20,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      { input: `s = "()"`, output: "true" },
      { input: `s = "()[]{}"`, output: "true" },
      { input: `s = "(]"`, output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only."
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Write your code here
    
};`,
    solution: `var isValid = function(s) {
    var stack = [];
    var map = {')': '(', '}': '{', ']': '['};
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (map[c]) {
            if (stack.length === 0 || stack.pop() !== map[c]) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};`,
    testCases: [
      { input: `"()"`, expected: "true", args: ["()"], expectedValue: true },
      { input: `"()[]{}"`, expected: "true", args: ["()[]{}"], expectedValue: true },
      { input: `"(]"`, expected: "false", args: ["(]"], expectedValue: false }
    ],
    why: "A stack is necessary to match opening and closing brackets in the correct nested order."
  },
  {
    id: "daily-temperatures",
    patternId: "stack",
    name: "Daily Temperatures",
    difficulty: "Medium",
    number: 739,
    description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.`,
    examples: [
      { input: `temperatures = [73,74,75,71,69,72,76,73]`, output: "[1,1,4,2,1,1,0,0]" },
      { input: `temperatures = [30,40,50,60]`, output: "[1,1,1,0]" }
    ],
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    starterCode: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    // Write your code here
    
};`,
    solution: `var dailyTemperatures = function(temperatures) {
    var n = temperatures.length;
    var answer = new Array(n).fill(0);
    var stack = [];
    for (var i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            var prev = stack.pop();
            answer[prev] = i - prev;
        }
        stack.push(i);
    }
    return answer;
};`,
    testCases: [
      { input: `[73,74,75,71,69,72,76,73]`, expected: "[1,1,4,2,1,1,0,0]", args: [[73,74,75,71,69,72,76,73]], expectedValue: [1,1,4,2,1,1,0,0] },
      { input: `[30,40,50,60]`, expected: "[1,1,1,0]", args: [[30,40,50,60]], expectedValue: [1,1,1,0] },
      { input: `[30,60,90]`, expected: "[1,1,0]", args: [[30,60,90]], expectedValue: [1,1,0] }
    ],
    why: "A monotonic stack efficiently tracks indices waiting for a greater next element."
  },
  {
    id: "largest-rectangle-in-histogram",
    patternId: "stack",
    name: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    number: 84,
    description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
    examples: [
      { input: `heights = [2,1,5,6,2,3]`, output: "10" },
      { input: `heights = [2,4]`, output: "4" }
    ],
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    // Write your code here
    
};`,
    solution: `var largestRectangleArea = function(heights) {
    var stack = [];
    var maxArea = 0;
    var n = heights.length;
    for (var i = 0; i <= n; i++) {
        var h = (i === n) ? 0 : heights[i];
        while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
            var height = heights[stack.pop()];
            var width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};`,
    testCases: [
      { input: `[2,1,5,6,2,3]`, expected: "10", args: [[2,1,5,6,2,3]], expectedValue: 10 },
      { input: `[2,4]`, expected: "4", args: [[2,4]], expectedValue: 4 },
      { input: `[2,1,2]`, expected: "3", args: [[2,1,2]], expectedValue: 3 }
    ],
    why: "A stack is used to maintain increasing bar heights and calculate the maximum width for each popped height."
  },
  {
    id: "evaluate-reverse-polish-notation",
    patternId: "stack",
    name: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    number: 150,
    description: `Evaluate the value of an arithmetic expression in Reverse Polish Notation.`,
    examples: [
      { input: `tokens = ["2","1","+","3","*"]`, output: "9" },
      { input: `tokens = ["4","13","5","/","+"]`, output: "6" },
      { input: `tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]`, output: "22" }
    ],
    constraints: [
      "1 <= tokens.length <= 10^4",
      "tokens[i] is either an operator or an integer in the range [-200, 200]."
    ],
    starterCode: `/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    // Write your code here
    
};`,
    solution: `var evalRPN = function(tokens) {
    var stack = [];
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (token === "+" || token === "-" || token === "*" || token === "/") {
            var b = stack.pop();
            var a = stack.pop();
            if (token === "+") stack.push(a + b);
            else if (token === "-") stack.push(a - b);
            else if (token === "*") stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(token));
        }
    }
    return stack.pop();
};`,
    testCases: [
      { input: `["2","1","+","3","*"]`, expected: "9", args: [["2","1","+","3","*"]], expectedValue: 9 },
      { input: `["4","13","5","/","+"]`, expected: "6", args: [["4","13","5","/","+"]], expectedValue: 6 },
      { input: `["10","6","9","3","+","-11","*","/","*","17","+","5","+"]`, expected: "22", args: [["10","6","9","3","+","-11","*","/","*","17","+","5","+"]], expectedValue: 22 }
    ],
    why: "A stack naturally stores operands so that when an operator is encountered the last two values can be applied."
  },
  {
    id: "min-stack",
    patternId: "stack",
    name: "Min Stack",
    difficulty: "Medium",
    number: 155,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    examples: [
      { input: `["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]`, output: `[null,null,null,null,-3,null,0,-2]` }
    ],
    constraints: [
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."
    ],
    starterCode: `/**
 * MinStack
 */
var MinStack = function() {
    // Write your code here
    
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    // Write your code here
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // Write your code here
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    // Write your code here
    
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    // Write your code here
    
};`,
    solution: `var MinStack = function() {
    this.stack = [];
};

MinStack.prototype.push = function(val) {
    var min = this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1][1]);
    this.stack.push([val, min]);
};

MinStack.prototype.pop = function() {
    this.stack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1][0];
};

MinStack.prototype.getMin = function() {
    return this.stack[this.stack.length - 1][1];
};`,
    testCases: [
      { input: `push -2, push 0, push -3, getMin`, expected: "-3", args: [-2, 0, -3], expectedValue: -3 },
      { input: `push 0, push 1, push 0, getMin`, expected: "0", args: [0, 1, 0], expectedValue: 0 },
      { input: `push 5, getMin`, expected: "5", args: [5], expectedValue: 5 }
    ],
    why: "A stack is essential for tracking the current minimum alongside each value to enable O(1) retrieval."
  },
  {
    id: "next-greater-element-i",
    patternId: "stack",
    name: "Next Greater Element I",
    difficulty: "Easy",
    number: 496,
    description: `The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.`,
    examples: [
      { input: `nums1 = [4,1,2], nums2 = [1,3,4,2]`, output: "[-1,3,-1]" },
      { input: `nums1 = [2,4], nums2 = [1,2,3,4]`, output: "[3,-1]" }
    ],
    constraints: [
      "1 <= nums1.length <= nums2.length <= 1000",
      "0 <= nums1[i], nums2[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    // Write your code here
    
};`,
    solution: `var nextGreaterElement = function(nums1, nums2) {
    var map = {};
    var stack = [];
    for (var i = 0; i < nums2.length; i++) {
        while (stack.length > 0 && nums2[stack[stack.length - 1]] < nums2[i]) {
            var idx = stack.pop();
            map[nums2[idx]] = nums2[i];
        }
        stack.push(i);
    }
    var ans = [];
    for (var j = 0; j < nums1.length; j++) {
        ans.push(map[nums1[j]] !== undefined ? map[nums1[j]] : -1);
    }
    return ans;
};`,
    testCases: [
      { input: `nums1 = [4,1,2], nums2 = [1,3,4,2]`, expected: "[-1,3,-1]", args: [[4,1,2], [1,3,4,2]], expectedValue: [-1,3,-1] },
      { input: `nums1 = [2,4], nums2 = [1,2,3,4]`, expected: "[3,-1]", args: [[2,4], [1,2,3,4]], expectedValue: [3,-1] }
    ],
    why: "A stack efficiently finds the next greater element to the right for each number in a single pass."
  },
  {
    id: "next-greater-element-ii",
    patternId: "stack",
    name: "Next Greater Element II",
    difficulty: "Medium",
    number: 503,
    description: `Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.`,
    examples: [
      { input: `nums = [1,2,1]`, output: "[2,-1,2]" },
      { input: `nums = [1,2,3,4,3]`, output: "[2,3,4,-1,4]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    // Write your code here
    
};`,
    solution: `var nextGreaterElements = function(nums) {
    var n = nums.length;
    var res = new Array(n).fill(-1);
    var stack = [];
    for (var i = 0; i < 2 * n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i % n]) {
            res[stack.pop()] = nums[i % n];
        }
        if (i < n) stack.push(i);
    }
    return res;
};`,
    testCases: [
      { input: `[1,2,1]`, expected: "[2,-1,2]", args: [[1,2,1]], expectedValue: [2,-1,2] },
      { input: `[1,2,3,4,3]`, expected: "[2,3,4,-1,4]", args: [[1,2,3,4,3]], expectedValue: [2,3,4,-1,4] }
    ],
    why: "A monotonic stack handles the circular nature by traversing the array twice."
  },
  {
    id: "remove-k-digits",
    patternId: "stack",
    name: "Remove K Digits",
    difficulty: "Medium",
    number: 402,
    description: `Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.`,
    examples: [
      { input: `num = "1432219", k = 3`, output: `"1219"` },
      { input: `num = "10200", k = 1`, output: `"200"` },
      { input: `num = "10", k = 2`, output: `"0"` }
    ],
    constraints: [
      "1 <= k <= num.length <= 10^5",
      "num consists of only digits.",
      "num does not have any leading zeros except for the zero itself."
    ],
    starterCode: `/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    // Write your code here
    
};`,
    solution: `var removeKdigits = function(num, k) {
    var stack = [];
    for (var i = 0; i < num.length; i++) {
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > num[i]) {
            stack.pop();
            k--;
        }
        stack.push(num[i]);
    }
    while (k > 0) {
        stack.pop();
        k--;
    }
    var res = stack.join('').replace(/^0+/, '');
    return res === '' ? '0' : res;
};`,
    testCases: [
      { input: `num = "1432219", k = 3`, expected: "1219", args: ["1432219", 3], expectedValue: "1219" },
      { input: `num = "10200", k = 1`, expected: "200", args: ["10200", 1], expectedValue: "200" },
      { input: `num = "10", k = 2`, expected: "0", args: ["10", 2], expectedValue: "0" }
    ],
    why: "A stack greedily removes larger previous digits to form the smallest possible number."
  },
  {
    id: "simplify-path",
    patternId: "stack",
    name: "Simplify Path",
    difficulty: "Medium",
    number: 71,
    description: `Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.`,
    examples: [
      { input: `path = "/home/"`, output: `"/home"` },
      { input: `path = "/../"`, output: `"/"` },
      { input: `path = "/home//foo/"`, output: `"/home/foo"` }
    ],
    constraints: [
      "1 <= path.length <= 3000",
      "path consists of English letters, digits, period '.', slash '/' or '_'.",
      "path is a valid absolute Unix path."
    ],
    starterCode: `/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    // Write your code here
    
};`,
    solution: `var simplifyPath = function(path) {
    var parts = path.split('/');
    var stack = [];
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === '' || parts[i] === '.') continue;
        if (parts[i] === '..') {
            if (stack.length > 0) stack.pop();
        } else {
            stack.push(parts[i]);
        }
    }
    return '/' + stack.join('/');
};`,
    testCases: [
      { input: `"/home/"`, expected: "/home", args: ["/home/"], expectedValue: "/home" },
      { input: `"/../"`, expected: "/", args: ["/../"], expectedValue: "/" },
      { input: `"/home//foo/"`, expected: "/home/foo", args: ["/home//foo/"], expectedValue: "/home/foo" }
    ],
    why: "A stack naturally tracks the directory hierarchy and handles parent directory navigation."
  },
  {
    id: "basic-calculator-ii",
    patternId: "stack",
    name: "Basic Calculator II",
    difficulty: "Medium",
    number: 227,
    description: `Given a string s which represents an expression, evaluate this expression and return its value. The integer division should truncate toward zero. You may assume the given expression is always valid.`,
    examples: [
      { input: `s = "3+2*2"`, output: "7" },
      { input: `s = " 3/2 "`, output: "1" },
      { input: `s = " 3+5 / 2 "`, output: "5" }
    ],
    constraints: [
      "1 <= s.length <= 3 * 10^5",
      "s consists of integers and operators separated by some number of spaces.",
      "s represents a valid expression.",
      "All the integers in the expression are non-negative integers in the range [0, 2^31 - 1]."
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    // Write your code here
    
};`,
    solution: `var calculate = function(s) {
    var stack = [];
    var num = 0;
    var op = '+';
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        if (ch >= '0' && ch <= '9') {
            num = num * 10 + (ch.charCodeAt(0) - 48);
        }
        if ((ch === '+' || ch === '-' || ch === '*' || ch === '/') || i === s.length - 1) {
            if (op === '+') stack.push(num);
            else if (op === '-') stack.push(-num);
            else if (op === '*') stack.push(stack.pop() * num);
            else if (op === '/') stack.push(Math.trunc(stack.pop() / num));
            op = ch;
            num = 0;
        }
    }
    var res = 0;
    for (var j = 0; j < stack.length; j++) res += stack[j];
    return res;
};`,
    testCases: [
      { input: `"3+2*2"`, expected: "7", args: ["3+2*2"], expectedValue: 7 },
      { input: `" 3/2 "`, expected: "1", args: [" 3/2 "], expectedValue: 1 },
      { input: `" 3+5 / 2 "`, expected: "5", args: [" 3+5 / 2 "], expectedValue: 5 }
    ],
    why: "A stack handles operator precedence by deferring addition and resolving multiplication and division immediately."
  },
  {
    id: "asteroid-collision",
    patternId: "stack",
    name: "Asteroid Collision",
    difficulty: "Medium",
    number: 735,
    description: `We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed. Find out the state of the asteroids after all collisions.`,
    examples: [
      { input: `asteroids = [5,10,-5]`, output: "[5,10]" },
      { input: `asteroids = [8,-8]`, output: "[]" },
      { input: `asteroids = [10,2,-5]`, output: "[10]" }
    ],
    constraints: [
      "2 <= asteroids.length <= 10^4",
      "-1000 <= asteroids[i] <= 1000",
      "asteroids[i] != 0"
    ],
    starterCode: `/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    // Write your code here
    
};`,
    solution: `var asteroidCollision = function(asteroids) {
    var stack = [];
    for (var i = 0; i < asteroids.length; i++) {
        var a = asteroids[i];
        if (a > 0) {
            stack.push(a);
        } else {
            while (stack.length > 0 && stack[stack.length - 1] > 0 && stack[stack.length - 1] < -a) {
                stack.pop();
            }
            if (stack.length === 0 || stack[stack.length - 1] < 0) {
                stack.push(a);
            } else if (stack[stack.length - 1] === -a) {
                stack.pop();
            }
        }
    }
    return stack;
};`,
    testCases: [
      { input: `[5,10,-5]`, expected: "[5,10]", args: [[5,10,-5]], expectedValue: [5,10] },
      { input: `[8,-8]`, expected: "[]", args: [[8,-8]], expectedValue: [] },
      { input: `[10,2,-5]`, expected: "[10]", args: [[10,2,-5]], expectedValue: [10] }
    ],
    why: "A stack simulates collisions by only keeping asteroids that survive from the left."
  },
  {
    id: "decode-string",
    patternId: "stack",
    name: "Decode String",
    difficulty: "Medium",
    number: 394,
    description: `Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.`,
    examples: [
      { input: `s = "3[a]2[bc]"`, output: `"aaabcbc"` },
      { input: `s = "3[a2[c]]"`, output: `"accaccacc"` },
      { input: `s = "2[abc]3[cd]ef"`, output: `"abcabccdcdcdef"` }
    ],
    constraints: [
      "1 <= s.length <= 30",
      "s consists of lowercase English letters, digits, and square brackets '[]'.",
      "s is guaranteed to be a valid input.",
      "All the integers in s are in the range [1, 300]."
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    // Write your code here
    
};`,
    solution: `var decodeString = function(s) {
    var stack = [];
    var currentNum = 0;
    var currentString = '';
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c >= '0' && c <= '9') {
            currentNum = currentNum * 10 + parseInt(c);
        } else if (c === '[') {
            stack.push(currentString);
            stack.push(currentNum);
            currentString = '';
            currentNum = 0;
        } else if (c === ']') {
            var num = stack.pop();
            var prevString = stack.pop();
            currentString = prevString + currentString.repeat(num);
        } else {
            currentString += c;
        }
    }
    return currentString;
};`,
    testCases: [
      { input: `"3[a]2[bc]"`, expected: "aaabcbc", args: ["3[a]2[bc]"], expectedValue: "aaabcbc" },
      { input: `"3[a2[c]]"`, expected: "accaccacc", args: ["3[a2[c]]"], expectedValue: "accaccacc" },
      { input: `"2[abc]3[cd]ef"`, expected: "abcabccdcdcdef", args: ["2[abc]3[cd]ef"], expectedValue: "abcabccdcdcdef" }
    ],
    why: "A stack stores the prior string and repeat count so nested brackets can be resolved inside-out."
  },
  {
    id: "binary-search",
    patternId: "binarysearch",
    name: "Binary Search",
    difficulty: "Easy",
    number: 704,
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`,
    examples: [
      { input: `nums = [-1,0,3,5,9,12], target = 9`, output: "4" },
      { input: `nums = [-1,0,3,5,9,12], target = 2`, output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Write your code here
    
};`,
    solution: `var search = function(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};`,
    testCases: [
      { input: `[-1,0,3,5,9,12], target = 9`, expected: "4", args: [[-1,0,3,5,9,12], 9], expectedValue: 4 },
      { input: `[-1,0,3,5,9,12], target = 2`, expected: "-1", args: [[-1,0,3,5,9,12], 2], expectedValue: -1 }
    ],
    why: "Binary search halves the search space each step, achieving O(log n) on sorted data."
  },
  {
    id: "search-in-rotated-sorted-array",
    patternId: "binarysearch",
    name: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    number: 33,
    description: `There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. If target is found in the array return its index, otherwise return -1.`,
    examples: [
      { input: `nums = [4,5,6,7,0,1,2], target = 0`, output: "4" },
      { input: `nums = [4,5,6,7,0,1,2], target = 3`, output: "-1" },
      { input: `nums = [1], target = 0`, output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated."
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Write your code here
    
};`,
    solution: `var search = function(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};`,
    testCases: [
      { input: `[4,5,6,7,0,1,2], target = 0`, expected: "4", args: [[4,5,6,7,0,1,2], 0], expectedValue: 4 },
      { input: `[4,5,6,7,0,1,2], target = 3`, expected: "-1", args: [[4,5,6,7,0,1,2], 3], expectedValue: -1 },
      { input: `[1], target = 0`, expected: "-1", args: [[1], 0], expectedValue: -1 }
    ],
    why: "Binary search adapts to the rotated sorted array by determining which half is properly sorted."
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    patternId: "binarysearch",
    name: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    number: 153,
    description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.`,
    examples: [
      { input: `nums = [3,4,5,1,2]`, output: "1" },
      { input: `nums = [4,5,6,7,0,1,2]`, output: "0" },
      { input: `nums = [11,13,15,17]`, output: "11" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique."
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    // Write your code here
    
};`,
    solution: `var findMin = function(nums) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};`,
    testCases: [
      { input: `[3,4,5,1,2]`, expected: "1", args: [[3,4,5,1,2]], expectedValue: 1 },
      { input: `[4,5,6,7,0,1,2]`, expected: "0", args: [[4,5,6,7,0,1,2]], expectedValue: 0 },
      { input: `[11,13,15,17]`, expected: "11", args: [[11,13,15,17]], expectedValue: 11 }
    ],
    why: "Binary search locates the inflection point where the rotation occurred by comparing mid to right."
  },
  {
    id: "search-a-2d-matrix",
    patternId: "binarysearch",
    name: "Search a 2D Matrix",
    difficulty: "Medium",
    number: 74,
    description: `Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.`,
    examples: [
      { input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3`, output: "true" },
      { input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13`, output: "false" }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    starterCode: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // Write your code here
    
};`,
    solution: `var searchMatrix = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) return false;
    var m = matrix.length;
    var n = matrix[0].length;
    var left = 0;
    var right = m * n - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        var row = Math.floor(mid / n);
        var col = mid % n;
        if (matrix[row][col] === target) return true;
        if (matrix[row][col] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
};`,
    testCases: [
      { input: `[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3`, expected: "true", args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], expectedValue: true },
      { input: `[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13`, expected: "false", args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13], expectedValue: false }
    ],
    why: "Binary search treats the 2D sorted matrix as a single flattened sorted array."
  },
  {
    id: "find-peak-element",
    patternId: "binarysearch",
    name: "Find Peak Element",
    difficulty: "Medium",
    number: 162,
    description: `A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.`,
    examples: [
      { input: `nums = [1,2,3,1]`, output: "2" },
      { input: `nums = [1,2,1,3,5,6,4]`, output: "5" }
    ],
    constraints: [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i."
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    // Write your code here
    
};`,
    solution: `var findPeakElement = function(nums) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};`,
    testCases: [
      { input: `[1,2,3,1]`, expected: "2", args: [[1,2,3,1]], expectedValue: 2 },
      { input: `[1,2,1,3,5,6,4]`, expected: "5", args: [[1,2,1,3,5,6,4]], expectedValue: 5 }
    ],
    why: "Binary search climbs toward a peak by comparing mid to its right neighbor."
  },
  {
    id: "search-insert-position",
    patternId: "binarysearch",
    name: "Search Insert Position",
    difficulty: "Easy",
    number: 35,
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.`,
    examples: [
      { input: `nums = [1,3,5,6], target = 5`, output: "2" },
      { input: `nums = [1,3,5,6], target = 2`, output: "1" },
      { input: `nums = [1,3,5,6], target = 7`, output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order.",
      "-10^4 <= target <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    // Write your code here
    
};`,
    solution: `var searchInsert = function(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
};`,
    testCases: [
      { input: `[1,3,5,6], target = 5`, expected: "2", args: [[1,3,5,6], 5], expectedValue: 2 },
      { input: `[1,3,5,6], target = 2`, expected: "1", args: [[1,3,5,6], 2], expectedValue: 1 },
      { input: `[1,3,5,6], target = 7`, expected: "4", args: [[1,3,5,6], 7], expectedValue: 4 }
    ],
    why: "Binary search finds the exact position or the insertion point in O(log n) time."
  },
  {
    id: "first-bad-version",
    patternId: "binarysearch",
    name: "First Bad Version",
    difficulty: "Easy",
    number: 278,
    description: `You are a product manager and currently leading a team to develop a new product. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one.`,
    examples: [
      { input: `n = 5, bad = 4`, output: "4" },
      { input: `n = 1, bad = 1`, output: "1" }
    ],
    constraints: [
      "1 <= bad <= n <= 2^31 - 1"
    ],
    starterCode: `/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        // Write your code here
        
    };
};`,
    solution: `var solution = function(isBadVersion) {
    return function(n) {
        var left = 1;
        var right = n;
        while (left < right) {
            var mid = left + Math.floor((right - left) / 2);
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    };
};`,
    testCases: [
      { input: `n = 5, bad = 4`, expected: "4", args: [function(v) { return v >= 4; }, 5], expectedValue: 4 },
      { input: `n = 1, bad = 1`, expected: "1", args: [function(v) { return v >= 1; }, 1], expectedValue: 1 }
    ],
    why: "Binary search isolates the boundary between good and bad versions efficiently."
  },
  {
    id: "koko-eating-bananas",
    patternId: "binarysearch",
    name: "Koko Eating Bananas",
    difficulty: "Medium",
    number: 875,
    description: `Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. Return the minimum integer k such that she can eat all the bananas within h hours.`,
    examples: [
      { input: `piles = [3,6,7,11], h = 8`, output: "4" },
      { input: `piles = [30,11,23,4,20], h = 5`, output: "30" },
      { input: `piles = [30,11,23,4,20], h = 6`, output: "23" }
    ],
    constraints: [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    // Write your code here
    
};`,
    solution: `var minEatingSpeed = function(piles, h) {
    var max = 0;
    for (var i = 0; i < piles.length; i++) {
        if (piles[i] > max) max = piles[i];
    }
    var left = 1;
    var right = max;
    var ans = max;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        var hours = 0;
        for (var j = 0; j < piles.length; j++) {
            hours += Math.ceil(piles[j] / mid);
        }
        if (hours <= h) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};`,
    testCases: [
      { input: `[3,6,7,11], h = 8`, expected: "4", args: [[3,6,7,11], 8], expectedValue: 4 },
      { input: `[30,11,23,4,20], h = 5`, expected: "30", args: [[30,11,23,4,20], 5], expectedValue: 30 },
      { input: `[30,11,23,4,20], h = 6`, expected: "23", args: [[30,11,23,4,20], 6], expectedValue: 23 }
    ],
    why: "Binary search on the eating speed turns the feasibility check into a predicate for optimization."
  },
  {
    id: "capacity-to-ship-packages",
    patternId: "binarysearch",
    name: "Capacity To Ship Packages Within D Days",
    difficulty: "Medium",
    number: 1011,
    description: `A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.`,
    examples: [
      { input: `weights = [1,2,3,4,5,6,7,8,9,10], days = 5`, output: "15" },
      { input: `weights = [3,2,2,4,1,4], days = 3`, output: "6" },
      { input: `weights = [1,2,3,1,1], days = 4`, output: "3" }
    ],
    constraints: [
      "1 <= days <= weights.length <= 5 * 10^4",
      "1 <= weights[i] <= 500"
    ],
    starterCode: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
    // Write your code here
    
};`,
    solution: `var shipWithinDays = function(weights, days) {
    var left = 0;
    var right = 0;
    for (var i = 0; i < weights.length; i++) {
        left = Math.max(left, weights[i]);
        right += weights[i];
    }
    var ans = right;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        var need = 1;
        var cur = 0;
        for (var j = 0; j < weights.length; j++) {
            if (cur + weights[j] > mid) {
                need++;
                cur = 0;
            }
            cur += weights[j];
        }
        if (need <= days) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};`,
    testCases: [
      { input: `[1,2,3,4,5,6,7,8,9,10], days = 5`, expected: "15", args: [[1,2,3,4,5,6,7,8,9,10], 5], expectedValue: 15 },
      { input: `[3,2,2,4,1,4], days = 3`, expected: "6", args: [[3,2,2,4,1,4], 3], expectedValue: 6 },
      { input: `[1,2,3,1,1], days = 4`, expected: "3", args: [[1,2,3,1,1], 4], expectedValue: 3 }
    ],
    why: "Binary search on capacity finds the minimum feasible limit where the required days fit the constraint."
  },
  {
    id: "find-minimum-in-rotated-sorted-array-ii",
    patternId: "binarysearch",
    name: "Find Minimum in Rotated Sorted Array II",
    difficulty: "Hard",
    number: 154,
    description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. The array may contain duplicates. Find the minimum element.`,
    examples: [
      { input: `nums = [1,3,5]`, output: "1" },
      { input: `nums = [2,2,2,0,1]`, output: "0" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    // Write your code here
    
};`,
    solution: `var findMin = function(nums) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            right--;
        }
    }
    return nums[left];
};`,
    testCases: [
      { input: `[1,3,5]`, expected: "1", args: [[1,3,5]], expectedValue: 1 },
      { input: `[2,2,2,0,1]`, expected: "0", args: [[2,2,2,0,1]], expectedValue: 0 },
      { input: `[3,1,3]`, expected: "1", args: [[3,1,3]], expectedValue: 1 }
    ],
    why: "Binary search handles duplicates by shrinking the search space when mid equals right."
  },
  {
    id: "median-of-two-sorted-arrays",
    patternId: "binarysearch",
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    number: 4,
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).`,
    examples: [
      { input: `nums1 = [1,3], nums2 = [2]`, output: "2.00000" },
      { input: `nums1 = [1,2], nums2 = [3,4]`, output: "2.50000" }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 100",
      "0 <= n <= 100",
      "1 <= m + n <= 200"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Write your code here
    
};`,
    solution: `var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        var tmp = nums1;
        nums1 = nums2;
        nums2 = tmp;
    }
    var m = nums1.length;
    var n = nums2.length;
    var left = 0;
    var right = m;
    var halfLen = Math.floor((m + n + 1) / 2);
    while (left <= right) {
        var i = left + Math.floor((right - left) / 2);
        var j = halfLen - i;
        if (i < right && nums2[j - 1] > nums1[i]) {
            left = i + 1;
        } else if (i > left && nums1[i - 1] > nums2[j]) {
            right = i - 1;
        } else {
            var maxLeft = 0;
            if (i === 0) maxLeft = nums2[j - 1];
            else if (j === 0) maxLeft = nums1[i - 1];
            else maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            if ((m + n) % 2 === 1) return maxLeft;
            var minRight = 0;
            if (i === m) minRight = nums2[j];
            else if (j === n) minRight = nums1[i];
            else minRight = Math.min(nums1[i], nums2[j]);
            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0.0;
};`,
    testCases: [
      { input: `[1,3], [2]`, expected: "2.00000", args: [[1,3], [2]], expectedValue: 2.0 },
      { input: `[1,2], [3,4]`, expected: "2.50000", args: [[1,2], [3,4]], expectedValue: 2.5 },
      { input: `[], [1]`, expected: "1.00000", args: [[], [1]], expectedValue: 1.0 }
    ],
    why: "Binary search partitions the smaller array to find the median without merging."
  },
  {
    id: "search-a-2d-matrix-ii",
    patternId: "binarysearch",
    name: "Search a 2D Matrix II",
    difficulty: "Medium",
    number: 240,
    description: `Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. Integers in each row and column are sorted in ascending order.`,
    examples: [
      { input: `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5`, output: "true" },
      { input: `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20`, output: "false" }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= n, m <= 300",
      "-10^9 <= matrix[i][j] <= 10^9",
      "All the integers in each row are sorted in ascending order.",
      "All the integers in each column are sorted in ascending order."
    ],
    starterCode: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // Write your code here
    
};`,
    solution: `var searchMatrix = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) return false;
    for (var i = 0; i < matrix.length; i++) {
        var left = 0;
        var right = matrix[i].length - 1;
        while (left <= right) {
            var mid = left + Math.floor((right - left) / 2);
            if (matrix[i][mid] === target) return true;
            if (matrix[i][mid] < target) left = mid + 1;
            else right = mid - 1;
        }
    }
    return false;
};`,
    testCases: [
      { input: `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5`, expected: "true", args: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5], expectedValue: true },
      { input: `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20`, expected: "false", args: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20], expectedValue: false }
    ],
    why: "Binary search on each row leverages the row-wise sorting to locate the target."
  },
  {
    id: "split-array-largest-sum",
    patternId: "binarysearch",
    name: "Split Array Largest Sum",
    difficulty: "Hard",
    number: 410,
    description: `Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays. Write an algorithm to minimize the largest sum among these m subarrays.`,
    examples: [
      { input: `nums = [7,2,5,10,8], m = 2`, output: "18" },
      { input: `nums = [1,2,3,4,5], m = 2`, output: "9" },
      { input: `nums = [1,4,4], m = 3`, output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 1000",
      "0 <= nums[i] <= 10^6",
      "1 <= m <= min(50, nums.length)"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    // Write your code here
    
};`,
    solution: `var splitArray = function(nums, m) {
    var left = 0;
    var right = 0;
    for (var i = 0; i < nums.length; i++) {
        left = Math.max(left, nums[i]);
        right += nums[i];
    }
    var ans = right;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        var sum = 0;
        var pieces = 1;
        for (var j = 0; j < nums.length; j++) {
            if (sum + nums[j] > mid) {
                pieces++;
                sum = nums[j];
            } else {
                sum += nums[j];
            }
        }
        if (pieces <= m) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};`,
    testCases: [
      { input: `[7,2,5,10,8], m = 2`, expected: "18", args: [[7,2,5,10,8], 2], expectedValue: 18 },
      { input: `[1,2,3,4,5], m = 2`, expected: "9", args: [[1,2,3,4,5], 2], expectedValue: 9 },
      { input: `[1,4,4], m = 3`, expected: "4", args: [[1,4,4], 3], expectedValue: 4 }
    ],
    why: "Binary search on the largest subarray sum finds the minimum feasible maximum by checking partition counts."
  },
  {
    id: "find-k-closest-elements",
    patternId: "binarysearch",
    name: "Find K Closest Elements",
    difficulty: "Medium",
    number: 658,
    description: `Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.`,
    examples: [
      { input: `arr = [1,2,3,4,5], k = 4, x = 3`, output: "[1,2,3,4]" },
      { input: `arr = [1,2,3,4,5], k = 4, x = -1`, output: "[1,2,3,4]" }
    ],
    constraints: [
      "1 <= k <= arr.length",
      "1 <= arr.length <= 10^4",
      "arr is sorted in ascending order.",
      "-10^4 <= arr[i], x <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
    // Write your code here
    
};`,
    solution: `var findClosestElements = function(arr, k, x) {
    var left = 0;
    var right = arr.length - k;
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return arr.slice(left, left + k);
};`,
    testCases: [
      { input: `[1,2,3,4,5], k = 4, x = 3`, expected: "[1,2,3,4]", args: [[1,2,3,4,5], 4, 3], expectedValue: [1,2,3,4] },
      { input: `[1,2,3,4,5], k = 4, x = -1`, expected: "[1,2,3,4]", args: [[1,2,3,4,5], 4, -1], expectedValue: [1,2,3,4] },
      { input: `[1,1,1,10,10,10], k = 1, x = 9`, expected: "[10]", args: [[1,1,1,10,10,10], 1, 9], expectedValue: [10] }
    ],
    why: "Binary search locates the left bound of the k-length window with the smallest distance to x."
  },
  {
    id: "longest-increasing-subsequence",
    patternId: "binarysearch",
    name: "Longest Increasing Subsequence",
    difficulty: "Medium",
    number: 300,
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: `nums = [10,9,2,5,3,7,101,18]`, output: "4" },
      { input: `nums = [0,1,0,3,2,3]`, output: "4" },
      { input: `nums = [7,7,7,7,7,7,7]`, output: "1" }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // Write your code here
    
};`,
    solution: `var lengthOfLIS = function(nums) {
    var tails = [];
    for (var i = 0; i < nums.length; i++) {
        var left = 0;
        var right = tails.length;
        while (left < right) {
            var mid = left + Math.floor((right - left) / 2);
            if (tails[mid] < nums[i]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        tails[left] = nums[i];
    }
    return tails.length;
};`,
    testCases: [
      { input: `[10,9,2,5,3,7,101,18]`, expected: "4", args: [[10,9,2,5,3,7,101,18]], expectedValue: 4 },
      { input: `[0,1,0,3,2,3]`, expected: "4", args: [[0,1,0,3,2,3]], expectedValue: 4 },
      { input: `[7,7,7,7,7,7,7]`, expected: "1", args: [[7,7,7,7,7,7,7]], expectedValue: 1 }
    ],
    why: "Binary search on a patience sorting tails array builds the longest increasing subsequence in O(n log n)."
  },
  {
    id: "reverse-linked-list",
    patternId: "linkedlist",
    name: "Reverse Linked List",
    difficulty: "Easy",
    number: 206,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: `head = [1,2,3,4,5]`, output: "[5,4,3,2,1]" },
      { input: `head = [1,2]`, output: "[2,1]" },
      { input: `head = []`, output: "[]" }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var reverseList = function(head) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        var r = reverseList(t);
        return listToArray(r);
    }
    var prev = null;
    var curr = head;
    while (curr) {
        var next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};`,
    testCases: [
      { input: `[1,2,3,4,5]`, expected: "[5,4,3,2,1]", args: [[1,2,3,4,5]], expectedValue: [5,4,3,2,1] },
      { input: `[1,2]`, expected: "[2,1]", args: [[1,2]], expectedValue: [2,1] },
      { input: `[]`, expected: "[]", args: [[]], expectedValue: [] }
    ],
    why: "Reversing a linked list is the fundamental exercise for pointer manipulation and iterative traversal."
  },
  {
    id: "merge-two-sorted-lists",
    patternId: "linkedlist",
    name: "Merge Two Sorted Lists",
    difficulty: "Easy",
    number: 21,
    description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.`,
    examples: [
      { input: `list1 = [1,2,4], list2 = [1,3,4]`, output: "[1,1,2,3,4,4]" },
      { input: `list1 = [], list2 = []`, output: "[]" },
      { input: `list1 = [], list2 = [0]`, output: "[0]" }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    starterCode: `/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var mergeTwoLists = function(list1, list2) {
    if (Array.isArray(list1)) {
        var a = buildList(list1);
        var b = buildList(list2);
        var r = mergeTwoLists(a, b);
        return listToArray(r);
    }
    var dummy = new ListNode(0);
    var cur = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 || list2;
    return dummy.next;
};`,
    testCases: [
      { input: `[1,2,4], [1,3,4]`, expected: "[1,1,2,3,4,4]", args: [[1,2,4], [1,3,4]], expectedValue: [1,1,2,3,4,4] },
      { input: `[], []`, expected: "[]", args: [[], []], expectedValue: [] },
      { input: `[], [0]`, expected: "[0]", args: [[], [0]], expectedValue: [0] }
    ],
    why: "Merging two sorted lists teaches how to splice nodes together while maintaining order."
  },
  {
    id: "linked-list-cycle",
    patternId: "linkedlist",
    name: "Linked List Cycle",
    difficulty: "Easy",
    number: 141,
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.`,
    examples: [
      { input: `head = [3,2,0,-4], pos = 1`, output: "true" },
      { input: `head = [1,2], pos = 0`, output: "true" },
      { input: `head = [1], pos = -1`, output: "false" }
    ],
    constraints: [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
      "pos is -1 or a valid index in the linked-list."
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val) {
    this.val = val;
    this.next = null;
}
function buildCyclicList(values, pos) {
    if (!values || values.length === 0) return null;
    var head = new ListNode(values[0]);
    var cur = head;
    var nodes = [head];
    for (var i = 1; i < values.length; i++) {
        cur.next = new ListNode(values[i]);
        cur = cur.next;
        nodes.push(cur);
    }
    if (pos >= 0 && pos < nodes.length) {
        cur.next = nodes[pos];
    }
    return head;
}
var hasCycle = function(head) {
    if (Array.isArray(head)) {
        var values = head[0];
        var pos = head[1];
        var t = buildCyclicList(values, pos);
        return hasCycle(t);
    }
    var slow = head;
    var fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
};`,
    testCases: [
      { input: `[3,2,0,-4], pos = 1`, expected: "true", args: [[[3,2,0,-4], 1]], expectedValue: true },
      { input: `[1,2], pos = 0`, expected: "true", args: [[[1,2], 0]], expectedValue: true },
      { input: `[1], pos = -1`, expected: "false", args: [[[1], -1]], expectedValue: false }
    ],
    why: "A fast and slow pointer detects a cycle without extra space by meeting inside the loop."
  },
  {
    id: "linked-list-cycle-ii",
    patternId: "linkedlist",
    name: "Linked List Cycle II",
    difficulty: "Medium",
    number: 142,
    description: `Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.`,
    examples: [
      { input: `head = [3,2,0,-4], pos = 1`, output: "tail connects to node index 1" },
      { input: `head = [1,2], pos = 0`, output: "tail connects to node index 0" },
      { input: `head = [1], pos = -1`, output: "no cycle" }
    ],
    constraints: [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val) {
    this.val = val;
    this.next = null;
}
function buildCyclicList(values, pos) {
    if (!values || values.length === 0) return null;
    var head = new ListNode(values[0]);
    var cur = head;
    var nodes = [head];
    for (var i = 1; i < values.length; i++) {
        cur.next = new ListNode(values[i]);
        cur = cur.next;
        nodes.push(cur);
    }
    if (pos >= 0 && pos < nodes.length) {
        cur.next = nodes[pos];
    }
    return head;
}
var detectCycle = function(head) {
    if (Array.isArray(head)) {
        var values = head[0];
        var pos = head[1];
        var t = buildCyclicList(values, pos);
        var res = detectCycle(t);
        return res ? res.val : null;
    }
    var slow = head;
    var fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            var start = head;
            while (start !== slow) {
                start = start.next;
                slow = slow.next;
            }
            return start;
        }
    }
    return null;
};`,
    testCases: [
      { input: `[3,2,0,-4], pos = 1`, expected: "1", args: [[[3,2,0,-4], 1]], expectedValue: 1 },
      { input: `[1,2], pos = 0`, expected: "1", args: [[[1,2], 0]], expectedValue: 1 },
      { input: `[1], pos = -1`, expected: "null", args: [[[1], -1]], expectedValue: null }
    ],
    why: "Floyd's cycle detection finds the cycle start by moving one pointer from head and one from the meeting point."
  },
  {
    id: "remove-nth-node-from-end-of-list",
    patternId: "linkedlist",
    name: "Remove Nth Node From End of List",
    difficulty: "Medium",
    number: 19,
    description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.`,
    examples: [
      { input: `head = [1,2,3,4,5], n = 2`, output: "[1,2,3,5]" },
      { input: `head = [1], n = 1`, output: "[]" },
      { input: `head = [1,2], n = 1`, output: "[1]" }
    ],
    constraints: [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var removeNthFromEnd = function(head, n) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        var r = removeNthFromEnd(t, n);
        return listToArray(r);
    }
    var dummy = new ListNode(0, head);
    var fast = dummy;
    var slow = dummy;
    for (var i = 0; i < n; i++) {
        fast = fast.next;
    }
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};`,
    testCases: [
      { input: `[1,2,3,4,5], n = 2`, expected: "[1,2,3,5]", args: [[1,2,3,4,5], 2], expectedValue: [1,2,3,5] },
      { input: `[1], n = 1`, expected: "[]", args: [[1], 1], expectedValue: [] },
      { input: `[1,2], n = 1`, expected: "[1]", args: [[1,2], 1], expectedValue: [1] }
    ],
    why: "A two-pass or fast-slow pointer approach locates the nth node from the end in one traversal."
  },
  {
    id: "add-two-numbers",
    patternId: "linkedlist",
    name: "Add Two Numbers",
    difficulty: "Medium",
    number: 2,
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
    examples: [
      { input: `l1 = [2,4,3], l2 = [5,6,4]`, output: "[7,0,8]" },
      { input: `l1 = [0], l2 = [0]`, output: "[0]" },
      { input: `l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]`, output: "[8,9,9,9,0,0,0,1]" }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    starterCode: `/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var addTwoNumbers = function(l1, l2) {
    if (Array.isArray(l1)) {
        var a = buildList(l1);
        var b = buildList(l2);
        var r = addTwoNumbers(a, b);
        return listToArray(r);
    }
    var dummy = new ListNode(0);
    var cur = dummy;
    var carry = 0;
    while (l1 || l2 || carry) {
        var sum = carry;
        if (l1) { sum += l1.val; l1 = l1.next; }
        if (l2) { sum += l2.val; l2 = l2.next; }
        cur.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        cur = cur.next;
    }
    return dummy.next;
};`,
    testCases: [
      { input: `[2,4,3], [5,6,4]`, expected: "[7,0,8]", args: [[2,4,3], [5,6,4]], expectedValue: [7,0,8] },
      { input: `[0], [0]`, expected: "[0]", args: [[0], [0]], expectedValue: [0] },
      { input: `[9,9,9,9,9,9,9], [9,9,9,9]`, expected: "[8,9,9,9,0,0,0,1]", args: [[9,9,9,9,9,9,9], [9,9,9,9]], expectedValue: [8,9,9,9,0,0,0,1] }
    ],
    why: "Adding digits node-by-node with a carry mimics elementary addition using linked list traversal."
  },
  {
    id: "merge-k-sorted-lists",
    patternId: "linkedlist",
    name: "Merge k Sorted Lists",
    difficulty: "Hard",
    number: 23,
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked list and return it.`,
    examples: [
      { input: `lists = [[1,4,5],[1,3,4],[2,6]]`, output: "[1,1,2,3,4,4,5,6]" },
      { input: `lists = []`, output: "[]" },
      { input: `lists = [[]]`, output: "[]" }
    ],
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 10^4."
    ],
    starterCode: `/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var mergeKLists = function(lists) {
    if (Array.isArray(lists) && lists.length > 0 && Array.isArray(lists[0])) {
        var ll = lists.map(function(arr){ return buildList(arr); });
        var res = mergeKLists(ll);
        return listToArray(res);
    }
    var arr = [];
    for (var i = 0; i < lists.length; i++) {
        var node = lists[i];
        while (node) {
            arr.push(node.val);
            node = node.next;
        }
    }
    arr.sort(function(a,b){return a-b;});
    return buildList(arr);
};`,
    testCases: [
      { input: `[[1,4,5],[1,3,4],[2,6]]`, expected: "[1,1,2,3,4,4,5,6]", args: [[[1,4,5],[1,3,4],[2,6]]], expectedValue: [1,1,2,3,4,4,5,6] },
      { input: `[]`, expected: "[]", args: [[]], expectedValue: [] },
      { input: `[[]]`, expected: "[]", args: [[[]]], expectedValue: [] }
    ],
    why: "Merging k sorted lists is the classic problem for understanding how to combine multiple ordered sequences."
  },
  {
    id: "copy-list-with-random-pointer",
    patternId: "linkedlist",
    name: "Copy List with Random Pointer",
    difficulty: "Medium",
    number: 138,
    description: `A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node.`,
    examples: [
      { input: `[[7,null],[13,0],[11,4],[10,2],[1,0]]`, output: `[[7,null],[13,0],[11,4],[10,2],[1,0]]` },
      { input: `[[1,1],[2,1]]`, output: `[[1,1],[2,1]]` },
      { input: `[[3,null],[3,0],[3,null]]`, output: `[[3,null],[3,0],[3,null]]` }
    ],
    constraints: [
      "0 <= n <= 1000",
      "-10^4 <= Node.val <= 10^4",
      "Node.random is null or is pointing to some node in the linked list."
    ],
    starterCode: `/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    // Write your code here
    
};`,
    solution: `function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}
function buildRandomList(arr) {
    if (!arr || arr.length === 0) return null;
    var nodes = [];
    for (var i = 0; i < arr.length; i++) {
        nodes.push(new Node(arr[i][0], null, null));
    }
    for (var i = 0; i < arr.length; i++) {
        if (i + 1 < arr.length) nodes[i].next = nodes[i + 1];
        if (arr[i][1] !== null) nodes[i].random = nodes[arr[i][1]];
    }
    return nodes[0];
}
function randomListToArray(head) {
    if (!head) return [];
    var nodes = [];
    var cur = head;
    while (cur) {
        nodes.push(cur);
        cur = cur.next;
    }
    var map = {};
    for (var i = 0; i < nodes.length; i++) map[nodes[i]] = i;
    var res = [];
    for (var i = 0; i < nodes.length; i++) {
        var r = nodes[i].random;
        res.push([nodes[i].val, r !== null && r !== undefined ? map[r] : null]);
    }
    return res;
}
var copyRandomList = function(head) {
    if (Array.isArray(head)) {
        var t = buildRandomList(head);
        var r = copyRandomList(t);
        return randomListToArray(r);
    }
    if (!head) return null;
    var map = new Map();
    var cur = head;
    while (cur) {
        map.set(cur, new Node(cur.val, null, null));
        cur = cur.next;
    }
    cur = head;
    while (cur) {
        if (cur.next) map.get(cur).next = map.get(cur.next);
        if (cur.random) map.get(cur).random = map.get(cur.random);
        cur = cur.next;
    }
    return map.get(head);
};`,
    testCases: [
      { input: `[[7,null],[13,0],[11,4],[10,2],[1,0]]`, expected: `[[7,null],[13,0],[11,4],[10,2],[1,0]]`, args: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expectedValue: [[7,null],[13,0],[11,4],[10,2],[1,0]] },
      { input: `[[1,1],[2,1]]`, expected: `[[1,1],[2,1]]`, args: [[[1,1],[2,1]]], expectedValue: [[1,1],[2,1]] },
      { input: `[[3,null],[3,0],[3,null]]`, expected: `[[3,null],[3,0],[3,null]]`, args: [[[3,null],[3,0],[3,null]]], expectedValue: [[3,null],[3,0],[3,null]] }
    ],
    why: "A hash map lets us clone nodes in a first pass and wire random pointers in a second pass."
  },
  {
    id: "reorder-list",
    patternId: "linkedlist",
    name: "Reorder List",
    difficulty: "Medium",
    number: 143,
    description: `You are given the head of a singly linked-list. The list can be represented as: L0 -> L1 -> ... -> Ln - 1 -> Ln. Reorder the list to be on the following form: L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ... You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      { input: `head = [1,2,3,4]`, output: "[1,4,2,3]" },
      { input: `head = [1,2,3,4,5]`, output: "[1,5,2,4,3]" }
    ],
    constraints: [
      "The number of nodes in the list is in the range [1, 5 * 10^4].",
      "1 <= Node.val <= 1000"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var reorderList = function(head) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        reorderList(t);
        return listToArray(t);
    }
    if (!head || !head.next) return;
    var slow = head;
    var fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    var prev = null;
    var cur = slow.next;
    slow.next = null;
    while (cur) {
        var next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    var p1 = head;
    var p2 = prev;
    while (p2) {
        var n1 = p1.next;
        var n2 = p2.next;
        p1.next = p2;
        p2.next = n1;
        p1 = n1;
        p2 = n2;
    }
};`,
    testCases: [
      { input: `[1,2,3,4]`, expected: "[1,4,2,3]", args: [[1,2,3,4]], expectedValue: [1,4,2,3] },
      { input: `[1,2,3,4,5]`, expected: "[1,5,2,4,3]", args: [[1,2,3,4,5]], expectedValue: [1,5,2,4,3] }
    ],
    why: "Reordering requires finding the middle, reversing the second half, and interleaving the two halves."
  },
  {
    id: "remove-duplicates-from-sorted-list",
    patternId: "linkedlist",
    name: "Remove Duplicates from Sorted List",
    difficulty: "Easy",
    number: 83,
    description: `Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.`,
    examples: [
      { input: `head = [1,1,2]`, output: "[1,2]" },
      { input: `head = [1,1,2,3,3]`, output: "[1,2,3]" }
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 300].",
      "-100 <= Node.val <= 100",
      "The list is guaranteed to be sorted in ascending order."
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var deleteDuplicates = function(head) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        var r = deleteDuplicates(t);
        return listToArray(r);
    }
    var cur = head;
    while (cur && cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
};`,
    testCases: [
      { input: `[1,1,2]`, expected: "[1,2]", args: [[1,1,2]], expectedValue: [1,2] },
      { input: `[1,1,2,3,3]`, expected: "[1,2,3]", args: [[1,1,2,3,3]], expectedValue: [1,2,3] }
    ],
    why: "A single pointer traversal removes consecutive duplicates from a sorted linked list in place."
  },
  {
    id: "partition-list",
    patternId: "linkedlist",
    name: "Partition List",
    difficulty: "Medium",
    number: 86,
    description: `Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.`,
    examples: [
      { input: `head = [1,4,3,2,5,2], x = 3`, output: "[1,2,2,4,3,5]" },
      { input: `head = [2,1], x = 2`, output: "[1,2]" }
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 200].",
      "-100 <= Node.val <= 100",
      "0 <= x <= 200"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var partition = function(head, x) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        var r = partition(t, x);
        return listToArray(r);
    }
    var beforeHead = new ListNode(0);
    var before = beforeHead;
    var afterHead = new ListNode(0);
    var after = afterHead;
    while (head) {
        if (head.val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }
    after.next = null;
    before.next = afterHead.next;
    return beforeHead.next;
};`,
    testCases: [
      { input: `[1,4,3,2,5,2], x = 3`, expected: "[1,2,2,4,3,5]", args: [[1,4,3,2,5,2], 3], expectedValue: [1,2,2,4,3,5] },
      { input: `[2,1], x = 2`, expected: "[1,2]", args: [[2,1], 2], expectedValue: [1,2] }
    ],
    why: "Two separate chains for less-than and greater-or-equal nodes preserve relative order while partitioning."
  },
  {
    id: "odd-even-linked-list",
    patternId: "linkedlist",
    name: "Odd Even Linked List",
    difficulty: "Medium",
    number: 328,
    description: `Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, and the second node is even, and so on.`,
    examples: [
      { input: `head = [1,2,3,4,5]`, output: "[1,3,5,2,4]" },
      { input: `head = [2,1,3,5,6,4,7]`, output: "[2,3,6,7,1,5,4]" }
    ],
    constraints: [
      "The number of nodes in the linked list is in the range [0, 10^4].",
      "-10^6 <= Node.val <= 10^6"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var oddEvenList = function(head) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        var r = oddEvenList(t);
        return listToArray(r);
    }
    if (!head) return head;
    var odd = head;
    var even = head.next;
    var evenHead = even;
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
};`,
    testCases: [
      { input: `[1,2,3,4,5]`, expected: "[1,3,5,2,4]", args: [[1,2,3,4,5]], expectedValue: [1,3,5,2,4] },
      { input: `[2,1,3,5,6,4,7]`, expected: "[2,3,6,7,1,5,4]", args: [[2,1,3,5,6,4,7]], expectedValue: [2,3,6,7,1,5,4] }
    ],
    why: "Splitting and reconnecting odd and even indexed nodes reorders the list in a single pass."
  },
  {
    id: "palindrome-linked-list",
    patternId: "linkedlist",
    name: "Palindrome Linked List",
    difficulty: "Medium",
    number: 234,
    description: `Given the head of a singly linked list, return true if it is a palindrome or false otherwise.`,
    examples: [
      { input: `head = [1,2,2,1]`, output: "true" },
      { input: `head = [1,2]`, output: "false" }
    ],
    constraints: [
      "The number of nodes in the list is in the range [1, 10^5].",
      "0 <= Node.val <= 9"
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // Write your code here
    
};`,
    solution: `function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
var isPalindrome = function(head) {
    if (Array.isArray(head)) {
        var t = buildList(head);
        return isPalindrome(t);
    }
    if (!head || !head.next) return true;
    var slow = head;
    var fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    var prev = null;
    var cur = slow.next;
    slow.next = null;
    while (cur) {
        var next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    var p1 = head;
    var p2 = prev;
    var res = true;
    while (p2) {
        if (p1.val !== p2.val) res = false;
        p1 = p1.next;
        p2 = p2.next;
    }
    return res;
};`,
    testCases: [
      { input: `[1,2,2,1]`, expected: "true", args: [[1,2,2,1]], expectedValue: true },
      { input: `[1,2]`, expected: "false", args: [[1,2]], expectedValue: false }
    ],
    why: "Finding the middle, reversing the second half, and comparing the two halves confirms a palindrome."
  },
  {
    id: "intersection-of-two-linked-lists",
    patternId: "linkedlist",
    name: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    number: 160,
    description: `Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.`,
    examples: [
      { input: `intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]`, output: "Intersected at '8'" },
      { input: `intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]`, output: "Intersected at '2'" },
      { input: `intersectVal = 0, listA = [2,6,4], listB = [1,5]`, output: "No intersection" }
    ],
    constraints: [
      "The number of nodes of listA is in the m.",
      "The number of nodes of listB is in the n.",
      "1 <= m, n <= 3 * 10^4",
      "1 <= Node.val <= 10^5",
      "0 <= skipA < m",
      "0 <= skipB < n",
      "intersectVal is 0 if listA and listB do not intersect."
    ],
    starterCode: `/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // Write your code here
    
};`,
    solution: `function ListNode(val) {
    this.val = val;
    this.next = null;
}
function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
function findCommonSuffix(a, b) {
    var i = a.length - 1;
    var j = b.length - 1;
    while (i >= 0 && j >= 0 && a[i] === b[j]) {
        i--;
        j--;
    }
    return { skipA: i, skipB: j };
}
function buildIntersectionList(arrA, arrB) {
    var info = findCommonSuffix(arrA, arrB);
    var shared = null;
    var tail = null;
    for (var k = info.skipA + 1; k < arrA.length; k++) {
        var node = new ListNode(arrA[k]);
        if (!shared) { shared = node; tail = node; }
        else { tail.next = node; tail = node; }
    }
    var ha = null, ta = null;
    for (var m = 0; m <= info.skipA; m++) {
        var n = new ListNode(arrA[m]);
        if (!ha) { ha = n; ta = n; }
        else { ta.next = n; ta = n; }
    }
    if (ta) ta.next = shared;
    else ha = shared;
    var hb = null, tb = null;
    for (var m = 0; m <= info.skipB; m++) {
        var n = new ListNode(arrB[m]);
        if (!hb) { hb = n; tb = n; }
        else { tb.next = n; tb = n; }
    }
    if (tb) tb.next = shared;
    else hb = shared;
    return [ha, hb];
}
var getIntersectionNode = function(headA, headB) {
    if (Array.isArray(headA) && Array.isArray(headB)) {
        var pair = buildIntersectionList(headA, headB);
        var res = getIntersectionNode(pair[0], pair[1]);
        return res ? res.val : null;
    }
    var a = headA;
    var b = headB;
    while (a !== b) {
        a = a === null ? headB : a.next;
        b = b === null ? headA : b.next;
    }
    return a ? a.val : null;
};`,
    testCases: [
      { input: `[4,1,8,4,5], [5,6,1,8,4,5]`, expected: "8", args: [[4,1,8,4,5], [5,6,1,8,4,5]], expectedValue: 8 },
      { input: `[1,9,1,2,4], [3,2,4]`, expected: "2", args: [[1,9,1,2,4], [3,2,4]], expectedValue: 2 },
      { input: `[2,6,4], [1,5]`, expected: "null", args: [[2,6,4], [1,5]], expectedValue: null }
    ],
    why: "Two pointers traversing both lists synchronize at the intersection after equalizing path lengths."
  },
  {
    id: "flatten-a-multilevel-doubly-linked-list",
    patternId: "linkedlist",
    name: "Flatten a Multilevel Doubly Linked List",
    difficulty: "Medium",
    number: 430,
    description: `You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. Flatten the list so that all the nodes appear in a single-level, doubly linked list.`,
    examples: [
      { input: `head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]`, output: "[1,2,3,7,8,11,12,9,10,4,5,6]" }
    ],
    constraints: [
      "The number of nodes will not exceed 1000.",
      "1 <= Node.val <= 10^5"
    ],
    starterCode: `/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    // Write your code here
    
};`,
    solution: `function Node(val, prev, next, child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
}
function buildDoublyList(arr) {
    if (!arr || arr.length === 0) return null;
    var head = new Node(arr[0], null, null, null);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        var node = new Node(arr[i], cur, null, null);
        cur.next = node;
        cur = node;
    }
    return head;
}
function listToArray(head) {
    var res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}
var flatten = function(head) {
    if (Array.isArray(head)) {
        var t = buildDoublyList(head);
        var r = flatten(t);
        return listToArray(r);
    }
    if (!head) return head;
    var dummy = new Node(0, null, head, null);
    var stack = [head];
    var prev = dummy;
    while (stack.length > 0) {
        var cur = stack.pop();
        prev.next = cur;
        cur.prev = prev;
        if (cur.next) stack.push(cur.next);
        if (cur.child) {
            stack.push(cur.child);
            cur.child = null;
        }
        prev = cur;
    }
    dummy.next.prev = null;
    return dummy.next;
};`,
    testCases: [
      { input: `[1,2,3,4,5,6]`, expected: "[1,2,3,4,5,6]", args: [[1,2,3,4,5,6]], expectedValue: [1,2,3,4,5,6] },
      { input: `[]`, expected: "[]", args: [[]], expectedValue: [] }
    ],
    why: "A stack-based depth-first traversal flattens nested levels into a single doubly linked sequence."
  }
];
