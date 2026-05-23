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

const backtrackingProblems: Problem[] = [
  {
    id: "subsets",
    patternId: "backtracking",
    name: "Subsets",
    difficulty: "Medium",
    number: 78,
    description:
      "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique.",
    ],
    starterCode:
      '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar subsets = function(nums) {\n    // Write your code here\n    \n};',
    solution:
      'var subsets = function(nums) {\n    const res = [];\n    const backtrack = (start, curr) => {\n        res.push([...curr]);\n        for (let i = start; i < nums.length; i++) {\n            curr.push(nums[i]);\n            backtrack(i + 1, curr);\n            curr.pop();\n        }\n    };\n    backtrack(0, []);\n    return res;\n};',
    testCases: [
      {
        input: "[1,2,3]",
        expected: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]",
        args: [[1, 2, 3]],
        expectedValue: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
      },
      {
        input: "[0]",
        expected: "[[],[0]]",
        args: [[0]],
        expectedValue: [[], [0]],
      },
    ],
    why: "Subsets is the canonical introduction to backtracking by building combinations via include/exclude decisions.",
  },
  {
    id: "permutations",
    patternId: "backtracking",
    name: "Permutations",
    difficulty: "Medium",
    number: 46,
    description:
      "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
      { input: "nums = [1]", output: "[[1]]" },
    ],
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All the integers of nums are unique.",
    ],
    starterCode:
      '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permutations = function(nums) {\n    // Write your code here\n    \n};',
    solution:
      'var permutations = function(nums) {\n    const res = [];\n    const used = new Array(nums.length).fill(false);\n    const backtrack = (curr) => {\n        if (curr.length === nums.length) {\n            res.push([...curr]);\n            return;\n        }\n        for (let i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n            used[i] = true;\n            curr.push(nums[i]);\n            backtrack(curr);\n            curr.pop();\n            used[i] = false;\n        }\n    };\n    backtrack([]);\n    return res;\n};',
    testCases: [
      {
        input: "[1,2,3]",
        expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        args: [[1, 2, 3]],
        expectedValue: [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 1, 2],
          [3, 2, 1],
        ],
      },
      {
        input: "[0,1]",
        expected: "[[0,1],[1,0]]",
        args: [[0, 1]],
        expectedValue: [
          [0, 1],
          [1, 0],
        ],
      },
    ],
    why: "Permutations teaches how to explore all orderings using a used-visited array to avoid reuse.",
  },
  {
    id: "permutations-ii",
    patternId: "backtracking",
    name: "Permutations II",
    difficulty: "Medium",
    number: 47,
    description:
      "Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.",
    examples: [
      {
        input: "nums = [1,1,2]",
        output: "[[1,1,2],[1,2,1],[2,1,1]]",
      },
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      },
    ],
    constraints: ["1 <= nums.length <= 8", "-10 <= nums[i] <= 10"],
    starterCode:
      '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permutationsII = function(nums) {\n    // Write your code here\n    \n};',
    solution:
      'var permutationsII = function(nums) {\n    const res = [];\n    nums.sort((a, b) => a - b);\n    const used = new Array(nums.length).fill(false);\n    const backtrack = (curr) => {\n        if (curr.length === nums.length) {\n            res.push([...curr]);\n            return;\n        }\n        for (let i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;\n            used[i] = true;\n            curr.push(nums[i]);\n            backtrack(curr);\n            curr.pop();\n            used[i] = false;\n        }\n    };\n    backtrack([]);\n    return res;\n};',
    testCases: [
      {
        input: "[1,1,2]",
        expected: "[[1,1,2],[1,2,1],[2,1,1]]",
        args: [[1, 1, 2]],
        expectedValue: [
          [1, 1, 2],
          [1, 2, 1],
          [2, 1, 1],
        ],
      },
      {
        input: "[1,2,3]",
        expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        args: [[1, 2, 3]],
        expectedValue: [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 1, 2],
          [3, 2, 1],
        ],
      },
    ],
    why: "This problem extends Permutations by requiring sorting and skipping duplicate values to avoid redundant permutations.",
  },
  {
    id: "combination-sum",
    patternId: "backtracking",
    name: "Combination Sum",
    difficulty: "Medium",
    number: 39,
    description:
      "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.",
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation:
          "2 and 3 are candidates, and 2 + 2 + 3 = 7. 7 is also a candidate.",
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]",
      },
    ],
    constraints: [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 40",
    ],
    starterCode:
      '/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum = function(candidates, target) {\n    // Write your code here\n    \n};',
    solution:
      'var combinationSum = function(candidates, target) {\n    const res = [];\n    const backtrack = (remain, start, curr) => {\n        if (remain === 0) {\n            res.push([...curr]);\n            return;\n        }\n        if (remain < 0) return;\n        for (let i = start; i < candidates.length; i++) {\n            curr.push(candidates[i]);\n            backtrack(remain - candidates[i], i, curr);\n            curr.pop();\n        }\n    };\n    backtrack(target, 0, []);\n    return res;\n};',
    testCases: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        expected: "[[2,2,3],[7]]",
        args: [[2, 3, 6, 7], 7],
        expectedValue: [[2, 2, 3], [7]],
      },
      {
        input: "candidates = [2,3,5], target = 8",
        expected: "[[2,2,2,2],[2,3,3],[3,5]]",
        args: [[2, 3, 5], 8],
        expectedValue: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
      },
      {
        input: "candidates = [2], target = 1",
        expected: "[]",
        args: [[2], 1],
        expectedValue: [],
      },
    ],
    why: "Combination Sum demonstrates unbounded knapsack-style backtracking where the same element can be reused.",
  },
  {
    id: "combination-sum-ii",
    patternId: "backtracking",
    name: "Combination Sum II",
    difficulty: "Medium",
    number: 40,
    description:
      "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.",
    examples: [
      {
        input: "candidates = [10,1,2,7,6,1,5], target = 8",
        output: "[[1,1,6],[1,2,5],[1,7],[2,6]]",
      },
      {
        input: "candidates = [2,5,2,1,2], target = 5",
        output: "[[1,2,2],[5]]",
      },
    ],
    constraints: [
      "1 <= candidates.length <= 100",
      "1 <= candidates[i] <= 50",
      "1 <= target <= 30",
    ],
    starterCode:
      '/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum2 = function(candidates, target) {\n    // Write your code here\n    \n};',
    solution:
      'var combinationSum2 = function(candidates, target) {\n    const res = [];\n    candidates.sort((a, b) => a - b);\n    const backtrack = (remain, start, curr) => {\n        if (remain === 0) {\n            res.push([...curr]);\n            return;\n        }\n        if (remain < 0) return;\n        for (let i = start; i < candidates.length; i++) {\n            if (i > start && candidates[i] === candidates[i - 1]) continue;\n            curr.push(candidates[i]);\n            backtrack(remain - candidates[i], i + 1, curr);\n            curr.pop();\n        }\n    };\n    backtrack(target, 0, []);\n    return res;\n};',
    testCases: [
      {
        input: "candidates = [10,1,2,7,6,1,5], target = 8",
        expected: "[[1,1,6],[1,2,5],[1,7],[2,6]]",
        args: [[10, 1, 2, 7, 6, 1, 5], 8],
        expectedValue: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
      },
      {
        input: "candidates = [2,5,2,1,2], target = 5",
        expected: "[[1,2,2],[5]]",
        args: [[2, 5, 2, 1, 2], 5],
        expectedValue: [[1, 2, 2], [5]],
      },
    ],
    why: "This variant forces sorting and skipping duplicates because each candidate can be used only once.",
  },
  {
    id: "combination-sum-iii",
    patternId: "backtracking",
    name: "Combination Sum III",
    difficulty: "Medium",
    number: 216,
    description:
      "Find all valid combinations of k numbers that sum up to n such that the following conditions are true: Only numbers 1 through 9 are used; each number is used at most once. Return a list of all possible valid combinations.",
    examples: [
      {
        input: "k = 3, n = 7",
        output: "[[1,2,4]]",
        explanation:
          "1 + 2 + 4 = 7 and there are no other valid combinations.",
      },
      {
        input: "k = 3, n = 9",
        output: "[[1,2,6],[1,3,5],[2,3,4]]",
      },
    ],
    constraints: ["2 <= k <= 9", "1 <= n <= 60"],
    starterCode:
      '/**\n * @param {number} k\n * @param {number} n\n * @return {number[][]}\n */\nvar combinationSum3 = function(k, n) {\n    // Write your code here\n    \n};',
    solution:
      'var combinationSum3 = function(k, n) {\n    const res = [];\n    const backtrack = (start, remain, count, curr) => {\n        if (count === k && remain === 0) {\n            res.push([...curr]);\n            return;\n        }\n        if (count > k || remain < 0) return;\n        for (let i = start; i <= 9; i++) {\n            curr.push(i);\n            backtrack(i + 1, remain - i, count + 1, curr);\n            curr.pop();\n        }\n    };\n    backtrack(1, n, 0, []);\n    return res;\n};',
    testCases: [
      {
        input: "k = 3, n = 7",
        expected: "[[1,2,4]]",
        args: [3, 7],
        expectedValue: [[1, 2, 4]],
      },
      {
        input: "k = 3, n = 9",
        expected: "[[1,2,6],[1,3,5],[2,3,4]]",
        args: [3, 9],
        expectedValue: [
          [1, 2, 6],
          [1, 3, 5],
          [2, 3, 4],
        ],
      },
      {
        input: "k = 4, n = 1",
        expected: "[]",
        args: [4, 1],
        expectedValue: [],
      },
    ],
    why: "Combination Sum III constrains the search space to digits 1-9, making it a great bounded backtracking exercise.",
  },
  {
    id: "palindrome-partitioning",
    patternId: "backtracking",
    name: "Palindrome Partitioning",
    difficulty: "Medium",
    number: 131,
    description:
      "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    examples: [
      {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]',
      },
      { input: 's = "a"', output: '[["a"]]' },
    ],
    constraints: [
      "1 <= s.length <= 16",
      "s contains only lowercase English letters.",
    ],
    starterCode:
      '/**\n * @param {string} s\n * @return {string[][]}\n */\nvar partition = function(s) {\n    // Write your code here\n    \n};',
    solution:
      'var partition = function(s) {\n    const res = [];\n    const isPal = (str) => {\n        let l = 0, r = str.length - 1;\n        while (l < r) {\n            if (str[l] !== str[r]) return false;\n            l++; r--;\n        }\n        return true;\n    };\n    const backtrack = (start, curr) => {\n        if (start === s.length) {\n            res.push([...curr]);\n            return;\n        }\n        for (let i = start; i < s.length; i++) {\n            const sub = s.slice(start, i + 1);\n            if (isPal(sub)) {\n                curr.push(sub);\n                backtrack(i + 1, curr);\n                curr.pop();\n            }\n        }\n    };\n    backtrack(0, []);\n    return res;\n};',
    testCases: [
      {
        input: '"aab"',
        expected: '[["a","a","b"],["aa","b"]]',
        args: ["aab"],
        expectedValue: [["a", "a", "b"], ["aa", "b"]],
      },
      {
        input: '"a"',
        expected: '[["a"]]',
        args: ["a"],
        expectedValue: [["a"]],
      },
    ],
    why: "Palindrome Partitioning combines backtracking with substring palindrome checks at each decision point.",
  },
  {
    id: "letter-combinations-of-a-phone-number",
    patternId: "backtracking",
    name: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    number: 17,
    description:
      "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. A mapping of digit to letters is given below. Note that 1 does not map to any letters.",
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      },
      { input: 'digits = ""', output: "[]" },
      { input: 'digits = "2"', output: '["a","b","c"]' },
    ],
    constraints: [
      "0 <= digits.length <= 4",
      "digits[i] is a digit in the range [2,9].",
    ],
    starterCode:
      '/**\n * @param {string} digits\n * @return {string[]}\n */\nvar letterCombinations = function(digits) {\n    // Write your code here\n    \n};',
    solution:
      'var letterCombinations = function(digits) {\n    if (!digits.length) return [];\n    const map = {\n        2: "abc", 3: "def", 4: "ghi", 5: "jkl",\n        6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz"\n    };\n    const res = [];\n    const backtrack = (idx, curr) => {\n        if (idx === digits.length) {\n            res.push(curr);\n            return;\n        }\n        const chars = map[digits[idx]];\n        for (let c of chars) {\n            backtrack(idx + 1, curr + c);\n        }\n    };\n    backtrack(0, "");\n    return res;\n};',
    testCases: [
      {
        input: '"23"',
        expected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
        args: ["23"],
        expectedValue: [
          "ad",
          "ae",
          "af",
          "bd",
          "be",
          "bf",
          "cd",
          "ce",
          "cf",
        ],
      },
      {
        input: '""',
        expected: "[]",
        args: [""],
        expectedValue: [],
      },
      {
        input: '"2"',
        expected: '["a","b","c"]',
        args: ["2"],
        expectedValue: ["a", "b", "c"],
      },
    ],
    why: "This problem is ideal for practicing mapping-based backtracking over multiple independent choices.",
  },
  {
    id: "generate-parentheses",
    patternId: "backtracking",
    name: "Generate Parentheses",
    difficulty: "Medium",
    number: 22,
    description:
      "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      { input: "n = 1", output: '["()"]' },
    ],
    constraints: ["1 <= n <= 8"],
    starterCode:
      '/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    // Write your code here\n    \n};',
    solution:
      'var generateParenthesis = function(n) {\n    const res = [];\n    const backtrack = (curr, open, close) => {\n        if (curr.length === 2 * n) {\n            res.push(curr);\n            return;\n        }\n        if (open < n) backtrack(curr + "(", open + 1, close);\n        if (close < open) backtrack(curr + ")", open, close + 1);\n    };\n    backtrack("", 0, 0);\n    return res;\n};',
    testCases: [
      {
        input: "n = 3",
        expected: '["((()))","(()())","(())()","()(())","()()()"]',
        args: [3],
        expectedValue: [
          "((()))",
          "(()())",
          "(())()",
          "()(())",
          "()()()",
        ],
      },
      {
        input: "n = 1",
        expected: '["()"]',
        args: [1],
        expectedValue: ["()"],
      },
    ],
    why: "Generate Parentheses teaches constraint-based backtracking by maintaining counts of open and close brackets.",
  },
  {
    id: "restore-ip-addresses",
    patternId: "backtracking",
    name: "Restore IP Addresses",
    difficulty: "Medium",
    number: 93,
    description:
      "Given a string s containing only digits, return all possible valid IP addresses that can be obtained from s. You can return them in any order. A valid IP address consists of exactly four integers separated by single dots, where each integer is between 0 and 255 inclusive and cannot have leading zeros unless the integer is 0 itself.",
    examples: [
      {
        input: 's = "25525511135"',
        output: '["255.255.11.135","255.255.111.35"]',
      },
      { input: 's = "0000"', output: '["0.0.0.0"]' },
      {
        input: 's = "101023"',
        output:
          '["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]',
      },
    ],
    constraints: ["1 <= s.length <= 12", "s consists of digits only."],
    starterCode:
      '/**\n * @param {string} s\n * @return {string[]}\n */\nvar restoreIpAddresses = function(s) {\n    // Write your code here\n    \n};',
    solution:
      'var restoreIpAddresses = function(s) {\n    const res = [];\n    const backtrack = (start, dots, curr) => {\n        if (dots === 4 && start === s.length) {\n            res.push(curr.slice(0, -1));\n            return;\n        }\n        if (dots >= 4) return;\n        for (let i = 1; i <= 3; i++) {\n            if (start + i > s.length) break;\n            const seg = s.slice(start, start + i);\n            if ((seg[0] === "0" && seg.length > 1) || parseInt(seg) > 255) continue;\n            backtrack(start + i, dots + 1, curr + seg + ".");\n        }\n    };\n    backtrack(0, 0, "");\n    return res;\n};',
    testCases: [
      {
        input: '"25525511135"',
        expected: '["255.255.11.135","255.255.111.35"]',
        args: ["25525511135"],
        expectedValue: ["255.255.11.135", "255.255.111.35"],
      },
      {
        input: '"0000"',
        expected: '["0.0.0.0"]',
        args: ["0000"],
        expectedValue: ["0.0.0.0"],
      },
      {
        input: '"101023"',
        expected:
          '["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]',
        args: ["101023"],
        expectedValue: [
          "1.0.10.23",
          "1.0.102.3",
          "10.1.0.23",
          "10.10.2.3",
          "101.0.2.3",
        ],
      },
    ],
    why: "Restore IP Addresses practices segment validation and early termination during backtracking.",
  },
  {
    id: "word-search",
    patternId: "backtracking",
    name: "Word Search",
    difficulty: "Medium",
    number: 79,
    description:
      "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    examples: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters.",
    ],
    starterCode:
      '/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nvar exist = function(board, word) {\n    // Write your code here\n    \n};',
    solution:
      'var exist = function(board, word) {\n    const m = board.length, n = board[0].length;\n    const backtrack = (i, j, idx) => {\n        if (idx === word.length) return true;\n        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[idx]) return false;\n        const temp = board[i][j];\n        board[i][j] = "#";\n        const found = backtrack(i + 1, j, idx + 1) || backtrack(i - 1, j, idx + 1) || backtrack(i, j + 1, idx + 1) || backtrack(i, j - 1, idx + 1);\n        board[i][j] = temp;\n        return found;\n    };\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (backtrack(i, j, 0)) return true;\n        }\n    }\n    return false;\n};',
    testCases: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        expected: "true",
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCCED",
        ],
        expectedValue: true,
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        expected: "true",
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "SEE",
        ],
        expectedValue: true,
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        expected: "false",
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCB",
        ],
        expectedValue: false,
      },
    ],
    why: "Word Search is the classic grid backtracking problem requiring in-place visited marking and restoration.",
  },
  {
    id: "increasing-subsequences",
    patternId: "backtracking",
    name: "Increasing Subsequences",
    difficulty: "Medium",
    number: 491,
    description:
      "Given an integer array nums, return all the different possible increasing subsequences of the given array with at least two elements. You may return the answer in any order.",
    examples: [
      {
        input: "nums = [4,6,7,7]",
        output:
          "[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]",
      },
      { input: "nums = [4,4,3,2,1]", output: "[[4,4]]" },
    ],
    constraints: [
      "1 <= nums.length <= 15",
      "-100 <= nums[i] <= 100",
    ],
    starterCode:
      '/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar findSubsequences = function(nums) {\n    // Write your code here\n    \n};',
    solution:
      'var findSubsequences = function(nums) {\n    const res = [];\n    const backtrack = (start, curr) => {\n        if (curr.length >= 2) res.push([...curr]);\n        const used = new Set();\n        for (let i = start; i < nums.length; i++) {\n            if (used.has(nums[i])) continue;\n            if (curr.length > 0 && nums[i] < curr[curr.length - 1]) continue;\n            used.add(nums[i]);\n            curr.push(nums[i]);\n            backtrack(i + 1, curr);\n            curr.pop();\n        }\n    };\n    backtrack(0, []);\n    return res;\n};',
    testCases: [
      {
        input: "nums = [4,6,7,7]",
        expected:
          "[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]",
        args: [[4, 6, 7, 7]],
        expectedValue: [
          [4, 6],
          [4, 6, 7],
          [4, 6, 7, 7],
          [4, 7],
          [4, 7, 7],
          [6, 7],
          [6, 7, 7],
          [7, 7],
        ],
      },
      {
        input: "nums = [4,4,3,2,1]",
        expected: "[[4,4]]",
        args: [[4, 4, 3, 2, 1]],
        expectedValue: [[4, 4]],
      },
    ],
    why: "This problem shows how to use a local Set to avoid duplicates at each recursion level rather than global sorting.",
  },
  {
    id: "letter-case-permutation",
    patternId: "backtracking",
    name: "Letter Case Permutation",
    difficulty: "Easy",
    number: 784,
    description:
      "Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string. Return a list of all possible strings we could create.",
    examples: [
      {
        input: 's = "a1b2"',
        output: '["a1b2","a1B2","A1b2","A1B2"]',
      },
      { input: 's = "3z4"', output: '["3z4","3Z4"]' },
    ],
    constraints: [
      "1 <= s.length <= 12",
      "s consists of lowercase English letters, uppercase English letters, and digits.",
    ],
    starterCode:
      '/**\n * @param {string} s\n * @return {string[]}\n */\nvar letterCasePermutation = function(s) {\n    // Write your code here\n    \n};',
    solution:
      'var letterCasePermutation = function(s) {\n    const res = [];\n    const backtrack = (idx, curr) => {\n        if (idx === s.length) {\n            res.push(curr);\n            return;\n        }\n        const ch = s[idx];\n        if (/[a-zA-Z]/.test(ch)) {\n            backtrack(idx + 1, curr + ch.toLowerCase());\n            backtrack(idx + 1, curr + ch.toUpperCase());\n        } else {\n            backtrack(idx + 1, curr + ch);\n        }\n    };\n    backtrack(0, "");\n    return res;\n};',
    testCases: [
      {
        input: '"a1b2"',
        expected: '["a1b2","a1B2","A1b2","A1B2"]',
        args: ["a1b2"],
        expectedValue: ["a1b2", "a1B2", "A1b2", "A1B2"],
      },
      {
        input: '"3z4"',
        expected: '["3z4","3Z4"]',
        args: ["3z4"],
        expectedValue: ["3z4", "3Z4"],
      },
      {
        input: '"12345"',
        expected: '["12345"]',
        args: ["12345"],
        expectedValue: ["12345"],
      },
    ],
    why: "Letter Case Permutation is a gentle backtracking problem that branches only on alphabetic characters.",
  },
  {
    id: "n-queens",
    patternId: "backtracking",
    name: "N-Queens",
    difficulty: "Hard",
    number: 51,
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order. Each solution contains a distinct board configuration.",
    examples: [
      {
        input: "n = 4",
        output:
          '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        explanation: "There exist two distinct solutions to the 4-queens puzzle.",
      },
      { input: "n = 1", output: '[["Q"]]' },
    ],
    constraints: ["1 <= n <= 9"],
    starterCode:
      '/**\n * @param {number} n\n * @return {string[][]}\n */\nvar solveNQueens = function(n) {\n    // Write your code here\n    \n};',
    solution:
      'var solveNQueens = function(n) {\n    const res = [];\n    const cols = new Set();\n    const diags = new Set();\n    const antiDiags = new Set();\n    const board = Array.from({ length: n }, () => new Array(n).fill("."));\n    const backtrack = (row) => {\n        if (row === n) {\n            res.push(board.map((r) => r.join("")));\n            return;\n        }\n        for (let col = 0; col < n; col++) {\n            const d = row - col;\n            const ad = row + col;\n            if (cols.has(col) || diags.has(d) || antiDiags.has(ad)) continue;\n            cols.add(col);\n            diags.add(d);\n            antiDiags.add(ad);\n            board[row][col] = "Q";\n            backtrack(row + 1);\n            board[row][col] = ".";\n            cols.delete(col);\n            diags.delete(d);\n            antiDiags.delete(ad);\n        }\n    };\n    backtrack(0);\n    return res;\n};',
    testCases: [
      {
        input: "n = 4",
        expected:
          '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        args: [4],
        expectedValue: [
          [".Q..", "...Q", "Q...", "..Q."],
          ["..Q.", "Q...", "...Q", ".Q.."],
        ],
      },
      {
        input: "n = 1",
        expected: '[["Q"]]',
        args: [1],
        expectedValue: [["Q"]],
      },
    ],
    why: "N-Queens is the definitive hard backtracking problem requiring column and diagonal conflict tracking.",
  },
  {
    id: "sudoku-solver",
    patternId: "backtracking",
    name: "Sudoku Solver",
    difficulty: "Hard",
    number: 37,
    description:
      "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row, column, and 3x3 sub-box. The '.' character indicates empty cells. It is guaranteed that the input board has only one solution.",
    examples: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output:
          '[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]',
      },
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      'board[i][j] is a digit or "."',
      "It is guaranteed that the input board has only one solution.",
    ],
    starterCode:
      '/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solveSudoku = function(board) {\n    // Write your code here\n    \n};',
    solution:
      'var solveSudoku = function(board) {\n    const rows = Array.from({ length: 9 }, () => new Set());\n    const cols = Array.from({ length: 9 }, () => new Set());\n    const boxes = Array.from({ length: 9 }, () => new Set());\n    const empties = [];\n    for (let r = 0; r < 9; r++) {\n        for (let c = 0; c < 9; c++) {\n            if (board[r][c] === ".") {\n                empties.push([r, c]);\n            } else {\n                const val = board[r][c];\n                rows[r].add(val);\n                cols[c].add(val);\n                boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(val);\n            }\n        }\n    }\n    const backtrack = (idx) => {\n        if (idx === empties.length) return true;\n        const [r, c] = empties[idx];\n        const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);\n        for (let d = 1; d <= 9; d++) {\n            const val = String(d);\n            if (rows[r].has(val) || cols[c].has(val) || boxes[b].has(val)) continue;\n            board[r][c] = val;\n            rows[r].add(val);\n            cols[c].add(val);\n            boxes[b].add(val);\n            if (backtrack(idx + 1)) return true;\n            board[r][c] = ".";\n            rows[r].delete(val);\n            cols[c].delete(val);\n            boxes[b].delete(val);\n        }\n        return false;\n    };\n    backtrack(0);\n    return board;\n};',
    testCases: [
      {
        input: "9x9 board with some cells filled",
        expected: "Solved 9x9 board",
        args: [
          [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        expectedValue: [
          ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
          ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
          ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
          ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
          ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
          ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
          ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
          ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
          ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ],
      },
    ],
    why: "Sudoku Solver is the ultimate constrained backtracking problem requiring careful row, column, and box validation.",
  },
];

const graphProblems: Problem[] = [
  {
    id: "flood-fill",
    patternId: "graphs",
    name: "Flood Fill",
    difficulty: "Easy",
    number: 733,
    description:
      "An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. You should perform a flood fill starting from the pixel image[sr][sc]. Return the modified image.",
    examples: [
      {
        input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
        output: "[[2,2,2],[2,2,0],[2,0,1]]",
        explanation:
          "From the center of the image, all pixels connected by a path of the same color as the starting pixel are colored with the new color.",
      },
      {
        input: "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 2",
        output: "[[2,2,2],[2,2,2]]",
      },
    ],
    constraints: [
      "m == image.length",
      "n == image[i].length",
      "1 <= m, n <= 50",
      "0 <= image[i][j], color < 216",
      "0 <= sr < m",
      "0 <= sc < n",
    ],
    starterCode:
      '/**\n * @param {number[][]} image\n * @param {number} sr\n * @param {number} sc\n * @param {number} color\n * @return {number[][]}\n */\nvar floodFill = function(image, sr, sc, color) {\n    // Write your code here\n    \n};',
    solution:
      'var floodFill = function(image, sr, sc, color) {\n    const m = image.length, n = image[0].length;\n    const original = image[sr][sc];\n    if (original === color) return image;\n    const dfs = (r, c) => {\n        if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] !== original) return;\n        image[r][c] = color;\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    };\n    dfs(sr, sc);\n    return image;\n};',
    testCases: [
      {
        input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
        expected: "[[2,2,2],[2,2,0],[2,0,1]]",
        args: [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2],
        expectedValue: [
          [2, 2, 2],
          [2, 2, 0],
          [2, 0, 1],
        ],
      },
      {
        input: "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 2",
        expected: "[[2,2,2],[2,2,2]]",
        args: [[[0, 0, 0], [0, 0, 0]], 0, 0, 2],
        expectedValue: [
          [2, 2, 2],
          [2, 2, 2],
        ],
      },
    ],
    why: "Flood Fill is the simplest grid graph traversal, teaching DFS on implicit graphs.",
  },
  {
    id: "island-perimeter",
    patternId: "graphs",
    name: "Island Perimeter",
    difficulty: "Easy",
    number: 463,
    description:
      "You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water. Grid cells are connected horizontally/vertically. The grid is completely surrounded by water, and there is exactly one island. Return the perimeter of the island.",
    examples: [
      {
        input: "grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]",
        output: "16",
      },
      { input: "grid = [[1]]", output: "4" },
      { input: "grid = [[1,0]]", output: "4" },
    ],
    constraints: [
      "row == grid.length",
      "col == grid[i].length",
      "1 <= row, col <= 100",
      "grid[i][j] is 0 or 1.",
      "There is exactly one island in grid.",
    ],
    starterCode:
      '/**\n * @param {number[][]} grid\n * @return {number}\n */\nvar islandPerimeter = function(grid) {\n    // Write your code here\n    \n};',
    solution:
      'var islandPerimeter = function(grid) {\n    const m = grid.length, n = grid[0].length;\n    let perimeter = 0;\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === 1) {\n                perimeter += 4;\n                if (r > 0 && grid[r - 1][c] === 1) perimeter -= 2;\n                if (c > 0 && grid[r][c - 1] === 1) perimeter -= 2;\n            }\n        }\n    }\n    return perimeter;\n};',
    testCases: [
      {
        input: "grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]",
        expected: "16",
        args: [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]],
        expectedValue: 16,
      },
      {
        input: "grid = [[1]]",
        expected: "4",
        args: [[[1]]],
        expectedValue: 4,
      },
      {
        input: "grid = [[1,0]]",
        expected: "4",
        args: [[[1, 0]]],
        expectedValue: 4,
      },
    ],
    why: "Island Perimeter counts exposed edges by checking each land cell's four neighbors.",
  },
  {
    id: "find-if-path-exists-in-graph",
    patternId: "graphs",
    name: "Find if Path Exists in Graph",
    difficulty: "Easy",
    number: 1971,
    description:
      "There is a bi-directional graph with n vertices. The edges are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Return true if there is a valid path from source to destination, or false otherwise.",
    examples: [
      {
        input: "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2",
        output: "true",
      },
      {
        input:
          "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5",
        output: "false",
      },
    ],
    constraints: [
      "1 <= n <= 2 * 105",
      "0 <= edges.length <= 2 * 105",
      "edges[i].length == 2",
      "0 <= ui, vi <= n - 1",
      "ui != vi",
      "0 <= source, destination <= n - 1",
    ],
    starterCode:
      '/**\n * @param {number} n\n * @param {number[][]} edges\n * @param {number} source\n * @param {number} destination\n * @return {boolean}\n */\nvar validPath = function(n, edges, source, destination) {\n    // Write your code here\n    \n};',
    solution:
      'var validPath = function(n, edges, source, destination) {\n    const graph = Array.from({ length: n }, () => []);\n    for (const [u, v] of edges) {\n        graph[u].push(v);\n        graph[v].push(u);\n    }\n    const visited = new Array(n).fill(false);\n    const stack = [source];\n    visited[source] = true;\n    while (stack.length) {\n        const node = stack.pop();\n        if (node === destination) return true;\n        for (const nei of graph[node]) {\n            if (!visited[nei]) {\n                visited[nei] = true;\n                stack.push(nei);\n            }\n        }\n    }\n    return false;\n};',
    testCases: [
      {
        input: "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2",
        expected: "true",
        args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2],
        expectedValue: true,
      },
      {
        input:
          "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5",
        expected: "false",
        args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5],
        expectedValue: false,
      },
    ],
    why: "This problem is a straightforward BFS/DFS exercise on an adjacency-list graph representation.",
  },
  {
    id: "find-center-of-star-graph",
    patternId: "graphs",
    name: "Find Center of Star Graph",
    difficulty: "Easy",
    number: 1791,
    description:
      "There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node. You are given a 2D integer array edges where each edges[i] = [ui, vi] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.",
    examples: [
      {
        input: "edges = [[1,2],[2,3],[4,2]]",
        output: "2",
        explanation: "Node 2 is connected to every other node.",
      },
      { input: "edges = [[1,2],[5,1],[1,3],[1,4]]", output: "1" },
    ],
    constraints: [
      "3 <= n <= 105",
      "edges.length == n - 1",
      "edges[i].length == 2",
      "1 <= ui, vi <= n",
      "ui != vi",
    ],
    starterCode:
      '/**\n * @param {number[][]} edges\n * @return {number}\n */\nvar findCenter = function(edges) {\n    // Write your code here\n    \n};',
    solution:
      'var findCenter = function(edges) {\n    const [a, b] = edges[0];\n    const [c, d] = edges[1];\n    return a === c || a === d ? a : b;\n};',
    testCases: [
      {
        input: "edges = [[1,2],[2,3],[4,2]]",
        expected: "2",
        args: [[[1, 2], [2, 3], [4, 2]]],
        expectedValue: 2,
      },
      {
        input: "edges = [[1,2],[5,1],[1,3],[1,4]]",
        expected: "1",
        args: [[[1, 2], [5, 1], [1, 3], [1, 4]]],
        expectedValue: 1,
      },
    ],
    why: "The center node must appear in the first two edges, allowing an O(1) observation.",
  },
  {
    id: "find-town-judge",
    patternId: "graphs",
    name: "Find the Town Judge",
    difficulty: "Easy",
    number: 997,
    description:
      "In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge. If the town judge exists, then: The town judge trusts nobody. Everybody else trusts the town judge. There is exactly one person that satisfies properties 1 and 2. You are given an array trust where trust[i] = [ai, bi] represents that the person labeled ai trusts the person labeled bi. Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.",
    examples: [
      {
        input: "n = 2, trust = [[1,2]]",
        output: "2",
      },
      {
        input: "n = 3, trust = [[1,3],[2,3]]",
        output: "3",
      },
    ],
    constraints: [
      "1 <= n <= 1000",
      "0 <= trust.length <= 104",
      "trust[i].length == 2",
      "All the pairs of trust are unique.",
      "ai != bi",
      "1 <= ai, bi <= n",
    ],
    starterCode:
      '/**\n * @param {number} n\n * @param {number[][]} trust\n * @return {number}\n */\nvar findJudge = function(n, trust) {\n    // Write your code here\n    \n};',
    solution:
      'var findJudge = function(n, trust) {\n    const degree = new Array(n + 1).fill(0);\n    for (const [a, b] of trust) {\n        degree[a]--;\n        degree[b]++;\n    }\n    for (let i = 1; i <= n; i++) {\n        if (degree[i] === n - 1) return i;\n    }\n    return -1;\n};',
    testCases: [
      {
        input: "n = 2, trust = [[1,2]]",
        expected: "2",
        args: [2, [[1, 2]]],
        expectedValue: 2,
      },
      {
        input: "n = 3, trust = [[1,3],[2,3]]",
        expected: "3",
        args: [3, [[1, 3], [2, 3]]],
        expectedValue: 3,
      },
      {
        input: "n = 3, trust = [[1,3],[2,3],[3,1]]",
        expected: "-1",
        args: [3, [[1, 3], [2, 3], [3, 1]]],
        expectedValue: -1,
      },
    ],
    why: "Town Judge computes in-degree and out-degree to identify the node with n-1 incoming trust and zero outgoing trust.",
  },
  {
    id: "employee-importance",
    patternId: "graphs",
    name: "Employee Importance",
    difficulty: "Easy",
    number: 690,
    description:
      "You have a data structure of employee information, including the employee's unique id, importance value, and direct subordinates' ids. You are given an array of employees where employees[i] is the ith employee, and an integer id. Return the total importance value of this employee and all their subordinates.",
    examples: [
      {
        input:
          'employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1',
        output: "11",
        explanation:
          "Employee 1 has an importance value of 5 and has two direct subordinates: employee 2 and employee 3 with importance values 3 and 3. Total = 5 + 3 + 3 = 11.",
      },
    ],
    constraints: [
      "1 <= employees.length <= 2000",
      "1 <= employees[i].id <= 2000",
      "All employees[i].id are unique.",
      "-100 <= employees[i].importance <= 100",
      "One employee has at most one direct leader.",
      "The given employee id is a valid id in the array.",
    ],
    starterCode:
      '/**\n * @param {Array<{id:number,importance:number,subordinates:number[]}>} employees\n * @param {number} id\n * @return {number}\n */\nvar GetImportance = function(employees, id) {\n    // Write your code here\n    \n};',
    solution:
      'var GetImportance = function(employees, id) {\n    const map = new Map();\n    for (const e of employees) {\n        map.set(e.id, e);\n    }\n    const dfs = (eid) => {\n        const e = map.get(eid);\n        let total = e.importance;\n        for (const sub of e.subordinates) {\n            total += dfs(sub);\n        }\n        return total;\n    };\n    return dfs(id);\n};',
    testCases: [
      {
        input: "employees = [{id:1,importance:5,subordinates:[2,3]},...], id = 1",
        expected: "11",
        args: [
          [
            { id: 1, importance: 5, subordinates: [2, 3] },
            { id: 2, importance: 3, subordinates: [] },
            { id: 3, importance: 3, subordinates: [] },
          ],
          1,
        ],
        expectedValue: 11,
      },
      {
        input: "employees = [{id:1,importance:2,subordinates:[2]},{id:2,importance:3,subordinates:[]}], id = 2",
        expected: "3",
        args: [
          [
            { id: 1, importance: 2, subordinates: [2] },
            { id: 2, importance: 3, subordinates: [] },
          ],
          2,
        ],
        expectedValue: 3,
      },
    ],
    why: "Employee Importance is a simple tree/graph DFS where each node aggregates values from its subordinates.",
  },
  {
    id: "destination-city",
    patternId: "graphs",
    name: "Destination City",
    difficulty: "Easy",
    number: 1436,
    description:
      "You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, the city without any path outgoing to another city. It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.",
    examples: [
      {
        input:
          'paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]',
        output: '"Sao Paulo"',
        explanation:
          '"London" -> "New York" -> "Lima" -> "Sao Paulo". The destination city is "Sao Paulo" because it has no outgoing path.',
      },
      {
        input: 'paths = [["B","C"],["D","B"],["C","A"]]',
        output: '"A"',
      },
    ],
    constraints: [
      "1 <= paths.length <= 100",
      "paths[i].length == 2",
      "1 <= cityAi.length, cityBi.length <= 10",
      "cityAi != cityBi",
      "All strings consist of lowercase and uppercase English letters and the space character.",
    ],
    starterCode:
      '/**\n * @param {string[][]} paths\n * @return {string}\n */\nvar destCity = function(paths) {\n    // Write your code here\n    \n};',
    solution:
      'var destCity = function(paths) {\n    const outgoing = new Set();\n    for (const [a, b] of paths) {\n        outgoing.add(a);\n    }\n    for (const [a, b] of paths) {\n        if (!outgoing.has(b)) return b;\n    }\n    return "";\n};',
    testCases: [
      {
        input:
          'paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]',
        expected: '"Sao Paulo"',
        args: [
          [
            ["London", "New York"],
            ["New York", "Lima"],
            ["Lima", "Sao Paulo"],
          ],
        ],
        expectedValue: "Sao Paulo",
      },
      {
        input: 'paths = [["B","C"],["D","B"],["C","A"]]',
        expected: '"A"',
        args: [[["B", "C"], ["D", "B"], ["C", "A"]]],
        expectedValue: "A",
      },
    ],
    why: "Destination City uses a Set to track outgoing edges and finds the city with no outgoing connection.",
  },
  {
    id: "number-of-islands",
    patternId: "graphs",
    name: "Number of Islands",
    difficulty: "Medium",
    number: 200,
    description:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
      },
      {
        input:
          'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      'grid[i][j] is "0" or "1".',
    ],
    starterCode:
      '/**\n * @param {character[][]} grid\n * @return {number}\n */\nvar numIslands = function(grid) {\n    // Write your code here\n    \n};',
    solution:
      'var numIslands = function(grid) {\n    const m = grid.length, n = grid[0].length;\n    let count = 0;\n    const dfs = (r, c) => {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === "0") return;\n        grid[r][c] = "0";\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    };\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === "1") {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    return count;\n};',
    testCases: [
      {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        expected: "1",
        args: [
          [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
          ],
        ],
        expectedValue: 1,
      },
      {
        input:
          'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        expected: "3",
        args: [
          [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
          ],
        ],
        expectedValue: 3,
      },
    ],
    why: "Number of Islands is the classic connected-components problem on a grid, solved by DFS/BFS.",
  },
  {
    id: "clone-graph",
    patternId: "graphs",
    name: "Clone Graph",
    difficulty: "Medium",
    number: 133,
    description:
      "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list of neighbors. For simplicity, the graph is represented as an adjacency list and the function receives/returns the adjacency list.",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation:
          "The clone should preserve the structure and values of the original graph.",
      },
      {
        input: "adjList = [[]]",
        output: "[[]]",
      },
    ],
    constraints: [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node.",
    ],
    starterCode:
      '/**\n * @param {number[][]} adjList\n * @return {number[][]}\n */\nvar cloneGraph = function(adjList) {\n    // Write your code here\n    \n};',
    solution:
      'var cloneGraph = function(adjList) {\n    if (!adjList || !adjList.length) return [];\n    const n = adjList.length;\n    const visited = new Array(n + 1).fill(false);\n    const clone = Array.from({ length: n + 1 }, () => []);\n    const build = (val) => {\n        if (visited[val]) return;\n        visited[val] = true;\n        for (const nei of adjList[val - 1]) {\n            clone[val].push(nei);\n            build(nei);\n        }\n    };\n    build(1);\n    return clone.slice(1);\n};',
    testCases: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        expected: "[[2,4],[1,3],[2,4],[1,3]]",
        args: [[[2, 4], [1, 3], [2, 4], [1, 3]]],
        expectedValue: [[2, 4], [1, 3], [2, 4], [1, 3]],
      },
      {
        input: "adjList = [[]]",
        expected: "[[]]",
        args: [[[]]],
        expectedValue: [[]],
      },
    ],
    why: "Clone Graph teaches DFS traversal with a visited map to create deep copies of nodes without duplication.",
  },
  {
    id: "course-schedule",
    patternId: "graphs",
    name: "Course Schedule",
    difficulty: "Medium",
    number: 207,
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
      },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All the pairs prerequisites[i] are unique.",
    ],
    starterCode:
      '/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function(numCourses, prerequisites) {\n    // Write your code here\n    \n};',
    solution:
      'var canFinish = function(numCourses, prerequisites) {\n    const graph = Array.from({ length: numCourses }, () => []);\n    const indegree = new Array(numCourses).fill(0);\n    for (const [a, b] of prerequisites) {\n        graph[b].push(a);\n        indegree[a]++;\n    }\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (indegree[i] === 0) queue.push(i);\n    }\n    let visited = 0;\n    while (queue.length) {\n        const node = queue.shift();\n        visited++;\n        for (const nei of graph[node]) {\n            indegree[nei]--;\n            if (indegree[nei] === 0) queue.push(nei);\n        }\n    }\n    return visited === numCourses;\n};',
    testCases: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        expected: "true",
        args: [2, [[1, 0]]],
        expectedValue: true,
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        expected: "false",
        args: [2, [[1, 0], [0, 1]]],
        expectedValue: false,
      },
    ],
    why: "Course Schedule uses topological sort (Kahn's algorithm) to detect cycles in a directed graph.",
  },
  {
    id: "course-schedule-ii",
    patternId: "graphs",
    name: "Course Schedule II",
    difficulty: "Medium",
    number: 210,
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If it is impossible, return an empty array.",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "[0,1]",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].",
      },
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        output: "[0,2,1,3]",
      },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= numCourses * (numCourses - 1) / 2",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "ai != bi",
      "All the pairs prerequisites[i] are unique.",
    ],
    starterCode:
      '/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {number[]}\n */\nvar findOrder = function(numCourses, prerequisites) {\n    // Write your code here\n    \n};',
    solution:
      'var findOrder = function(numCourses, prerequisites) {\n    const graph = Array.from({ length: numCourses }, () => []);\n    const indegree = new Array(numCourses).fill(0);\n    for (const [a, b] of prerequisites) {\n        graph[b].push(a);\n        indegree[a]++;\n    }\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (indegree[i] === 0) queue.push(i);\n    }\n    const order = [];\n    while (queue.length) {\n        const node = queue.shift();\n        order.push(node);\n        for (const nei of graph[node]) {\n            indegree[nei]--;\n            if (indegree[nei] === 0) queue.push(nei);\n        }\n    }\n    return order.length === numCourses ? order : [];\n};',
    testCases: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        expected: "[0,1]",
        args: [2, [[1, 0]]],
        expectedValue: [0, 1],
      },
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        expected: "[0,2,1,3]",
        args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
        expectedValue: [0, 2, 1, 3],
      },
    ],
    why: "Course Schedule II extends topological sort to actually return a valid ordering of nodes.",
  },
  {
    id: "pacific-atlantic-water-flow",
    patternId: "graphs",
    name: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    number: 417,
    description:
      "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. The island is partitioned into a grid of square cells. Given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c). The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
    examples: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
    ],
    constraints: [
      "m == heights.length",
      "n == heights[r].length",
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 105",
    ],
    starterCode:
      '/**\n * @param {number[][]} heights\n * @return {number[][]}\n */\nvar pacificAtlantic = function(heights) {\n    // Write your code here\n    \n};',
    solution:
      'var pacificAtlantic = function(heights) {\n    const m = heights.length, n = heights[0].length;\n    const pacific = Array.from({ length: m }, () => new Array(n).fill(false));\n    const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));\n    const dfs = (r, c, visited, prevHeight) => {\n        if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || heights[r][c] < prevHeight) return;\n        visited[r][c] = true;\n        dfs(r + 1, c, visited, heights[r][c]);\n        dfs(r - 1, c, visited, heights[r][c]);\n        dfs(r, c + 1, visited, heights[r][c]);\n        dfs(r, c - 1, visited, heights[r][c]);\n    };\n    for (let r = 0; r < m; r++) {\n        dfs(r, 0, pacific, heights[r][0]);\n        dfs(r, n - 1, atlantic, heights[r][n - 1]);\n    }\n    for (let c = 0; c < n; c++) {\n        dfs(0, c, pacific, heights[0][c]);\n        dfs(m - 1, c, atlantic, heights[m - 1][c]);\n    }\n    const res = [];\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (pacific[r][c] && atlantic[r][c]) res.push([r, c]);\n        }\n    }\n    return res;\n};',
    testCases: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        expected: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
        args: [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]],
        expectedValue: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
      },
    ],
    why: "Pacific Atlantic Water Flow uses reverse DFS from ocean borders to find cells reachable by both oceans.",
  },
  {
    id: "surrounded-regions",
    patternId: "graphs",
    name: "Surrounded Regions",
    difficulty: "Medium",
    number: 130,
    description:
      "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region. You cannot capture any 'O' that is on the border.",
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
        explanation: "All 'O's on the border and connected to the border are not flipped.",
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 200",
      "board[i][j] is 'X' or 'O'.",
    ],
    starterCode:
      '/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solve = function(board) {\n    // Write your code here\n    \n};',
    solution:
      'var solve = function(board) {\n    const m = board.length, n = board[0].length;\n    const dfs = (r, c) => {\n        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== "O") return;\n        board[r][c] = "S";\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    };\n    for (let r = 0; r < m; r++) {\n        dfs(r, 0);\n        dfs(r, n - 1);\n    }\n    for (let c = 0; c < n; c++) {\n        dfs(0, c);\n        dfs(m - 1, c);\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (board[r][c] === "O") board[r][c] = "X";\n            if (board[r][c] === "S") board[r][c] = "O";\n        }\n    }\n    return board;\n};',
    testCases: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        expected: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
        args: [
          [
            ["X", "X", "X", "X"],
            ["X", "O", "O", "X"],
            ["X", "X", "O", "X"],
            ["X", "O", "X", "X"],
          ],
        ],
        expectedValue: [
          ["X", "X", "X", "X"],
          ["X", "X", "X", "X"],
          ["X", "X", "X", "X"],
          ["X", "O", "X", "X"],
        ],
      },
    ],
    why: "Surrounded Regions uses DFS from borders to mark safe 'O' regions before flipping the rest.",
  },
  {
    id: "rotting-oranges",
    patternId: "graphs",
    name: "Rotting Oranges",
    difficulty: "Medium",
    number: 994,
    description:
      "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
    examples: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        output: "4",
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        output: "-1",
        explanation: "The orange in the bottom left corner is unreachable.",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 10",
      "grid[i][j] is 0, 1, or 2.",
    ],
    starterCode:
      '/**\n * @param {number[][]} grid\n * @return {number}\n */\nvar orangesRotting = function(grid) {\n    // Write your code here\n    \n};',
    solution:
      'var orangesRotting = function(grid) {\n    const m = grid.length, n = grid[0].length;\n    const queue = [];\n    let fresh = 0;\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === 2) queue.push([r, c]);\n            else if (grid[r][c] === 1) fresh++;\n        }\n    }\n    let minutes = 0;\n    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n    while (queue.length && fresh > 0) {\n        const size = queue.length;\n        for (let i = 0; i < size; i++) {\n            const [r, c] = queue.shift();\n            for (const [dr, dc] of dirs) {\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {\n                    grid[nr][nc] = 2;\n                    fresh--;\n                    queue.push([nr, nc]);\n                }\n            }\n        }\n        minutes++;\n    }\n    return fresh === 0 ? minutes : -1;\n};',
    testCases: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        expected: "4",
        args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]],
        expectedValue: 4,
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        expected: "-1",
        args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]],
        expectedValue: -1,
      },
    ],
    why: "Rotting Oranges is a classic multi-source BFS problem where each level represents one minute.",
  },
  {
    id: "evaluate-division",
    patternId: "graphs",
    name: "Evaluate Division",
    difficulty: "Medium",
    number: 399,
    description:
      "You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Some Ai, Bi pairs do not exist in equations. Return the answers to all queries. If a single answer cannot be determined, return -1.0.",
    examples: [
      {
        input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
        output: "[6.0,0.5,-1.0,1.0,-1.0]",
      },
    ],
    constraints: [
      "1 <= equations.length <= 20",
      "equations[i].length == 2",
      "1 <= Ai.length, Bi.length <= 5",
      "values.length == equations.length",
      "0.0 < values[i] <= 20.0",
      "1 <= queries.length <= 20",
      "queries[i].length == 2",
      "1 <= queries[i][j].length <= 5",
    ],
    starterCode:
      '/**\n * @param {string[][]} equations\n * @param {number[]} values\n * @param {string[][]} queries\n * @return {number[]}\n */\nvar calcEquation = function(equations, values, queries) {\n    // Write your code here\n    \n};',
    solution:
      'var calcEquation = function(equations, values, queries) {\n    const graph = new Map();\n    const addEdge = (a, b, val) => {\n        if (!graph.has(a)) graph.set(a, []);\n        graph.get(a).push([b, val]);\n    };\n    for (let i = 0; i < equations.length; i++) {\n        const [a, b] = equations[i];\n        const val = values[i];\n        addEdge(a, b, val);\n        addEdge(b, a, 1 / val);\n    }\n    const dfs = (src, dst, visited) => {\n        if (!graph.has(src) || !graph.has(dst)) return -1.0;\n        if (src === dst) return 1.0;\n        visited.add(src);\n        for (const [nei, weight] of graph.get(src)) {\n            if (visited.has(nei)) continue;\n            const res = dfs(nei, dst, visited);\n            if (res !== -1.0) return res * weight;\n        }\n        return -1.0;\n    };\n    return queries.map(([a, b]) => dfs(a, b, new Set()));\n};',
    testCases: [
      {
        input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
        expected: "[6.0,0.5,-1.0,1.0,-1.0]",
        args: [[["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]],
        expectedValue: [6.0, 0.5, -1.0, 1.0, -1.0],
      },
    ],
    why: "Evaluate Division builds a weighted graph and uses DFS to find multiplicative paths between variables.",
  },
  {
    id: "cheapest-flights-within-k-stops",
    patternId: "graphs",
    name: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    number: 787,
    description:
      "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
    examples: [
      {
        input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
        output: "700",
        explanation: "The optimal path with at most 1 stop from city 0 to 3 is 0 -> 1 -> 3 with cost 100 + 600 = 700.",
      },
      {
        input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
        output: "200",
        explanation: "The optimal path with at most 1 stop from city 0 to 2 is 0 -> 1 -> 2 with cost 100 + 100 = 200.",
      },
    ],
    constraints: [
      "1 <= n <= 100",
      "0 <= flights.length <= (n * (n - 1) / 2)",
      "flights[i].length == 3",
      "0 <= fromi, toi < n",
      "fromi != toi",
      "1 <= pricei <= 104",
      "There will not be any multiple flights between two cities.",
      "0 <= src, dst, k < n",
      "dst != src",
    ],
    starterCode:
      '/**\n * @param {number} n\n * @param {number[][]} flights\n * @param {number} src\n * @param {number} dst\n * @param {number} k\n * @return {number}\n */\nvar findCheapestPrice = function(n, flights, src, dst, k) {\n    // Write your code here\n    \n};',
    solution:
      'var findCheapestPrice = function(n, flights, src, dst, k) {\n    const prices = new Array(n).fill(Infinity);\n    prices[src] = 0;\n    for (let i = 0; i <= k; i++) {\n        const tempPrices = [...prices];\n        for (const [from, to, price] of flights) {\n            if (prices[from] === Infinity) continue;\n            tempPrices[to] = Math.min(tempPrices[to], prices[from] + price);\n        }\n        prices.splice(0, n, ...tempPrices);\n    }\n    return prices[dst] === Infinity ? -1 : prices[dst];\n};',
    testCases: [
      {
        input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
        expected: "700",
        args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1],
        expectedValue: 700,
      },
      {
        input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
        expected: "200",
        args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1],
        expectedValue: 200,
      },
    ],
    why: "Cheapest Flights uses a dynamic programming Bellman-Ford style relaxation with a stops constraint.",
  },
  {
    id: "is-graph-bipartite",
    patternId: "graphs",
    name: "Is Graph Bipartite?",
    difficulty: "Medium",
    number: 785,
    description:
      "There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. Return true if and only if it is bipartite.",
    examples: [
      {
        input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
        output: "false",
        explanation: "We cannot partition the nodes into two independent subsets.",
      },
      {
        input: "graph = [[1,3],[0,2],[1,3],[0,2]]",
        output: "true",
      },
    ],
    constraints: [
      "graph.length == n",
      "1 <= n <= 100",
      "0 <= graph[u].length < n",
      "0 <= graph[u][i] <= n - 1",
      "graph[u] does not contain u.",
      "All the values of graph[u] are unique.",
      "If graph[u] contains v, then graph[v] contains u.",
    ],
    starterCode:
      '/**\n * @param {number[][]} graph\n * @return {boolean}\n */\nvar isBipartite = function(graph) {\n    // Write your code here\n    \n};',
    solution:
      'var isBipartite = function(graph) {\n    const n = graph.length;\n    const colors = new Array(n).fill(-1);\n    const bfs = (start) => {\n        const queue = [start];\n        colors[start] = 0;\n        while (queue.length) {\n            const node = queue.shift();\n            for (const nei of graph[node]) {\n                if (colors[nei] === -1) {\n                    colors[nei] = colors[node] ^ 1;\n                    queue.push(nei);\n                } else if (colors[nei] === colors[node]) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n    for (let i = 0; i < n; i++) {\n        if (colors[i] === -1 && !bfs(i)) return false;\n    }\n    return true;\n};',
    testCases: [
      {
        input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
        expected: "false",
        args: [[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]],
        expectedValue: false,
      },
      {
        input: "graph = [[1,3],[0,2],[1,3],[0,2]]",
        expected: "true",
        args: [[[1, 3], [0, 2], [1, 3], [0, 2]]],
        expectedValue: true,
      },
    ],
    why: "Is Graph Bipartite uses BFS coloring to check whether a graph can be divided into two independent sets.",
  },
  {
    id: "redundant-connection",
    patternId: "graphs",
    name: "Redundant Connection",
    difficulty: "Medium",
    number: 684,
    description:
      "In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi. Return an edge that can be removed so that the result is a tree. If there are multiple answers, return the answer that occurs last in the input.",
    examples: [
      {
        input: "edges = [[1,2],[1,3],[2,3]]",
        output: "[2,3]",
      },
      {
        input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
        output: "[1,4]",
      },
    ],
    constraints: [
      "n == edges.length",
      "3 <= n <= 1000",
      "edges[i].length == 2",
      "1 <= ai < bi <= edges.length",
      "ai != bi",
      "There are no repeated edges.",
      "The given graph is connected.",
    ],
    starterCode:
      '/**\n * @param {number[][]} edges\n * @return {number[]}\n */\nvar findRedundantConnection = function(edges) {\n    // Write your code here\n    \n};',
    solution:
      'var findRedundantConnection = function(edges) {\n    const n = edges.length;\n    const parent = new Array(n + 1).fill(0).map((_, i) => i);\n    const rank = new Array(n + 1).fill(0);\n    const find = (x) => {\n        if (parent[x] !== x) parent[x] = find(parent[x]);\n        return parent[x];\n    };\n    const union = (x, y) => {\n        const rootX = find(x), rootY = find(y);\n        if (rootX === rootY) return false;\n        if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;\n        else if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;\n        else {\n            parent[rootY] = rootX;\n            rank[rootX]++;\n        }\n        return true;\n    };\n    for (const [u, v] of edges) {\n        if (!union(u, v)) return [u, v];\n    }\n    return [];\n};',
    testCases: [
      {
        input: "edges = [[1,2],[1,3],[2,3]]",
        expected: "[2,3]",
        args: [[[1, 2], [1, 3], [2, 3]]],
        expectedValue: [2, 3],
      },
      {
        input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
        expected: "[1,4]",
        args: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]],
        expectedValue: [1, 4],
      },
    ],
    why: "Redundant Connection is the classic Union-Find problem for detecting the first edge that forms a cycle.",
  },
  {
    id: "accounts-merge",
    patternId: "graphs",
    name: "Accounts Merge",
    difficulty: "Medium",
    number: 721,
    description:
      "Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account. Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.",
    examples: [
      {
        input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
        output: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
      },
    ],
    constraints: [
      "1 <= accounts.length <= 1000",
      "2 <= accounts[i].length <= 10",
      "1 <= accounts[i][j].length <= 30",
      "accounts[i][0] consists of English letters.",
      "accounts[i][j] (for j > 0) is a valid email.",
    ],
    starterCode:
      '/**\n * @param {string[][]} accounts\n * @return {string[][]}\n */\nvar accountsMerge = function(accounts) {\n    // Write your code here\n    \n};',
    solution:
      'var accountsMerge = function(accounts) {\n    const parent = {};\n    const find = (x) => {\n        if (parent[x] !== x) parent[x] = find(parent[x]);\n        return parent[x];\n    };\n    const union = (x, y) => {\n        parent[find(x)] = find(y);\n    };\n    const emailToName = {};\n    for (const acc of accounts) {\n        const name = acc[0];\n        for (let i = 1; i < acc.length; i++) {\n            const email = acc[i];\n            if (!parent[email]) parent[email] = email;\n            emailToName[email] = name;\n            union(acc[1], email);\n        }\n    }\n    const groups = {};\n    for (const email in parent) {\n        const root = find(email);\n        if (!groups[root]) groups[root] = [];\n        groups[root].push(email);\n    }\n    const res = [];\n    for (const root in groups) {\n        const emails = groups[root].sort();\n        res.push([emailToName[root], ...emails]);\n    }\n    return res;\n};',
    testCases: [
      {
        input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
        expected: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["John","johnnybravo@mail.com"],["Mary","mary@mail.com"]]',
        args: [
          [
            ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
            ["John", "johnsmith@mail.com", "john00@mail.com"],
            ["Mary", "mary@mail.com"],
            ["John", "johnnybravo@mail.com"],
          ],
        ],
        expectedValue: [
          ["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"],
          ["John", "johnnybravo@mail.com"],
          ["Mary", "mary@mail.com"],
        ],
      },
    ],
    why: "Accounts Merge combines Union-Find with email grouping to connect accounts that share common addresses.",
  },
  {
    id: "all-paths-from-source-to-target",
    patternId: "graphs",
    name: "All Paths From Source to Target",
    difficulty: "Medium",
    number: 797,
    description:
      "Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order. The graph is given as follows: graph[i] is a list of all nodes you can visit from node i.",
    examples: [
      {
        input: "graph = [[1,2],[3],[3],[]]",
        output: "[[0,1,3],[0,2,3]]",
      },
      {
        input: "graph = [[4,3,1],[3,2,4],[3],[4],[]]",
        output: "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]",
      },
    ],
    constraints: [
      "n == graph.length",
      "2 <= n <= 15",
      "0 <= graph[i][j] < n",
      "graph[i][j] != i",
      "The input graph is guaranteed to be a DAG.",
    ],
    starterCode:
      '/**\n * @param {number[][]} graph\n * @return {number[][]}\n */\nvar allPathsSourceTarget = function(graph) {\n    // Write your code here\n    \n};',
    solution:
      'var allPathsSourceTarget = function(graph) {\n    const n = graph.length;\n    const res = [];\n    const dfs = (node, path) => {\n        if (node === n - 1) {\n            res.push([...path]);\n            return;\n        }\n        for (const nei of graph[node]) {\n            path.push(nei);\n            dfs(nei, path);\n            path.pop();\n        }\n    };\n    dfs(0, [0]);\n    return res;\n};',
    testCases: [
      {
        input: "graph = [[1,2],[3],[3],[]]",
        expected: "[[0,1,3],[0,2,3]]",
        args: [[[1, 2], [3], [3], []]],
        expectedValue: [[0, 1, 3], [0, 2, 3]],
      },
      {
        input: "graph = [[4,3,1],[3,2,4],[3],[4],[]]",
        expected: "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]",
        args: [[[4, 3, 1], [3, 2, 4], [3], [4], []]],
        expectedValue: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]],
      },
    ],
    why: "All Paths From Source to Target is a classic DFS traversal on a DAG to enumerate every route to the target node.",
  },
  {
    id: "word-ladder",
    patternId: "graphs",
    name: "Word Ladder",
    difficulty: "Hard",
    number: 127,
    description:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si is in wordList. Note that beginWord is not necessarily in wordList. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: "One shortest transformation is hit -> hot -> dot -> dog -> cog, which is 5 words long.",
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
      },
    ],
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All the words in wordList are unique.",
    ],
    starterCode:
      '/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {number}\n */\nvar ladderLength = function(beginWord, endWord, wordList) {\n    // Write your code here\n    \n};',
    solution:
      'var ladderLength = function(beginWord, endWord, wordList) {\n    const wordSet = new Set(wordList);\n    if (!wordSet.has(endWord)) return 0;\n    const queue = [beginWord];\n    const visited = new Set([beginWord]);\n    let steps = 1;\n    while (queue.length) {\n        const size = queue.length;\n        for (let i = 0; i < size; i++) {\n            const word = queue.shift();\n            for (let j = 0; j < word.length; j++) {\n                for (let c = 97; c <= 122; c++) {\n                    const next = word.slice(0, j) + String.fromCharCode(c) + word.slice(j + 1);\n                    if (next === endWord) return steps + 1;\n                    if (wordSet.has(next) && !visited.has(next)) {\n                        visited.add(next);\n                        queue.push(next);\n                    }\n                }\n            }\n        }\n        steps++;\n    }\n    return 0;\n};',
    testCases: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        expected: "5",
        args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
        expectedValue: 5,
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        expected: "0",
        args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]],
        expectedValue: 0,
      },
    ],
    why: "Word Ladder uses BFS on an implicit graph where edges exist between words differing by one letter.",
  },
  {
    id: "word-search-ii",
    patternId: "graphs",
    name: "Word Search II",
    difficulty: "Hard",
    number: 212,
    description:
      "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 12",
      "board[i][j] is a lowercase English letter.",
      "1 <= words.length <= 3 * 104",
      "1 <= words[i].length <= 10",
      "words[i] consists of lowercase English letters.",
      "All the strings of words are unique.",
    ],
    starterCode:
      '/**\n * @param {character[][]} board\n * @param {string[]} words\n * @return {string[]}\n */\nvar findWords = function(board, words) {\n    // Write your code here\n    \n};',
    solution:
      'var findWords = function(board, words) {\n    const m = board.length, n = board[0].length;\n    const root = {};\n    for (const word of words) {\n        let node = root;\n        for (const ch of word) {\n            if (!node[ch]) node[ch] = {};\n            node = node[ch];\n        }\n        node.word = word;\n    }\n    const res = [];\n    const dfs = (r, c, node) => {\n        if (r < 0 || r >= m || c < 0 || c >= n || !node[board[r][c]]) return;\n        const ch = board[r][c];\n        const nextNode = node[ch];\n        if (nextNode.word) {\n            res.push(nextNode.word);\n            nextNode.word = null;\n        }\n        board[r][c] = "#";\n        dfs(r + 1, c, nextNode);\n        dfs(r - 1, c, nextNode);\n        dfs(r, c + 1, nextNode);\n        dfs(r, c - 1, nextNode);\n        board[r][c] = ch;\n    };\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            dfs(r, c, root);\n        }\n    }\n    return res;\n};',
    testCases: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        expected: '["eat","oath"]',
        args: [
          [
            ["o", "a", "a", "n"],
            ["e", "t", "a", "e"],
            ["i", "h", "k", "r"],
            ["i", "f", "l", "v"],
          ],
          ["oath", "pea", "eat", "rain"],
        ],
        expectedValue: ["eat", "oath"],
      },
    ],
    why: "Word Search II combines Trie prefix elimination with board backtracking to avoid redundant exploration.",
  },
  {
    id: "alien-dictionary",
    patternId: "graphs",
    name: "Alien Dictionary",
    difficulty: "Hard",
    number: 269,
    description:
      "There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you. You are given a list of strings words from the alien language's dictionary. The strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order. If there is no solution, return ''. If there are multiple solutions, return any of them.",
    examples: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        output: '"wertf"',
      },
      {
        input: 'words = ["z","x"]',
        output: '"zx"',
      },
      {
        input: 'words = ["z","x","z"]',
        output: '""',
        explanation: "The order is invalid because 'z' both precedes and follows 'x'.",
      },
    ],
    constraints: [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100",
      "words[i] consists of only lowercase English letters.",
    ],
    starterCode:
      '/**\n * @param {string[]} words\n * @return {string}\n */\nvar alienOrder = function(words) {\n    // Write your code here\n    \n};',
    solution:
      'var alienOrder = function(words) {\n    const adj = new Map();\n    const indegree = new Map();\n    for (const word of words) {\n        for (const ch of word) {\n            if (!adj.has(ch)) adj.set(ch, []);\n            if (!indegree.has(ch)) indegree.set(ch, 0);\n        }\n    }\n    for (let i = 0; i < words.length - 1; i++) {\n        const w1 = words[i], w2 = words[i + 1];\n        if (w1.length > w2.length && w1.startsWith(w2)) return "";\n        const len = Math.min(w1.length, w2.length);\n        for (let j = 0; j < len; j++) {\n            if (w1[j] !== w2[j]) {\n                adj.get(w1[j]).push(w2[j]);\n                indegree.set(w2[j], indegree.get(w2[j]) + 1);\n                break;\n            }\n        }\n    }\n    const queue = [];\n    for (const [ch, deg] of indegree) {\n        if (deg === 0) queue.push(ch);\n    }\n    let res = "";\n    while (queue.length) {\n        const ch = queue.shift();\n        res += ch;\n        for (const nei of adj.get(ch)) {\n            indegree.set(nei, indegree.get(nei) - 1);\n            if (indegree.get(nei) === 0) queue.push(nei);\n        }\n    }\n    return res.length === indegree.size ? res : "";\n};',
    testCases: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        expected: '"wertf"',
        args: [["wrt", "wrf", "er", "ett", "rftt"]],
        expectedValue: "wertf",
      },
      {
        input: 'words = ["z","x"]',
        expected: '"zx"',
        args: [["z", "x"]],
        expectedValue: "zx",
      },
      {
        input: 'words = ["z","x","z"]',
        expected: '""',
        args: [["z", "x", "z"]],
        expectedValue: "",
      },
    ],
    why: "Alien Dictionary builds a directed graph of character precedence and uses topological sort to derive the alphabet order.",
  },
  {
    id: "reconstruct-itinerary",
    patternId: "graphs",
    name: "Reconstruct Itinerary",
    difficulty: "Hard",
    number: 332,
    description:
      "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from JFK, thus the itinerary must begin with JFK. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order.",
    examples: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        output: '["JFK","MUC","LHR","SFO","SJC"]',
      },
      {
        input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
        output: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
      },
    ],
    constraints: [
      "1 <= tickets.length <= 300",
      "tickets[i].length == 2",
      "fromi.length == 3",
      "toi.length == 3",
      "fromi and toi consist of uppercase English letters.",
      "fromi != toi",
    ],
    starterCode:
      '/**\n * @param {string[][]} tickets\n * @return {string[]}\n */\nvar findItinerary = function(tickets) {\n    // Write your code here\n    \n};',
    solution:
      'var findItinerary = function(tickets) {\n    const graph = new Map();\n    for (const [from, to] of tickets) {\n        if (!graph.has(from)) graph.set(from, []);\n        graph.get(from).push(to);\n    }\n    for (const [key, val] of graph) {\n        val.sort().reverse();\n    }\n    const res = [];\n    const dfs = (airport) => {\n        const destinations = graph.get(airport) || [];\n        while (destinations.length) {\n            dfs(destinations.pop());\n        }\n        res.push(airport);\n    };\n    dfs("JFK");\n    return res.reverse();\n};',
    testCases: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        expected: '["JFK","MUC","LHR","SFO","SJC"]',
        args: [[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]],
        expectedValue: ["JFK", "MUC", "LHR", "SFO", "SJC"],
      },
      {
        input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
        expected: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
        args: [[["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]],
        expectedValue: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
      },
    ],
    why: "Reconstruct Itinerary solves the Eulerian path problem by greedily visiting lexicographically sorted destinations via DFS.",
  },
  {
    id: "longest-increasing-path-in-matrix",
    patternId: "graphs",
    name: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    number: 329,
    description:
      "Given an m x n integers matrix, return the length of the longest increasing path in matrix. From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.",
    examples: [
      {
        input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
        output: "4",
        explanation: "The longest increasing path is [1, 2, 6, 9].",
      },
      {
        input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
        output: "4",
        explanation: "The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 200",
      "-231 <= matrix[i][j] <= 231 - 1",
    ],
    starterCode:
      '/**\n * @param {number[][]} matrix\n * @return {number}\n */\nvar longestIncreasingPath = function(matrix) {\n    // Write your code here\n    \n};',
    solution:
      'var longestIncreasingPath = function(matrix) {\n    const m = matrix.length, n = matrix[0].length;\n    const memo = Array.from({ length: m }, () => new Array(n).fill(-1));\n    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n    const dfs = (r, c) => {\n        if (memo[r][c] !== -1) return memo[r][c];\n        let maxLen = 1;\n        for (const [dr, dc] of dirs) {\n            const nr = r + dr, nc = c + dc;\n            if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {\n                maxLen = Math.max(maxLen, 1 + dfs(nr, nc));\n            }\n        }\n        memo[r][c] = maxLen;\n        return maxLen;\n    };\n    let result = 0;\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            result = Math.max(result, dfs(r, c));\n        }\n    }\n    return result;\n};',
    testCases: [
      {
        input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
        expected: "4",
        args: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]],
        expectedValue: 4,
      },
      {
        input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
        expected: "4",
        args: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]],
        expectedValue: 4,
      },
    ],
    why: "Longest Increasing Path combines DFS with memoization to avoid recomputing paths from the same cell.",
  },
];

export const batch4Problems: Problem[] = [
  ...backtrackingProblems,
  ...graphProblems,
];
