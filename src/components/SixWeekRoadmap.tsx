import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  HelpCircle, 
  Sparkles, 
  Target, 
  BookOpen, 
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SIX_WEEK_CURRICULUM, SUBJECTS } from '../data/timetableData';
import { audioEngine } from '../utils/audio';

interface SixWeekRoadmapProps {
  onSelectTopicForAI: (subjectCode: string, topic: string) => void;
}

export const SixWeekRoadmap: React.FC<SixWeekRoadmapProps> = ({ onSelectTopicForAI }) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Completed roadmap items saved to local storage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('chronos_roadmap_completed');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleTopicCheck = (topicKey: string) => {
    const nextState = !completedTopics[topicKey];
    const updated = { ...completedTopics, [topicKey]: nextState };
    setCompletedTopics(updated);
    localStorage.setItem('chronos_roadmap_completed', JSON.stringify(updated));

    if (nextState) {
      audioEngine.playCompleteChime();
    }
  };

  const currentWeekData = SIX_WEEK_CURRICULUM.find(w => w.weekNumber === activeWeek) || SIX_WEEK_CURRICULUM[0];

  // Calculate overall completion percent
  let totalTopics = 0;
  let completedCount = 0;
  SIX_WEEK_CURRICULUM.forEach(w => {
    Object.entries(w.subjects).forEach(([sId, sData]) => {
      sData.topics.forEach((t, idx) => {
        totalTopics++;
        if (completedTopics[`w${w.weekNumber}-${sId}-${idx}`]) {
          completedCount++;
        }
      });
    });
  });
  const overallRoadmapProgress = Math.round((completedCount / (totalTopics || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-purple-400" />
                6-Week Master Syllabus
              </span>
              <span className="text-xs text-slate-400 font-mono-tech">
                42-Day Curriculum Roadmap
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-hud text-white mt-1.5 tracking-wide">
              6-WEEK STRATEGIC MASTERY ROADMAP
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Phased syllabus breakdown across all 6 courses: Foundations → Deep Core Models → Critical Analysis → Past Papers → Mock Exams → Final High-Yield Drills.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 flex items-center gap-3">
            <div>
              <div className="text-[10px] uppercase font-mono-tech text-slate-400">Total Syllabus Covered</div>
              <div className="text-lg font-bold font-mono-tech text-purple-300">
                {completedCount} <span className="text-xs text-slate-500">/ {totalTopics} topics</span>
              </div>
            </div>
            <div className="w-14 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${overallRoadmapProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-cyan-300">{overallRoadmapProgress}%</span>
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SIX_WEEK_CURRICULUM.map(week => {
          const isSelected = week.weekNumber === activeWeek;
          return (
            <button
              key={week.weekNumber}
              onClick={() => setActiveWeek(week.weekNumber)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg ring-1 ring-purple-500/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-cyan-400">
                  WEEK {week.weekNumber}
                </span>
                <span className="text-[10px] text-slate-400">7 Days</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                {week.title}
              </div>
              <div className="text-[10px] text-purple-300/80 mt-0.5 line-clamp-1">
                {week.phase.split(':')[1] || week.phase}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Week Deliverables & Objectives */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono-tech text-purple-400 uppercase font-semibold">
              {currentWeekData.phase}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white font-hud mt-0.5">
              Week {currentWeekData.weekNumber}: {currentWeekData.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Focus Theme: <strong>{currentWeekData.theme}</strong>
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 max-w-md">
            <div className="text-[10px] font-mono-tech text-cyan-400 uppercase font-bold flex items-center gap-1 mb-1">
              <Award className="w-3.5 h-3.5" />
              Target Deliverables for Week {currentWeekData.weekNumber}:
            </div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              {currentWeekData.targetDeliverables.map((item, idx) => (
                <li key={idx} className="line-clamp-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6 Subjects Topic Breakdown for this week */}
        <div className="space-y-3">
          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
            SUBJECT TOPICS & ESSAY PROMPTS (WEEK {currentWeekData.weekNumber})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBJECTS.map(subject => {
              const weekSubjectData = currentWeekData.subjects[subject.id];
              if (!weekSubjectData) return null;

              const isExpanded = expandedSubject === subject.id || expandedSubject === null;

              return (
                <div
                  key={subject.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-mono-tech px-2 py-0.5 rounded border ${subject.accentBorder} text-white`}>
                        {subject.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {subject.name}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectTopicForAI(subject.code, weekSubjectData.topics.join('; '))}
                      className="px-2 py-1 rounded bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 text-[11px] font-medium flex items-center gap-1 transition"
                      title="Generate AI study notes for this week's topics"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>AI Notes</span>
                    </button>
                  </div>

                  {/* Topics List with Checkboxes */}
                  <div className="space-y-1.5 mt-3">
                    <div className="text-[10px] font-mono-tech uppercase text-slate-400">
                      Target Topics to Complete:
                    </div>
                    {weekSubjectData.topics.map((topic, tIdx) => {
                      const topicKey = `w${currentWeekData.weekNumber}-${subject.id}-${tIdx}`;
                      const isDone = !!completedTopics[topicKey];

                      return (
                        <div
                          key={tIdx}
                          onClick={() => toggleTopicCheck(topicKey)}
                          className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition ${
                            isDone ? 'bg-emerald-950/20 text-slate-400' : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <button
                            className="mt-0.5 text-slate-400 hover:text-emerald-400 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicCheck(topicKey);
                            }}
                          >
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                          <span className={`text-xs flex-1 ${isDone ? 'line-through text-slate-500' : 'font-medium'}`}>
                            {topic}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Key Exam Questions */}
                  {weekSubjectData.keyQuestions && weekSubjectData.keyQuestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                      <div className="text-[10px] font-mono-tech uppercase text-amber-400/90 flex items-center gap-1 mb-1">
                        <HelpCircle className="w-3 h-3" />
                        Key Exam Questions:
                      </div>
                      <ul className="text-[11px] text-slate-300 space-y-1">
                        {weekSubjectData.keyQuestions.map((q, qIdx) => (
                          <li key={qIdx} className="italic text-slate-300">
                            • "{q}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
