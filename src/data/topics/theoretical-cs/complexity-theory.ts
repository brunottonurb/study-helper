import { Topic } from '@/types';

export const complexityTheory: Topic = {
  id: 'complexity-theory',
  title: 'Complexity Theory',
  description: 'Classification of computational problems by resource requirements',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'P vs NP',
      description: '**P** is the class of decision problems solvable in **polynomial time** by a deterministic Turing Machine (e.g., sorting, shortest path, primality testing). **NP** is the class of problems whose solutions can be **verified** in polynomial time — equivalently, problems solvable in polynomial time by a **nondeterministic** TM. Clearly **P ⊆ NP** (if you can solve it fast, you can verify it fast), but whether **P = NP** is the most important open question in computer science. Most experts believe P ≠ NP, but no proof exists. If P = NP, problems like optimal scheduling, protein folding, and breaking RSA encryption would all become efficiently solvable.',
    },
    {
      title: 'NP-Complete & NP-Hard',
      description: 'A problem is **NP-Hard** if every problem in NP can be **reduced** to it in polynomial time — it\'s at least as hard as the hardest NP problems. A problem is **NP-Complete** if it is both NP-Hard *and* in NP. NP-Complete problems are the **"hardest" problems in NP**: if *any* NP-Complete problem can be solved in polynomial time, then **P = NP** and *all* NP problems become tractable. Classic NP-Complete problems: **SAT** (Boolean satisfiability, the first proven NP-Complete problem via the Cook-Levin theorem), **3-SAT**, **Vertex Cover**, **Hamiltonian Path**, **Subset Sum**, **Graph Coloring**, and the decision version of **Traveling Salesman**. When facing an NP-Complete problem in practice, use *approximation algorithms*, *heuristics*, or *parameterized algorithms*.',
    },
    {
      title: 'Asymptotic Analysis & Big O',
      description: 'Asymptotic notation describes how an algorithm\'s resource usage **scales** with input size:\n\n- **O(f(n))** — upper bound ("at most"): `T(n) ≤ c·f(n)` for large n\n- **Ω(f(n))** — lower bound ("at least"): `T(n) ≥ c·f(n)` for large n\n- **Θ(f(n))** — tight bound ("exactly"): both O and Ω\n- **o(f(n))** — strict upper bound (not tight)\n\nCommon growth rates: **O(1)** < **O(log n)** < **O(n)** < **O(n log n)** < **O(n²)** < **O(n³)** < **O(2ⁿ)** < **O(n!)**. Big O is the most commonly used because we typically care about **worst-case** guarantees. *Amortized analysis* (e.g., dynamic array resizing) gives average cost per operation over a sequence, even when individual operations may be expensive.',
    },
    {
      title: 'Reductions',
      description: 'A **reduction** transforms one problem into another to establish complexity relationships. A **polynomial-time reduction** from problem A to problem B (written **A ≤ₚ B**) means: if B can be solved efficiently, so can A. Equivalently, if A is hard, B must be *at least* as hard. To prove a problem X is NP-Complete: (1) show X ∈ NP (solutions are verifiable in poly-time), then (2) show a known NP-Complete problem **reduces to X** in poly-time. The chain of reductions historically starts from **SAT** (Cook-Levin) → **3-SAT** → **Vertex Cover** → **Hamiltonian Path** → etc. Many-one reductions (Karp reductions) are the standard type used for NP-completeness proofs.',
    },
    {
      title: 'Space Complexity',
      description: 'Beyond time, we also classify problems by **memory usage**. **PSPACE** is the class of problems solvable using polynomial *space* (but potentially exponential time). **PSPACE** contains both P and NP: **P ⊆ NP ⊆ PSPACE**. Key results: **Savitch\'s theorem** shows NSPACE(f(n)) ⊆ DSPACE(f(n)²), meaning nondeterminism doesn\'t help much for space. **PSPACE-complete** problems (like **TQBF** — True Quantified Boolean Formula, and generalized games like Go/Chess) are believed harder than NP-complete problems. The space hierarchy: **L** (log space) ⊆ **NL** ⊆ **P** ⊆ **NP** ⊆ **PSPACE** ⊆ **EXPTIME**.',
    },
    {
      title: 'Dealing with NP-Hard Problems',
      description: 'Since we likely can\'t solve NP-hard problems efficiently in general, practical strategies include:\n\n- **Approximation algorithms**: find solutions guaranteed within a factor of optimal (e.g., 2-approximation for Vertex Cover)\n- **Parameterized complexity**: problems that are **FPT** (fixed-parameter tractable) are solvable in `O(f(k) · nᶜ)` where k is a parameter — tractable when k is small\n- **Heuristics & metaheuristics**: genetic algorithms, simulated annealing, local search — no guarantees but often work well in practice\n- **Average-case analysis**: some NP-complete problems are easy on random instances\n- **Special cases**: NP-hard in general but polynomial for restricted inputs (e.g., 2-SAT is in P while 3-SAT is NP-complete)',
    },
  ],
  quizQuestions: [
    {
      question: 'What does it mean for a problem to be in NP?',
      answer: 'A problem is in NP if a proposed solution can be verified in polynomial time by a deterministic TM, or equivalently, if it can be solved in polynomial time by a nondeterministic TM. It does NOT mean the problem is hard to solve — P is a subset of NP, so all polynomial-time problems are also in NP.',
    },
    {
      question: 'Why is the P vs NP question so important?',
      answer: 'If P = NP, every problem whose solution can be quickly verified could also be quickly solved. This would break most modern cryptography (which relies on problems being hard to solve but easy to verify), revolutionize optimization, drug discovery, AI, and essentially every field that relies on search and optimization.',
    },
    {
      question: 'What does it mean to reduce problem A to problem B?',
      answer: 'A polynomial-time reduction from A to B (A ≤ₚ B) means transforming any instance of A into an instance of B in polynomial time such that the answer is preserved. If B can be solved efficiently, so can A. Contrapositive: if A is hard, B must also be at least as hard.',
    },
    {
      question: 'What is the significance of the Cook-Levin theorem?',
      answer: 'It proved SAT (Boolean satisfiability) is NP-complete — the first problem ever shown to be NP-complete. This meant any NP problem can be reduced to SAT in polynomial time, establishing SAT as the foundation from which all other NP-completeness proofs are built via chains of reductions.',
    },
    {
      question: 'What is the difference between NP-Hard and NP-Complete?',
      answer: 'NP-Hard means every problem in NP can be reduced to it — it\'s at least as hard as the hardest NP problems. NP-Complete means it\'s NP-Hard AND also in NP (solutions are verifiable in poly-time). Some NP-Hard problems, like the Halting Problem, are not in NP at all (they\'re undecidable).',
    },
    {
      question: 'What is the difference between Big O, Big Ω, and Big Θ?',
      answer: 'Big O gives an upper bound (at most this growth rate). Big Ω gives a lower bound (at least this growth rate). Big Θ gives a tight bound (exactly this growth rate, up to constants). For example, comparison-based sorting is O(n log n), Ω(n log n), and therefore Θ(n log n).',
    },
    {
      question: 'Why is 2-SAT in P but 3-SAT is NP-complete?',
      answer: '2-SAT can be solved in linear time using strongly connected components in the implication graph — each clause (a ∨ b) creates implications (¬a → b, ¬b → a) that can be analyzed with graph algorithms. 3-SAT allows enough freedom in each clause that the implication structure becomes intractable, making it NP-complete.',
    },
    {
      question: 'What is Savitch\'s theorem and why does it matter?',
      answer: 'Savitch\'s theorem states that NSPACE(f(n)) ⊆ DSPACE(f(n)²) — any problem solvable with f(n) space nondeterministically can be solved with f(n)² space deterministically. This means nondeterminism provides at most a quadratic advantage for space (unlike time, where the gap may be exponential). It implies NPSPACE = PSPACE.',
    },
    {
      question: 'What is amortized analysis and how does it differ from average-case analysis?',
      answer: 'Amortized analysis gives the average cost per operation over a worst-case sequence of operations (no probability involved). Average-case analysis gives expected cost over random inputs. Example: dynamic array append is O(1) amortized — most appends are O(1), occasional resizing is O(n), but over n operations the total cost is O(n), so O(1) per operation.',
    },
    {
      question: 'What is a PSPACE-complete problem and how does it compare to NP-complete?',
      answer: 'A PSPACE-complete problem is the hardest problem in PSPACE — every PSPACE problem reduces to it. Since NP ⊆ PSPACE, PSPACE-complete problems are at least as hard as NP-complete problems (and believed to be strictly harder). Examples include TQBF and determining the winner in generalized board games like Chess or Go.',
    },
    {
      question: 'What is an approximation algorithm?',
      answer: 'An approximation algorithm solves an NP-hard optimization problem in polynomial time but returns a solution that is guaranteed within some factor of optimal. For example, a 2-approximation for Vertex Cover always returns a cover at most twice the minimum size. The approximation ratio measures how far the result can be from optimal.',
    },
    {
      question: 'What does it mean for a problem to be Fixed-Parameter Tractable (FPT)?',
      answer: 'An FPT problem is solvable in time O(f(k) · nᶜ) where k is some parameter, f is any computable function, and c is a constant independent of k. This means the problem is tractable when k is small, even if the problem is NP-hard in general. Example: Vertex Cover parameterized by cover size k is FPT — solvable in O(2^k · n).',
    },
  ],
  codeExamples: [
    {
      title: 'Complexity Classes Hierarchy',
      language: 'text',
      code: `Full hierarchy (believed strictly nested):

L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME ⊆ NEXPTIME ⊆ EXPSPACE

Known separations:
  L ≠ PSPACE (by space hierarchy theorem)
  P ≠ EXPTIME (by time hierarchy theorem)

Open questions:
  P vs NP          (most famous open problem)
  NP vs PSPACE     (believed different)
  L vs P           (believed different)
  NP vs co-NP      (believed different)

Key classes:
  P:          Sorting, Shortest Path, 2-SAT, Primality
  NP:         3-SAT, TSP (decision), Subset Sum, Clique
  co-NP:      Tautology, "no Hamiltonian cycle"
  PSPACE:     TQBF, Generalized Chess/Go
  EXPTIME:    Generalized Checkers (perfect play)`,
      explanation: 'The hierarchy shows the landscape of computational complexity. Problems higher in the hierarchy are believed (but not always proven) to require more resources.',
    },
    {
      title: 'NP-Completeness Proof Structure',
      language: 'text',
      code: `To prove problem X is NP-Complete:

Step 1: Show X ∈ NP
  → Give a polynomial-time verifier
  → "Given a certificate c, verify the solution in O(n^k)"

Step 2: Show X is NP-Hard
  → Reduce a known NP-Complete problem Y to X
  → Y ≤ₚ X: transform any instance of Y into X in poly-time
  → Ensure: Y is YES ⟺ transformed X is YES

Example: Proving Vertex Cover is NP-Complete
  Step 1: Given a set S, verify S is a cover in O(|E|)  ✓
  Step 2: Reduce 3-SAT to Vertex Cover              ✓
    → Each clause → gadget with vertices/edges
    → Satisfying assignment ↔ vertex cover of size k

Historical chain:
  SAT → 3-SAT → CLIQUE → VERTEX COVER → ...
  SAT → 3-SAT → SUBSET SUM → KNAPSACK → ...
  SAT → 3-SAT → 3-COLORING → k-COLORING → ...`,
      explanation: 'NP-completeness proofs always follow this two-step structure. The chain of reductions from SAT means you can reduce any convenient NP-complete problem, not necessarily SAT itself.',
    },
    {
      title: '2-Approximation for Vertex Cover',
      language: 'python',
      code: `def vertex_cover_approx(graph):
    """
    2-approximation: always within 2x of optimal.
    
    Algorithm: greedily pick edges, add both endpoints.
    """
    cover = set()
    edges = set(graph.edges())
    
    while edges:
        # Pick any edge (u, v)
        u, v = next(iter(edges))
        cover.add(u)
        cover.add(v)
        
        # Remove all edges incident to u or v
        edges = {(a, b) for (a, b) in edges 
                 if a != u and a != v and b != u and b != v}
    
    return cover

# Why it's a 2-approximation:
# - Each edge we pick contributes 2 vertices to cover
# - At least 1 of those 2 must be in ANY valid cover
# - So |our cover| ≤ 2 * |optimal cover|`,
      explanation: 'When NP-hard problems must be solved in practice, approximation algorithms trade optimality for efficiency. This algorithm runs in polynomial time and guarantees a solution at most twice the optimal size.',
    },
  ],
};
