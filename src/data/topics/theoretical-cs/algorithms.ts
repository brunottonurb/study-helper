import { Topic } from '@/types';

export const algorithms: Topic = {
  id: 'algorithms',
  title: 'Algorithm Design',
  description: 'Techniques for designing efficient algorithms',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Divide and Conquer',
      description: 'A paradigm that **recursively breaks down** a problem into two or more subproblems of the same type, until they become simple enough to solve directly. The solutions are then **combined** to give a solution to the original problem. Key examples: `MergeSort` (O(n log n)), `QuickSort` (average O(n log n)), `Binary Search` (O(log n)). The recurrence relation often follows T(n) = aT(n/b) + f(n), solved using the **Master Theorem**.',
    },
    {
      title: 'Dynamic Programming',
      description: 'An optimization technique that solves problems by **storing solutions to overlapping subproblems** to avoid redundant computation. Works when a problem has **optimal substructure** (optimal solution contains optimal solutions to subproblems) and **overlapping subproblems**. Two approaches: *Top-down with memoization* (recursive + cache) or *Bottom-up tabulation* (iterative). Classic problems: Fibonacci, Longest Common Subsequence, Knapsack, Matrix Chain Multiplication.',
    },
    {
      title: 'Greedy Algorithms',
      description: 'Makes **locally optimal choices** at each step with the hope of finding a global optimum. Works when the problem exhibits the **greedy choice property** (local optimum leads to global optimum) and **optimal substructure**. Much simpler than DP but only works for specific problems. Examples: `Dijkstra\'s shortest path`, `Huffman coding`, `Prim\'s/Kruskal\'s MST`, fractional knapsack, activity selection. *Note: 0/1 Knapsack requires DP, not greedy.*',
    },
    {
      title: 'Graph Algorithms',
      description: 'Algorithms for solving problems on **graphs** (vertices and edges). **BFS** (breadth-first search): explores level-by-level, finds shortest path in unweighted graphs. **DFS** (depth-first search): explores as far as possible before backtracking, used for topological sort and cycle detection. **Shortest paths**: Dijkstra (non-negative weights), Bellman-Ford (handles negative weights), Floyd-Warshall (all-pairs). **MST**: Prim\'s and Kruskal\'s algorithms find minimum spanning trees.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the key difference between Divide and Conquer and Dynamic Programming?',
      answer: 'Divide and Conquer solves independent subproblems, while Dynamic Programming stores solutions to overlapping subproblems to avoid redundant computation.',
    },
    {
      question: 'Why does naive recursive Fibonacci have O(2^n) complexity?',
      answer: 'Because it recomputes the same subproblems exponentially many times. fib(n) calls fib(n-1) and fib(n-2), each of which makes two more calls, creating an exponential tree.',
    },
    {
      question: 'When should you use a Greedy algorithm vs Dynamic Programming?',
      answer: 'Use Greedy when locally optimal choices lead to a global optimum (greedy choice property). Use DP when you need to consider all possible combinations because local choices don\'t guarantee the best solution.',
    },
    {
      question: 'What is the time complexity of BFS and DFS on a graph?',
      answer: 'O(V + E) where V is the number of vertices and E is the number of edges, since each vertex and edge is visited once.',
    },
    {
      question: 'What is the Master Theorem used for in Divide and Conquer?',
      answer: 'The Master Theorem provides a formula to determine the time complexity of divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n), where a is the number of subproblems, n/b is the size of each subproblem, and f(n) is the work done outside recursion.',
    },
    {
      question: 'Why is MergeSort always O(n log n) but QuickSort can be O(n²)?',
      answer: 'MergeSort always divides the array in half evenly, guaranteeing O(n log n). QuickSort\'s performance depends on pivot selection - worst case (already sorted with bad pivot) creates unbalanced partitions, leading to O(n²). Average case with random pivots is O(n log n).',
    },
    {
      question: 'What are the two requirements for Dynamic Programming to be applicable?',
      answer: '1) Optimal substructure: the optimal solution contains optimal solutions to subproblems. 2) Overlapping subproblems: the same subproblems are solved multiple times, making memoization beneficial.',
    },
    {
      question: 'What is the difference between top-down and bottom-up DP?',
      answer: 'Top-down (memoization) uses recursion with a cache to store results, solving subproblems as needed. Bottom-up (tabulation) uses iteration to solve subproblems in order from smallest to largest, filling a table. Bottom-up typically has better constant factors and avoids recursion overhead.',
    },
    {
      question: 'Why can\'t we use a greedy approach for the 0/1 Knapsack problem?',
      answer: 'In 0/1 Knapsack, we can\'t take fractions of items. A greedy choice (e.g., highest value-to-weight ratio) might exclude a combination of smaller items that yields better total value. We need DP to consider all combinations.',
    },
    {
      question: 'How does Dijkstra\'s algorithm ensure correctness with the greedy approach?',
      answer: 'Dijkstra works because once a node is finalized (removed from priority queue), the shortest path to it has been found. Since all edge weights are non-negative, no future path can improve it. This satisfies the greedy choice property.',
    },
    {
      question: 'When would you use BFS vs DFS for graph traversal?',
      answer: 'Use BFS for: finding shortest path in unweighted graphs, level-order traversal, finding all nodes within k distance. Use DFS for: topological sorting, detecting cycles, pathfinding with backtracking, exploring all possibilities (like in puzzles).',
    },
    {
      question: 'What is the difference between Dijkstra and Bellman-Ford algorithms?',
      answer: 'Dijkstra is faster (O(E log V) with priority queue) but only works with non-negative edge weights. Bellman-Ford is slower (O(VE)) but handles negative weights and can detect negative cycles. Bellman-Ford relaxes all edges V-1 times.',
    },
  ],
  codeExamples: [
    {
      title: 'Dynamic Programming - Fibonacci',
      language: 'python',
      code: `# Naive recursive: O(2^n)
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n-1) + fib_naive(n-2)

# DP with memoization: O(n)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# DP bottom-up: O(n) time, O(1) space
def fib_dp(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      explanation: 'DP transforms exponential time complexity to linear by avoiding redundant computation',
    },
  ],
};
