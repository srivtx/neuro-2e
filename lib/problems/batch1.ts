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

export const batch1Problems: Problem[] = [
  {
    id: "two-sum",
    patternId: "hashmap",
    name: "Two Sum",
    difficulty: "Easy",
    number: 1,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 */
var twoSum = function(nums, target) {
    // Write your code here
    
};`,
    solution: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`,
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", args: [[2,7,11,15], 9], expectedValue: [0,1] },
      { input: "nums = [3,2,4], target = 6", expected: "[1,2]", args: [[3,2,4], 6], expectedValue: [1,2] },
      { input: "nums = [3,3], target = 6", expected: "[0,1]", args: [[3,3], 6], expectedValue: [0,1] }
    ],
    why: "A hash map provides the O(1) lookup needed to find the complement of each element in a single pass."
  },
  {
    id: "contains-duplicate",
    patternId: "hashmap",
    name: "Contains Duplicate",
    difficulty: "Easy",
    number: 217,
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var containsDuplicate = function(nums) {
    // Write your code here
    
};`,
    solution: `var containsDuplicate = function(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }
    return false;
};`,
    testCases: [
      { input: "nums = [1,2,3,1]", expected: "true", args: [[1,2,3,1]], expectedValue: true },
      { input: "nums = [1,2,3,4]", expected: "false", args: [[1,2,3,4]], expectedValue: false },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", expected: "true", args: [[1,1,1,3,3,4,3,2,4,2]], expectedValue: true }
    ],
    why: "A hash set lets us check for prior existence of each number in amortized O(1) time."
  },
  {
    id: "valid-anagram",
    patternId: "hashmap",
    name: "Valid Anagram",
    difficulty: "Easy",
    number: 242,
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
      { input: "s = \"rat\", t = \"car\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 */
var isAnagram = function(s, t) {
    // Write your code here
    
};`,
    solution: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (const c of s) count[c] = (count[c] || 0) + 1;
    for (const c of t) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
};`,
    testCases: [
      { input: "s = \"anagram\", t = \"nagaram\"", expected: "true", args: ["anagram", "nagaram"], expectedValue: true },
      { input: "s = \"rat\", t = \"car\"", expected: "false", args: ["rat", "car"], expectedValue: false },
      { input: "s = \"a\", t = \"ab\"", expected: "false", args: ["a", "ab"], expectedValue: false }
    ],
    why: "A frequency table lets us compare character counts in linear time without sorting."
  },
  {
    id: "intersection-of-two-arrays",
    patternId: "hashmap",
    name: "Intersection of Two Arrays",
    difficulty: "Easy",
    number: 349,
    description: `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.`,
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]" },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[9,4]" }
    ],
    constraints: [
      "1 <= nums1.length, nums2.length <= 1000",
      "0 <= nums1[i], nums2[i] <= 1000"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var intersection = function(nums1, nums2) {
    // Write your code here
    
};`,
    solution: `var intersection = function(nums1, nums2) {
    const set1 = new Set(nums1);
    const result = new Set();
    for (const num of nums2) {
        if (set1.has(num)) result.add(num);
    }
    return Array.from(result);
};`,
    testCases: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", expected: "[2]", args: [[1,2,2,1], [2,2]], expectedValue: [2] },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", expected: "[9,4]", args: [[4,9,5], [9,4,9,8,4]], expectedValue: [9,4] },
      { input: "nums1 = [1,2,3], nums2 = [4,5,6]", expected: "[]", args: [[1,2,3], [4,5,6]], expectedValue: [] }
    ],
    why: "Hash sets let us test membership in O(1) time so we can collect distinct common elements in linear time."
  },
  {
    id: "ransom-note",
    patternId: "hashmap",
    name: "Ransom Note",
    difficulty: "Easy",
    number: 383,
    description: `Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote.`,
    examples: [
      { input: "ransomNote = \"a\", magazine = \"b\"", output: "false" },
      { input: "ransomNote = \"aa\", magazine = \"ab\"", output: "false" },
      { input: "ransomNote = \"aa\", magazine = \"aab\"", output: "true" }
    ],
    constraints: [
      "1 <= ransomNote.length, magazine.length <= 10^5",
      "ransomNote and magazine consist of lowercase English letters."
    ],
    starterCode: `/**
 * @param {string} ransomNote
 * @param {string} magazine
 */
var canConstruct = function(ransomNote, magazine) {
    // Write your code here
    
};`,
    solution: `var canConstruct = function(ransomNote, magazine) {
    const count = {};
    for (const c of magazine) count[c] = (count[c] || 0) + 1;
    for (const c of ransomNote) {
        if (!count[c]) return false;
        count[c]--;
    }
    return true;
};`,
    testCases: [
      { input: "ransomNote = \"a\", magazine = \"b\"", expected: "false", args: ["a", "b"], expectedValue: false },
      { input: "ransomNote = \"aa\", magazine = \"ab\"", expected: "false", args: ["aa", "ab"], expectedValue: false },
      { input: "ransomNote = \"aa\", magazine = \"aab\"", expected: "true", args: ["aa", "aab"], expectedValue: true }
    ],
    why: "A frequency table tracks available letters so we can greedily validate the ransom note in one pass."
  },
  {
    id: "group-anagrams",
    patternId: "hashmap",
    name: "Group Anagrams",
    difficulty: "Medium",
    number: 49,
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
      { input: "strs = [\"\"]", output: "[[\"\"]]" },
      { input: "strs = [\"a\"]", output: "[[\"a\"]]" }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    starterCode: `/**
 * @param {string[]} strs
 */
var groupAnagrams = function(strs) {
    // Write your code here
    
};`,
    solution: `var groupAnagrams = function(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
};`,
    testCases: [
      { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", expected: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]", args: [["eat","tea","tan","ate","nat","bat"]], expectedValue: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: "strs = [\"\"]", expected: "[[\"\"]]", args: [[""]], expectedValue: [[""]] },
      { input: "strs = [\"a\"]", expected: "[[\"a\"]]", args: [["a"]], expectedValue: [["a"]] }
    ],
    why: "A hash map groups strings by a canonical key (sorted letters) so all anagrams collide into the same bucket."
  },
  {
    id: "top-k-frequent-elements",
    patternId: "hashmap",
    name: "Top K Frequent Elements",
    difficulty: "Medium",
    number: 347,
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
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
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var topKFrequent = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var topKFrequent = function(nums, k) {
    const freq = {};
    for (const num of nums) freq[num] = (freq[num] || 0) + 1;
    const buckets = [];
    for (const num in freq) {
        const f = freq[num];
        if (!buckets[f]) buckets[f] = [];
        buckets[f].push(Number(num));
    }
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i]) result.push(...buckets[i]);
    }
    return result.slice(0, k);
};`,
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expected: "[1,2]", args: [[1,1,1,2,2,3], 2], expectedValue: [1,2] },
      { input: "nums = [1], k = 1", expected: "[1]", args: [[1], 1], expectedValue: [1] },
      { input: "nums = [1,2], k = 2", expected: "[1,2]", args: [[1,2], 2], expectedValue: [1,2] }
    ],
    why: "A frequency map counts occurrences and bucket sorting by frequency lets us retrieve the top k in linear time."
  },
  {
    id: "longest-consecutive-sequence",
    patternId: "hashmap",
    name: "Longest Consecutive Sequence",
    difficulty: "Medium",
    number: 128,
    description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.`,
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
    ],
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var longestConsecutive = function(nums) {
    // Write your code here
    
};`,
    solution: `var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const num of set) {
        if (!set.has(num - 1)) {
            let current = num;
            let streak = 1;
            while (set.has(current + 1)) {
                current++;
                streak++;
            }
            longest = Math.max(longest, streak);
        }
    }
    return longest;
};`,
    testCases: [
      { input: "nums = [100,4,200,1,3,2]", expected: "4", args: [[100,4,200,1,3,2]], expectedValue: 4 },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", expected: "9", args: [[0,3,7,2,5,8,4,6,0,1]], expectedValue: 9 },
      { input: "nums = []", expected: "0", args: [[]], expectedValue: 0 }
    ],
    why: "A hash set allows O(1) existence checks so we can start counting streaks only from sequence beginnings."
  },
  {
    id: "word-pattern",
    patternId: "hashmap",
    name: "Word Pattern",
    difficulty: "Medium",
    number: 290,
    description: `Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.`,
    examples: [
      { input: "pattern = \"abba\", s = \"dog cat cat dog\"", output: "true" },
      { input: "pattern = \"abba\", s = \"dog cat cat fish\"", output: "false" },
      { input: "pattern = \"aaaa\", s = \"dog cat cat dog\"", output: "false" }
    ],
    constraints: [
      "1 <= pattern.length <= 300",
      "pattern contains only lower-case English letters.",
      "1 <= s.length <= 3000",
      "s contains only lowercase English letters and spaces.",
      "s does not contain any leading or trailing spaces.",
      "All the words in s are separated by a single space."
    ],
    starterCode: `/**
 * @param {string} pattern
 * @param {string} s
 */
var wordPattern = function(pattern, s) {
    // Write your code here
    
};`,
    solution: `var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    const charToWord = new Map();
    const wordToChar = new Map();
    for (let i = 0; i < pattern.length; i++) {
        const c = pattern[i];
        const w = words[i];
        if (charToWord.has(c) && charToWord.get(c) !== w) return false;
        if (wordToChar.has(w) && wordToChar.get(w) !== c) return false;
        charToWord.set(c, w);
        wordToChar.set(w, c);
    }
    return true;
};`,
    testCases: [
      { input: "pattern = \"abba\", s = \"dog cat cat dog\"", expected: "true", args: ["abba", "dog cat cat dog"], expectedValue: true },
      { input: "pattern = \"abba\", s = \"dog cat cat fish\"", expected: "false", args: ["abba", "dog cat cat fish"], expectedValue: false },
      { input: "pattern = \"aaaa\", s = \"dog cat cat dog\"", expected: "false", args: ["aaaa", "dog cat cat dog"], expectedValue: false }
    ],
    why: "Two hash maps enforce a bijection between pattern characters and words in constant time per element."
  },
  {
    id: "subarray-sum-equals-k",
    patternId: "hashmap",
    name: "Subarray Sum Equals K",
    difficulty: "Medium",
    number: 560,
    description: `Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      { input: "nums = [1,1,1], k = 2", output: "2" },
      { input: "nums = [1,2,3], k = 3", output: "2" }
    ],
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var subarraySum = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var subarraySum = function(nums, k) {
    const map = new Map();
    map.set(0, 1);
    let count = 0;
    let sum = 0;
    for (const num of nums) {
        sum += num;
        if (map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
};`,
    testCases: [
      { input: "nums = [1,1,1], k = 2", expected: "2", args: [[1,1,1], 2], expectedValue: 2 },
      { input: "nums = [1,2,3], k = 3", expected: "2", args: [[1,2,3], 3], expectedValue: 2 },
      { input: "nums = [1,2,1,2,1], k = 3", expected: "4", args: [[1,2,1,2,1], 3], expectedValue: 4 }
    ],
    why: "A running-sum hash map stores how many times each prefix sum occurs, letting us detect subarrays that sum to k in O(1)."
  },
  {
    id: "4sum-ii",
    patternId: "hashmap",
    name: "4Sum II",
    difficulty: "Medium",
    number: 454,
    description: `Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.`,
    examples: [
      { input: "nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]", output: "2" },
      { input: "nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]", output: "1" }
    ],
    constraints: [
      "n == nums1.length",
      "n == nums2.length",
      "n == nums3.length",
      "n == nums4.length",
      "1 <= n <= 200",
      "-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    // Write your code here
    
};`,
    solution: `var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const map = new Map();
    for (const a of nums1) {
        for (const b of nums2) {
            const sum = a + b;
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }
    let count = 0;
    for (const c of nums3) {
        for (const d of nums4) {
            const sum = c + d;
            count += (map.get(-sum) || 0);
        }
    }
    return count;
};`,
    testCases: [
      { input: "nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]", expected: "2", args: [[1,2], [-2,-1], [-1,2], [0,2]], expectedValue: 2 },
      { input: "nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]", expected: "1", args: [[0], [0], [0], [0]], expectedValue: 1 },
      { input: "nums1 = [-1,1], nums2 = [-1,1], nums3 = [-1,1], nums4 = [1,-1]", expected: "6", args: [[-1,1], [-1,1], [-1,1], [1,-1]], expectedValue: 6 }
    ],
    why: "A hash map stores pair sums from the first two arrays so we can look up complements from the last two arrays in O(1)."
  },
  {
    id: "brick-wall",
    patternId: "hashmap",
    name: "Brick Wall",
    difficulty: "Medium",
    number: 554,
    description: `There is a rectangular brick wall in front of you with n rows of bricks. The ith row has some bricks with the same height but different widths. You want to draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then it does not count as crossed. You cannot draw a line just along one of the two vertical edges of the wall. Return the minimum number of crossed bricks.`,
    examples: [
      { input: "wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]", output: "2" },
      { input: "wall = [[1],[1],[1]]", output: "3" }
    ],
    constraints: [
      "n == wall.length",
      "1 <= n <= 10^4",
      "1 <= wall[i].length <= 10^4",
      "1 <= sum(wall[i].length) <= 2 * 10^4",
      "sum(wall[i]) is the same for each row i.",
      "1 <= wall[i][j] <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[][]} wall
 */
var leastBricks = function(wall) {
    // Write your code here
    
};`,
    solution: `var leastBricks = function(wall) {
    const map = new Map();
    let max = 0;
    for (const row of wall) {
        let sum = 0;
        for (let i = 0; i < row.length - 1; i++) {
            sum += row[i];
            map.set(sum, (map.get(sum) || 0) + 1);
            max = Math.max(max, map.get(sum));
        }
    }
    return wall.length - max;
};`,
    testCases: [
      { input: "wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]", expected: "2", args: [[[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]], expectedValue: 2 },
      { input: "wall = [[1],[1],[1]]", expected: "3", args: [[[1],[1],[1]]], expectedValue: 3 },
      { input: "wall = [[1,1],[2],[1,1]]", expected: "1", args: [[[1,1],[2],[1,1]]], expectedValue: 1 }
    ],
    why: "A hash map counts how many rows end at each cumulative width, letting us find the line that crosses the fewest bricks."
  },
  {
    id: "find-the-duplicate-number",
    patternId: "hashmap",
    name: "Find the Duplicate Number",
    difficulty: "Medium",
    number: 287,
    description: `Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and using only constant extra space.`,
    examples: [
      { input: "nums = [1,3,4,2,2]", output: "2" },
      { input: "nums = [3,1,3,4,2]", output: "3" },
      { input: "nums = [1,1]", output: "1" }
    ],
    constraints: [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times."
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var findDuplicate = function(nums) {
    // Write your code here
    
};`,
    solution: `var findDuplicate = function(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) return num;
        set.add(num);
    }
    return -1;
};`,
    testCases: [
      { input: "nums = [1,3,4,2,2]", expected: "2", args: [[1,3,4,2,2]], expectedValue: 2 },
      { input: "nums = [3,1,3,4,2]", expected: "3", args: [[3,1,3,4,2]], expectedValue: 3 },
      { input: "nums = [1,1]", expected: "1", args: [[1,1]], expectedValue: 1 }
    ],
    why: "A hash set detects the first duplicate by recording every number we have seen so far."
  },
  {
    id: "contiguous-array",
    patternId: "hashmap",
    name: "Contiguous Array",
    difficulty: "Medium",
    number: 525,
    description: `Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.`,
    examples: [
      { input: "nums = [0,1]", output: "2" },
      { input: "nums = [0,1,0]", output: "2" },
      { input: "nums = [0,0,1,0,0,0,1,1]", output: "6" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "nums[i] is either 0 or 1."
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var findMaxLength = function(nums) {
    // Write your code here
    
};`,
    solution: `var findMaxLength = function(nums) {
    const map = new Map();
    map.set(0, -1);
    let maxLen = 0;
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;
        if (map.has(count)) {
            maxLen = Math.max(maxLen, i - map.get(count));
        } else {
            map.set(count, i);
        }
    }
    return maxLen;
};`,
    testCases: [
      { input: "nums = [0,1]", expected: "2", args: [[0,1]], expectedValue: 2 },
      { input: "nums = [0,1,0]", expected: "2", args: [[0,1,0]], expectedValue: 2 },
      { input: "nums = [0,0,1,0,0,0,1,1]", expected: "6", args: [[0,0,1,0,0,0,1,1]], expectedValue: 6 }
    ],
    why: "A hash map records the first occurrence of each running count, letting us measure balanced subarrays in one pass."
  },
  {
    id: "first-missing-positive",
    patternId: "hashmap",
    name: "First Missing Positive",
    difficulty: "Hard",
    number: 41,
    description: `Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.`,
    examples: [
      { input: "nums = [1,2,0]", output: "3" },
      { input: "nums = [3,4,-1,1]", output: "2" },
      { input: "nums = [7,8,9,11,12]", output: "1" }
    ],
    constraints: [
      "1 <= nums.length <= 5 * 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var firstMissingPositive = function(nums) {
    // Write your code here
    
};`,
    solution: `var firstMissingPositive = function(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }
    return n + 1;
};`,
    testCases: [
      { input: "nums = [1,2,0]", expected: "3", args: [[1,2,0]], expectedValue: 3 },
      { input: "nums = [3,4,-1,1]", expected: "2", args: [[3,4,-1,1]], expectedValue: 2 },
      { input: "nums = [7,8,9,11,12]", expected: "1", args: [[7,8,9,11,12]], expectedValue: 1 }
    ],
    why: "Using the array itself as a hash table lets us place each number at its corresponding index to detect the first gap."
  },
  {
    id: "palindrome-pairs",
    patternId: "hashmap",
    name: "Palindrome Pairs",
    difficulty: "Hard",
    number: 336,
    description: `Given a list of unique words, return all the pairs of the distinct indices (i, j) in the given list, so that the concatenation of the two words words[i] + words[j] is a palindrome.`,
    examples: [
      { input: "words = [\"bat\",\"tab\",\"cat\"]", output: "[[0,1],[1,0]]" },
      { input: "words = [\"a\",\"\"]", output: "[[0,1],[1,0]]" }
    ],
    constraints: [
      "1 <= words.length <= 5000",
      "0 <= words[i].length <= 300",
      "words[i] consists of lower-case English letters."
    ],
    starterCode: `/**
 * @param {string[]} words
 */
var palindromePairs = function(words) {
    // Write your code here
    
};`,
    solution: `var palindromePairs = function(words) {
    const map = new Map();
    for (let i = 0; i < words.length; i++) map.set(words[i], i);
    const result = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        for (let j = 0; j <= word.length; j++) {
            const prefix = word.slice(0, j);
            const suffix = word.slice(j);
            if (isPalindrome(prefix)) {
                const reversed = suffix.split('').reverse().join('');
                if (map.has(reversed) && map.get(reversed) !== i) {
                    result.push([map.get(reversed), i]);
                }
            }
            if (j !== word.length && isPalindrome(suffix)) {
                const reversed = prefix.split('').reverse().join('');
                if (map.has(reversed) && map.get(reversed) !== i) {
                    result.push([i, map.get(reversed)]);
                }
            }
        }
    }
    return result;
};

function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l++] !== s[r--]) return false;
    }
    return true;
}`,
    testCases: [
      { input: "words = [\"bat\",\"tab\",\"cat\"]", expected: "[[1,0],[0,1]]", args: [["bat","tab","cat"]], expectedValue: [[1,0],[0,1]] },
      { input: "words = [\"a\",\"\"]", expected: "[[0,1],[1,0]]", args: [["a",""]], expectedValue: [[0,1],[1,0]] },
      { input: "words = [\"aa\",\"\"]", expected: "[[0,1],[1,0]]", args: [["aa",""]], expectedValue: [[0,1],[1,0]] }
    ],
    why: "A hash map lets us look up the reverse of any suffix or prefix in O(1), enabling efficient palindrome pair construction."
  },
  {
    id: "max-points-on-a-line",
    patternId: "hashmap",
    name: "Max Points on a Line",
    difficulty: "Hard",
    number: 149,
    description: `Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.`,
    examples: [
      { input: "points = [[1,1],[2,2],[3,3]]", output: "3" },
      { input: "points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]", output: "4" }
    ],
    constraints: [
      "1 <= points.length <= 300",
      "points[i].length == 2",
      "-10^4 <= xi, yi <= 10^4",
      "All the points are unique."
    ],
    starterCode: `/**
 * @param {number[][]} points
 */
var maxPoints = function(points) {
    // Write your code here
    
};`,
    solution: `var maxPoints = function(points) {
    const n = points.length;
    if (n <= 2) return n;
    let max = 0;
    for (let i = 0; i < n; i++) {
        const map = new Map();
        let same = 0;
        let localMax = 0;
        for (let j = i + 1; j < n; j++) {
            const dx = points[j][0] - points[i][0];
            const dy = points[j][1] - points[i][1];
            if (dx === 0 && dy === 0) {
                same++;
                continue;
            }
            const g = gcd(dx, dy);
            const key = (dy / g) + ',' + (dx / g);
            map.set(key, (map.get(key) || 0) + 1);
            localMax = Math.max(localMax, map.get(key));
        }
        max = Math.max(max, localMax + same + 1);
    }
    return max;
};

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a || 1;
}`,
    testCases: [
      { input: "points = [[1,1],[2,2],[3,3]]", expected: "3", args: [[[1,1],[2,2],[3,3]]], expectedValue: 3 },
      { input: "points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]", expected: "4", args: [[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]], expectedValue: 4 },
      { input: "points = [[0,0]]", expected: "1", args: [[[0,0]]], expectedValue: 1 }
    ],
    why: "A hash map stores slope frequencies relative to each anchor point so we can count collinear points in O(n^2)."
  },
  {
    id: "sliding-puzzle",
    patternId: "hashmap",
    name: "Sliding Puzzle",
    difficulty: "Hard",
    number: 773,
    description: `On a 2x3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it. Given the puzzle board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.`,
    examples: [
      { input: "board = [[1,2,3],[4,0,5]]", output: "1", explanation: "Swap the 0 and the 5 in one move." },
      { input: "board = [[1,2,3],[5,4,0]]", output: "-1", explanation: "No number of moves will make the board solved." },
      { input: "board = [[1,2,3],[4,5,0]]", output: "0" }
    ],
    constraints: [
      "board.length == 2",
      "board[i].length == 3",
      "0 <= board[i][j] <= 5",
      "Each value board[i][j] is unique."
    ],
    starterCode: `/**
 * @param {number[][]} board
 */
var slidingPuzzle = function(board) {
    // Write your code here
    
};`,
    solution: `var slidingPuzzle = function(board) {
    const start = board[0].concat(board[1]).join('');
    const target = '123450';
    if (start === target) return 0;
    const neighbors = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    };
    const visited = new Set();
    let queue = [start];
    visited.add(start);
    let steps = 0;
    while (queue.length) {
        steps++;
        const nextQueue = [];
        for (const state of queue) {
            const zero = state.indexOf('0');
            for (const n of neighbors[zero]) {
                const arr = state.split('');
                [arr[zero], arr[n]] = [arr[n], arr[zero]];
                const next = arr.join('');
                if (next === target) return steps;
                if (!visited.has(next)) {
                    visited.add(next);
                    nextQueue.push(next);
                }
            }
        }
        queue = nextQueue;
    }
    return -1;
};`,
    testCases: [
      { input: "board = [[1,2,3],[4,0,5]]", expected: "1", args: [[[1,2,3],[4,0,5]]], expectedValue: 1 },
      { input: "board = [[1,2,3],[5,4,0]]", expected: "-1", args: [[[1,2,3],[5,4,0]]], expectedValue: -1 },
      { input: "board = [[1,2,3],[4,5,0]]", expected: "0", args: [[[1,2,3],[4,5,0]]], expectedValue: 0 }
    ],
    why: "A hash set tracks visited board states so BFS can explore the puzzle graph without revisiting configurations."
  },

  {
    id: "remove-duplicates-from-sorted-array",
    patternId: "twopointers",
    name: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    number: 26,
    description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.`,
    examples: [
      { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]", explanation: "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively." },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]" }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order."
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var removeDuplicates = function(nums) {
    // Write your code here
    
};`,
    solution: `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
};`,
    testCases: [
      { input: "nums = [1,1,2]", expected: "2", args: [[1,1,2]], expectedValue: 2 },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", expected: "5", args: [[0,0,1,1,1,2,2,3,3,4]], expectedValue: 5 },
      { input: "nums = [1,2,3]", expected: "3", args: [[1,2,3]], expectedValue: 3 }
    ],
    why: "Two pointers let us overwrite duplicates in-place while scanning the sorted array once."
  },
  {
    id: "move-zeroes",
    patternId: "twopointers",
    name: "Move Zeroes",
    difficulty: "Easy",
    number: 283,
    description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.`,
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]", output: "[0]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var moveZeroes = function(nums) {
    // Write your code here
    
};`,
    solution: `var moveZeroes = function(nums) {
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
    }
    return nums;
};`,
    testCases: [
      { input: "nums = [0,1,0,3,12]", expected: "[1,3,12,0,0]", args: [[0,1,0,3,12]], expectedValue: [1,3,12,0,0] },
      { input: "nums = [0]", expected: "[0]", args: [[0]], expectedValue: [0] },
      { input: "nums = [1,0,2,0,3]", expected: "[1,2,3,0,0]", args: [[1,0,2,0,3]], expectedValue: [1,2,3,0,0] }
    ],
    why: "A write pointer tracks where the next non-zero should go while a read pointer scans the array."
  },
  {
    id: "squares-of-a-sorted-array",
    patternId: "twopointers",
    name: "Squares of a Sorted Array",
    difficulty: "Easy",
    number: 977,
    description: `Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.`,
    examples: [
      { input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]" },
      { input: "nums = [-7,-3,2,3,11]", output: "[4,9,9,49,121]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums is sorted in non-decreasing order."
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var sortedSquares = function(nums) {
    // Write your code here
    
};`,
    solution: `var sortedSquares = function(nums) {
    const result = new Array(nums.length);
    let left = 0, right = nums.length - 1;
    let pos = nums.length - 1;
    while (left <= right) {
        if (Math.abs(nums[left]) > Math.abs(nums[right])) {
            result[pos] = nums[left] * nums[left];
            left++;
        } else {
            result[pos] = nums[right] * nums[right];
            right--;
        }
        pos--;
    }
    return result;
};`,
    testCases: [
      { input: "nums = [-4,-1,0,3,10]", expected: "[0,1,9,16,100]", args: [[-4,-1,0,3,10]], expectedValue: [0,1,9,16,100] },
      { input: "nums = [-7,-3,2,3,11]", expected: "[4,9,9,49,121]", args: [[-7,-3,2,3,11]], expectedValue: [4,9,9,49,121] },
      { input: "nums = [1,2,3]", expected: "[1,4,9]", args: [[1,2,3]], expectedValue: [1,4,9] }
    ],
    why: "Two pointers start at opposite ends to fill the result from largest to smallest square."
  },
  {
    id: "valid-palindrome",
    patternId: "twopointers",
    name: "Valid Palindrome",
    difficulty: "Easy",
    number: 125,
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" },
      { input: "s = \"race a car\"", output: "false" },
      { input: "s = \" \"", output: "true" }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    starterCode: `/**
 * @param {string} s
 */
var isPalindrome = function(s) {
    // Write your code here
    
};`,
    solution: `var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !isAlphaNum(s[left])) left++;
        while (left < right && !isAlphaNum(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
};

function isAlphaNum(c) {
    return /[a-zA-Z0-9]/.test(c);
}`,
    testCases: [
      { input: "s = \"A man, a plan, a canal: Panama\"", expected: "true", args: ["A man, a plan, a canal: Panama"], expectedValue: true },
      { input: "s = \"race a car\"", expected: "false", args: ["race a car"], expectedValue: false },
      { input: "s = \" \"", expected: "true", args: [" "], expectedValue: true }
    ],
    why: "Two pointers converge from both ends, skipping non-alphanumeric characters to compare mirrored positions."
  },
  {
    id: "merge-sorted-array",
    patternId: "twopointers",
    name: "Merge Sorted Array",
    difficulty: "Easy",
    number: 88,
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should be stored inside the array nums1.`,
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", output: "[1]" },
      { input: "nums1 = [0], m = 0, nums2 = [1], n = 1", output: "[1]" }
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 */
var merge = function(nums1, m, nums2, n) {
    // Write your code here
    
};`,
    solution: `var merge = function(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    return nums1;
};`,
    testCases: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", expected: "[1,2,2,3,5,6]", args: [[1,2,3,0,0,0], 3, [2,5,6], 3], expectedValue: [1,2,2,3,5,6] },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", expected: "[1]", args: [[1], 1, [], 0], expectedValue: [1] },
      { input: "nums1 = [0], m = 0, nums2 = [1], n = 1", expected: "[1]", args: [[0], 0, [1], 1], expectedValue: [1] }
    ],
    why: "Two pointers starting from the end let us fill nums1 backwards without overwriting unmerged elements."
  },

  {
    id: "two-sum-ii",
    patternId: "twopointers",
    name: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    number: 167,
    description: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers added by one.`,
    examples: [
      { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]" },
      { input: "numbers = [2,3,4], target = 6", output: "[1,3]" },
      { input: "numbers = [-1,0], target = -1", output: "[1,2]" }
    ],
    constraints: [
      "2 <= numbers.length <= 3 * 10^4",
      "-1000 <= numbers[i] <= 1000",
      "numbers is sorted in non-decreasing order.",
      "-1000 <= target <= 1000"
    ],
    starterCode: `/**
 * @param {number[]} numbers
 * @param {number} target
 */
var twoSum = function(numbers, target) {
    // Write your code here
    
};`,
    solution: `var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [-1, -1];
};`,
    testCases: [
      { input: "numbers = [2,7,11,15], target = 9", expected: "[1,2]", args: [[2,7,11,15], 9], expectedValue: [1,2] },
      { input: "numbers = [2,3,4], target = 6", expected: "[1,3]", args: [[2,3,4], 6], expectedValue: [1,3] },
      { input: "numbers = [-1,0], target = -1", expected: "[1,2]", args: [[-1,0], -1], expectedValue: [1,2] }
    ],
    why: "Because the array is sorted, two pointers can shrink the search space by moving the smaller or larger candidate."
  },
  {
    id: "3sum",
    patternId: "twopointers",
    name: "3Sum",
    difficulty: "Medium",
    number: 15,
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var threeSum = function(nums) {
    // Write your code here
    
};`,
    solution: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};`,
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]", args: [[-1,0,1,2,-1,-4]], expectedValue: [[-1,-1,2],[-1,0,1]] },
      { input: "nums = [0,1,1]", expected: "[]", args: [[0,1,1]], expectedValue: [] },
      { input: "nums = [0,0,0]", expected: "[[0,0,0]]", args: [[0,0,0]], expectedValue: [[0,0,0]] }
    ],
    why: "Sorting plus two pointers turns the O(n^3) brute-force search into an O(n^2) scan that skips duplicates."
  },
  {
    id: "container-with-most-water",
    patternId: "twopointers",
    name: "Container With Most Water",
    difficulty: "Medium",
    number: 11,
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
      { input: "height = [4,3,2,1,4]", output: "16" }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} height
 */
var maxArea = function(height) {
    // Write your code here
    
};`,
    solution: `var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let max = 0;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return max;
};`,
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", expected: "49", args: [[1,8,6,2,5,4,8,3,7]], expectedValue: 49 },
      { input: "height = [1,1]", expected: "1", args: [[1,1]], expectedValue: 1 },
      { input: "height = [4,3,2,1,4]", expected: "16", args: [[4,3,2,1,4]], expectedValue: 16 }
    ],
    why: "Two pointers from both ends discard the shorter boundary since it can never produce a larger area."
  },

  {
    id: "sort-colors",
    patternId: "twopointers",
    name: "Sort Colors",
    difficulty: "Medium",
    number: 75,
    description: `Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively. You must solve this problem without using the library's sort function.`,
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is 0, 1, or 2."
    ],
    starterCode: `/**
 * @param {number[]} nums
 */
var sortColors = function(nums) {
    // Write your code here
    
};`,
    solution: `var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
    return nums;
};`,
    testCases: [
      { input: "nums = [2,0,2,1,1,0]", expected: "[0,0,1,1,2,2]", args: [[2,0,2,1,1,0]], expectedValue: [0,0,1,1,2,2] },
      { input: "nums = [2,0,1]", expected: "[0,1,2]", args: [[2,0,1]], expectedValue: [0,1,2] },
      { input: "nums = [0]", expected: "[0]", args: [[0]], expectedValue: [0] }
    ],
    why: "Three pointers partition the array into red, white, and blue regions in a single linear pass."
  },
  {
    id: "3sum-closest",
    patternId: "twopointers",
    name: "3Sum Closest",
    difficulty: "Medium",
    number: 16,
    description: `Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.`,
    examples: [
      { input: "nums = [-1,2,1,-4], target = 1", output: "2", explanation: "The sum that is closest to the target is 2. (-1 + 2 + 1 = 2)." },
      { input: "nums = [0,0,0], target = 1", output: "0" }
    ],
    constraints: [
      "3 <= nums.length <= 500",
      "-1000 <= nums[i] <= 1000",
      "-10^4 <= target <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 */
var threeSumClosest = function(nums, target) {
    // Write your code here
    
};`,
    solution: `var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = nums[0] + nums[1] + nums[2];
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;
            if (sum === target) return sum;
            if (sum < target) left++;
            else right--;
        }
    }
    return closest;
};`,
    testCases: [
      { input: "nums = [-1,2,1,-4], target = 1", expected: "2", args: [[-1,2,1,-4], 1], expectedValue: 2 },
      { input: "nums = [0,0,0], target = 1", expected: "0", args: [[0,0,0], 1], expectedValue: 0 },
      { input: "nums = [1,1,1,0], target = -100", expected: "2", args: [[1,1,1,0], -100], expectedValue: 2 }
    ],
    why: "Sorting and two pointers shrink the candidate window while tracking the closest sum to the target."
  },
  {
    id: "minimum-size-subarray-sum",
    patternId: "twopointers",
    name: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    number: 209,
    description: `Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.`,
    examples: [
      { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", explanation: "The subarray [4,3] has the minimal length under the problem constraint." },
      { input: "target = 4, nums = [1,4,4]", output: "1" },
      { input: "target = 11, nums = [1,1,1,1,1,1,1,1]", output: "0" }
    ],
    constraints: [
      "1 <= target <= 10^9",
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number} target
 * @param {number[]} nums
 */
var minSubArrayLen = function(target, nums) {
    // Write your code here
    
};`,
    solution: `var minSubArrayLen = function(target, nums) {
    let left = 0, sum = 0, min = Infinity;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            min = Math.min(min, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return min === Infinity ? 0 : min;
};`,
    testCases: [
      { input: "target = 7, nums = [2,3,1,2,4,3]", expected: "2", args: [7, [2,3,1,2,4,3]], expectedValue: 2 },
      { input: "target = 4, nums = [1,4,4]", expected: "1", args: [4, [1,4,4]], expectedValue: 1 },
      { input: "target = 11, nums = [1,1,1,1,1,1,1,1]", expected: "0", args: [11, [1,1,1,1,1,1,1,1]], expectedValue: 0 }
    ],
    why: "A sliding window with two pointers expands until the sum is large enough, then contracts to find the minimum length."
  },

  {
    id: "boats-to-save-people",
    patternId: "twopointers",
    name: "Boats to Save People",
    difficulty: "Medium",
    number: 881,
    description: `You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit. Return the minimum number of boats to carry every given person.`,
    examples: [
      { input: "people = [1,2], limit = 3", output: "1" },
      { input: "people = [3,2,2,1], limit = 3", output: "3" },
      { input: "people = [3,5,3,4], limit = 5", output: "4" }
    ],
    constraints: [
      "1 <= people.length <= 5 * 10^4",
      "1 <= people[i] <= limit <= 3 * 10^4"
    ],
    starterCode: `/**
 * @param {number[]} people
 * @param {number} limit
 */
var numRescueBoats = function(people, limit) {
    // Write your code here
    
};`,
    solution: `var numRescueBoats = function(people, limit) {
    people.sort((a, b) => a - b);
    let left = 0, right = people.length - 1;
    let boats = 0;
    while (left <= right) {
        if (people[left] + people[right] <= limit) left++;
        right--;
        boats++;
    }
    return boats;
};`,
    testCases: [
      { input: "people = [1,2], limit = 3", expected: "1", args: [[1,2], 3], expectedValue: 1 },
      { input: "people = [3,2,2,1], limit = 3", expected: "3", args: [[3,2,2,1], 3], expectedValue: 3 },
      { input: "people = [3,5,3,4], limit = 5", expected: "4", args: [[3,5,3,4], 5], expectedValue: 4 }
    ],
    why: "Sorting and two pointers greedily pair the lightest available person with the heaviest to minimize boats."
  },
  {
    id: "trapping-rain-water",
    patternId: "twopointers",
    name: "Trapping Rain Water",
    difficulty: "Hard",
    number: 42,
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^5",
      "0 <= height[i] <= 10^5"
    ],
    starterCode: `/**
 * @param {number[]} height
 */
var trap = function(height) {
    // Write your code here
    
};`,
    solution: `var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
};`,
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6", args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expectedValue: 6 },
      { input: "height = [4,2,0,3,2,5]", expected: "9", args: [[4,2,0,3,2,5]], expectedValue: 9 },
      { input: "height = [4,2,3]", expected: "1", args: [[4,2,3]], expectedValue: 1 }
    ],
    why: "Two pointers track the highest boundaries from both sides, accumulating trapped water bounded by the shorter wall."
  },
  {
    id: "median-of-two-sorted-arrays",
    patternId: "twopointers",
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    number: 4,
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Write your code here
    
};`,
    solution: `var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    return 0;
};`,
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expected: "2.00000", args: [[1,3], [2]], expectedValue: 2.0 },
      { input: "nums1 = [1,2], nums2 = [3,4]", expected: "2.50000", args: [[1,2], [3,4]], expectedValue: 2.5 },
      { input: "nums1 = [0,0], nums2 = [0,0]", expected: "0.00000", args: [[0,0], [0,0]], expectedValue: 0.0 }
    ],
    why: "Binary search on partitions with two pointers finds the median without merging the arrays."
  },
  {
    id: "substring-with-concatenation-of-all-words",
    patternId: "twopointers",
    name: "Substring with Concatenation of All Words",
    difficulty: "Hard",
    number: 30,
    description: `You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated. Return the starting indices of all the concatenated substrings in s.`,
    examples: [
      { input: "s = \"barfoothefoobarman\", words = [\"foo\",\"bar\"]", output: "[0,9]" },
      { input: "s = \"wordgoodgoodgoodbestword\", words = [\"word\",\"good\",\"best\",\"word\"]", output: "[]" },
      { input: "s = \"barfoofoobarthefoobarman\", words = [\"bar\",\"foo\",\"the\"]", output: "[6,9,12]" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "1 <= words.length <= 5000",
      "1 <= words[i].length <= 30",
      "s and words[i] consist of lowercase English letters."
    ],
    starterCode: `/**
 * @param {string} s
 * @param {string[]} words
 */
var findSubstring = function(s, words) {
    // Write your code here
    
};`,
    solution: `var findSubstring = function(s, words) {
    if (words.length === 0) return [];
    const wordLen = words[0].length;
    const wordCount = {};
    for (const w of words) wordCount[w] = (wordCount[w] || 0) + 1;
    const result = [];
    for (let i = 0; i < wordLen; i++) {
        let left = i, right = i;
        const current = {};
        let count = 0;
        while (right + wordLen <= s.length) {
            const word = s.slice(right, right + wordLen);
            right += wordLen;
            if (wordCount[word]) {
                current[word] = (current[word] || 0) + 1;
                count++;
                while (current[word] > wordCount[word]) {
                    const leftWord = s.slice(left, left + wordLen);
                    current[leftWord]--;
                    count--;
                    left += wordLen;
                }
                if (count === words.length) {
                    result.push(left);
                }
            } else {
                for (const w in current) current[w] = 0;
                count = 0;
                left = right;
            }
        }
    }
    return result;
};`,
    testCases: [
      { input: "s = \"barfoothefoobarman\", words = [\"foo\",\"bar\"]", expected: "[0,9]", args: ["barfoothefoobarman", ["foo","bar"]], expectedValue: [0,9] },
      { input: "s = \"wordgoodgoodgoodbestword\", words = [\"word\",\"good\",\"best\",\"word\"]", expected: "[]", args: ["wordgoodgoodgoodbestword", ["word","good","best","word"]], expectedValue: [] },
      { input: "s = \"barfoofoobarthefoobarman\", words = [\"bar\",\"foo\",\"the\"]", expected: "[6,9,12]", args: ["barfoofoobarthefoobarman", ["bar","foo","the"]], expectedValue: [6,9,12] }
    ],
    why: "A sliding window with two boundaries counts words in O(1) lookups so we can validate every permutation position efficiently."
  },

  {
    id: "contains-duplicate-ii",
    patternId: "slidingwindow",
    name: "Contains Duplicate II",
    difficulty: "Easy",
    number: 219,
    description: `Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.`,
    examples: [
      { input: "nums = [1,2,3,1], k = 3", output: "true" },
      { input: "nums = [1,0,1,1], k = 1", output: "true" },
      { input: "nums = [1,2,3,1,2,3], k = 2", output: "false" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "0 <= k <= 10^5"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var containsNearbyDuplicate = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var containsNearbyDuplicate = function(nums, k) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true;
        set.add(nums[i]);
        if (set.size > k) set.delete(nums[i - k]);
    }
    return false;
};`,
    testCases: [
      { input: "nums = [1,2,3,1], k = 3", expected: "true", args: [[1,2,3,1], 3], expectedValue: true },
      { input: "nums = [1,0,1,1], k = 1", expected: "true", args: [[1,0,1,1], 1], expectedValue: true },
      { input: "nums = [1,2,3,1,2,3], k = 2", expected: "false", args: [[1,2,3,1,2,3], 2], expectedValue: false }
    ],
    why: "A sliding window hash set of size k lets us check if the current number was seen within the allowed distance."
  },
  {
    id: "maximum-average-subarray-i",
    patternId: "slidingwindow",
    name: "Maximum Average Subarray I",
    difficulty: "Easy",
    number: 643,
    description: `You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.`,
    examples: [
      { input: "nums = [1,12,-5,-6,50,3], k = 4", output: "12.75000" },
      { input: "nums = [5], k = 1", output: "5.00000" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= k <= n <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var findMaxAverage = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var findMaxAverage = function(nums, k) {
    let sum = 0;
    for (let i = 0; i < k; i++) sum += nums[i];
    let max = sum;
    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        max = Math.max(max, sum);
    }
    return max / k;
};`,
    testCases: [
      { input: "nums = [1,12,-5,-6,50,3], k = 4", expected: "12.75000", args: [[1,12,-5,-6,50,3], 4], expectedValue: 12.75 },
      { input: "nums = [5], k = 1", expected: "5.00000", args: [[5], 1], expectedValue: 5.0 },
      { input: "nums = [-1], k = 1", expected: "-1.00000", args: [[-1], 1], expectedValue: -1.0 }
    ],
    why: "A fixed-size sliding window computes the sum incrementally so the average can be updated in O(1) per step."
  },
  {
    id: "minimum-recolors-to-get-k-consecutive-black-blocks",
    patternId: "slidingwindow",
    name: "Minimum Recolors to Get K Consecutive Black Blocks",
    difficulty: "Easy",
    number: 2379,
    description: `You are given a 0-indexed string blocks of length n, where blocks[i] is either 'W' or 'B', representing the color of the ith block. You are also given an integer k. Return the minimum number of operations needed so that there is a contiguous block of k black blocks.`,
    examples: [
      { input: "blocks = \"WBBWWBBWBW\", k = 7", output: "3" },
      { input: "blocks = \"WBWBBBW\", k = 2", output: "0" }
    ],
    constraints: [
      "n == blocks.length",
      "1 <= n <= 100",
      "blocks[i] is either 'W' or 'B'.",
      "1 <= k <= n"
    ],
    starterCode: `/**
 * @param {string} blocks
 * @param {number} k
 */
var minimumRecolors = function(blocks, k) {
    // Write your code here
    
};`,
    solution: `var minimumRecolors = function(blocks, k) {
    let white = 0;
    for (let i = 0; i < k; i++) {
        if (blocks[i] === 'W') white++;
    }
    let min = white;
    for (let i = k; i < blocks.length; i++) {
        if (blocks[i] === 'W') white++;
        if (blocks[i - k] === 'W') white--;
        min = Math.min(min, white);
    }
    return min;
};`,
    testCases: [
      { input: "blocks = \"WBBWWBBWBW\", k = 7", expected: "3", args: ["WBBWWBBWBW", 7], expectedValue: 3 },
      { input: "blocks = \"WBWBBBW\", k = 2", expected: "0", args: ["WBWBBBW", 2], expectedValue: 0 },
      { input: "blocks = \"BBBBB\", k = 2", expected: "0", args: ["BBBBB", 2], expectedValue: 0 }
    ],
    why: "A fixed-size sliding window counts white blocks inside each k-length segment to find the minimum recolors."
  },
  {
    id: "find-the-k-beauty-of-a-number",
    patternId: "slidingwindow",
    name: "Find the K-Beauty of a Number",
    difficulty: "Easy",
    number: 2269,
    description: `The k-beauty of an integer num is defined as the number of substrings of num when it is read as a string that meet the following conditions: It has a length of k. It is a divisor of num. Given integers num and k, return the k-beauty of num.`,
    examples: [
      { input: "num = 240, k = 2", output: "2", explanation: "The substrings are '24' and '40'. Both are divisors of 240." },
      { input: "num = 430043, k = 2", output: "2" }
    ],
    constraints: [
      "1 <= num <= 10^9",
      "1 <= k <= num.length"
    ],
    starterCode: `/**
 * @param {number} num
 * @param {number} k
 */
var divisorSubstrings = function(num, k) {
    // Write your code here
    
};`,
    solution: `var divisorSubstrings = function(num, k) {
    const s = num.toString();
    let count = 0;
    for (let i = 0; i + k <= s.length; i++) {
        const sub = parseInt(s.slice(i, i + k));
        if (sub !== 0 && num % sub === 0) count++;
    }
    return count;
};`,
    testCases: [
      { input: "num = 240, k = 2", expected: "2", args: [240, 2], expectedValue: 2 },
      { input: "num = 430043, k = 2", expected: "2", args: [430043, 2], expectedValue: 2 },
      { input: "num = 2, k = 1", expected: "1", args: [2, 1], expectedValue: 1 }
    ],
    why: "A fixed-size sliding window over the digits extracts each k-length substring to test divisibility."
  },

  {
    id: "longest-substring-without-repeating-characters",
    patternId: "slidingwindow",
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    number: 3,
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." },
      { input: "s = \"bbbbb\"", output: "1", explanation: "The answer is \"b\", with the length of 1." },
      { input: "s = \"pwwkew\"", output: "3", explanation: "The answer is \"wke\", with the length of 3." }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    starterCode: `/**
 * @param {string} s
 */
var lengthOfLongestSubstring = function(s) {
    // Write your code here
    
};`,
    solution: `var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let left = 0, max = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        max = Math.max(max, right - left + 1);
    }
    return max;
};`,
    testCases: [
      { input: "s = \"abcabcbb\"", expected: "3", args: ["abcabcbb"], expectedValue: 3 },
      { input: "s = \"bbbbb\"", expected: "1", args: ["bbbbb"], expectedValue: 1 },
      { input: "s = \"pwwkew\"", expected: "3", args: ["pwwkew"], expectedValue: 3 }
    ],
    why: "A sliding window with a hash set naturally tracks unique characters and contracts when a duplicate appears."
  },
  {
    id: "subarray-product-less-than-k",
    patternId: "slidingwindow",
    name: "Subarray Product Less Than K",
    difficulty: "Medium",
    number: 713,
    description: `Given an array of positive integers nums and integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.`,
    examples: [
      { input: "nums = [10,5,2,6], k = 100", output: "8", explanation: "The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]." },
      { input: "nums = [1,2,3], k = 0", output: "0" }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "1 <= nums[i] <= 1000",
      "0 <= k <= 10^6"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var numSubarrayProductLessThanK = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var numSubarrayProductLessThanK = function(nums, k) {
    if (k <= 1) return 0;
    let left = 0, product = 1, count = 0;
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        while (product >= k) {
            product /= nums[left];
            left++;
        }
        count += right - left + 1;
    }
    return count;
};`,
    testCases: [
      { input: "nums = [10,5,2,6], k = 100", expected: "8", args: [[10,5,2,6], 100], expectedValue: 8 },
      { input: "nums = [1,2,3], k = 0", expected: "0", args: [[1,2,3], 0], expectedValue: 0 },
      { input: "nums = [1,1,1], k = 2", expected: "6", args: [[1,1,1], 2], expectedValue: 6 }
    ],
    why: "A variable sliding window multiplies and divides elements to maintain a product bound and count valid subarrays."
  },
  {
    id: "fruit-into-baskets",
    patternId: "slidingwindow",
    name: "Fruit Into Baskets",
    difficulty: "Medium",
    number: 904,
    description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces. You have two baskets, and each basket can only hold a single type of fruit. Starting from any tree, you must pick exactly one fruit from every tree while moving to the right. Return the maximum number of fruits you can pick.`,
    examples: [
      { input: "fruits = [1,2,1]", output: "3" },
      { input: "fruits = [0,0,1,1,1,2,2]", output: "5", explanation: "We can pick from trees [1,1,1,2,2]." },
      { input: "fruits = [1,2,3,2,2]", output: "4" }
    ],
    constraints: [
      "1 <= fruits.length <= 10^5",
      "0 <= fruits[i] < fruits.length"
    ],
    starterCode: `/**
 * @param {number[]} fruits
 */
var totalFruit = function(fruits) {
    // Write your code here
    
};`,
    solution: `var totalFruit = function(fruits) {
    const map = new Map();
    let left = 0, max = 0;
    for (let right = 0; right < fruits.length; right++) {
        map.set(fruits[right], (map.get(fruits[right]) || 0) + 1);
        while (map.size > 2) {
            map.set(fruits[left], map.get(fruits[left]) - 1);
            if (map.get(fruits[left]) === 0) map.delete(fruits[left]);
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
};`,
    testCases: [
      { input: "fruits = [1,2,1]", expected: "3", args: [[1,2,1]], expectedValue: 3 },
      { input: "fruits = [0,0,1,1,1,2,2]", expected: "5", args: [[0,0,1,1,1,2,2]], expectedValue: 5 },
      { input: "fruits = [1,2,3,2,2]", expected: "4", args: [[1,2,3,2,2]], expectedValue: 4 }
    ],
    why: "A sliding window with a frequency map limits the number of distinct fruit types to two while maximizing the window size."
  },

  {
    id: "max-consecutive-ones-iii",
    patternId: "slidingwindow",
    name: "Max Consecutive Ones III",
    difficulty: "Medium",
    number: 1004,
    description: `Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.`,
    examples: [
      { input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2", output: "6" },
      { input: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3", output: "10" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "nums[i] is either 0 or 1.",
      "0 <= k <= nums.length"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var longestOnes = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var longestOnes = function(nums, k) {
    let left = 0, zeros = 0, max = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
};`,
    testCases: [
      { input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2", expected: "6", args: [[1,1,1,0,0,0,1,1,1,1,0], 2], expectedValue: 6 },
      { input: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3", expected: "10", args: [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3], expectedValue: 10 },
      { input: "nums = [1,1,1], k = 0", expected: "3", args: [[1,1,1], 0], expectedValue: 3 }
    ],
    why: "A sliding window counts flipped zeros and contracts only when the budget is exceeded, maximizing the span of ones."
  },
  {
    id: "longest-repeating-character-replacement",
    patternId: "slidingwindow",
    name: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    number: 424,
    description: `You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    examples: [
      { input: "s = \"ABAB\", k = 2", output: "4", explanation: "Replace the two 'A's with two 'B's or vice versa." },
      { input: "s = \"AABABBA\", k = 1", output: "4", explanation: "Replace the one 'A' in the middle with 'B' to get \"AABBBBA\"." }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    starterCode: `/**
 * @param {string} s
 * @param {number} k
 */
var characterReplacement = function(s, k) {
    // Write your code here
    
};`,
    solution: `var characterReplacement = function(s, k) {
    const count = {};
    let left = 0, maxFreq = 0, max = 0;
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxFreq = Math.max(maxFreq, count[s[right]]);
        while (right - left + 1 - maxFreq > k) {
            count[s[left]]--;
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
};`,
    testCases: [
      { input: "s = \"ABAB\", k = 2", expected: "4", args: ["ABAB", 2], expectedValue: 4 },
      { input: "s = \"AABABBA\", k = 1", expected: "4", args: ["AABABBA", 1], expectedValue: 4 },
      { input: "s = \"AAAA\", k = 0", expected: "4", args: ["AAAA", 0], expectedValue: 4 }
    ],
    why: "A sliding window tracks character frequencies so we know how many replacements are needed to unify the window."
  },
  {
    id: "permutation-in-string",
    patternId: "slidingwindow",
    name: "Permutation in String",
    difficulty: "Medium",
    number: 567,
    description: `Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.`,
    examples: [
      { input: "s1 = \"ab\", s2 = \"eidbaooo\"", output: "true", explanation: "s2 contains one permutation of s1 (\"ba\")." },
      { input: "s1 = \"ab\", s2 = \"eidboaoo\"", output: "false" },
      { input: "s1 = \"adc\", s2 = \"dcda\"", output: "true" }
    ],
    constraints: [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters."
    ],
    starterCode: `/**
 * @param {string} s1
 * @param {string} s2
 */
var checkInclusion = function(s1, s2) {
    // Write your code here
    
};`,
    solution: `var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i) - 97]++;
    }
    if (arraysEqual(count1, count2)) return true;
    for (let i = s1.length; i < s2.length; i++) {
        count2[s2.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i - s1.length) - 97]--;
        if (arraysEqual(count1, count2)) return true;
    }
    return false;
};

function arraysEqual(a, b) {
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}`,
    testCases: [
      { input: "s1 = \"ab\", s2 = \"eidbaooo\"", expected: "true", args: ["ab", "eidbaooo"], expectedValue: true },
      { input: "s1 = \"ab\", s2 = \"eidboaoo\"", expected: "false", args: ["ab", "eidboaoo"], expectedValue: false },
      { input: "s1 = \"adc\", s2 = \"dcda\"", expected: "true", args: ["adc", "dcda"], expectedValue: true }
    ],
    why: "A fixed sliding window of length s1 compares frequency arrays to detect a matching anagram permutation."
  },

  {
    id: "minimum-window-substring",
    patternId: "slidingwindow",
    name: "Minimum Window Substring",
    difficulty: "Hard",
    number: 76,
    description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".`,
    examples: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"", explanation: "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t." },
      { input: "s = \"a\", t = \"a\"", output: "\"a\"" },
      { input: "s = \"a\", t = \"aa\"", output: "\"\"" }
    ],
    constraints: [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 */
var minWindow = function(s, t) {
    // Write your code here
    
};`,
    solution: `var minWindow = function(s, t) {
    const need = {};
    for (const c of t) need[c] = (need[c] || 0) + 1;
    let missing = t.length;
    let left = 0, start = 0, minLen = Infinity;
    for (let right = 0; right < s.length; right++) {
        if (need[s[right]] !== undefined) {
            need[s[right]]--;
            if (need[s[right]] >= 0) missing--;
        }
        while (missing === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }
            if (need[s[left]] !== undefined) {
                need[s[left]]++;
                if (need[s[left]] > 0) missing++;
            }
            left++;
        }
    }
    return minLen === Infinity ? "" : s.slice(start, start + minLen);
};`,
    testCases: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", expected: "\"BANC\"", args: ["ADOBECODEBANC", "ABC"], expectedValue: "BANC" },
      { input: "s = \"a\", t = \"a\"", expected: "\"a\"", args: ["a", "a"], expectedValue: "a" },
      { input: "s = \"a\", t = \"aa\"", expected: "\"\"", args: ["a", "aa"], expectedValue: "" }
    ],
    why: "A variable sliding window expands to include all required characters and contracts to find the smallest valid substring."
  },
  {
    id: "sliding-window-maximum",
    patternId: "slidingwindow",
    name: "Sliding Window Maximum",
    difficulty: "Hard",
    number: 239,
    description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.`,
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 */
var maxSlidingWindow = function(nums, k) {
    // Write your code here
    
};`,
    solution: `var maxSlidingWindow = function(nums, k) {
    const deque = [];
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (deque[0] <= i - k) deque.shift();
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
};`,
    testCases: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", expected: "[3,3,5,5,6,7]", args: [[1,3,-1,-3,5,3,6,7], 3], expectedValue: [3,3,5,5,6,7] },
      { input: "nums = [1], k = 1", expected: "[1]", args: [[1], 1], expectedValue: [1] },
      { input: "nums = [1,-1], k = 1", expected: "[1,-1]", args: [[1,-1], 1], expectedValue: [1,-1] }
    ],
    why: "A monotonic deque maintains the maximum of the current window by discarding smaller elements that leave first."
  }
];
