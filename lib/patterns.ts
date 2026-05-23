// Neuro-OS Pattern Library Data
// Designed for 2e bottom-up processors: each entry provides trigger -> skeleton -> flesh

export interface Pattern {
  id: string;
  name: string;
  tag: string;
  color: string; // tailwind class suffix
  trigger: string;
  invariant: string;
  template: string;
  complexity: string;
  problems: Problem[];
}

export interface Problem {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  number?: number;
  why: string; // one sentence structural necessity
}

export const patterns: Pattern[] = [
  {
    id: "hashmap",
    name: "Hash Map",
    tag: "O(1) Lookup",
    color: "emerald",
    trigger: "Need frequency, existence, or pairing. Input is unsorted.",
    invariant: "The map always contains exactly the elements seen so far.",
    template: `const map = new Map();
for (const x of arr) {
  // process x using map
  map.set(key, value);
}`,
    complexity: "Time: O(n), Space: O(n)",
    problems: [
      { name: "Two Sum", difficulty: "Easy", why: "Complement lookup reduces O(n²) to O(n)." },
      { name: "Contains Duplicate", difficulty: "Easy", why: "Set existence is O(1)." },
      { name: "Group Anagrams", difficulty: "Medium", why: "Sorted string is a canonical key." },
      { name: "Top K Frequent Elements", difficulty: "Medium", why: "Count first, then select." },
    ],
  },
  {
    id: "twopointers",
    name: "Two Pointers",
    tag: "Monotonic",
    color: "sky",
    trigger: "Input is sorted or needs in-place rearrangement.",
    invariant: "The answer (if it exists) is always inside [left, right].",
    template: `let left = 0, right = arr.length - 1;
while (left < right) {
  if (condition) return;
  else if (tooSmall) left++;
  else right--;
}`,
    complexity: "Time: O(n), Space: O(1)",
    problems: [
      { name: "Two Sum II", difficulty: "Medium", why: "Sorted array creates monotonicity." },
      { name: "3Sum", difficulty: "Medium", why: "Fix one, two-pointer the rest." },
      { name: "Container With Most Water", difficulty: "Medium", why: "Moving shorter line is optimal." },
      { name: "Trapping Rain Water", difficulty: "Hard", why: "Water depends on min(leftMax, rightMax)." },
    ],
  },
  {
    id: "slidingwindow",
    name: "Sliding Window",
    tag: "Contiguous",
    color: "violet",
    trigger: "Problem asks for a contiguous subarray/substring.",
    invariant: "Window [left, right] is the largest valid window ending at right.",
    template: `let left = 0;
for (let right = 0; right < arr.length; right++) {
  add(arr[right]);
  while (invalid()) {
    remove(arr[left]);
    left++;
  }
  updateAnswer();
}`,
    complexity: "Time: O(n), Space: O(min(m,n))",
    problems: [
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", why: "Jump left past duplicates." },
      { name: "Minimum Window Substring", difficulty: "Hard", why: "Expand until valid, then shrink." },
      { name: "Subarray Product Less Than K", difficulty: "Medium", why: "All starts in [left,right] are valid." },
    ],
  },
  {
    id: "stack",
    name: "Stack",
    tag: "LIFO / Monotonic",
    color: "amber",
    trigger: "Need next greater/smaller, or deferred matching.",
    invariant: "Each element is pushed once and popped once.",
    template: `const stack = [];
for (let i = 0; i < arr.length; i++) {
  while (stack.length && arr[i] > arr[stack.at(-1)]) {
    const idx = stack.pop();
    answer[idx] = arr[i];
  }
  stack.push(i);
}`,
    complexity: "Time: O(n), Space: O(n)",
    problems: [
      { name: "Valid Parentheses", difficulty: "Easy", why: "Stack matches nested pairs." },
      { name: "Daily Temperatures", difficulty: "Medium", why: "Monotonic decreasing stack." },
      { name: "Largest Rectangle in Histogram", difficulty: "Hard", why: "Stack tracks increasing heights." },
    ],
  },
  {
    id: "binarysearch",
    name: "Binary Search",
    tag: "Halving",
    color: "rose",
    trigger: "Array is sorted, or answer space is monotonic.",
    invariant: "Target (if it exists) is always inside [left, right].",
    template: `let left = 0, right = arr.length - 1;
while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (arr[mid] === target) return mid;
  else if (arr[mid] < target) left = mid + 1;
  else right = mid - 1;
}`,
    complexity: "Time: O(log n), Space: O(1)",
    problems: [
      { name: "Binary Search", difficulty: "Easy", why: "Discard half each step." },
      { name: "Search in Rotated Sorted Array", difficulty: "Medium", why: "One half is always sorted." },
      { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", why: "Compare mid to right." },
    ],
  },
  {
    id: "linkedlist",
    name: "Linked List",
    tag: "Pointer",
    color: "cyan",
    trigger: "O(1) insertion/deletion or pointer manipulation required.",
    invariant: "All nodes before current are correctly linked.",
    template: `let prev = null, curr = head;
while (curr) {
  const next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}
return prev;`,
    complexity: "Time: O(n), Space: O(1)",
    problems: [
      { name: "Reverse Linked List", difficulty: "Easy", why: "Three-pointer reversal." },
      { name: "Merge Two Sorted Lists", difficulty: "Easy", why: "Dummy head pattern." },
      { name: "Linked List Cycle", difficulty: "Easy", why: "Floyd's fast/slow." },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    tag: "Hierarchical",
    color: "indigo",
    trigger: "Data is hierarchical (parent-child).",
    invariant: "When dfs(node) returns, all descendants are processed.",
    template: `function dfs(node) {
  if (!node) return;
  dfs(node.left);
  dfs(node.right);
  // post-order processing
}`,
    complexity: "Time: O(n), Space: O(h)",
    problems: [
      { name: "Invert Binary Tree", difficulty: "Easy", why: "Pre-order swap." },
      { name: "Maximum Depth", difficulty: "Easy", why: "Post-order max+1." },
      { name: "Validate BST", difficulty: "Medium", why: "Range checking invariant." },
    ],
  },
  {
    id: "heap",
    name: "Heap",
    tag: "Priority",
    color: "fuchsia",
    trigger: "Need min/max element dynamically, or top K.",
    invariant: "Parent is always smaller than children (min-heap).",
    template: `const minHeap = new MinHeap();
for (const x of arr) {
  minHeap.push(x);
  if (minHeap.size() > k) minHeap.pop();
}
return minHeap.peek();`,
    complexity: "Time: O(n log k), Space: O(k)",
    problems: [
      { name: "Kth Largest Element", difficulty: "Medium", why: "Min-heap of size k." },
      { name: "Merge K Sorted Lists", difficulty: "Hard", why: "K-way merge." },
    ],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    tag: "Combinatorial",
    color: "orange",
    trigger: "Problem asks for all permutations/subsets/combinations.",
    invariant: "Path contains a valid partial solution; restored on return.",
    template: `function backtrack(path, choices) {
  if (isSolution(path)) result.push([...path]);
  for (const choice of choices) {
    path.push(choice);
    backtrack(path, nextChoices);
    path.pop();
  }
}`,
    complexity: "Time: O(b^d), Space: O(d)",
    problems: [
      { name: "Subsets", difficulty: "Medium", why: "Every node is a valid subset." },
      { name: "Permutations", difficulty: "Medium", why: "Used array prevents reuse." },
      { name: "N-Queens", difficulty: "Hard", why: "Conflict sets prune branches." },
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    tag: "Network",
    color: "lime",
    trigger: "Non-hierarchical network, dependencies, or grid traversal.",
    invariant: "Visited set guarantees each node processed exactly once.",
    template: `const visited = new Set();
const stack = [start];
while (stack.length) {
  const node = stack.pop();
  if (visited.has(node)) continue;
  visited.add(node);
  for (const neighbor of adj[node]) {
    if (!visited.has(neighbor)) stack.push(neighbor);
  }
}`,
    complexity: "Time: O(V+E), Space: O(V)",
    problems: [
      { name: "Number of Islands", difficulty: "Medium", why: "Grid DFS marks connected land." },
      { name: "Course Schedule", difficulty: "Medium", why: "Topological sort via Kahn." },
      { name: "Clone Graph", difficulty: "Medium", why: "Visited map prevents cycles." },
    ],
  },
  {
    id: "dp1d",
    name: "DP 1D",
    tag: "Optimal Substructure",
    color: "teal",
    trigger: "Problem asks for max/min/count with overlapping subproblems.",
    invariant: "dp[i] is correct for all j < i before computing dp[i].",
    template: `const dp = new Array(n + 1).fill(0);
dp[0] = baseCase;
for (let i = 1; i <= n; i++) {
  dp[i] = recurrence(dp[i-1], dp[i-2]);
}
return dp[n];`,
    complexity: "Time: O(n), Space: O(n) → O(1)",
    problems: [
      { name: "Climbing Stairs", difficulty: "Easy", why: "Fibonacci recurrence." },
      { name: "House Robber", difficulty: "Medium", why: "Rob or skip." },
      { name: "Coin Change", difficulty: "Medium", why: "Unbounded knapsack." },
      { name: "Maximum Subarray", difficulty: "Medium", why: "Kadane's local/global max." },
    ],
  },
  {
    id: "dp2d",
    name: "DP 2D",
    tag: "Grid / Two Sequences",
    color: "emerald",
    trigger: "Decisions depend on two dimensions (grid, two strings).",
    invariant: "dp[i][j] is correct for all i'≤i, j'≤j before computing.",
    template: `const dp = Array(m+1).fill(null).map(() => Array(n+1).fill(0));
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = recurrence(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
}
return dp[m][n];`,
    complexity: "Time: O(m×n), Space: O(m×n)",
    problems: [
      { name: "Unique Paths", difficulty: "Medium", why: "Paths = up + left." },
      { name: "Longest Common Subsequence", difficulty: "Medium", why: "Match extends diagonal." },
      { name: "Edit Distance", difficulty: "Hard", why: "Replace/delete/insert." },
    ],
  },
  {
    id: "intervals",
    name: "Intervals",
    tag: "Range Coordination",
    color: "pink",
    trigger: "Time ranges or start/end points need coordination.",
    invariant: "After sorting by start, non-overlapping intervals are adjacent.",
    template: `intervals.sort((a,b) => a[0] - b[0]);
const merged = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const last = merged.at(-1);
  if (intervals[i][0] <= last[1]) {
    last[1] = Math.max(last[1], intervals[i][1]);
  } else merged.push(intervals[i]);
}
return merged;`,
    complexity: "Time: O(n log n), Space: O(n)",
    problems: [
      { name: "Merge Intervals", difficulty: "Medium", why: "Sort then scan." },
      { name: "Non-overlapping Intervals", difficulty: "Medium", why: "Greedy by end time." },
      { name: "Meeting Rooms II", difficulty: "Medium", why: "Count max overlap." },
    ],
  },
  {
    id: "bits",
    name: "Bit Manipulation",
    tag: "Binary",
    color: "yellow",
    trigger: "Powers of 2, parity, or uniqueness via XOR.",
    invariant: "XOR cancels duplicates; AND isolates; OR combines.",
    template: `let result = 0;
for (const num of nums) {
  result ^= num; // XOR all
}
return result;`,
    complexity: "Time: O(n), Space: O(1)",
    problems: [
      { name: "Single Number", difficulty: "Easy", why: "XOR cancels pairs." },
      { name: "Number of 1 Bits", difficulty: "Easy", why: "n & (n-1) clears lowest bit." },
      { name: "Missing Number", difficulty: "Easy", why: "XOR indices and values." },
    ],
  },
  {
    id: "greedy",
    name: "Greedy",
    tag: "Local Optimal",
    color: "orange",
    trigger: "Problem asks for global optimum that can be built from local choices.",
    invariant: "The locally optimal choice at each step leads to globally optimal.",
    template: `// Sort by some criteria
data.sort((a,b) => a.end - b.end);
let count = 0, lastEnd = -Infinity;
for (const item of data) {
  if (item.start >= lastEnd) {
    count++;
    lastEnd = item.end;
  }
}`,
    complexity: "Time: O(n log n), Space: O(n)",
    problems: [
      { name: "Jump Game", difficulty: "Medium", why: "Track farthest reachable index." },
      { name: "Jump Game II", difficulty: "Medium", why: "Min jumps via greedy BFS." },
      { name: "Gas Station", difficulty: "Medium", why: "If total gas >= total cost, a solution exists." },
      { name: "Task Scheduler", difficulty: "Medium", why: "Most frequent task dictates minimum idle time." },
    ],
  },
];
