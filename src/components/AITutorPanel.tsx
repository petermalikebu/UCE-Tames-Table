import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  Copy, 
  Check, 
  Loader2, 
  RefreshCw,
  BookmarkPlus
} from 'lucide-react';
import { SUBJECTS } from '../data/timetableData';

interface AITutorPanelProps {
  initialSubjectCode?: string;
  initialTopic?: string;
  onClose?: () => void;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  initialSubjectCode,
  initialTopic,
  onClose,
}) => {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(
    initialSubjectCode || 'EDF 522'
  );
  const [promptMode, setPromptMode] = useState<'summary' | 'exam_questions' | 'mnemonics' | 'custom'>('summary');
  const [customQuestion, setCustomQuestion] = useState<string>(initialTopic || '');
  const [responseContent, setResponseContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialSubjectCode) {
      setSelectedSubjectCode(initialSubjectCode);
    }
    if (initialTopic) {
      setCustomQuestion(initialTopic);
    }
  }, [initialSubjectCode, initialTopic]);

  const selectedSubject = SUBJECTS.find(s => s.code.startsWith(selectedSubjectCode)) || SUBJECTS[0];

  const handleGenerate = async (overridePrompt?: string) => {
    setIsLoading(true);
    setResponseContent('');

    const query = overridePrompt || customQuestion;

    try {
      const res = await fetch('/api/generate-ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: selectedSubject.code,
          subjectName: selectedSubject.name,
          mode: promptMode,
          topicOrQuestion: query,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResponseContent(data.markdown || data.content || 'No content received.');
    } catch (err) {
      console.warn('Backend API error, loading offline high-yield knowledge:', err);
      // Fallback offline curated answer for resilience
      setResponseContent(getOfflineCuratedContent(selectedSubject.code, query, promptMode));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!responseContent) return;
    navigator.clipboard.writeText(responseContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const QUICK_QUESTIONS: Record<string, string[]> = {
    'EDF 522': [
      "Compare Tyler's linear rationale with Wheeler's cyclic curriculum model.",
      "Explain Hilda Taba's grassroots inductive model of curriculum design.",
      "How does Stufflebeam's CIPP model guide curriculum evaluation?",
      "Analyze barriers to curriculum innovation in Malawian secondary education."
    ],
    'EDF 521': [
      "How to calculate Item Difficulty (p) and Item Discrimination (D) index?",
      "Explain the distinction between Content Validity and Construct Validity.",
      "What factors affect test reliability coefficients? Explain Spearman-Brown.",
      "How do Z-scores and T-scores normalize marks on a standard bell curve?"
    ],
    'SCE 502': [
      "Explain the 4 conditions for Conceptual Change according to Posner.",
      "How to implement the 5E instructional model in secondary chemistry/physics?",
      "Discuss the empirical and tentative nature of science (NOS).",
      "Strategies for integrating Indigenous Knowledge Systems (IKS) in science."
    ],
    'EDF 532': [
      "Contrast Plato's Idealism with John Dewey's Pragmatism on school curricula.",
      "Explain Paulo Freire's critique of the 'Banking Concept' of education.",
      "How does Julius Nyerere's 'Education for Self-Reliance' foster independence?",
      "Discuss the role of Metaphysics and Epistemology in formulating educational aims."
    ],
    'EDF 512': [
      "Compare Piaget's cognitive stages with Vygotsky's Zone of Proximal Development.",
      "How does Erikson's Identity vs Role Confusion stage manifest in secondary learners?",
      "Apply Cognitive Load Theory to design effective classroom science instruction.",
      "Explain Weiner's Attribution Theory and its impact on student motivation."
    ],
    'SCE 501': [
      "Step-by-step emergency first aid protocol for concentrated acid spills on skin and eyes.",
      "How to safely store incompatible laboratory chemicals according to GHS standards?",
      "Calculate mass required to make 500 mL of 0.25 M standard NaOH solution.",
      "How to manage laboratory equipment inventory, stock ledgers, and bin cards?"
    ]
  };

  const currentQuestions = QUICK_QUESTIONS[selectedSubject.code] || QUICK_QUESTIONS['EDF 522'];

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-hud text-lg font-bold text-white tracking-wide flex items-center gap-2">
              AI EXAM REVISION & TOPIC COMPANION
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300">
                GPT / GEMINI 2.5
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Interactive high-yield study notes, model answers, calculation walkthroughs & memory mnemonics.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800"
          >
            Close
          </button>
        )}
      </div>

      {/* Select Subject & Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Selector */}
        <div>
          <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1.5">
            Select Course:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SUBJECTS.map(subj => {
              const isSelected = selectedSubjectCode === subj.code;
              return (
                <button
                  key={subj.code}
                  onClick={() => setSelectedSubjectCode(subj.code)}
                  className={`px-2.5 py-2 rounded-xl text-left border transition ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono-tech font-bold text-xs text-cyan-300">
                    {subj.code}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {subj.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1.5">
            Revision Output Mode:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'summary', label: 'High-Yield Topic Summary', icon: BookOpen },
              { id: 'exam_questions', label: 'Predicted Exam Q&A', icon: HelpCircle },
              { id: 'mnemonics', label: 'Memory Mnemonics & Hacks', icon: Lightbulb },
              { id: 'custom', label: 'Ask Custom Question', icon: Sparkles },
            ].map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setPromptMode(m.id as typeof promptMode)}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-medium text-left transition ${
                    promptMode === m.id
                      ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Click High-Yield Prompts */}
      <div>
        <div className="text-[11px] font-mono-tech text-slate-400 uppercase mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          High-Frequency Exam Prompts for {selectedSubject.code}:
        </div>
        <div className="flex flex-wrap gap-2">
          {currentQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomQuestion(q);
                handleGenerate(q);
              }}
              className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 transition"
            >
              ⚡ "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Input query field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customQuestion}
          onChange={e => setCustomQuestion(e.target.value)}
          placeholder={`Ask anything about ${selectedSubject.code} (${selectedSubject.name})...`}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          onKeyDown={e => {
            if (e.key === 'Enter') handleGenerate();
          }}
        />
        <button
          onClick={() => handleGenerate()}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {/* Response Box */}
      {responseContent && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono-tech text-cyan-400 font-bold uppercase">
              AI Study Output • {selectedSubject.code}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed space-y-3 overflow-y-auto max-h-[420px] pr-2">
            {responseContent.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ') || paragraph.startsWith('## ') || paragraph.startsWith('# ')) {
                return (
                  <h4 key={pIdx} className="text-sm font-bold text-cyan-300 font-mono-tech pt-2 border-b border-slate-800 pb-1">
                    {paragraph.replace(/^#+\s/, '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={pIdx} className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                    {items.map((it, itIdx) => (
                      <li key={itIdx}>{it.replace(/^[-*]\s/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={pIdx} className="text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Fallback high-yield academic knowledge generator if offline
function getOfflineCuratedContent(subjectCode: string, query: string, mode: string): string {
  if (subjectCode.includes('522')) {
    return `### High-Yield Exam Guide: EDF 522 Curriculum Theory

1. Core Foundations of Curriculum:
- Philosophical Foundation: Determines the aims, values, and ontological nature of what knowledge is worth teaching (e.g. Essentialism vs Progressivism).
- Sociological Foundation: Ensures the curriculum responds to society's cultural preservation, economic workforce needs, and social justice.
- Psychological Foundation: Provides understanding of learner developmental readiness, cognitive stages (Piaget), and motivational psychology (Vygotsky, Bandura).

2. Tyler's Classical Rationale (1949):
- 4 Fundamental Questions: (1) What educational purposes should the school seek to attain? (2) What educational experiences can be provided to attain them? (3) How can these experiences be effectively organized? (4) How can we determine whether purposes are attained?
- Criticisms: Linear, overly mechanistic, treats curriculum as a technical production line rather than a dynamic cultural process.

3. Wheeler's Cyclic Model (1967):
- Solves Tyler's linear flaw by making evaluation feed back into aims/goals in a continuous 5-step loop: Aims/Goals -> Learning Experiences -> Content Selection -> Organization -> Evaluation -> back to Aims.

4. Stufflebeam's CIPP Evaluation:
- Context Evaluation: Identifies needs, problems, and educational targets.
- Input Evaluation: Assesses available resources, staff, textbooks, and budget.
- Process Evaluation: Monitors day-to-day classroom delivery and implementation hurdles.
- Product Evaluation: Measures outcomes and determines whether to continue, modify, or terminate the curriculum.`;
  }

  if (subjectCode.includes('521')) {
    return `### High-Yield Exam Guide: EDF 521 Testing and Measurements

1. Key Item Analysis Formulas:
- Item Difficulty Index (p):
  Formula: p = R / T
  Where R = number of correct answers, T = total candidates.
  Interpretation:
  - p > 0.70: Easy item
  - 0.30 <= p <= 0.70: Ideal moderate difficulty (optimal test discrimination)
  - p < 0.30: Difficult item

- Item Discrimination Index (D):
  Formula: D = (RU - RL) / (N / 2)
  Where RU = correct answers in Upper 27% group, RL = correct answers in Lower 27% group, N = total candidates in both groups combined.
  Interpretation:
  - D >= 0.40: Very good item
  - 0.30 <= D <= 0.39: Good item (little or no revision)
  - 0.20 <= D <= 0.29: Marginal item (needs revision)
  - D < 0.20: Defective item (discard or rewrite distractors)
  - Negative D: Severe defect (high performers got it wrong due to ambiguity).

2. Reliability vs. Validity:
- Reliability: Consistency and reproducibility of scores across administrations.
  - Types: Test-Retest (stability), Split-Half with Spearman-Brown prophecy formula, Cronbach's Alpha (internal consistency).
- Validity: Extent to which an instrument measures what it purports to measure.
  - Content Validity: Alignment with Table of Specifications and syllabus.
  - Criterion Validity: Predictive (predicts future exam success) and Concurrent.
  - Construct Validity: Conformance to psychological theoretical constructs.`;
  }

  if (subjectCode.includes('502')) {
    return `### High-Yield Exam Guide: SCE 502 Introduction to Science Education

1. Tenets of the Nature of Science (NOS):
- Empirical: Based on observation and experimentation.
- Tentative: Scientific knowledge is durable yet subject to revision in light of new evidence.
- Creative & Inferential: Involves human imagination and inference, not just mechanical data collection.
- Subjective / Theory-Laden: Influenced by theoretical frameworks and prior knowledge.
- Socio-Cultural Embeddedness: Practiced within cultural, ethical, and political contexts.

2. Posner's Conceptual Change Model:
To replace a persistent alternative conception (misconception), 4 conditions must be satisfied:
1. Dissatisfaction with existing conception (cognitive dissonance).
2. Intelligibility of the new scientific concept (must make logical sense).
3. Plausibility (must appear credible and compatible with reality).
4. Fruitfulness (must solve problems and lead to new insights).

3. The 5E Inquiry Cycle:
- Engage: Elicit prior ideas and hook curiosity.
- Explore: Hands-on investigations and data gathering.
- Explain: Introduce scientific vocabulary and student-led reasoning.
- Elaborate: Apply concepts to new scenarios and local contexts.
- Evaluate: Formative and summative assessment of conceptual growth.`;
  }

  if (subjectCode.includes('532')) {
    return `### High-Yield Exam Guide: EDF 532 Philosophy of Education

1. Classical Schools of Thought:
- Idealism (Plato): Ultimate reality is spiritual and mental (ideas/forms). Education aims to develop moral character and intellect through dialectic questioning.
- Realism (Aristotle): Ultimate reality is physical and objective matter governed by natural laws. Education aims to master empirical facts and physical sciences.
- Pragmatism (John Dewey): Truth is what works in practical human experience ("Instrumentalism"). Education is life itself, not preparation for life; champions democratic, experiential inquiry.

2. African Philosophy of Education:
- Ubuntu/Unhu: "Umuntu ngumuntu ngabantu" (A person is a person through other persons). Prioritizes community cohesion, solidarity, communal responsibility, and moral virtue.
- Julius Nyerere's "Education for Self-Reliance" (1967):
  - Critiqued colonial schooling for fostering intellectual elitism and alienation from manual labor.
  - Advocated integrating academic learning with productive agricultural labor to serve rural communities.`;
  }

  if (subjectCode.includes('512')) {
    return `### High-Yield Exam Guide: EDF 512 Educational Psychology

1. Cognitive Development:
- Piaget: Sensorimotor (0-2y), Preoperational (2-7y), Concrete Operational (7-11y), Formal Operational (11y+). Learning through assimilation, accommodation, and equilibration.
- Vygotsky: Sociocultural theory. Zone of Proximal Development (ZPD) - gap between what a learner can do independently and with expert guidance (Scaffolding).

2. Learning Theories:
- Classical Conditioning (Pavlov): Stimulus substitution (UCS -> UCR; CS -> CR). Explains emotional conditioned responses like school/test phobia.
- Operant Conditioning (Skinner): Behavior shaped by consequences (Positive/Negative Reinforcement increases behavior; Punishment decreases behavior).
- Social Cognitive Theory (Bandura): Modeling, vicarious reinforcement, and Self-Efficacy (mastery experiences, vicarious experiences, social persuasion, physiological state).

3. Motivation:
- Weiner's Attribution Theory: Success/failure attributed to Locus of Control (internal vs external), Stability (stable vs unstable), and Controllability. Promoting effort attributions fosters growth mindsets.`;
  }

  return `### High-Yield Exam Guide: SCE 501 Laboratory Practice & Management

1. GHS Hazard Pictograms & Storage:
- Segregate acids from bases, and oxidizers from flammable organic solvents.
- Never store nitric acid with organic acids (acetic acid).
- Store alkali metals (Sodium, Potassium) under liquid paraffin/kerosene.

2. Chemical Burn First Aid:
- Acid / Alkali Skin Splash: Flush immediately under gentle running tap water for at least 15-20 minutes. Remove contaminated clothing. Do NOT attempt neutralization with opposing strong reagents.
- Eye Splash: Hold eyelids open and flush at eyewash station for minimum 15 minutes. Seek emergency medical attention immediately.

3. Solution Preparation Calculations:
- Molarity = (Moles of Solute) / (Volume of Solution in Liters)
- Dilution equation: M1 * V1 = M2 * V2.`;
}
