import { Topic } from '@/types';

export const automataTheory: Topic = {
  id: 'automata-theory',
  title: 'Automata Theory',
  description: 'Study of abstract machines and computational problems they can solve',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Finite Automata (DFA/NFA)',
      description: 'Abstract machines with a **finite number of states** that recognize **regular languages**. A **DFA** (Deterministic Finite Automaton) has exactly one transition per symbol from each state — for every state-symbol pair `(q, a)`, there is precisely one next state. An **NFA** (Nondeterministic Finite Automaton) allows zero, one, or multiple transitions per symbol, plus **ε-transitions** (transitions without consuming input). Despite NFAs appearing more powerful, they are **computationally equivalent** to DFAs — any NFA can be converted to a DFA via the **subset construction** (powerset construction), though the resulting DFA may have up to **2^n states** for an NFA with n states.',
    },
    {
      title: 'Regular Expressions',
      description: 'A **declarative notation** for describing regular languages using three fundamental operations: **concatenation** (ab), **union/alternation** (a|b), and **Kleene star** (a\\*). They are **equivalent in power** to finite automata — every regex can be converted to an NFA (**Thompson\'s construction**), and every DFA can be converted to a regex (**state elimination** method). Modern "regex" engines (like in Python or JavaScript) add features like backreferences and lookaheads that go **beyond regular languages**, making them more powerful than theoretical regular expressions. *Kleene\'s theorem* formally establishes the equivalence between regular expressions and finite automata.',
    },
    {
      title: 'Pushdown Automata (PDA)',
      description: 'An extension of finite automata with an auxiliary **stack** for unbounded memory, allowing them to recognize **context-free languages** (CFLs). The stack provides a **LIFO** memory that enables matching nested structures like balanced parentheses `{aⁿbⁿ}`. A **deterministic PDA** (DPDA) is strictly less powerful than a **nondeterministic PDA** (NPDA) — unlike finite automata, determinism *does* reduce power for PDAs. For example, the language of palindromes `{wwᴿ}` requires nondeterminism. Every context-free grammar has an equivalent NPDA, but not every CFL has a DPDA. DPDAs correspond to **LR-parsable languages**, which is why most programming languages are designed to be deterministically parsable.',
    },
    {
      title: 'Turing Machines',
      description: 'The most powerful standard model of computation, consisting of an **infinite tape**, a **read/write head**, a **finite control**, and a **transition function**. Unlike simpler automata, a Turing Machine can **read, write, and move in both directions** on its tape. The **Church-Turing thesis** states that any function computable by an algorithm can be computed by a Turing Machine. Variants include **multi-tape TMs**, **nondeterministic TMs**, and **universal TMs** (a TM that can simulate any other TM — the theoretical basis for general-purpose computers). A TM can **accept**, **reject**, or **loop forever** on an input, which is central to the concept of *decidability*.',
    },
    {
      title: 'The Chomsky Hierarchy & Automata',
      description: 'Each level of the **Chomsky hierarchy** has a corresponding automaton type:\n\n- **Type 3** (Regular) → **Finite Automata** (DFA/NFA)\n- **Type 2** (Context-Free) → **Pushdown Automata**\n- **Type 1** (Context-Sensitive) → **Linear Bounded Automata**\n- **Type 0** (Recursively Enumerable) → **Turing Machines**\n\nEach level is **strictly more powerful** than the one below it. A language recognized by a finite automaton is also recognized by a PDA, and so on. The hierarchy provides a clean framework for understanding the **limits of computation** at each level.',
    },
    {
      title: 'Decidability & the Halting Problem',
      description: 'A language is **decidable** (recursive) if some Turing Machine always halts and gives the correct yes/no answer. A language is **recognizable** (recursively enumerable) if a TM accepts all strings in the language but may loop on strings not in it. The **Halting Problem** — "does TM M halt on input w?" — is the classic **undecidable** problem, proven by Turing via **diagonalization**. Consequences: no general algorithm can detect infinite loops, verify arbitrary program correctness, or decide semantic equivalence of programs (*Rice\'s theorem*: any non-trivial semantic property of programs is undecidable).',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between a DFA and an NFA?',
      answer: 'A DFA (Deterministic Finite Automaton) has exactly one transition per symbol from each state, while an NFA (Nondeterministic) can have zero, one, or multiple transitions per symbol, plus epsilon (empty) transitions. Despite this, they recognize the same class of languages (regular languages).',
    },
    {
      question: 'Why are regular expressions equivalent to finite automata?',
      answer: 'Any regular expression can be converted to an NFA (Thompson\'s construction), and any NFA can be converted to a DFA (subset construction), and any DFA can be converted back to a regex (state elimination). Both describe exactly the class of regular languages. This is formalized by Kleene\'s theorem.',
    },
    {
      question: 'What makes a Pushdown Automaton more powerful than a Finite Automaton?',
      answer: 'A Pushdown Automaton has a stack for memory, allowing it to recognize context-free languages like balanced parentheses {aⁿbⁿ}, which finite automata cannot recognize. The stack provides unbounded LIFO storage that finite states alone cannot simulate.',
    },
    {
      question: 'What can a Turing Machine do that other automata cannot?',
      answer: 'A Turing Machine has an infinite tape with read/write capability and can move in both directions, making it capable of computing anything that is computable (Church-Turing thesis). It can recognize recursively enumerable languages and decide recursive languages, which is beyond the capability of PDAs or finite automata.',
    },
    {
      question: 'What is the subset construction and why does it matter?',
      answer: 'The subset (powerset) construction converts an NFA with n states into an equivalent DFA. Each DFA state corresponds to a set of NFA states. It proves NFAs and DFAs are equivalent in power, though the resulting DFA can have up to 2^n states (exponential blowup).',
    },
    {
      question: 'Why is nondeterminism more powerful for PDAs but not for finite automata?',
      answer: 'For finite automata, any NFA can be converted to an equivalent DFA (subset construction), so determinism doesn\'t reduce power. For PDAs, nondeterministic PDAs can recognize languages (like palindromes {wwᴿ}) that no deterministic PDA can handle. The subset construction doesn\'t generalize to stacks.',
    },
    {
      question: 'What is the Church-Turing thesis?',
      answer: 'The Church-Turing thesis states that any function that can be effectively computed by an algorithm can be computed by a Turing Machine. It\'s a thesis (not a theorem) because "algorithm" is an informal concept, but no counterexample has ever been found. It equates the informal notion of computability with the formal model of Turing Machines.',
    },
    {
      question: 'What is the Halting Problem and why is it undecidable?',
      answer: 'The Halting Problem asks: given a Turing Machine M and input w, does M halt on w? It\'s undecidable because assuming a halting decider H exists leads to a contradiction via diagonalization — construct a machine D that does the opposite of what H predicts for D itself. This means no general algorithm can detect all infinite loops.',
    },
    {
      question: 'What is Rice\'s theorem?',
      answer: 'Rice\'s theorem states that any non-trivial semantic property of Turing Machines (programs) is undecidable. A property is non-trivial if some TMs have it and some don\'t. For example, "does this program ever output 42?" or "do these two programs compute the same function?" are undecidable.',
    },
    {
      question: 'What is the difference between decidable and recognizable languages?',
      answer: 'A decidable (recursive) language has a TM that always halts with the correct answer. A recognizable (recursively enumerable) language has a TM that accepts strings in the language but may loop forever on strings not in it. Every decidable language is recognizable, but not vice versa (e.g., the Halting Problem\'s language is recognizable but not decidable).',
    },
    {
      question: 'How do modern regex engines differ from theoretical regular expressions?',
      answer: 'Modern regex engines add features like backreferences (\\1), lookaheads, and lookbehinds that go beyond regular languages. For example, (a+)b\\1 matches aⁿbaⁿ, which is not a regular language. Theoretical regular expressions only support concatenation, union, and Kleene star.',
    },
    {
      question: 'What is a Universal Turing Machine?',
      answer: 'A Universal Turing Machine (UTM) is a TM that takes as input the description of any other TM M and an input w, and simulates M on w. It\'s the theoretical foundation for general-purpose computers — one machine that can run any program. This concept directly influenced von Neumann architecture and stored-program computers.',
    },
  ],
  codeExamples: [
    {
      title: 'DFA for strings ending in "01"',
      language: 'text',
      code: `States: {q0, q1, q2}
Alphabet: {0, 1}
Start state: q0
Accept state: q2

Transition function:
δ(q0, 0) = q1    δ(q0, 1) = q0
δ(q1, 0) = q1    δ(q1, 1) = q2
δ(q2, 0) = q1    δ(q2, 1) = q0

Example: "1101" → q0 →1→ q0 →1→ q0 →0→ q1 →1→ q2 ✓
Example: "1100" → q0 →1→ q0 →1→ q0 →0→ q1 →0→ q1 ✗`,
      explanation: 'A DFA processes input one character at a time, transitioning between states. It accepts if it ends in an accept state. This DFA tracks whether the last two characters seen were "01".',
    },
    {
      title: 'NFA to DFA — Subset Construction',
      language: 'text',
      code: `NFA for (a|b)*abb:
States: {q0, q1, q2, q3}
Start: q0, Accept: q3
δ(q0, a) = {q0, q1}    δ(q0, b) = {q0}
δ(q1, b) = {q2}
δ(q2, b) = {q3}

Subset Construction → DFA:
{q0}      --a--> {q0,q1}    --b--> {q0}
{q0,q1}   --a--> {q0,q1}    --b--> {q0,q2}
{q0,q2}   --a--> {q0,q1}    --b--> {q0,q3}  ← accept
{q0,q3}   --a--> {q0,q1}    --b--> {q0}

DFA states: 4 (from NFA with 4 states)
Worst case: up to 2^4 = 16 DFA states`,
      explanation: 'Each DFA state is a set of NFA states. We track all possible NFA states simultaneously. The DFA accepts if any NFA state in the set is an accept state.',
    },
    {
      title: 'Turing Machine for {aⁿbⁿcⁿ}',
      language: 'text',
      code: `TM to decide L = {aⁿbⁿcⁿ | n ≥ 0}
(Not context-free — requires TM power)

Algorithm:
1. Scan right, cross off one 'a', one 'b', one 'c'
2. Return to leftmost uncrossed symbol
3. Repeat until all crossed off → ACCEPT
4. If symbols remain but can't match a,b,c → REJECT

Trace for "aabbcc":
  aabbcc  → cross first a: Xabbcc
  Xabbcc  → cross first b: XaXbcc
  XaXbcc  → cross first c: XaXbXc
  XaXbXc  → return to start, cross a: XXXbXc
  XXXbXc  → cross b: XXXXXc
  XXXXXc  → cross c: XXXXXX → ACCEPT

This language is NOT context-free:
  pumping lemma for CFLs can prove this.`,
      explanation: 'This language requires the power of a Turing Machine because it needs to match three independent counts. PDAs can only match two (like aⁿbⁿ) using the stack.',
    },
  ],
};
