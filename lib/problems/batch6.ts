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

export const batch6Problems: Problem[] = [
  // ==================== INTERVALS (15) ====================
  {
    id: "merge-intervals",
    patternId: "intervals",
    name: "Merge Intervals",
    difficulty: "Medium",
    number: 56,
    description: `Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Intervals [1,3] and [2,6] overlap, so they are merged into [1,6]."
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start <= end <= 10^4"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    // Write your code here
    
};`,
    solution: `var merge = function(intervals) {
    if (!intervals.length) return [];
    intervals.sort(function(a, b) { return a[0] - b[0]; });
    var merged = [intervals[0]];
    for (var i = 1; i < intervals.length; i++) {
        var last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    return merged;
};`,
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        expected: "[[1,6],[8,10],[15,18]]",
        args: [[[1,3],[2,6],[8,10],[15,18]]],
        expectedValue: [[1,6],[8,10],[15,18]]
      },
      {
        input: "[[1,4],[4,5]]",
        expected: "[[1,5]]",
        args: [[[1,4],[4,5]]],
        expectedValue: [[1,5]]
      },
      {
        input: "[[1,4],[0,4]]",
        expected: "[[0,4]]",
        args: [[[1,4],[0,4]]],
        expectedValue: [[0,4]]
      }
    ],
    why: "Sorting by start time lets you sweep once and merge overlapping neighbors in O(n log n)."
  },
  {
    id: "non-overlapping-intervals",
    patternId: "intervals",
    name: "Non-overlapping Intervals",
    difficulty: "Medium",
    number: 435,
    description: `Given an array of intervals where intervals[i] = [start, end], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
    examples: [
      {
        input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        output: "1",
        explanation: "[1,3] can be removed and the rest of the intervals are non-overlapping."
      },
      {
        input: "intervals = [[1,2],[1,2],[1,2]]",
        output: "2",
        explanation: "You need to remove two [1,2] to make the rest non-overlapping."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^5",
      "intervals[i].length == 2",
      "-5 * 10^4 <= start < end <= 5 * 10^4"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    // Write your code here
    
};`,
    solution: `var eraseOverlapIntervals = function(intervals) {
    if (!intervals.length) return 0;
    intervals.sort(function(a, b) { return a[1] - b[1]; });
    var count = 1;
    var end = intervals[0][1];
    for (var i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    return intervals.length - count;
};`,
    testCases: [
      {
        input: "[[1,2],[2,3],[3,4],[1,3]]",
        expected: "1",
        args: [[[1,2],[2,3],[3,4],[1,3]]],
        expectedValue: 1
      },
      {
        input: "[[1,2],[1,2],[1,2]]",
        expected: "2",
        args: [[[1,2],[1,2],[1,2]]],
        expectedValue: 2
      },
      {
        input: "[[1,2],[2,3]]",
        expected: "0",
        args: [[[1,2],[2,3]]],
        expectedValue: 0
      }
    ],
    why: "Greedy selection by earliest finish time maximizes the number of non-overlapping intervals you can keep."
  },
  {
    id: "meeting-rooms-ii",
    patternId: "intervals",
    name: "Meeting Rooms II",
    difficulty: "Medium",
    number: 253,
    description: `Given an array of meeting time intervals where intervals[i] = [start, end], return the minimum number of conference rooms required.`,
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "2",
        explanation: "Two meetings overlap: [0,30] with [5,10] and [15,20]."
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "1",
        explanation: "The meetings do not overlap, so one room is enough."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "0 <= start < end <= 10^6"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    // Write your code here
    
};`,
    solution: `var minMeetingRooms = function(intervals) {
    if (!intervals.length) return 0;
    var starts = [];
    var ends = [];
    for (var i = 0; i < intervals.length; i++) {
        starts.push(intervals[i][0]);
        ends.push(intervals[i][1]);
    }
    starts.sort(function(a, b) { return a - b; });
    ends.sort(function(a, b) { return a - b; });
    var rooms = 0;
    var endPtr = 0;
    for (var i = 0; i < intervals.length; i++) {
        if (starts[i] >= ends[endPtr]) {
            endPtr++;
        } else {
            rooms++;
        }
    }
    return rooms;
};`,
    testCases: [
      {
        input: "[[0,30],[5,10],[15,20]]",
        expected: "2",
        args: [[[0,30],[5,10],[15,20]]],
        expectedValue: 2
      },
      {
        input: "[[7,10],[2,4]]",
        expected: "1",
        args: [[[7,10],[2,4]]],
        expectedValue: 1
      },
      {
        input: "[[1,5],[2,6],[3,7],[8,10]]",
        expected: "3",
        args: [[[1,5],[2,6],[3,7],[8,10]]],
        expectedValue: 3
      }
    ],
    why: "Separating starts and ends lets you sweep both timelines to count concurrent meetings."
  },
  {
    id: "insert-interval",
    patternId: "intervals",
    name: "Insert Interval",
    difficulty: "Medium",
    number: 57,
    description: `You are given an array of non-overlapping intervals sorted by start time, and a new interval. Insert the new interval into the intervals, merging if necessary.`,
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]",
        explanation: "[2,5] overlaps with [1,3], so merge them into [1,5]."
      },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "[4,8] overlaps with [3,5], [6,7], and [8,10], merging into [3,10]."
      }
    ],
    constraints: [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start < end <= 10^5",
      "intervals is sorted by start"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    // Write your code here
    
};`,
    solution: `var insert = function(intervals, newInterval) {
    var result = [];
    var i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    return result;
};`,
    testCases: [
      {
        input: "[[1,3],[6,9]], [2,5]",
        expected: "[[1,5],[6,9]]",
        args: [[[1,3],[6,9]],[2,5]],
        expectedValue: [[1,5],[6,9]]
      },
      {
        input: "[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]",
        expected: "[[1,2],[3,10],[12,16]]",
        args: [[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]],
        expectedValue: [[1,2],[3,10],[12,16]]
      },
      {
        input: "[], [5,7]",
        expected: "[[5,7]]",
        args: [[],[5,7]],
        expectedValue: [[5,7]]
      }
    ],
    why: "Three linear passes separate non-overlapping left intervals, merge overlaps, and append the rest."
  },
  {
    id: "minimum-number-of-arrows-to-burst-balloons",
    patternId: "intervals",
    name: "Minimum Number of Arrows to Burst Balloons",
    difficulty: "Medium",
    number: 452,
    description: `There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as an array of intervals where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. Arrows can be shot up directly from different points along the x-axis. Return the minimum number of arrows that must be shot to burst all balloons.`,
    examples: [
      {
        input: "points = [[10,16],[2,8],[1,6],[7,12]]",
        output: "2",
        explanation: "Shoot an arrow at x = 6 to burst [2,8] and [1,6], and another at x = 11 to burst [10,16] and [7,12]."
      },
      {
        input: "points = [[1,2],[3,4],[5,6],[7,8]]",
        output: "4",
        explanation: "No balloons overlap, so one arrow per balloon."
      }
    ],
    constraints: [
      "1 <= points.length <= 10^5",
      "points[i].length == 2",
      "-2^31 <= xstart < xend <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    // Write your code here
    
};`,
    solution: `var findMinArrowShots = function(points) {
    if (!points.length) return 0;
    points.sort(function(a, b) { return a[1] - b[1]; });
    var arrows = 1;
    var pos = points[0][1];
    for (var i = 1; i < points.length; i++) {
        if (points[i][0] > pos) {
            arrows++;
            pos = points[i][1];
        }
    }
    return arrows;
};`,
    testCases: [
      {
        input: "[[10,16],[2,8],[1,6],[7,12]]",
        expected: "2",
        args: [[[10,16],[2,8],[1,6],[7,12]]],
        expectedValue: 2
      },
      {
        input: "[[1,2],[3,4],[5,6],[7,8]]",
        expected: "4",
        args: [[[1,2],[3,4],[5,6],[7,8]]],
        expectedValue: 4
      },
      {
        input: "[[1,2],[2,3],[3,4],[4,5]]",
        expected: "2",
        args: [[[1,2],[2,3],[3,4],[4,5]]],
        expectedValue: 2
      }
    ],
    why: "Sorting by end and greedily shooting at each end position bursts the maximum overlapping balloons per arrow."
  },
  {
    id: "interval-list-intersections",
    patternId: "intervals",
    name: "Interval List Intersections",
    difficulty: "Medium",
    number: 986,
    description: `You are given two lists of closed intervals, firstList and secondList, where each list is pairwise disjoint and sorted. Return the intersection of these two interval lists.`,
    examples: [
      {
        input: "firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]",
        output: "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
        explanation: "Each interval in the output is the overlap of one interval from each list."
      },
      {
        input: "firstList = [[1,3],[5,9]], secondList = []",
        output: "[]",
        explanation: "The second list is empty, so there are no intersections."
      }
    ],
    constraints: [
      "0 <= firstList.length, secondList.length <= 1000",
      "firstList[i].length == secondList[i].length == 2",
      "0 <= start < end <= 10^9"
    ],
    starterCode: `/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function(firstList, secondList) {
    // Write your code here
    
};`,
    solution: `var intervalIntersection = function(firstList, secondList) {
    var i = 0, j = 0;
    var result = [];
    while (i < firstList.length && j < secondList.length) {
        var lo = Math.max(firstList[i][0], secondList[j][0]);
        var hi = Math.min(firstList[i][1], secondList[j][1]);
        if (lo <= hi) result.push([lo, hi]);
        if (firstList[i][1] < secondList[j][1]) i++;
        else j++;
    }
    return result;
};`,
    testCases: [
      {
        input: "[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]",
        expected: "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
        args: [[[0,2],[5,10],[13,23],[24,25]],[[1,5],[8,12],[15,24],[25,26]]],
        expectedValue: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
      },
      {
        input: "[[1,3],[5,9]], []",
        expected: "[]",
        args: [[[1,3],[5,9]],[]],
        expectedValue: []
      },
      {
        input: "[[1,5]], [[2,3]]",
        expected: "[[2,3]]",
        args: [[[1,5]],[[2,3]]],
        expectedValue: [[2,3]]
      }
    ],
    why: "Two pointers advance through each sorted list, computing the overlap at every step."
  },
  {
    id: "remove-covered-intervals",
    patternId: "intervals",
    name: "Remove Covered Intervals",
    difficulty: "Medium",
    number: 1288,
    description: `Given an array of intervals, remove all intervals that are covered by another interval. Return the number of remaining intervals. An interval [a,b] is covered by [c,d] if c <= a and b <= d.`,
    examples: [
      {
        input: "intervals = [[1,4],[3,6],[2,8]]",
        output: "2",
        explanation: "[3,6] is covered by [2,8], so it is removed."
      },
      {
        input: "intervals = [[1,4],[2,3]]",
        output: "1",
        explanation: "[2,3] is covered by [1,4], so only [1,4] remains."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^5",
      "intervals[i].length == 2",
      "0 <= start < end <= 10^5"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function(intervals) {
    // Write your code here
    
};`,
    solution: `var removeCoveredIntervals = function(intervals) {
    intervals.sort(function(a, b) {
        return a[0] - b[0] || b[1] - a[1];
    });
    var count = 0;
    var maxEnd = 0;
    for (var i = 0; i < intervals.length; i++) {
        if (intervals[i][1] > maxEnd) {
            count++;
            maxEnd = intervals[i][1];
        }
    }
    return count;
};`,
    testCases: [
      {
        input: "[[1,4],[3,6],[2,8]]",
        expected: "2",
        args: [[[1,4],[3,6],[2,8]]],
        expectedValue: 2
      },
      {
        input: "[[1,4],[2,3]]",
        expected: "1",
        args: [[[1,4],[2,3]]],
        expectedValue: 1
      },
      {
        input: "[[1,2],[1,4],[3,4]]",
        expected: "2",
        args: [[[1,2],[1,4],[3,4]]],
        expectedValue: 2
      }
    ],
    why: "Sorting by ascending start and descending end lets you count only intervals that extend past the previous maximum end."
  },
  {
    id: "car-pooling",
    patternId: "intervals",
    name: "Car Pooling",
    difficulty: "Medium",
    number: 1094,
    description: `There is a car with capacity empty seats. The vehicle only drives east. You are given the array trips, where trips[i] = [numPassengers, from, to] indicates that the ith trip has numPassengers passengers, and the locations to pick them up and drop them off are from and to respectively. Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.`,
    examples: [
      {
        input: "trips = [[2,1,5],[3,3,7]], capacity = 4",
        output: "false",
        explanation: "At time 3, there are 5 passengers (2+3), which exceeds capacity 4."
      },
      {
        input: "trips = [[2,1,5],[3,3,7]], capacity = 5",
        output: "true",
        explanation: "The maximum number of passengers at any time is 5, which matches capacity."
      }
    ],
    constraints: [
      "1 <= trips.length <= 1000",
      "trips[i].length == 3",
      "1 <= numPassengers <= 100",
      "0 <= from < to <= 1000",
      "1 <= capacity <= 10^5"
    ],
    starterCode: `/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function(trips, capacity) {
    // Write your code here
    
};`,
    solution: `var carPooling = function(trips, capacity) {
    var stops = new Array(1001).fill(0);
    for (var i = 0; i < trips.length; i++) {
        stops[trips[i][1]] += trips[i][0];
        stops[trips[i][2]] -= trips[i][0];
    }
    var passengers = 0;
    for (var i = 0; i < stops.length; i++) {
        passengers += stops[i];
        if (passengers > capacity) return false;
    }
    return true;
};`,
    testCases: [
      {
        input: "[[2,1,5],[3,3,7]], 4",
        expected: "false",
        args: [[[2,1,5],[3,3,7]],4],
        expectedValue: false
      },
      {
        input: "[[2,1,5],[3,3,7]], 5",
        expected: "true",
        args: [[[2,1,5],[3,3,7]],5],
        expectedValue: true
      },
      {
        input: "[[2,1,5],[3,5,7]], 3",
        expected: "true",
        args: [[[2,1,5],[3,5,7]],3],
        expectedValue: true
      }
    ],
    why: "A difference array over the timeline lets you check capacity in a single sweep."
  },
  {
    id: "find-right-interval",
    patternId: "intervals",
    name: "Find Right Interval",
    difficulty: "Medium",
    number: 436,
    description: `You are given an array of intervals where intervals[i] = [start, end] and each start is unique. The right interval for an interval i is an interval j such that startj >= endi and startj is minimized. Return an array of right interval indices for each interval, or -1 if none exists.`,
    examples: [
      {
        input: "intervals = [[1,2]]",
        output: "[-1]",
        explanation: "There is only one interval, so no right interval exists."
      },
      {
        input: "intervals = [[3,4],[2,3],[1,2]]",
        output: "[-1,0,1]",
        explanation: "The right interval for [3,4] is none (-1), for [2,3] is [3,4] (index 0), for [1,2] is [2,3] (index 1)."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 2 * 10^4",
      "intervals[i].length == 2",
      "-10^6 <= start <= end <= 10^6",
      "The start of each interval is unique"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function(intervals) {
    // Write your code here
    
};`,
    solution: `var findRightInterval = function(intervals) {
    var n = intervals.length;
    var starts = [];
    for (var i = 0; i < n; i++) {
        starts.push([intervals[i][0], i]);
    }
    starts.sort(function(a, b) { return a[0] - b[0]; });
    var result = [];
    for (var i = 0; i < n; i++) {
        var target = intervals[i][1];
        var left = 0, right = n - 1;
        var ans = -1;
        while (left <= right) {
            var mid = Math.floor((left + right) / 2);
            if (starts[mid][0] >= target) {
                ans = starts[mid][1];
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        result.push(ans);
    }
    return result;
};`,
    testCases: [
      {
        input: "[[1,2]]",
        expected: "[-1]",
        args: [[[1,2]]],
        expectedValue: [-1]
      },
      {
        input: "[[3,4],[2,3],[1,2]]",
        expected: "[-1,0,1]",
        args: [[[3,4],[2,3],[1,2]]],
        expectedValue: [-1,0,1]
      },
      {
        input: "[[1,4],[2,3],[3,4]]",
        expected: "[-1,2,-1]",
        args: [[[1,4],[2,3],[3,4]]],
        expectedValue: [-1,2,-1]
      }
    ],
    why: "Binary search over sorted start times finds the smallest valid right interval in O(log n) per query."
  },
  {
    id: "meeting-rooms",
    patternId: "intervals",
    name: "Meeting Rooms",
    difficulty: "Easy",
    number: 252,
    description: `Given an array of meeting time intervals where intervals[i] = [start, end], determine if a person could attend all meetings.`,
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "false",
        explanation: "Meetings [0,30] and [5,10] overlap."
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "true",
        explanation: "No meetings overlap."
      }
    ],
    constraints: [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start < end <= 10^6"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function(intervals) {
    // Write your code here
    
};`,
    solution: `var canAttendMeetings = function(intervals) {
    intervals.sort(function(a, b) { return a[0] - b[0]; });
    for (var i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
};`,
    testCases: [
      {
        input: "[[0,30],[5,10],[15,20]]",
        expected: "false",
        args: [[[0,30],[5,10],[15,20]]],
        expectedValue: false
      },
      {
        input: "[[7,10],[2,4]]",
        expected: "true",
        args: [[[7,10],[2,4]]],
        expectedValue: true
      },
      {
        input: "[[1,5],[5,10]]",
        expected: "true",
        args: [[[1,5],[5,10]]],
        expectedValue: true
      }
    ],
    why: "Sorting by start lets you check if any adjacent pair overlaps in a single pass."
  },
  {
    id: "partition-labels-intervals",
    patternId: "intervals",
    name: "Partition Labels",
    difficulty: "Medium",
    number: 763,
    description: `You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.`,
    examples: [
      {
        input: "s = \"ababcbacadefegdehijhklij\"",
        output: "[9,7,8]",
        explanation: "The partition is \"ababcbaca\", \"defegde\", \"hijhklij\"."
      },
      {
        input: "s = \"eccbbbbdec\"",
        output: "[10]",
        explanation: "The whole string forms one partition."
      }
    ],
    constraints: [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters"
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    // Write your code here
    
};`,
    solution: `var partitionLabels = function(s) {
    var last = {};
    for (var i = 0; i < s.length; i++) {
        last[s[i]] = i;
    }
    var result = [];
    var start = 0, end = 0;
    for (var i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    return result;
};`,
    testCases: [
      {
        input: "\"ababcbacadefegdehijhklij\"",
        expected: "[9,7,8]",
        args: ["ababcbacadefegdehijhklij"],
        expectedValue: [9,7,8]
      },
      {
        input: "\"eccbbbbdec\"",
        expected: "[10]",
        args: ["eccbbbbdec"],
        expectedValue: [10]
      },
      {
        input: "\"abc\"",
        expected: "[1,1,1]",
        args: ["abc"],
        expectedValue: [1,1,1]
      }
    ],
    why: "Each character's last occurrence defines the farthest boundary of its current partition."
  },
  {
    id: "set-intersection-size-at-least-two",
    patternId: "intervals",
    name: "Set Intersection Size At Least Two",
    difficulty: "Hard",
    number: 757,
    description: `You are given a 2D integer array intervals where intervals[i] = [start, end] represents an inclusive interval. An integer set S is called a set of points if it contains at least two distinct integers from every interval. Return the minimum possible size of S.`,
    examples: [
      {
        input: "intervals = [[1,3],[1,4],[2,5],[3,5]]",
        output: "3",
        explanation: "A valid set is {2, 3, 4}."
      },
      {
        input: "intervals = [[1,2],[2,3],[2,4],[4,5]]",
        output: "5",
        explanation: "A valid set is {1, 2, 3, 4, 5}."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 3000",
      "intervals[i].length == 2",
      "0 <= start < end <= 10^8"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function(intervals) {
    // Write your code here
    
};`,
    solution: `var intersectionSizeTwo = function(intervals) {
    intervals.sort(function(a, b) {
        return a[1] - b[1] || b[0] - a[0];
    });
    var p1 = -1, p2 = -1;
    var res = 0;
    for (var i = 0; i < intervals.length; i++) {
        var s = intervals[i][0], e = intervals[i][1];
        if (s > p2) {
            res += 2;
            p1 = e - 1;
            p2 = e;
        } else if (s > p1) {
            res += 1;
            p1 = p2;
            p2 = e;
        }
    }
    return res;
};`,
    testCases: [
      {
        input: "[[1,3],[1,4],[2,5],[3,5]]",
        expected: "3",
        args: [[[1,3],[1,4],[2,5],[3,5]]],
        expectedValue: 3
      },
      {
        input: "[[1,2],[2,3],[2,4],[4,5]]",
        expected: "5",
        args: [[[1,2],[2,3],[2,4],[4,5]]],
        expectedValue: 5
      },
      {
        input: "[[1,3],[3,7],[5,7],[7,8]]",
        expected: "4",
        args: [[[1,3],[3,7],[5,7],[7,8]]],
        expectedValue: 4
      }
    ],
    why: "Greedy selection of the two rightmost possible points per interval ensures the smallest set."
  },
  {
    id: "employee-free-time",
    patternId: "intervals",
    name: "Employee Free Time",
    difficulty: "Hard",
    number: 759,
    description: `We are given a list of schedules of employees, which represents the working time for each employee. Each employee has a list of non-overlapping intervals, and these intervals are in sorted order. Return the list of finite intervals representing the common, positive-length free time for all employees, also in sorted order.`,
    examples: [
      {
        input: "schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]",
        output: "[[3,4]]",
        explanation: "The common free time interval is [3,4]."
      },
      {
        input: "schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]",
        output: "[[5,6],[7,9]]",
        explanation: "The common free time intervals are [5,6] and [7,9]."
      }
    ],
    constraints: [
      "schedule.length == number of employees",
      "1 <= schedule.length <= 50",
      "1 <= schedule[i].length <= 50",
      "0 <= schedule[i][j].start < schedule[i][j].end <= 10^8"
    ],
    starterCode: `/**
 * @param {number[][][]} schedule
 * @return {number[][]}
 */
var employeeFreeTime = function(schedule) {
    // Write your code here
    
};`,
    solution: `var employeeFreeTime = function(schedule) {
    var all = [];
    for (var i = 0; i < schedule.length; i++) {
        for (var j = 0; j < schedule[i].length; j++) {
            all.push(schedule[i][j]);
        }
    }
    all.sort(function(a, b) { return a[0] - b[0]; });
    var merged = [all[0]];
    for (var i = 1; i < all.length; i++) {
        var last = merged[merged.length - 1];
        if (all[i][0] <= last[1]) {
            last[1] = Math.max(last[1], all[i][1]);
        } else {
            merged.push(all[i]);
        }
    }
    var result = [];
    for (var i = 1; i < merged.length; i++) {
        result.push([merged[i - 1][1], merged[i][0]]);
    }
    return result;
};`,
    testCases: [
      {
        input: "[[[1,2],[5,6]],[[1,3]],[[4,10]]]",
        expected: "[[3,4]]",
        args: [[[[1,2],[5,6]],[[1,3]],[[4,10]]]],
        expectedValue: [[3,4]]
      },
      {
        input: "[[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]",
        expected: "[[5,6],[7,9]]",
        args: [[[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]],
        expectedValue: [[5,6],[7,9]]
      },
      {
        input: "[[[1,2],[3,4]],[[2,3],[5,6]]]",
        expected: "[[4,5]]",
        args: [[[[1,2],[3,4]],[[2,3],[5,6]]]],
        expectedValue: [[4,5]]
      }
    ],
    why: "Merging all employee schedules into one timeline makes gaps between merged blocks the free time."
  },
  {
    id: "minimum-interval-to-include-each-query",
    patternId: "intervals",
    name: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    number: 1851,
    description: `You are given a 2D integer array intervals, where intervals[i] = [left, right] represents an inclusive interval, and an integer array queries. Return an array containing the answers to the queries. The answer to the jth query is the size of the smallest interval i such that left <= queries[j] <= right. If no such interval exists, the answer is -1.`,
    examples: [
      {
        input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
        output: "[3,3,1,4]",
        explanation: "The smallest interval containing 2 is [2,4] with size 3."
      },
      {
        input: "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]",
        output: "[2,-1,4,6]",
        explanation: "Query 19 has no matching interval."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^5",
      "1 <= queries.length <= 10^5",
      "1 <= left < right <= 10^7"
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function(intervals, queries) {
    // Write your code here
    
};`,
    solution: `var minInterval = function(intervals, queries) {
    intervals.sort(function(a, b) { return a[0] - b[0]; });
    var qs = [];
    for (var i = 0; i < queries.length; i++) {
        qs.push([queries[i], i]);
    }
    qs.sort(function(a, b) { return a[0] - b[0]; });
    var res = new Array(queries.length).fill(-1);
    var heap = [];
    var j = 0;
    for (var k = 0; k < qs.length; k++) {
        var q = qs[k][0], idx = qs[k][1];
        while (j < intervals.length && intervals[j][0] <= q) {
            var len = intervals[j][1] - intervals[j][0] + 1;
            heap.push([len, intervals[j][1]]);
            j++;
        }
        heap.sort(function(a, b) { return a[0] - b[0]; });
        while (heap.length && heap[0][1] < q) {
            heap.shift();
        }
        if (heap.length) {
            res[idx] = heap[0][0];
        }
    }
    return res;
};`,
    testCases: [
      {
        input: "[[1,4],[2,4],[3,6],[4,4]], [2,3,4,5]",
        expected: "[3,3,1,4]",
        args: [[[1,4],[2,4],[3,6],[4,4]],[2,3,4,5]],
        expectedValue: [3,3,1,4]
      },
      {
        input: "[[2,3],[2,5],[1,8],[20,25]], [2,19,5,22]",
        expected: "[2,-1,4,6]",
        args: [[[2,3],[2,5],[1,8],[20,25]],[2,19,5,22]],
        expectedValue: [2,-1,4,6]
      },
      {
        input: "[[1,2]], [3]",
        expected: "[-1]",
        args: [[[1,2]],[3]],
        expectedValue: [-1]
      }
    ],
    why: "Sorting intervals and queries together lets you maintain a running min-heap of valid intervals."
  },
  {
    id: "maximum-length-of-pair-chain",
    patternId: "intervals",
    name: "Maximum Length of Pair Chain",
    difficulty: "Medium",
    number: 646,
    description: `You are given an array of pairs where pairs[i] = [left, right] and left < right. A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion. Return the length of the longest chain which can be formed.`,
    examples: [
      {
        input: "pairs = [[1,2],[2,3],[3,4]]",
        output: "2",
        explanation: "The longest chain is [1,2] -> [3,4]."
      },
      {
        input: "pairs = [[1,2],[7,8],[4,5]]",
        output: "3",
        explanation: "The longest chain is [1,2] -> [4,5] -> [7,8]."
      }
    ],
    constraints: [
      "1 <= pairs.length <= 1000",
      "pairs[i].length == 2",
      "-1000 <= left < right <= 1000"
    ],
    starterCode: `/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    // Write your code here
    
};`,
    solution: `var findLongestChain = function(pairs) {
    pairs.sort(function(a, b) { return a[1] - b[1]; });
    var count = 1;
    var end = pairs[0][1];
    for (var i = 1; i < pairs.length; i++) {
        if (pairs[i][0] > end) {
            count++;
            end = pairs[i][1];
        }
    }
    return count;
};`,
    testCases: [
      {
        input: "[[1,2],[2,3],[3,4]]",
        expected: "2",
        args: [[[1,2],[2,3],[3,4]]],
        expectedValue: 2
      },
      {
        input: "[[1,2],[7,8],[4,5]]",
        expected: "3",
        args: [[[1,2],[7,8],[4,5]]],
        expectedValue: 3
      },
      {
        input: "[[-10,-8],[8,9],[-5,0],[6,10]]",
        expected: "3",
        args: [[[-10,-8],[8,9],[-5,0],[6,10]]],
        expectedValue: 3
      }
    ],
    why: "Sorting by end and greedily chaining earliest-finishing pairs maximizes the chain length."
  },

  // ==================== BITS (10) ====================
  {
    id: "single-number",
    patternId: "bits",
    name: "Single Number",
    difficulty: "Easy",
    number: 136,
    description: `Given a non-empty array of integers where every element appears twice except for one, find that single one.`,
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1",
        explanation: "1 is the only number that appears once."
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4",
        explanation: "4 is the only number that appears once."
      }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element appears twice except one"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // Write your code here
    
};`,
    solution: `var singleNumber = function(nums) {
    var result = 0;
    for (var i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    return result;
};`,
    testCases: [
      {
        input: "[2,2,1]",
        expected: "1",
        args: [[2,2,1]],
        expectedValue: 1
      },
      {
        input: "[4,1,2,1,2]",
        expected: "4",
        args: [[4,1,2,1,2]],
        expectedValue: 4
      },
      {
        input: "[1]",
        expected: "1",
        args: [[1]],
        expectedValue: 1
      }
    ],
    why: "XORing every number cancels out duplicates because x ^ x = 0, leaving the single number."
  },
  {
    id: "number-of-1-bits",
    patternId: "bits",
    name: "Number of 1 Bits",
    difficulty: "Easy",
    number: 191,
    description: `Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).`,
    examples: [
      {
        input: "n = 00000000000000000000000000001011",
        output: "3",
        explanation: "The input binary string has a total of three '1' bits."
      },
      {
        input: "n = 00000000000000000000000010000000",
        output: "1",
        explanation: "The input binary string has a total of one '1' bit."
      }
    ],
    constraints: [
      "The input must be a binary string of length 32"
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    // Write your code here
    
};`,
    solution: `var hammingWeight = function(n) {
    var count = 0;
    while (n) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
};`,
    testCases: [
      {
        input: "11",
        expected: "3",
        args: [11],
        expectedValue: 3
      },
      {
        input: "128",
        expected: "1",
        args: [128],
        expectedValue: 1
      },
      {
        input: "4294967293",
        expected: "31",
        args: [4294967293],
        expectedValue: 31
      }
    ],
    why: "Repeatedly checking the least significant bit and unsigned-shifting right counts all set bits."
  },
  {
    id: "missing-number",
    patternId: "bits",
    name: "Missing Number",
    difficulty: "Easy",
    number: 268,
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.`,
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation: "n = 3, so all numbers are in the range [0,3]. 2 is the missing number."
      },
      {
        input: "nums = [0,1]",
        output: "2",
        explanation: "n = 2, so all numbers are in the range [0,2]. 2 is the missing number."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= nums.length",
      "All numbers are unique"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    // Write your code here
    
};`,
    solution: `var missingNumber = function(nums) {
    var xor = 0;
    for (var i = 0; i < nums.length; i++) {
        xor ^= (i + 1) ^ nums[i];
    }
    return xor;
};`,
    testCases: [
      {
        input: "[3,0,1]",
        expected: "2",
        args: [[3,0,1]],
        expectedValue: 2
      },
      {
        input: "[0,1]",
        expected: "2",
        args: [[0,1]],
        expectedValue: 2
      },
      {
        input: "[9,6,4,2,3,5,7,0,1]",
        expected: "8",
        args: [[9,6,4,2,3,5,7,0,1]],
        expectedValue: 8
      }
    ],
    why: "XORing indices and values together causes every present number to cancel out, revealing the missing one."
  },
  {
    id: "counting-bits",
    patternId: "bits",
    name: "Counting Bits",
    difficulty: "Easy",
    number: 338,
    description: `Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.`,
    examples: [
      {
        input: "n = 2",
        output: "[0,1,1]",
        explanation: "0 -> 0, 1 -> 1, 2 -> 10"
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
        explanation: "0 -> 0, 1 -> 1, 2 -> 10, 3 -> 11, 4 -> 100, 5 -> 101"
      }
    ],
    constraints: [
      "0 <= n <= 10^5"
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    // Write your code here
    
};`,
    solution: `var countBits = function(n) {
    var ans = new Array(n + 1).fill(0);
    for (var i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
};`,
    testCases: [
      {
        input: "2",
        expected: "[0,1,1]",
        args: [2],
        expectedValue: [0,1,1]
      },
      {
        input: "5",
        expected: "[0,1,1,2,1,2]",
        args: [5],
        expectedValue: [0,1,1,2,1,2]
      },
      {
        input: "0",
        expected: "[0]",
        args: [0],
        expectedValue: [0]
      }
    ],
    why: "Each number i has the same bit count as i/2 plus one if i is odd, enabling O(n) DP."
  },
  {
    id: "reverse-bits",
    patternId: "bits",
    name: "Reverse Bits",
    difficulty: "Easy",
    number: 190,
    description: `Reverse bits of a given 32 bits unsigned integer.`,
    examples: [
      {
        input: "n = 00000010100101000001111010011100",
        output: "964176192",
        explanation: "The binary string reversed is 00111001011110000010100101000000."
      },
      {
        input: "n = 11111111111111111111111111111101",
        output: "3221225471",
        explanation: "The binary string reversed is 10111111111111111111111111111111."
      }
    ],
    constraints: [
      "The input is a 32-bit unsigned integer"
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
var reverseBits = function(n) {
    // Write your code here
    
};`,
    solution: `var reverseBits = function(n) {
    var result = 0;
    for (var i = 0; i < 32; i++) {
        result <<= 1;
        result |= n & 1;
        n >>>= 1;
    }
    return result >>> 0;
};`,
    testCases: [
      {
        input: "43261596",
        expected: "964176192",
        args: [43261596],
        expectedValue: 964176192
      },
      {
        input: "4294967293",
        expected: "3221225471",
        args: [4294967293],
        expectedValue: 3221225471
      },
      {
        input: "1",
        expected: "2147483648",
        args: [1],
        expectedValue: 2147483648
      }
    ],
    why: "Building the result bit by bit from the least significant bit of n reverses the entire 32-bit word."
  },
  {
    id: "power-of-two",
    patternId: "bits",
    name: "Power of Two",
    difficulty: "Easy",
    number: 231,
    description: `Given an integer n, return true if it is a power of two. Otherwise, return false.`,
    examples: [
      {
        input: "n = 1",
        output: "true",
        explanation: "2^0 = 1"
      },
      {
        input: "n = 16",
        output: "true",
        explanation: "2^4 = 16"
      },
      {
        input: "n = 3",
        output: "false",
        explanation: "3 is not a power of two."
      }
    ],
    constraints: [
      "-2^31 <= n <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    // Write your code here
    
};`,
    solution: `var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0;
};`,
    testCases: [
      {
        input: "1",
        expected: "true",
        args: [1],
        expectedValue: true
      },
      {
        input: "16",
        expected: "true",
        args: [16],
        expectedValue: true
      },
      {
        input: "3",
        expected: "false",
        args: [3],
        expectedValue: false
      }
    ],
    why: "A power of two has exactly one bit set, so n & (n - 1) clears that bit and yields zero."
  },
  {
    id: "sum-of-two-integers",
    patternId: "bits",
    name: "Sum of Two Integers",
    difficulty: "Medium",
    number: 371,
    description: `Given two integers a and b, return the sum of the two integers without using the operators + and -.`,
    examples: [
      {
        input: "a = 1, b = 2",
        output: "3",
        explanation: "1 + 2 = 3"
      },
      {
        input: "a = 2, b = 3",
        output: "5",
        explanation: "2 + 3 = 5"
      }
    ],
    constraints: [
      "-1000 <= a, b <= 1000"
    ],
    starterCode: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    // Write your code here
    
};`,
    solution: `var getSum = function(a, b) {
    while (b !== 0) {
        var carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
};`,
    testCases: [
      {
        input: "1, 2",
        expected: "3",
        args: [1, 2],
        expectedValue: 3
      },
      {
        input: "2, 3",
        expected: "5",
        args: [2, 3],
        expectedValue: 5
      },
      {
        input: "-1, 1",
        expected: "0",
        args: [-1, 1],
        expectedValue: 0
      }
    ],
    why: "XOR computes the sum without carry, while AND-shift computes the carry to be added in the next iteration."
  },
  {
    id: "gray-code",
    patternId: "bits",
    name: "Gray Code",
    difficulty: "Medium",
    number: 89,
    description: `An n-bit gray code sequence is a sequence of 2^n integers where every integer is in the inclusive range [0, 2^n - 1], the first integer is 0, and an integer appears at most once in the sequence. Two consecutive integers differ by exactly one bit. Return any valid n-bit gray code sequence.`,
    examples: [
      {
        input: "n = 2",
        output: "[0,1,3,2]",
        explanation: "00 -> 01 -> 11 -> 10."
      },
      {
        input: "n = 1",
        output: "[0,1]",
        explanation: "0 -> 1."
      }
    ],
    constraints: [
      "1 <= n <= 16"
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    // Write your code here
    
};`,
    solution: `var grayCode = function(n) {
    var result = [0];
    for (var i = 0; i < n; i++) {
        var size = result.length;
        for (var j = size - 1; j >= 0; j--) {
            result.push(result[j] | (1 << i));
        }
    }
    return result;
};`,
    testCases: [
      {
        input: "2",
        expected: "[0,1,3,2]",
        args: [2],
        expectedValue: [0,1,3,2]
      },
      {
        input: "1",
        expected: "[0,1]",
        args: [1],
        expectedValue: [0,1]
      },
      {
        input: "3",
        expected: "[0,1,3,2,6,7,5,4]",
        args: [3],
        expectedValue: [0,1,3,2,6,7,5,4]
      }
    ],
    why: "Mirroring the existing sequence and setting the new high bit generates the next gray code level."
  },
  {
    id: "bitwise-and-of-numbers-range",
    patternId: "bits",
    name: "Bitwise AND of Numbers Range",
    difficulty: "Medium",
    number: 201,
    description: `Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.`,
    examples: [
      {
        input: "left = 5, right = 7",
        output: "4",
        explanation: "5 & 6 & 7 = 4"
      },
      {
        input: "left = 0, right = 0",
        output: "0",
        explanation: "0 & 0 = 0"
      }
    ],
    constraints: [
      "0 <= left <= right <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function(left, right) {
    // Write your code here
    
};`,
    solution: `var rangeBitwiseAnd = function(left, right) {
    var shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    return left << shift;
};`,
    testCases: [
      {
        input: "5, 7",
        expected: "4",
        args: [5, 7],
        expectedValue: 4
      },
      {
        input: "0, 0",
        expected: "0",
        args: [0, 0],
        expectedValue: 0
      },
      {
        input: "1, 2147483647",
        expected: "0",
        args: [1, 2147483647],
        expectedValue: 0
      }
    ],
    why: "Shifting both numbers right until they match finds the common prefix, which is then shifted back left."
  },
  {
    id: "maximum-xor-of-two-numbers",
    patternId: "bits",
    name: "Maximum XOR of Two Numbers in an Array",
    difficulty: "Medium",
    number: 421,
    description: `Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.`,
    examples: [
      {
        input: "nums = [3,10,5,25,2,8]",
        output: "28",
        explanation: "The maximum result is 5 XOR 25 = 28."
      },
      {
        input: "nums = [14,70,53,83,49,91,36,80,92,51,66,70]",
        output: "127",
        explanation: "The maximum result is 53 XOR 84 approximations; actual max is 127."
      }
    ],
    constraints: [
      "1 <= nums.length <= 2 * 10^5",
      "0 <= nums[i] <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function(nums) {
    // Write your code here
    
};`,
    solution: `var findMaximumXOR = function(nums) {
    var maxXor = 0, mask = 0;
    for (var i = 30; i >= 0; i--) {
        mask |= (1 << i);
        var set = new Set();
        for (var j = 0; j < nums.length; j++) {
            set.add(nums[j] & mask);
        }
        var candidate = maxXor | (1 << i);
        var found = false;
        for (var prefix of set) {
            if (set.has(prefix ^ candidate)) {
                found = true;
                break;
            }
        }
        if (found) maxXor = candidate;
    }
    return maxXor;
};`,
    testCases: [
      {
        input: "[3,10,5,25,2,8]",
        expected: "28",
        args: [[3,10,5,25,2,8]],
        expectedValue: 28
      },
      {
        input: "[0]",
        expected: "0",
        args: [[0]],
        expectedValue: 0
      },
      {
        input: "[8,10,2]",
        expected: "10",
        args: [[8,10,2]],
        expectedValue: 10
      }
    ],
    why: "Building the answer bit by bit and checking if a pair with that prefix exists uses a trie-like hash set."
  },

  // ==================== GREEDY (15) ====================
  {
    id: "jump-game",
    patternId: "greedy",
    name: "Jump Game",
    difficulty: "Medium",
    number: 55,
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.`,
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "You will always arrive at index 3 no matter what, and its maximum jump length is 0."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // Write your code here
    
};`,
    solution: `var canJump = function(nums) {
    var maxReach = 0;
    for (var i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
};`,
    testCases: [
      {
        input: "[2,3,1,1,4]",
        expected: "true",
        args: [[2,3,1,1,4]],
        expectedValue: true
      },
      {
        input: "[3,2,1,0,4]",
        expected: "false",
        args: [[3,2,1,0,4]],
        expectedValue: false
      },
      {
        input: "[0]",
        expected: "true",
        args: [[0]],
        expectedValue: true
      }
    ],
    why: "Tracking the farthest reachable index greedily determines if the end is accessible without backtracking."
  },
  {
    id: "jump-game-ii",
    patternId: "greedy",
    name: "Jump Game II",
    difficulty: "Medium",
    number: 45,
    description: `Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Your goal is to reach the last index in the minimum number of jumps.`,
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
        explanation: "The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index."
      },
      {
        input: "nums = [2,3,0,1,4]",
        output: "2",
        explanation: "Jump from index 0 to 1, then to the last index."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 1000"
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    // Write your code here
    
};`,
    solution: `var jump = function(nums) {
    var jumps = 0, currentEnd = 0, farthest = 0;
    for (var i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
};`,
    testCases: [
      {
        input: "[2,3,1,1,4]",
        expected: "2",
        args: [[2,3,1,1,4]],
        expectedValue: 2
      },
      {
        input: "[2,3,0,1,4]",
        expected: "2",
        args: [[2,3,0,1,4]],
        expectedValue: 2
      },
      {
        input: "[1,1,1,1]",
        expected: "3",
        args: [[1,1,1,1]],
        expectedValue: 3
      }
    ],
    why: "Extending the current jump window as far as possible before taking the next jump guarantees the minimum count."
  },
  {
    id: "gas-station",
    patternId: "greedy",
    name: "Gas Station",
    difficulty: "Medium",
    number: 134,
    description: `There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, or -1 if you cannot.`,
    examples: [
      {
        input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
        output: "3",
        explanation: "Start at station 3 and fill up with 4 units of gas. Your tank = 0 + 4 = 4. Travel to station 4. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Your tank = 6 - 4 + 3 = 5. Travel to station 3. The cost is 5. Your tank is enough to travel back to station 3."
      },
      {
        input: "gas = [2,3,4], cost = [3,4,3]",
        output: "-1",
        explanation: "You can't start at station 0 or 1, as there is not enough gas to travel to the next station."
      }
    ],
    constraints: [
      "n == gas.length == cost.length",
      "1 <= n <= 10^5",
      "0 <= gas[i], cost[i] <= 10^4"
    ],
    starterCode: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    // Write your code here
    
};`,
    solution: `var canCompleteCircuit = function(gas, cost) {
    var total = 0, tank = 0, start = 0;
    for (var i = 0; i < gas.length; i++) {
        total += gas[i] - cost[i];
        tank += gas[i] - cost[i];
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
};`,
    testCases: [
      {
        input: "[1,2,3,4,5], [3,4,5,1,2]",
        expected: "3",
        args: [[1,2,3,4,5],[3,4,5,1,2]],
        expectedValue: 3
      },
      {
        input: "[2,3,4], [3,4,3]",
        expected: "-1",
        args: [[2,3,4],[3,4,3]],
        expectedValue: -1
      },
      {
        input: "[5], [4]",
        expected: "0",
        args: [[5],[4]],
        expectedValue: 0
      }
    ],
    why: "If a station cannot be reached from any previous station, the only possible start is after it."
  },
  {
    id: "candy",
    patternId: "greedy",
    name: "Candy",
    difficulty: "Hard",
    number: 135,
    description: `There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to the following requirements: each child must have at least one candy, and children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute.`,
    examples: [
      {
        input: "ratings = [1,0,2]",
        output: "5",
        explanation: "You can allocate to the first, second and third child with 2, 1, 2 candies respectively."
      },
      {
        input: "ratings = [1,2,2]",
        output: "4",
        explanation: "You can allocate to the first, second and third child with 1, 2, 1 candies respectively."
      }
    ],
    constraints: [
      "n == ratings.length",
      "1 <= n <= 2 * 10^4",
      "0 <= ratings[i] <= 2 * 10^4"
    ],
    starterCode: `/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    // Write your code here
    
};`,
    solution: `var candy = function(ratings) {
    var n = ratings.length;
    var candies = new Array(n).fill(1);
    for (var i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (var i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += candies[i];
    }
    return sum;
};`,
    testCases: [
      {
        input: "[1,0,2]",
        expected: "5",
        args: [[1,0,2]],
        expectedValue: 5
      },
      {
        input: "[1,2,2]",
        expected: "4",
        args: [[1,2,2]],
        expectedValue: 4
      },
      {
        input: "[1,3,4,5,2]",
        expected: "11",
        args: [[1,3,4,5,2]],
        expectedValue: 11
      }
    ],
    why: "Two passes ensure each child gets more candy than the lower-rated neighbor on either side."
  },
  {
    id: "task-scheduler",
    patternId: "greedy",
    name: "Task Scheduler",
    difficulty: "Medium",
    number: 621,
    description: `Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks. Return the least number of units of time that the CPU will take to finish all the given tasks.`,
    examples: [
      {
        input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
        output: "8",
        explanation: "A -> B -> idle -> A -> B -> idle -> A -> B."
      },
      {
        input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
        output: "6",
        explanation: "No cooldown, so any order works in 6 units."
      }
    ],
    constraints: [
      "1 <= task.length <= 10^4",
      "tasks[i] is upper-case English letter",
      "0 <= n <= 100"
    ],
    starterCode: `/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    // Write your code here
    
};`,
    solution: `var leastInterval = function(tasks, n) {
    var freq = {};
    var maxCount = 0;
    for (var i = 0; i < tasks.length; i++) {
        freq[tasks[i]] = (freq[tasks[i]] || 0) + 1;
        maxCount = Math.max(maxCount, freq[tasks[i]]);
    }
    var maxFreq = 0;
    for (var key in freq) {
        if (freq[key] === maxCount) maxFreq++;
    }
    var partCount = maxCount - 1;
    var partLength = n - (maxFreq - 1);
    var emptySlots = partCount * partLength;
    var availableTasks = tasks.length - maxCount * maxFreq;
    var idles = Math.max(0, emptySlots - availableTasks);
    return tasks.length + idles;
};`,
    testCases: [
      {
        input: "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2",
        expected: "8",
        args: [["A","A","A","B","B","B"],2],
        expectedValue: 8
      },
      {
        input: "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 0",
        expected: "6",
        args: [["A","A","A","B","B","B"],0],
        expectedValue: 6
      },
      {
        input: "[\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"], 2",
        expected: "16",
        args: [["A","A","A","A","A","A","B","C","D","E","F","G"],2],
        expectedValue: 16
      }
    ],
    why: "The most frequent task dictates the frame; calculating idle slots required between them gives the total time."
  },
  {
    id: "assign-cookies",
    patternId: "greedy",
    name: "Assign Cookies",
    difficulty: "Easy",
    number: 455,
    description: `Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], the child will be content. Maximize the number of your content children and output the maximum number.`,
    examples: [
      {
        input: "g = [1,2,3], s = [1,1]",
        output: "1",
        explanation: "You have 2 cookies, but only 1 child can be content."
      },
      {
        input: "g = [1,2], s = [1,2,3]",
        output: "2",
        explanation: "Both children can be content."
      }
    ],
    constraints: [
      "1 <= g.length <= 3 * 10^4",
      "0 <= s.length <= 3 * 10^4",
      "1 <= g[i], s[j] <= 2^31 - 1"
    ],
    starterCode: `/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    // Write your code here
    
};`,
    solution: `var findContentChildren = function(g, s) {
    g.sort(function(a, b) { return a - b; });
    s.sort(function(a, b) { return a - b; });
    var i = 0, j = 0;
    while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) {
            i++;
        }
        j++;
    }
    return i;
};`,
    testCases: [
      {
        input: "[1,2,3], [1,1]",
        expected: "1",
        args: [[1,2,3],[1,1]],
        expectedValue: 1
      },
      {
        input: "[1,2], [1,2,3]",
        expected: "2",
        args: [[1,2],[1,2,3]],
        expectedValue: 2
      },
      {
        input: "[1,2,3], []",
        expected: "0",
        args: [[1,2,3],[]],
        expectedValue: 0
      }
    ],
    why: "Matching the smallest sufficient cookie to the least greedy child first maximizes the number of happy children."
  },
  {
    id: "lemonade-change",
    patternId: "greedy",
    name: "Lemonade Change",
    difficulty: "Easy",
    number: 860,
    description: `At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you, and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5. Return true if and only if you can provide every customer with correct change.`,
    examples: [
      {
        input: "bills = [5,5,5,10,20]",
        output: "true",
        explanation: "You can provide correct change for all transactions."
      },
      {
        input: "bills = [5,5,10,10,20]",
        output: "false",
        explanation: "You cannot provide change for the last $20 bill."
      }
    ],
    constraints: [
      "1 <= bills.length <= 10^5",
      "bills[i] is either 5, 10, or 20"
    ],
    starterCode: `/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    // Write your code here
    
};`,
    solution: `var lemonadeChange = function(bills) {
    var five = 0, ten = 0;
    for (var i = 0; i < bills.length; i++) {
        if (bills[i] === 5) {
            five++;
        } else if (bills[i] === 10) {
            if (five === 0) return false;
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};`,
    testCases: [
      {
        input: "[5,5,5,10,20]",
        expected: "true",
        args: [[5,5,5,10,20]],
        expectedValue: true
      },
      {
        input: "[5,5,10,10,20]",
        expected: "false",
        args: [[5,5,10,10,20]],
        expectedValue: false
      },
      {
        input: "[5,5,10]",
        expected: "true",
        args: [[5,5,10]],
        expectedValue: true
      }
    ],
    why: "Preferring to break a $10 before three $5s preserves smaller bills for future change."
  },
  {
    id: "queue-reconstruction-by-height",
    patternId: "greedy",
    name: "Queue Reconstruction by Height",
    difficulty: "Medium",
    number: 406,
    description: `You are given an array of people, where people[i] = [hi, ki] represents the ith person of height hi with exactly ki other people in front who have a height greater than or equal to hi. Reconstruct and return the queue that is represented by the input array.`,
    examples: [
      {
        input: "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
        output: "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
        explanation: "The reconstructed queue matches the front-count requirements."
      },
      {
        input: "people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
        output: "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
        explanation: "The reconstructed queue matches the front-count requirements."
      }
    ],
    constraints: [
      "1 <= people.length <= 2000",
      "0 <= hi <= 10^6",
      "0 <= ki < people.length"
    ],
    starterCode: `/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    // Write your code here
    
};`,
    solution: `var reconstructQueue = function(people) {
    people.sort(function(a, b) {
        return b[0] - a[0] || a[1] - b[1];
    });
    var result = [];
    for (var i = 0; i < people.length; i++) {
        result.splice(people[i][1], 0, people[i]);
    }
    return result;
};`,
    testCases: [
      {
        input: "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
        expected: "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
        args: [[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]],
        expectedValue: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
      },
      {
        input: "[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
        expected: "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
        args: [[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]],
        expectedValue: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
      },
      {
        input: "[[7,0]]",
        expected: "[[7,0]]",
        args: [[[7,0]]],
        expectedValue: [[7,0]]
      }
    ],
    why: "Inserting taller people first ensures shorter people do not affect the position count of taller ones."
  },
  {
    id: "remove-k-digits",
    patternId: "greedy",
    name: "Remove K Digits",
    difficulty: "Medium",
    number: 402,
    description: `Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.`,
    examples: [
      {
        input: "num = \"1432219\", k = 3",
        output: "\"1219\"",
        explanation: "Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest."
      },
      {
        input: "num = \"10200\", k = 1",
        output: "\"200\"",
        explanation: "Remove the leading 1 and the number is 200."
      }
    ],
    constraints: [
      "1 <= k <= num.length <= 10^5",
      "num consists of only digits",
      "num does not have any leading zeros except for the zero itself"
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
        while (k > 0 && stack.length && stack[stack.length - 1] > num[i]) {
            stack.pop();
            k--;
        }
        stack.push(num[i]);
    }
    while (k > 0) {
        stack.pop();
        k--;
    }
    var result = stack.join('').replace(/^0+/, '');
    return result.length === 0 ? '0' : result;
};`,
    testCases: [
      {
        input: "\"1432219\", 3",
        expected: "\"1219\"",
        args: ["1432219",3],
        expectedValue: "1219"
      },
      {
        input: "\"10200\", 1",
        expected: "\"200\"",
        args: ["10200",1],
        expectedValue: "200"
      },
      {
        input: "\"10\", 2",
        expected: "\"0\"",
        args: ["10",2],
        expectedValue: "0"
      }
    ],
    why: "A monotonic stack removes larger digits earlier in the number to minimize the resulting value."
  },
  {
    id: "partition-labels-greedy",
    patternId: "greedy",
    name: "Partition Labels",
    difficulty: "Medium",
    number: 763,
    description: `You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.`,
    examples: [
      {
        input: "s = \"ababcbacadefegdehijhklij\"",
        output: "[9,7,8]",
        explanation: "The partition is \"ababcbaca\", \"defegde\", \"hijhklij\"."
      },
      {
        input: "s = \"eccbbbbdec\"",
        output: "[10]",
        explanation: "The whole string forms one partition."
      }
    ],
    constraints: [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters"
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    // Write your code here
    
};`,
    solution: `var partitionLabels = function(s) {
    var last = {};
    for (var i = 0; i < s.length; i++) {
        last[s[i]] = i;
    }
    var result = [];
    var start = 0, end = 0;
    for (var i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    return result;
};`,
    testCases: [
      {
        input: "\"ababcbacadefegdehijhklij\"",
        expected: "[9,7,8]",
        args: ["ababcbacadefegdehijhklij"],
        expectedValue: [9,7,8]
      },
      {
        input: "\"eccbbbbdec\"",
        expected: "[10]",
        args: ["eccbbbbdec"],
        expectedValue: [10]
      },
      {
        input: "\"abc\"",
        expected: "[1,1,1]",
        args: ["abc"],
        expectedValue: [1,1,1]
      }
    ],
    why: "Each character's last occurrence defines the farthest boundary of its current partition."
  },
  {
    id: "minimum-number-of-refueling-stops",
    patternId: "greedy",
    name: "Minimum Number of Refueling Stops",
    difficulty: "Hard",
    number: 871,
    description: `A car travels from a starting position to a destination which is target miles east of the starting position. Along the way, there are gas stations. Each station[i] represents a gas station that is station[i][0] miles east of the starting position, and has station[i][1] liters of gas. Your car starts with startFuel liters of gas. Return the minimum number of refueling stops the car must make in order to reach its destination. If it cannot reach the destination, return -1.`,
    examples: [
      {
        input: "target = 1, startFuel = 1, stations = []",
        output: "0",
        explanation: "We can reach the target without refueling."
      },
      {
        input: "target = 100, startFuel = 1, stations = [[10,100]]",
        output: "-1",
        explanation: "We cannot reach the target."
      }
    ],
    constraints: [
      "1 <= target, startFuel <= 10^9",
      "0 <= stations.length <= 500",
      "0 <= position <= target",
      "1 <= fuel <= 10^9"
    ],
    starterCode: `/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
var minRefuelStops = function(target, startFuel, stations) {
    // Write your code here
    
};`,
    solution: `var minRefuelStops = function(target, startFuel, stations) {
    var pq = [];
    var fuel = startFuel;
    var stops = 0;
    var i = 0;
    while (fuel < target) {
        while (i < stations.length && stations[i][0] <= fuel) {
            pq.push(stations[i][1]);
            i++;
        }
        if (pq.length === 0) return -1;
        pq.sort(function(a, b) { return b - a; });
        fuel += pq.shift();
        stops++;
    }
    return stops;
};`,
    testCases: [
      {
        input: "1, 1, []",
        expected: "0",
        args: [1,1,[]],
        expectedValue: 0
      },
      {
        input: "100, 1, [[10,100]]",
        expected: "-1",
        args: [100,1,[[10,100]]],
        expectedValue: -1
      },
      {
        input: "100, 10, [[10,60],[20,30],[30,30],[60,40]]",
        expected: "2",
        args: [100,10,[[10,60],[20,30],[30,30],[60,40]]],
        expectedValue: 2
      }
    ],
    why: "Always refueling at the station with the most gas among those you have passed maximizes your range per stop."
  },
  {
    id: "ipo",
    patternId: "greedy",
    name: "IPO",
    difficulty: "Hard",
    number: 502,
    description: `Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects. You are given n projects where the ith project has a pure profit profits[i] and a minimum capital capital[i] is needed to start it. Initially, you have w capital. Return the final maximized capital.`,
    examples: [
      {
        input: "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
        output: "4",
        explanation: "Start with project 0, profit 1, capital becomes 1. Then choose project 2, profit 3, total 4."
      },
      {
        input: "k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]",
        output: "6",
        explanation: "Choose projects 0, 1, and 2."
      }
    ],
    constraints: [
      "1 <= k <= 10^5",
      "0 <= w <= 10^9",
      "1 <= n <= 10^5",
      "0 <= profits[i] <= 10^4",
      "0 <= capital[i] <= 10^9"
    ],
    starterCode: `/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
    // Write your code here
    
};`,
    solution: `var findMaximizedCapital = function(k, w, profits, capital) {
    var projects = [];
    for (var i = 0; i < profits.length; i++) {
        projects.push([capital[i], profits[i]]);
    }
    projects.sort(function(a, b) { return a[0] - b[0]; });
    var available = [];
    var j = 0;
    for (var i = 0; i < k; i++) {
        while (j < projects.length && projects[j][0] <= w) {
            available.push(projects[j][1]);
            j++;
        }
        if (available.length === 0) break;
        available.sort(function(a, b) { return b - a; });
        w += available.shift();
    }
    return w;
};`,
    testCases: [
      {
        input: "2, 0, [1,2,3], [0,1,1]",
        expected: "4",
        args: [2,0,[1,2,3],[0,1,1]],
        expectedValue: 4
      },
      {
        input: "3, 0, [1,2,3], [0,1,2]",
        expected: "6",
        args: [3,0,[1,2,3],[0,1,2]],
        expectedValue: 6
      },
      {
        input: "1, 0, [1,2], [1,1]",
        expected: "0",
        args: [1,0,[1,2],[1,1]],
        expectedValue: 0
      }
    ],
    why: "Repeatedly choosing the most profitable project you can afford grows capital the fastest."
  },
  {
    id: "create-sorted-array-through-instructions",
    patternId: "greedy",
    name: "Create Sorted Array through Instructions",
    difficulty: "Hard",
    number: 1649,
    description: `Given an integer array instructions, you are asked to create a sorted array from the elements in instructions. You start with an empty container. For each element from left to right, you insert it into the container, and then calculate the cost: the minimum of the number of elements strictly less than the inserted element and the number of elements strictly greater than the inserted element. Return the total cost modulo 10^9 + 7.`,
    examples: [
      {
        input: "instructions = [1,5,6,2]",
        output: "1",
        explanation: "Insert 1 with cost 0, 5 with cost 0, 6 with cost 0, 2 with cost min(1,1) = 1. Total 1."
      },
      {
        input: "instructions = [1,2,3,6,5,4]",
        output: "3",
        explanation: "Total cost is 0 + 0 + 0 + 0 + 1 + 2 = 3."
      }
    ],
    constraints: [
      "1 <= instructions.length <= 10^5",
      "1 <= instructions[i] <= 10^5"
    ],
    starterCode: `/**
 * @param {number[]} instructions
 * @return {number}
 */
var createSortedArray = function(instructions) {
    // Write your code here
    
};`,
    solution: `var createSortedArray = function(instructions) {
    var MOD = 1000000007;
    var maxVal = 0;
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i] > maxVal) maxVal = instructions[i];
    }
    var bit = new Array(maxVal + 1).fill(0);
    var update = function(index, val) {
        while (index <= maxVal) {
            bit[index] += val;
            index += index & -index;
        }
    };
    var query = function(index) {
        var sum = 0;
        while (index > 0) {
            sum += bit[index];
            index -= index & -index;
        }
        return sum;
    };
    var cost = 0;
    for (var i = 0; i < instructions.length; i++) {
        var x = instructions[i];
        var less = query(x - 1);
        var greater = i - query(x);
        cost = (cost + Math.min(less, greater)) % MOD;
        update(x, 1);
    }
    return cost;
};`,
    testCases: [
      {
        input: "[1,5,6,2]",
        expected: "1",
        args: [[1,5,6,2]],
        expectedValue: 1
      },
      {
        input: "[1,2,3,6,5,4]",
        expected: "3",
        args: [[1,2,3,6,5,4]],
        expectedValue: 3
      },
      {
        input: "[1,1,1]",
        expected: "0",
        args: [[1,1,1]],
        expectedValue: 0
      }
    ],
    why: "A Fenwick tree tracks the count of elements seen so far, allowing O(log n) cost calculation per insertion."
  },
  {
    id: "maximum-units-on-a-truck",
    patternId: "greedy",
    name: "Maximum Units on a Truck",
    difficulty: "Easy",
    number: 1710,
    description: `You are assigned to put some amount of boxes onto one truck. You are given a 2D array boxTypes, where boxTypes[i] = [numberOfBoxes, numberOfUnitsPerBox]. You are also given an integer truckSize, which is the maximum number of boxes that can be put on the truck. Return the maximum total number of units that can be put on the truck.`,
    examples: [
      {
        input: "boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4",
        output: "8",
        explanation: "Take all boxes from [1,3] and [2,2], and one box from [3,1]. Total units = 3 + 4 + 1 = 8."
      },
      {
        input: "boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10",
        output: "91",
        explanation: "Take all boxes from [5,10], [3,9], and [2,5]. Total units = 50 + 27 + 10 = 87. Actually optimal is 50 + 27 + 14 = 91."
      }
    ],
    constraints: [
      "1 <= boxTypes.length <= 1000",
      "1 <= numberOfBoxes, numberOfUnitsPerBox <= 1000",
      "1 <= truckSize <= 10^6"
    ],
    starterCode: `/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function(boxTypes, truckSize) {
    // Write your code here
    
};`,
    solution: `var maximumUnits = function(boxTypes, truckSize) {
    boxTypes.sort(function(a, b) { return b[1] - a[1]; });
    var units = 0;
    for (var i = 0; i < boxTypes.length && truckSize > 0; i++) {
        var take = Math.min(boxTypes[i][0], truckSize);
        units += take * boxTypes[i][1];
        truckSize -= take;
    }
    return units;
};`,
    testCases: [
      {
        input: "[[1,3],[2,2],[3,1]], 4",
        expected: "8",
        args: [[[1,3],[2,2],[3,1]],4],
        expectedValue: 8
      },
      {
        input: "[[5,10],[2,5],[4,7],[3,9]], 10",
        expected: "91",
        args: [[[5,10],[2,5],[4,7],[3,9]],10],
        expectedValue: 91
      },
      {
        input: "[[1,1]], 1",
        expected: "1",
        args: [[[1,1]],1],
        expectedValue: 1
      }
    ],
    why: "Loading boxes with the highest units per box first maximizes total units within the truck capacity."
  },
  {
    id: "maximum-subsequence-score",
    patternId: "greedy",
    name: "Maximum Subsequence Score",
    difficulty: "Medium",
    number: 2542,
    description: `You are given two 0-indexed integer arrays nums1 and nums2 of equal length, and a positive integer k. You must choose a subsequence of indices from nums1 of length k. For each index i chosen, nums2[i] represents the minimum of the chosen subsequence. The score of the subsequence is the sum of the selected nums1 values multiplied by the minimum nums2 value. Return the maximum possible score.`,
    examples: [
      {
        input: "nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3",
        output: "12",
        explanation: "Choose indices 0, 2, and 3. Sum = 1 + 3 + 2 = 6. Minimum nums2 = 2. Score = 6 * 2 = 12."
      },
      {
        input: "nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1",
        output: "30",
        explanation: "Choose index 2. Sum = 3. Minimum nums2 = 10. Score = 3 * 10 = 30."
      }
    ],
    constraints: [
      "2 <= nums1.length == nums2.length <= 10^5",
      "1 <= nums1[i], nums2[i] <= 10^5",
      "1 <= k <= nums1.length"
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function(nums1, nums2, k) {
    // Write your code here
    
};`,
    solution: `var maxScore = function(nums1, nums2, k) {
    var pairs = [];
    for (var i = 0; i < nums1.length; i++) {
        pairs.push([nums2[i], nums1[i]]);
    }
    pairs.sort(function(a, b) { return b[0] - a[0]; });
    var minHeap = [];
    var sum = 0;
    var maxScore = 0;
    for (var i = 0; i < pairs.length; i++) {
        sum += pairs[i][1];
        minHeap.push(pairs[i][1]);
        minHeap.sort(function(a, b) { return a - b; });
        if (minHeap.length > k) {
            sum -= minHeap.shift();
        }
        if (minHeap.length === k) {
            maxScore = Math.max(maxScore, sum * pairs[i][0]);
        }
    }
    return maxScore;
};`,
    testCases: [
      {
        input: "[1,3,3,2], [2,1,3,4], 3",
        expected: "12",
        args: [[1,3,3,2],[2,1,3,4],3],
        expectedValue: 12
      },
      {
        input: "[4,2,3,1,1], [7,5,10,9,6], 1",
        expected: "30",
        args: [[4,2,3,1,1],[7,5,10,9,6],1],
        expectedValue: 30
      },
      {
        input: "[1,2], [3,4], 2",
        expected: "9",
        args: [[1,2],[3,4],2],
        expectedValue: 9
      }
    ],
    why: "Sorting by descending nums2 and maintaining the top k nums1 values greedily maximizes the score at each possible minimum."
  }
];
