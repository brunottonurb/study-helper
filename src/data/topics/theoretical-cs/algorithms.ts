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
      description: 'Split problem into subproblems, solve recursively, combine results (e.g., MergeSort)',
    },
    {
      title: 'Dynamic Programming',
      description: 'Store solutions to overlapping subproblems to avoid recomputation',
    },
    {
      title: 'Greedy Algorithms',
      description: 'Make locally optimal choices at each step (e.g., Dijkstra, Huffman)',
    },
    {
      title: 'Graph Algorithms',
      description: 'BFS, DFS, shortest paths, minimum spanning trees',
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
