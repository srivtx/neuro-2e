export interface RoadmapWeek {
  week: number;
  patternId: string;
  patternName: string;
  objective: string;
  structuralNecessity: string;
  newProblems: number;
  reviewProblems: number;
  deliverables: string[];
  problems: { name: string; number?: number; difficulty: "Easy" | "Medium" | "Hard"; day: string; insight: string }[];
}

export const roadmap: RoadmapWeek[] = [
  {
    week: 1,
    patternId: "hashmap",
    patternName: "Arrays & Hashing",
    objective: "Master O(1) lookup patterns and array traversal fundamentals.",
    structuralNecessity: "When frequency, existence, or pairing matters, hash maps reduce O(n²) to O(n).",
    newProblems: 12,
    reviewProblems: 0,
    deliverables: [
      "12 derivation logs completed",
      "1 LTS pattern document written",
      "Can articulate: 'When I need O(1) existence/frequency lookup, I use a hash map because...'"
    ],
    problems: [
      { name: "Two Sum", number: 1, difficulty: "Easy", day: "Monday", insight: "Complement lookup reduces O(n²) to O(n)." },
      { name: "Contains Duplicate", number: 217, difficulty: "Easy", day: "Monday", insight: "Set existence is O(1)." },
      { name: "Valid Anagram", number: 242, difficulty: "Easy", day: "Tuesday", insight: "Character frequency counting." },
      { name: "Group Anagrams", number: 49, difficulty: "Medium", day: "Tuesday", insight: "Sorted string is the canonical key." },
      { name: "Top K Frequent Elements", number: 347, difficulty: "Medium", day: "Tuesday", insight: "Count first, then select top K." },
      { name: "Product of Array Except Self", number: 238, difficulty: "Medium", day: "Wednesday", insight: "Prefix/suffix products without division." },
      { name: "Valid Sudoku", number: 36, difficulty: "Medium", day: "Wednesday", insight: "Hash sets for row/col/box constraints." },
      { name: "Encode and Decode Strings", number: 271, difficulty: "Medium", day: "Wednesday", insight: "Length-prefixed serialization." },
      { name: "Longest Consecutive Sequence", number: 128, difficulty: "Medium", day: "Thursday", insight: "Hash set for O(n) sequence detection." },
      { name: "Intersection of Two Arrays", number: 349, difficulty: "Easy", day: "Thursday", insight: "Basic set intersection." },
      { name: "Intersection of Two Arrays II", number: 350, difficulty: "Easy", day: "Thursday", insight: "Frequency map intersection." },
      { name: "Move Zeroes", number: 283, difficulty: "Easy", day: "Friday", insight: "Two-pointer in-place rearrangement." },
    ],
  },
  {
    week: 2,
    patternId: "twopointers",
    patternName: "Two Pointers",
    objective: "Master pair-wise processing from both ends and monotonic array exploitation.",
    structuralNecessity: "Sorted/monotonic ordering allows skipping impossible candidates, reducing search space.",
    newProblems: 10,
    reviewProblems: 3,
    deliverables: [
      "10 new derivation logs + 3 review logs",
      "2 LTS pattern documents total",
      "Can articulate: 'When the array is sorted or monotonic, two pointers reduce the problem from O(n²) to O(n) because...'"
    ],
    problems: [
      { name: "Valid Palindrome", number: 125, difficulty: "Easy", day: "Monday", insight: "Left/right pointer comparison." },
      { name: "Two Sum II", number: 167, difficulty: "Medium", day: "Monday", insight: "Sorted array two-pointer." },
      { name: "3Sum", number: 15, difficulty: "Medium", day: "Tuesday", insight: "Fix one, two-pointer the rest." },
      { name: "3Sum Closest", number: 16, difficulty: "Medium", day: "Tuesday", insight: "Variation with target comparison." },
      { name: "Container With Most Water", number: 11, difficulty: "Medium", day: "Tuesday", insight: "Moving shorter line is optimal." },
      { name: "Trapping Rain Water", number: 42, difficulty: "Hard", day: "Wednesday", insight: "Water depends on min(leftMax, rightMax)." },
      { name: "Remove Duplicates from Sorted Array", number: 26, difficulty: "Easy", day: "Wednesday", insight: "In-place deduplication." },
      { name: "Remove Element", number: 27, difficulty: "Easy", day: "Wednesday", insight: "In-place removal." },
      { name: "Sort Colors", number: 75, difficulty: "Medium", day: "Thursday", insight: "Dutch National Flag. Three pointers for O(n) in-place." },
      { name: "Boats to Save People", number: 881, difficulty: "Medium", day: "Thursday", insight: "Greedy two-pointer pairing." },
    ],
  },
  {
    week: 3,
    patternId: "slidingwindow",
    patternName: "Sliding Window",
    objective: "Master subarray/substring optimization with dynamic expansion/contraction.",
    structuralNecessity: "When brute force is O(n²) and the problem asks for a contiguous subarray, a window achieves O(n).",
    newProblems: 10,
    reviewProblems: 3,
    deliverables: [
      "10 new derivation logs + 3 review logs",
      "3 LTS pattern documents total",
      "Can articulate: 'When brute force is O(n²) and contiguous, sliding window achieves O(n)...'"
    ],
    problems: [
      { name: "Best Time to Buy and Sell Stock", number: 121, difficulty: "Easy", day: "Monday", insight: "Minimum-so-far creates the window." },
      { name: "Longest Substring Without Repeating Characters", number: 3, difficulty: "Medium", day: "Monday", insight: "Window starts at last duplicate + 1." },
      { name: "Permutation in String", number: 567, difficulty: "Medium", day: "Tuesday", insight: "Fixed-size window with frequency map." },
      { name: "Minimum Window Substring", number: 76, difficulty: "Hard", day: "Tuesday", insight: "Variable window with constraint satisfaction." },
      { name: "Sliding Window Maximum", number: 239, difficulty: "Hard", day: "Tuesday", insight: "Monotonic deque gives O(n)." },
      { name: "Subarray Product Less Than K", number: 713, difficulty: "Medium", day: "Wednesday", insight: "Counting subarrays with product constraint." },
      { name: "Longest Repeating Character Replacement", number: 424, difficulty: "Medium", day: "Wednesday", insight: "Window with at most k replacements." },
      { name: "Max Consecutive Ones III", number: 1004, difficulty: "Medium", day: "Wednesday", insight: "Flip at most k zeros." },
      { name: "Number of Substrings With Only 1s", number: 1513, difficulty: "Medium", day: "Thursday", insight: "Counting using window property." },
      { name: "Fruit Into Baskets", number: 904, difficulty: "Medium", day: "Thursday", insight: "At most 2 distinct types." },
    ],
  },
  {
    week: 4,
    patternId: "stack",
    patternName: "Stack",
    objective: "Master LIFO processing, monotonic stacks, and deferred computation patterns.",
    structuralNecessity: "When you need to defer processing or maintain monotonic property (next greater/smaller), stack provides O(1) push/pop with ordered access.",
    newProblems: 10,
    reviewProblems: 3,
    deliverables: [
      "10 new derivation logs + 3 review logs",
      "4 LTS pattern documents total",
      "Can articulate: 'When I need next greater/smaller element, a monotonic stack gives O(n) because each element is pushed and popped exactly once...'"
    ],
    problems: [
      { name: "Valid Parentheses", number: 20, difficulty: "Easy", day: "Monday", insight: "Stack matches nested pairs." },
      { name: "Min Stack", number: 155, difficulty: "Medium", day: "Monday", insight: "Auxiliary stack for minimum tracking." },
      { name: "Evaluate Reverse Polish Notation", number: 150, difficulty: "Medium", day: "Tuesday", insight: "Stack-based evaluation." },
      { name: "Daily Temperatures", number: 739, difficulty: "Medium", day: "Tuesday", insight: "Monotonic decreasing stack." },
      { name: "Largest Rectangle in Histogram", number: 84, difficulty: "Hard", day: "Tuesday", insight: "Stack tracks increasing heights." },
      { name: "Next Greater Element I", number: 496, difficulty: "Easy", day: "Wednesday", insight: "Basic monotonic stack." },
      { name: "Next Greater Element II", number: 503, difficulty: "Medium", day: "Wednesday", insight: "Circular array - process 2n elements." },
      { name: "Car Fleet", number: 853, difficulty: "Medium", day: "Wednesday", insight: "Stack for collision detection." },
      { name: "Online Stock Span", number: 901, difficulty: "Medium", day: "Thursday", insight: "Monotonic stack for span calculation." },
      { name: "Remove All Adjacent Duplicates in String II", number: 1209, difficulty: "Medium", day: "Thursday", insight: "Stack with count tracking." },
    ],
  },
  {
    week: 5,
    patternId: "binarysearch",
    patternName: "Binary Search",
    objective: "Master divide-by-half search on monotonic predicates.",
    structuralNecessity: "When the answer space is monotonic (if X works, all > X work), binary search reduces O(n) to O(log n).",
    newProblems: 12,
    reviewProblems: 3,
    deliverables: [
      "12 new derivation logs + 3 review logs",
      "5 LTS pattern documents total",
      "Can articulate: 'When the answer space is monotonic, binary search on the answer gives O(log n) because we discard half at each step...'"
    ],
    problems: [
      { name: "Binary Search", number: 704, difficulty: "Easy", day: "Monday", insight: "Discard half each step." },
      { name: "Search in Rotated Sorted Array", number: 33, difficulty: "Medium", day: "Monday", insight: "One half is always sorted." },
      { name: "Find Minimum in Rotated Sorted Array", number: 153, difficulty: "Medium", day: "Monday", insight: "Compare mid to right." },
      { name: "Search a 2D Matrix", number: 74, difficulty: "Medium", day: "Tuesday", insight: "Treat as 1D sorted array." },
      { name: "Koko Eating Bananas", number: 875, difficulty: "Medium", day: "Tuesday", insight: "Binary search on answer space." },
      { name: "Find Minimum in Rotated Sorted Array II", number: 154, difficulty: "Medium", day: "Tuesday", insight: "Duplicates break the guarantee." },
      { name: "Time Based Key-Value Store", number: 981, difficulty: "Medium", day: "Wednesday", insight: "Binary search on timestamps." },
      { name: "Search Insert Position", number: 35, difficulty: "Easy", day: "Wednesday", insight: "Lower bound." },
      { name: "Find Peak Element", number: 162, difficulty: "Medium", day: "Wednesday", insight: "A peak must exist." },
      { name: "Search for a Range", number: 34, difficulty: "Medium", day: "Thursday", insight: "Find first and last occurrence." },
      { name: "Sqrt(x)", number: 69, difficulty: "Easy", day: "Thursday", insight: "Binary search on integer answer." },
      { name: "Capacity To Ship Packages Within D Days", number: 1011, difficulty: "Medium", day: "Thursday", insight: "Binary search on capacity." },
    ],
  },
  {
    week: 6,
    patternId: "linkedlist",
    patternName: "Linked List",
    objective: "Master pointer manipulation, fast/slow pointers, and in-place restructuring.",
    structuralNecessity: "When sequential access with O(1) insertion/deletion is required, linked lists provide pointer-based manipulation without array shifting.",
    newProblems: 12,
    reviewProblems: 3,
    deliverables: [
      "12 new derivation logs + 3 review logs",
      "6 LTS pattern documents total",
      "Can articulate: 'When I need O(1) insertion/deletion or pointer manipulation, a linked list allows restructuring without shifting elements...'"
    ],
    problems: [
      { name: "Reverse Linked List", number: 206, difficulty: "Easy", day: "Monday", insight: "Three-pointer reversal." },
      { name: "Merge Two Sorted Lists", number: 21, difficulty: "Easy", day: "Monday", insight: "Dummy head pattern." },
      { name: "Linked List Cycle", number: 141, difficulty: "Easy", day: "Tuesday", insight: "Floyd's fast/slow." },
      { name: "Reorder List", number: 143, difficulty: "Medium", day: "Tuesday", insight: "Find middle, reverse, merge." },
      { name: "Remove Nth Node From End of List", number: 19, difficulty: "Medium", day: "Tuesday", insight: "Fast/slow pointer with gap." },
      { name: "Merge K Sorted Lists", number: 23, difficulty: "Hard", day: "Wednesday", insight: "Priority queue or divide-and-conquer." },
      { name: "Add Two Numbers", number: 2, difficulty: "Medium", day: "Wednesday", insight: "Digit-by-digit addition with carry." },
      { name: "Copy List with Random Pointer", number: 138, difficulty: "Medium", day: "Wednesday", insight: "Interleaving copy." },
      { name: "Rotate List", number: 61, difficulty: "Medium", day: "Thursday", insight: "Find kth from end, rewire." },
      { name: "Partition List", number: 86, difficulty: "Medium", day: "Thursday", insight: "Separate into two lists, rejoin." },
      { name: "Remove Duplicates from Sorted List II", number: 82, difficulty: "Medium", day: "Thursday", insight: "Skip all duplicates." },
      { name: "Odd Even Linked List", number: 328, difficulty: "Medium", day: "Friday", insight: "Separate and rejoin." },
    ],
  },
  {
    week: 7,
    patternId: "review",
    patternName: "Review & Consolidation 1",
    objective: "No new patterns. Interleaved review of Weeks 1-6. Strengthen weak areas.",
    structuralNecessity: "Re-derivation from memory is the only valid test of proceduralization. Review is not repetition; it is myelination reinforcement.",
    newProblems: 0,
    reviewProblems: 12,
    deliverables: [
      "12 review logs",
      "All 6 LTS documents updated",
      "Can identify the correct pattern for 70% of Phase 1 problems within 2 minutes"
    ],
    problems: [
      { name: "Re-derive 2 problems from Week 1 (Arrays & Hashing)", difficulty: "Medium", day: "Monday", insight: "From scratch without looking." },
      { name: "Re-derive 2 problems from Week 2 (Two Pointers)", difficulty: "Medium", day: "Tuesday", insight: "Identify pattern from statement alone." },
      { name: "Re-derive 2 problems from Week 3 (Sliding Window)", difficulty: "Medium", day: "Tuesday", insight: "Identify pattern from statement alone." },
      { name: "Re-derive 2 problems from Week 4 (Stack)", difficulty: "Medium", day: "Wednesday", insight: "Write inclusive/exclusive templates from memory." },
      { name: "Re-derive 2 problems from Week 5 (Binary Search)", difficulty: "Medium", day: "Wednesday", insight: "Write inclusive/exclusive templates from memory." },
      { name: "Re-derive 2 problems from Week 6 (Linked List)", difficulty: "Medium", day: "Thursday", insight: "Draw pointer states step by step." },
      { name: "Pattern Identification Drill: 4 problem statements", difficulty: "Medium", day: "Friday", insight: "Identify pattern BEFORE reading full description." },
    ],
  },
  {
    week: 8,
    patternId: "trees",
    patternName: "Trees - Basics",
    objective: "Master hierarchical traversal: DFS (recursive/iterative), BFS, and BST properties.",
    structuralNecessity: "Hierarchical data with parent-child relationships requires tree traversal. Recursion naturally maps to tree depth.",
    newProblems: 12,
    reviewProblems: 3,
    deliverables: [
      "12 new derivation logs + 3 review logs",
      "7 LTS pattern documents total",
      "Can articulate: 'When data is hierarchical, tree traversal (DFS/BFS) is necessary because the parent-child relationship defines the search space...'"
    ],
    problems: [
      { name: "Invert Binary Tree", number: 226, difficulty: "Easy", day: "Monday", insight: "Pre-order swap." },
      { name: "Maximum Depth of Binary Tree", number: 104, difficulty: "Easy", day: "Monday", insight: "Post-order max+1." },
      { name: "Same Tree", number: 100, difficulty: "Easy", day: "Monday", insight: "Simultaneous traversal." },
      { name: "Subtree of Another Tree", number: 572, difficulty: "Medium", day: "Tuesday", insight: "Serialize or recursive check." },
      { name: "Lowest Common Ancestor of a Binary Search Tree", number: 235, difficulty: "Medium", day: "Tuesday", insight: "BST property exploitation." },
      { name: "Binary Tree Level Order Traversal", number: 102, difficulty: "Medium", day: "Tuesday", insight: "BFS with queue." },
      { name: "Validate Binary Search Tree", number: 98, difficulty: "Medium", day: "Wednesday", insight: "In-order traversal or range checking." },
      { name: "Kth Smallest Element in a BST", number: 230, difficulty: "Medium", day: "Wednesday", insight: "In-order traversal." },
      { name: "Construct Binary Tree from Preorder and Inorder", number: 105, difficulty: "Medium", day: "Wednesday", insight: "Preorder gives root, inorder gives partition." },
      { name: "Path Sum", number: 112, difficulty: "Easy", day: "Thursday", insight: "DFS with accumulator." },
      { name: "Binary Tree Maximum Path Sum", number: 124, difficulty: "Hard", day: "Thursday", insight: "Post-order DFS. Need both local and global max." },
      { name: "Symmetric Tree", number: 101, difficulty: "Easy", day: "Thursday", insight: "Mirror traversal." },
    ],
  },
];

// Phase 2 roadmap (continuing the pattern)
export const phase2Patterns = [
  "heap",
  "backtracking",
  "graphs",
  "dp1d",
  "dp2d",
  "intervals",
  "bits",
  "greedy",
];
