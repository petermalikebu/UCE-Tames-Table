import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Filter, 
  BookOpen, 
  Zap, 
  Sun, 
  Moon, 
  Sunrise, 
  ShieldCheck, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudySlot, DayOfWeek, Subject } from '../types';
import { MASTER_STUDY_TIMETABLE, SUBJECTS, USER_PROFILE } from '../data/timetableData';
import { audioEngine } from '../utils/audio';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface WeeklyTimetableProps {
  currentDayName: DayOfWeek;
  activeSlotId?: string;
  onSelectSubjectForAI: (subjectCode: string, topic: string) => void;
  onOpenWhatsAppForSlot: (slot: StudySlot) => void;
  onViewSubjectDetail: (subject: Subject) => void;
}

export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({
  currentDayName,
  activeSlotId,
  onSelectSubjectForAI,
  onOpenWhatsAppForSlot,
  onViewSubjectDetail,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'ALL'>('ALL');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');

  // Track completed slots in local storage
  const [completedSlots, setCompletedSlots] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('chronos_completed_slots');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSlotCompleted = (slotId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const willBeCompleted = !completedSlots[slotId];
    const updated = { ...completedSlots, [slotId]: willBeCompleted };
    setCompletedSlots(updated);
    localStorage.setItem('chronos_completed_slots', JSON.stringify(updated));

    if (willBeCompleted) {
      audioEngine.playCompleteChime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b']
      });
    }
  };

  const resetTodayCompletions = () => {
    if (window.confirm('Reset all completed checkmarks for the current view?')) {
      setCompletedSlots({});
      localStorage.removeItem('chronos_completed_slots');
    }
  };

  // Filter slots
  const filteredSlots = MASTER_STUDY_TIMETABLE.filter(slot => {
    if (selectedDay !== 'ALL' && slot.day !== selectedDay) return false;
    if (selectedSubjectId !== 'ALL' && slot.subjectId !== selectedSubjectId && slot.subjectId !== 'all-6-subjects') return false;
    return true;
  });

  // Calculate daily stats
  const totalSlotsCount = MASTER_STUDY_TIMETABLE.length;
  const completedSlotsCount = Object.values(completedSlots).filter(Boolean).length;
  const progressPercent = Math.round((completedSlotsCount / totalSlotsCount) * 100);

  const getSlotIcon = (slotType: StudySlot['slotType']) => {
    switch (slotType) {
      case 'dawn_1':
      case 'dawn_2':
        return <Sunrise className="w-4 h-4 text-cyan-400" />;
      case 'morning':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'midday':
        return <Sun className="w-4 h-4 text-orange-400" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-rose-400" />;
      case 'evening':
        return <Moon className="w-4 h-4 text-purple-400" />;
      case 'sunday_synth':
      case 'sunday_eval':
        return <Zap className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Verification of 6-Subject Daily Balance */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Balanced Curriculum Guaranteed
              </span>
              <span className="text-xs text-slate-400 font-mono-tech hidden sm:inline">
                • 10.5 Study Hours/Day Mon-Sat
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-hud text-white mt-1.5 tracking-wide">
              MASTER 6-WEEK COMPREHENSIVE STUDY TIMETABLE
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Engineered specifically for <strong>Peter Malikebu Jr</strong> (UCE/1/143/26). Every weekday and Saturday thoroughly covers 
              <span className="text-cyan-300 font-semibold"> all 6 subjects every single day</span> to maximize active recall and cognitive retention before final exams.
            </p>
          </div>

          {/* Progress ring card */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-inner">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-mono-tech uppercase">Sessions Done</div>
              <div className="text-lg font-bold font-mono-tech text-cyan-300">
                {completedSlotsCount} <span className="text-xs text-slate-500">/ {totalSlotsCount}</span>
              </div>
            </div>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute text-[11px] font-bold font-mono-tech text-white">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Day Selector Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Day Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedDay('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedDay === 'ALL'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            All Days Grid
          </button>
          {DAYS.map(day => {
            const isToday = currentDayName === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedDay === day
                    ? 'bg-cyan-600 text-white font-bold shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {day}
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Today" />
                )}
              </button>
            );
          })}
        </div>

        {/* Subject Filter & Reset Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="bg-transparent text-slate-200 outline-none text-xs cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-slate-200">All 6 Subjects</option>
              {SUBJECTS.map(subj => (
                <option key={subj.id} value={subj.id} className="bg-slate-900 text-slate-200">
                  {subj.code} - {subj.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={resetTodayCompletions}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title="Reset checkmarks"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Timetable Grid View */}
      {selectedDay === 'ALL' ? (
        // Multi-Day Columns Layout
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {DAYS.map(day => {
            const isToday = currentDayName === day;
            const daySlots = MASTER_STUDY_TIMETABLE.filter(s => s.day === day);

            return (
              <div
                key={day}
                className={`flex flex-col rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Day Header */}
                <div className={`px-4 py-3 rounded-t-2xl border-b flex items-center justify-between ${
                  isToday ? 'bg-cyan-950/40 border-cyan-500/30' : 'bg-slate-950/50 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-hud font-bold text-base text-white tracking-wide">
                      {day.toUpperCase()}
                    </h3>
                    {isToday && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono-tech font-bold uppercase">
                        TODAY
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono-tech text-slate-400">
                    {day === 'Sunday' ? '4.0h Study + Church' : '6 Subjects • 10.5h'}
                  </span>
                </div>

                {/* Day Slot Items */}
                <div className="p-3 space-y-2.5 flex-1">
                  {daySlots.map(slot => {
                    const isDone = !!completedSlots[slot.id];
                    const matchedSubject = SUBJECTS.find(s => s.id === slot.subjectId);

                    return (
                      <div
                        key={slot.id}
                        className={`group relative rounded-xl border p-3 transition-all ${
                          isDone
                            ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/70'
                        }`}
                      >
                        {/* Time & Slot Type Tag */}
                        <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                          <div className="flex items-center gap-1.5 font-mono-tech text-cyan-300 font-semibold">
                            {getSlotIcon(slot.slotType)}
                            <span>{slot.startTime} - {slot.endTime}</span>
                            <span className="text-[10px] text-slate-500">({slot.durationMinutes}m)</span>
                          </div>

                          <button
                            onClick={e => toggleSlotCompleted(slot.id, e)}
                            className={`p-1 rounded-md transition ${
                              isDone
                                ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-950/60'
                                : 'text-slate-500 hover:text-cyan-300 hover:bg-slate-800'
                            }`}
                            title={isDone ? 'Mark as incomplete' : 'Mark session as completed'}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isDone ? 'fill-emerald-500/20' : ''}`} />
                          </button>
                        </div>

                        {/* Subject Header */}
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                            matchedSubject ? matchedSubject.accentBorder : 'border-slate-700'
                          } ${isDone ? 'text-slate-400' : 'text-white'}`}>
                            {slot.subjectCode}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate text-right">
                            {slot.subjectName}
                          </span>
                        </div>

                        {/* Focus Topic */}
                        <p className={`text-xs mt-2 line-clamp-2 ${isDone ? 'line-through text-slate-500' : 'text-slate-300 font-medium'}`}>
                          {slot.focusArea}
                        </p>

                        {/* Quick action buttons */}
                        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                          <button
                            onClick={() => onSelectSubjectForAI(slot.subjectCode, slot.focusArea)}
                            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium transition"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>AI Breakdown</span>
                          </button>

                          <button
                            onClick={() => onOpenWhatsAppForSlot(slot)}
                            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
                            title="Send WhatsApp instant reminder for this slot"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Single Day Detailed View
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
            <div>
              <h3 className="font-hud text-xl font-bold text-white tracking-wide">
                {selectedDay.toUpperCase()} DETAILED SCHEDULE
              </h3>
              <p className="text-xs text-slate-400">
                {selectedDay === 'Sunday'
                  ? 'Dedicated synthesis and weekly planning day (free during day for church fellowship).'
                  : 'All 6 subjects distributed across dawn, morning, midday, afternoon, and night slots.'}
              </p>
            </div>
            <span className="text-xs font-mono-tech px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              {filteredSlots.length} Study Sessions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSlots.map(slot => {
              const isDone = !!completedSlots[slot.id];
              const matchedSubject = SUBJECTS.find(s => s.id === slot.subjectId);

              return (
                <div
                  key={slot.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isDone
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-slate-800 text-cyan-400">
                        {getSlotIcon(slot.slotType)}
                      </span>
                      <div>
                        <div className="text-xs font-mono-tech font-bold text-cyan-300">
                          {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase">
                          {slot.slotLabel} ({slot.durationMinutes} mins)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={e => toggleSlotCompleted(slot.id, e)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        isDone
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Completed' : 'Check Off'}</span>
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold font-mono-tech text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {slot.subjectCode}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-200">
                        {slot.subjectName}
                      </h4>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 mt-2">
                      <div className="text-[11px] font-mono-tech uppercase text-cyan-400/80 mb-0.5">
                        Target Focus Area:
                      </div>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed">
                        {slot.focusArea}
                      </p>
                    </div>

                    {slot.notes && (
                      <p className="text-xs text-slate-400 mt-2 italic">
                        💡 {slot.notes}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    {matchedSubject && (
                      <button
                        onClick={() => onViewSubjectDetail(matchedSubject)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus Notes</span>
                      </button>
                    )}

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectSubjectForAI(slot.subjectCode, slot.focusArea)}
                        className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Tutor</span>
                      </button>

                      <button
                        onClick={() => onOpenWhatsAppForSlot(slot)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp Alert</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
