import React, { useState } from 'react';
import { 
  Calendar, 
  Target, 
  Building2, 
  Sparkles, 
  Timer, 
  Printer, 
  Bell, 
  Flame, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  Share2,
  Smartphone,
  Info
} from 'lucide-react';
import { HeaderHUD } from './components/HeaderHUD';
import { WeeklyTimetable } from './components/WeeklyTimetable';
import { ClassTimetable } from './components/ClassTimetable';
import { SixWeekRoadmap } from './components/SixWeekRoadmap';
import { AITutorPanel } from './components/AITutorPanel';
import { ReminderModal } from './components/ReminderModal';
import { WallPosterPrint } from './components/WallPosterPrint';
import { PomodoroTimer } from './components/PomodoroTimer';
import { SubjectDetailModal } from './components/SubjectDetailModal';
import { useStudyAlarm } from './hooks/useStudyAlarm';
import { Subject, StudySlot, DayOfWeek } from './types';
import { SUBJECTS, USER_PROFILE } from './data/timetableData';

const DAY_NAMES: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'roadmap' | 'class' | 'ai' | 'timer' | 'poster'>('study');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState<Subject | null>(null);

  // AI prefilled context
  const [aiSubjectCode, setAiSubjectCode] = useState<string>('EDF 522');
  const [aiTopic, setAiTopic] = useState<string>('');

  const {
    currentTime,
    activeSession,
    nextSession,
    is10MinWarning,
    settings,
    updateSettings,
    requestNotificationPermission,
    getWhatsAppReminderUrl,
    getEmailReminderUrl,
  } = useStudyAlarm();

  const currentDayName = DAY_NAMES[currentTime.getDay()];

  const handleSelectSubjectForAI = (subjectCode: string, topic: string) => {
    setAiSubjectCode(subjectCode);
    setAiTopic(topic);
    setActiveTab('ai');
  };

  const handleOpenWhatsAppForSlot = (slot: StudySlot) => {
    const phone = USER_PROFILE.whatsappPhone.replace(/[^0-9]/g, '');
    const text = `🔔 *CHRONOS STUDY ALERT - Peter Malikebu (UCE/1/143/26)*\n` +
      `📖 *Subject*: ${slot.subjectCode} - ${slot.subjectName}\n` +
      `⏰ *Time*: ${slot.startTime} - ${slot.endTime} (${slot.durationMinutes}m)\n` +
      `🎯 *Focus Area*: ${slot.focusArea}\n` +
      `💡 *Notes*: ${slot.notes || 'Core concepts revision'}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 cyber-grid-bg flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Futuristic HUD */}
      <HeaderHUD
        currentTime={currentTime}
        activeSession={activeSession}
        nextSession={nextSession}
        is10MinWarning={is10MinWarning}
        onOpenReminders={() => setIsReminderModalOpen(true)}
        onOpenPrintPoster={() => setActiveTab('poster')}
        onOpenAITutor={() => setActiveTab('ai')}
        soundEnabled={settings.soundAlertsEnabled}
        onToggleSound={() => updateSettings({ soundAlertsEnabled: !settings.soundAlertsEnabled })}
        whatsAppUrl={getWhatsAppReminderUrl()}
        emailUrl={getEmailReminderUrl()}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs (Hidden in Print View) */}
        {activeTab !== 'poster' && (
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'study'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Weekly Master Timetable</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'roadmap'
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>6-Week Exam Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('class')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'class'
                  ? 'bg-indigo-600 text-white font-bold shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Class Schedule (UCE/1/143/26)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>AI Exam Tutor</span>
            </button>

            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'timer'
                  ? 'bg-amber-600 text-white font-bold shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Sprint Focus Timer</span>
            </button>

            <button
              onClick={() => setActiveTab('poster')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 ml-auto transition"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Wall Poster (Print/PDF)</span>
            </button>
          </nav>
        )}

        {/* Tab Content Display */}
        {activeTab === 'study' && (
          <WeeklyTimetable
            currentDayName={currentDayName}
            onSelectSubjectForAI={handleSelectSubjectForAI}
            onOpenWhatsAppForSlot={handleOpenWhatsAppForSlot}
            onViewSubjectDetail={subject => setSelectedSubjectDetail(subject)}
          />
        )}

        {activeTab === 'roadmap' && (
          <SixWeekRoadmap
            onSelectTopicForAI={handleSelectSubjectForAI}
          />
        )}

        {activeTab === 'class' && (
          <ClassTimetable />
        )}

        {activeTab === 'ai' && (
          <AITutorPanel
            initialSubjectCode={aiSubjectCode}
            initialTopic={aiTopic}
          />
        )}

        {activeTab === 'timer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PomodoroTimer />
            </div>

            {/* Quick Study Rules Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h4 className="font-hud text-base font-bold text-white">
                  HIGH-INTENSITY STUDY RULES
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <strong className="text-cyan-300 block mb-0.5">02:30 AM Dawn Deep Focus:</strong>
                  The brain has maximum synaptic plasticity and zero social distractions. Dedicate to tough conceptual theory (Tyler models, Posner conceptual change, Piaget).
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <strong className="text-amber-300 block mb-0.5">Active Recall & Calculation:</strong>
                  Do NOT passively re-read. Solve Item Difficulty (p) and Item Discrimination (D) formulas on blank paper from memory.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <strong className="text-emerald-300 block mb-0.5">20:00 PM Night Consolidation:</strong>
                  Review flashcards right before sleep to initiate memory consolidation during slow-wave sleep.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'poster' && (
          <WallPosterPrint onBack={() => setActiveTab('study')} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#06080d] py-6 px-4 text-center text-xs text-slate-400 font-mono-tech no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            ChronosStudy v6.0 • University Certificate in Education (UCE) Master System
          </div>
          <div className="text-slate-300">
            Engineered for <span className="text-cyan-300 font-bold">{USER_PROFILE.name}</span> ({USER_PROFILE.regNumber})
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WhatsApp: +265 986 272 736</span>
          </div>
        </div>
      </footer>

      {/* Reminder Configuration Modal */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onRequestPermission={requestNotificationPermission}
        whatsAppUrl={getWhatsAppReminderUrl()}
        emailUrl={getEmailReminderUrl()}
      />

      {/* Subject Detail Modal */}
      <SubjectDetailModal
        subject={selectedSubjectDetail}
        onClose={() => setSelectedSubjectDetail(null)}
        onOpenAI={handleSelectSubjectForAI}
      />
    </div>
  );
}
