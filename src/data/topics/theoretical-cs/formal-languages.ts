import { Topic } from '@/types';

export const formalLanguages: Topic = {
  id: 'formal-languages',
  title: 'Formal Languages & Grammars',
  description: 'Mathematical framework for describing languages and their structure',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Chomsky Hierarchy',
      description: 'A hierarchy of **four classes of formal grammars**, each generating a corresponding class of languages with an associated automaton:\n\n- **Type 3** (Regular): productions of the form `A → aB` or `A → a`. Recognized by **finite automata**. Used for lexical analysis (tokenizing).\n- **Type 2** (Context-Free): productions of the form `A → α` (single non-terminal on the left). Recognized by **pushdown automata**. Used for syntax/parsing of programming languages.\n- **Type 1** (Context-Sensitive): productions where the context around a non-terminal matters, `αAβ → αγβ`. Recognized by **linear bounded automata**.\n- **Type 0** (Recursively Enumerable): unrestricted productions. Recognized by **Turing Machines**.\n\nEach type is **strictly contained** in the one above it: Regular ⊂ Context-Free ⊂ Context-Sensitive ⊂ Recursively Enumerable.',
    },
    {
      title: 'Context-Free Grammars (CFGs)',
      description: 'A CFG is defined by a 4-tuple **G = (V, Σ, R, S)** where V is a set of **non-terminals** (variables), Σ is the **terminal alphabet**, R is a set of **production rules** of the form `A → α`, and S is the **start symbol**. CFGs are the backbone of programming language design — they express **nested structures** like balanced parentheses, if-else blocks, and recursive data types. A **derivation** applies productions to transform the start symbol into a string of terminals. **Leftmost** vs **rightmost** derivations differ in which non-terminal is expanded first. A grammar is **ambiguous** if some string has multiple distinct parse trees — problematic for compilers since different trees may yield different interpretations. **Chomsky Normal Form** (CNF: every production is `A → BC` or `A → a`) and **Greibach Normal Form** (GNF) are standardized forms useful for proofs and algorithms like **CYK parsing**.',
    },
    {
      title: 'Parsing Techniques',
      description: 'Parsing transforms a flat sequence of tokens into a **parse tree** (or AST) according to a grammar. Two main strategies:\n\n- **Top-down (LL)**: starts from the start symbol and tries to derive the input. **Predictive parsing** uses lookahead to choose productions without backtracking. **LL(k)** means *Left-to-right* scan, *Leftmost* derivation, with *k* tokens of lookahead. **Recursive descent** is the most common implementation — each non-terminal becomes a function. Requires eliminating **left recursion** and **left factoring** the grammar.\n- **Bottom-up (LR)**: starts from the input and reduces to the start symbol. **LR(k)** means *Left-to-right* scan, *Rightmost* derivation (in reverse), *k* lookahead. More powerful than LL — handles all deterministic CFLs. Variants: **SLR**, **LALR(1)** (used by `yacc`/`bison`), **CLR** (canonical LR, most powerful). Uses a **shift-reduce** mechanism with a parsing table.\n\nMost modern compilers use **LALR(1)** (e.g., `yacc`) or **recursive descent** (e.g., GCC, Clang).',
    },
    {
      title: 'Pumping Lemma',
      description: 'A proof technique used to show that a language is **NOT** regular (or not context-free). The idea: if a language is regular, then sufficiently long strings can be **"pumped"** (a middle section repeated any number of times) and the result stays in the language.\n\n**Pumping Lemma for Regular Languages**: For any regular language L, there exists a pumping length p such that any string w ∈ L with |w| ≥ p can be split as **w = xyz** where: (1) |xy| ≤ p, (2) |y| > 0, (3) **xyⁱz ∈ L** for all i ≥ 0. To prove L is not regular, assume it is, then find a string where pumping *always* produces something outside L (for any valid split).\n\n**Pumping Lemma for CFLs**: similar but splits w = **uvxyz** with two pumpable sections. Used to prove languages like `{aⁿbⁿcⁿ}` are not context-free. *Note: the pumping lemma is a necessary condition, not sufficient — passing it doesn\'t prove regularity.*',
    },
    {
      title: 'Closure Properties',
      description: 'Language classes are **closed** under certain operations, meaning applying the operation to languages in the class yields a language still in the class:\n\n- **Regular languages**: closed under **union, intersection, complement, concatenation, Kleene star, reversal, homomorphism**. Extremely robust — this is why regex operations always produce regular languages.\n- **Context-free languages**: closed under **union, concatenation, Kleene star**, but **NOT** closed under **intersection** or **complement**. This is a crucial distinction — the intersection of two CFLs may not be context-free.\n- **Decidable languages**: closed under **union, intersection, complement, concatenation, Kleene star**.\n\nClosure properties are powerful tools for proving languages belong (or don\'t belong) to certain classes without constructing automata directly.',
    },
    {
      title: 'Applications in Compilers',
      description: 'Formal languages are the **foundation of compiler design**. The compilation pipeline directly maps to the Chomsky hierarchy:\n\n- **Lexical analysis** (scanner/tokenizer): uses **regular expressions** and **DFAs** to break source code into tokens. Tools: `lex`, `flex`.\n- **Syntax analysis** (parser): uses **CFGs** and **parsing algorithms** to build a parse tree / AST. Tools: `yacc`, `bison`, `ANTLR`.\n- **Semantic analysis**: type checking and scope resolution go beyond CFGs — some aspects are **context-sensitive** (e.g., "variable must be declared before use").\n\n**BNF** (Backus-Naur Form) and **EBNF** (Extended BNF) are standard notations for writing CFGs in language specifications. Every programming language standard includes a formal grammar in BNF/EBNF.',
    },
  ],
  quizQuestions: [
    {
      question: 'What are the four levels of the Chomsky Hierarchy from most to least powerful?',
      answer: 'Type 0 (recursively enumerable, Turing machines) → Type 1 (context-sensitive, linear bounded automata) → Type 2 (context-free, pushdown automata) → Type 3 (regular, finite automata). Each level is strictly more powerful than the one below it.',
    },
    {
      question: 'Why are context-free grammars used for programming language syntax?',
      answer: 'CFGs can express nested structures like balanced parentheses, if-else blocks, and recursive data types. They\'re powerful enough for most syntax constructs while being efficiently parsable (in O(n) for deterministic CFLs using LR or LL parsers).',
    },
    {
      question: 'What is the difference between LL and LR parsing?',
      answer: 'LL parses top-down (starts from start symbol, predicts productions using leftmost derivation). LR parses bottom-up (starts from input, reduces to start symbol using rightmost derivation in reverse). LR is more powerful — it handles all deterministic CFLs while LL cannot handle left-recursive grammars.',
    },
    {
      question: 'How does the Pumping Lemma work to prove a language is not regular?',
      answer: 'Assume the language is regular with pumping length p. Pick a string w in the language with |w| ≥ p. For ANY split w = xyz (with |xy| ≤ p and |y| > 0), show that pumping y (repeating it i times) produces a string NOT in the language. This contradicts the pumping lemma, so the language cannot be regular.',
    },
    {
      question: 'What is an ambiguous grammar and why is it problematic?',
      answer: 'A grammar is ambiguous if some string has two or more distinct parse trees (or equivalently, two distinct leftmost derivations). This is problematic for compilers because different parse trees may yield different interpretations of the same code (e.g., the dangling else problem or operator precedence issues).',
    },
    {
      question: 'What is Chomsky Normal Form (CNF) and why is it useful?',
      answer: 'CNF requires every production to be either A → BC (two non-terminals) or A → a (single terminal). Any CFG can be converted to CNF. It\'s useful because the CYK parsing algorithm requires CNF and runs in O(n³), and it simplifies many proofs about context-free languages (e.g., the pumping lemma for CFLs).',
    },
    {
      question: 'Why are context-free languages not closed under intersection?',
      answer: 'The classic counterexample: L1 = {aⁿbⁿcᵐ} and L2 = {aᵐbⁿcⁿ} are both context-free (each matches two of three counts). But L1 ∩ L2 = {aⁿbⁿcⁿ}, which is not context-free (provable via the pumping lemma for CFLs). This fundamental limitation means CFGs can\'t express all constraints we need.',
    },
    {
      question: 'What is the relationship between BNF and context-free grammars?',
      answer: 'BNF (Backus-Naur Form) is a notation for writing context-free grammars. Non-terminals are written in <angle brackets>, ::= means "produces", and | separates alternatives. EBNF adds convenience notation like [ ] for optional, { } for repetition, and ( ) for grouping, but doesn\'t add expressive power beyond CFGs.',
    },
    {
      question: 'What is left recursion and why must it be eliminated for LL parsers?',
      answer: 'Left recursion occurs when a non-terminal derives itself as the leftmost symbol (directly: A → Aα, or indirectly: A → Bα, B → Aβ). LL parsers enter infinite recursion because they expand the leftmost non-terminal first and would repeatedly choose the left-recursive production without consuming input. It can be eliminated by converting A → Aα | β to A → βA\', A\' → αA\' | ε.',
    },
    {
      question: 'What is the difference between a parse tree and an AST?',
      answer: 'A parse tree (concrete syntax tree) includes every grammar symbol including intermediate non-terminals and syntactic sugar (parentheses, semicolons). An AST (abstract syntax tree) abstracts away unnecessary detail, keeping only the semantically meaningful structure. For "3 + 4 * 5", the AST is a tree with + at the root, 3 as the left child, and * (with 4, 5) as the right child.',
    },
    {
      question: 'How does the compilation pipeline map to the Chomsky hierarchy?',
      answer: 'Lexical analysis uses regular languages (Type 3) — regexes and DFAs tokenize source code. Syntax analysis uses context-free languages (Type 2) — parsers build ASTs from token sequences. Semantic analysis requires context-sensitive checks (Type 1) — like "variables must be declared before use" or type checking, which can\'t be expressed in a CFG.',
    },
    {
      question: 'What is the difference between a scanner and a parser?',
      answer: 'A scanner (lexer/tokenizer) performs lexical analysis — it reads characters and groups them into tokens using regular expressions/DFAs. A parser performs syntax analysis — it reads tokens and builds a parse tree/AST using a context-free grammar. The scanner deals with Type 3 (regular) while the parser deals with Type 2 (context-free) languages.',
    },
  ],
  codeExamples: [
    {
      title: 'Context-Free Grammar for Arithmetic',
      language: 'text',
      code: `Grammar for arithmetic expressions with correct precedence:

E → E + T | E - T | T        (Expression: addition/subtraction)
T → T * F | T / F | F        (Term: multiplication/division)
F → ( E ) | number            (Factor: parentheses or number)

Derivation of "3 + 4 * 5":
E → E + T                     (choose addition)
  → T + T                     (E → T)
  → F + T                     (T → F)
  → 3 + T                     (F → 3)
  → 3 + T * F                 (T → T * F, precedence!)
  → 3 + F * F                 (T → F)
  → 3 + 4 * F                 (F → 4)
  → 3 + 4 * 5                 (F → 5)

The grammar structure enforces * before + :
  E handles +/- (lower precedence, higher in tree)
  T handles *// (higher precedence, lower in tree)`,
      explanation: 'Operator precedence is encoded in the grammar structure — lower-precedence operators appear higher in the grammar (and thus higher in the parse tree). This is a left-recursive grammar suitable for LR parsing.',
    },
    {
      title: 'Pumping Lemma Proof: {aⁿbⁿ} is not regular',
      language: 'text',
      code: `Prove L = {aⁿbⁿ | n ≥ 0} is not regular.

Proof by contradiction using the Pumping Lemma:

1. Assume L is regular with pumping length p.

2. Choose w = aᵖbᵖ ∈ L  (|w| = 2p ≥ p) ✓

3. By the PL, w = xyz where:
   - |xy| ≤ p  →  y consists only of a's
   - |y| > 0   →  y = aᵏ for some k ≥ 1

4. Pump with i = 0:  xy⁰z = xz = aᵖ⁻ᵏbᵖ
   Since k ≥ 1, we have p-k < p, 
   so the number of a's ≠ number of b's.
   Therefore xz ∉ L.  ✗

5. This contradicts the Pumping Lemma.
   Therefore L is NOT regular.  ∎

Key insight: Since |xy| ≤ p and w starts with p a's,
y can only contain a's. Pumping changes the count
of a's but not b's, breaking the aⁿbⁿ requirement.`,
      explanation: 'The pumping lemma is a proof by contradiction technique. The key is choosing the right string and showing that ALL possible splits (not just one) lead to a contradiction when pumped.',
    },
    {
      title: 'Eliminating Left Recursion for LL Parsing',
      language: 'text',
      code: `Problem: Left-recursive grammar can't be LL-parsed.

Original (left-recursive):
  E → E + T | T
  T → T * F | F
  F → ( E ) | id

Transformation rule:
  A → Aα | β
  becomes:
  A  → βA'
  A' → αA' | ε

Result (right-recursive, LL-parsable):
  E  → T E'
  E' → + T E' | ε
  T  → F T'
  T' → * F T' | ε
  F  → ( E ) | id

Recursive descent implementation:
  function E():  T(); E'()
  function E'(): if next == '+': match('+'); T(); E'()
  function T():  F(); T'()
  function T'(): if next == '*': match('*'); F(); T'()
  function F():  if next == '(': match('('); E(); match(')')
                 else: match(id)`,
      explanation: 'Left recursion elimination converts A → Aα | β into A → βA\', A\' → αA\' | ε. This preserves the language but changes the parse tree shape. Each non-terminal becomes a function in recursive descent parsing.',
    },
    {
      title: 'Closure Properties Summary',
      language: 'text',
      code: `Operation        | Regular | Context-Free | Decidable
-----------------+---------+--------------+----------
Union            |   ✓     |      ✓       |    ✓
Intersection     |   ✓     |      ✗       |    ✓
Complement       |   ✓     |      ✗       |    ✓
Concatenation    |   ✓     |      ✓       |    ✓
Kleene Star      |   ✓     |      ✓       |    ✓
Reversal         |   ✓     |      ✓       |    ✓
Homomorphism     |   ✓     |      ✓       |    —
Inverse Hom.     |   ✓     |      ✓       |    —

Key consequences:
• Regular langs: can freely combine with any operation
• CFLs: L1 ∩ L2 may not be context-free
  (but CFL ∩ Regular IS always context-free)
• CFLs: complement of a CFL may not be context-free
• These limitations explain why some language features
  can't be captured by CFGs alone`,
      explanation: 'Closure properties let you reason about language classes without building automata. The notable gaps for CFLs (no closure under intersection or complement) have practical implications for compiler design.',
    },
  ],
};
