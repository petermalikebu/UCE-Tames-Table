import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flame, 
  Volume2, 
  VolumeX, 
  Bell, 
  Download, 
  Share2, 
  Sparkles,
  Smartphone,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { USER_PROFILE } from '../data/timetableData';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { audioEngine } from '../utils/audio';
import { SessionMatch } from '../hooks/useStudyAlarm';

interface HeaderHUDProps {
  currentTime: Date;
  activeSession: SessionMatch | null;
  nextSession: SessionMatch | null;
  is10MinWarning: boolean;
  onOpenReminders: () => void;
  onOpenPrintPoster: () => void;
  onOpenAITutor: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  whatsAppUrl: string;
  emailUrl: string;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentTime,
  activeSession,
  nextSession,
  is10MinWarning,
  onOpenReminders,
  onOpenPrintPoster,
  onOpenAITutor,
  soundEnabled,
  onToggleSound,
  whatsAppUrl,
  emailUrl,
}) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // 6-Week Exam Target Countdown calculation
  const [countdown, setCountdown] = useState({
    days: 42,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalProgressPercent: 0,
  });

  useEffect(() => {
    const target = new Date(USER_PROFILE.examTargetDate).getTime();
    const now = currentTime.getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const totalDuration = 42 * 24 * 60 * 60 * 1000;
    const elapsed = totalDuration - diff;
    const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    setCountdown({
      days,
      hours,
      minutes,
      seconds,
      totalProgressPercent: Math.round(progress),
    });
  }, [currentTime]);

  const testChime = () => {
    audioEngine.playWarningChime();
  };

  return (
    <header className="relative w-full border-b border-cyan-500/20 bg-[#090d16]/90 backdrop-blur-xl z-30 transition-all">
      {/* 10-Minute Warning Alert Ribbon */}
      {is10MinWarning && nextSession && (
        <div className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white px-4 py-2 text-xs md:text-sm font-semibold flex flex-wrap items-center justify-between gap-2 animate-pulse shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-200 animate-bounce" />
            <span>
              ⚡ <strong>10-MINUTE ALERT:</strong> {nextSession.code} ({nextSession.title}) starts at{' '}
              <span className="font-mono underline">{nextSession.startTime}</span>! Venue/Focus: {nextSession.venueOrFocus}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 rounded text-xs text-white font-medium flex items-center gap-1 transition"
            >
              <span>WhatsApp Alert</span>
            </a>
            <a
              href={emailUrl}
              className="px-2.5 py-1 bg-blue-700 hover:bg-blue-600 rounded text-xs text-white font-medium flex items-center gap-1 transition"
            >
              <span>Email Notice</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Student Credentials */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 shadow-inner group">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm group-hover:bg-cyan-400/20 transition" />
              <GraduationCap className="w-6 h-6 text-cyan-400 relative z-10" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-[#090d16] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold font-hud tracking-wider bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 bg-clip-text text-transparent">
                  CHRONOS•STUDY
                </h1>
                <span className="text-[10px] uppercase font-mono-tech px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  v6.0 UCE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-tech">
                <span className="text-slate-200 font-semibold">{USER_PROFILE.name}</span>
                <span className="text-cyan-500/60">•</span>
                <span className="text-cyan-300 font-medium">{USER_PROFILE.regNumber}</span>
              </div>
            </div>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={onOpenAITutor}
              className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600/30"
              title="AI Exam Companion"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenReminders}
              className="p-2 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30 relative"
              title="Alerts & Reminders"
            >
              <Bell className="w-4 h-4" />
              {is10MinWarning && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
            </button>
          </div>
        </div>

        {/* Center: Live Digital Clock & Target Countdown */}
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 shadow-inner w-full lg:w-auto">
          {/* Live Clock */}
          <div className="flex items-center gap-2 font-mono-tech border-r border-slate-700/60 pr-4">
            <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
            <div className="text-sm md:text-base font-bold text-slate-100">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <span className="text-[10px] text-slate-400 font-medium uppercase">
              {currentTime.toLocaleDateString([], { weekday: 'short' })}
            </span>
          </div>

          {/* 6-Week Target Countdown Gauge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono-tech">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500/30" />
              <span className="font-semibold uppercase text-slate-400 text-[11px]">Final Exam In:</span>
            </div>

            <div className="flex items-center gap-1 font-mono-tech text-xs md:text-sm">
              <div className="flex flex-col items-center bg-[#07090e] px-1.5 py-0.5 rounded border border-amber-500/30 min-w-[28px]">
                <span className="font-bold text-amber-300">{countdown.days}</span>
                <span className="text-[8px] text-slate-400 -mt-1">DAYS</span>
              </div>
              <span className="text-amber-500">:</span>
              <div className="flex flex-col items-center bg-[#07090e] px-1.5 py-0.5 rounded border border-amber-500/30 min-w-[28px]">
                <span className="font-bold text-amber-300">{countdown.hours}</span>
                <span className="text-[8px] text-slate-400 -mt-1">HRS</span>
              </div>
              <span className="text-amber-500">:</span>
              <div className="flex flex-col items-center bg-[#07090e] px-1.5 py-0.5 rounded border border-amber-500/30 min-w-[28px]">
                <span className="font-bold text-amber-300">{countdown.minutes}</span>
                <span className="text-[8px] text-slate-400 -mt-1">MIN</span>
              </div>
              <span className="text-amber-500">:</span>
              <div className="flex flex-col items-center bg-[#07090e] px-1.5 py-0.5 rounded border border-amber-500/30 min-w-[28px]">
                <span className="font-bold text-amber-300">{countdown.seconds}</span>
                <span className="text-[8px] text-slate-400 -mt-1">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sound, Reminders, AI Tutor, PDF & PWA Install */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Audio Chime Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition ${
              soundEnabled
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50'
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Chime sound enabled (Click to mute)' : 'Muted (Click to unmute)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={testChime}
            className="text-[11px] font-mono-tech px-2 py-1.5 rounded-lg border border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-slate-300 transition"
            title="Test audio chime"
          >
            Chime Test
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/50 hover:to-indigo-600/50 border border-purple-500/40 text-purple-200 text-xs font-medium transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
            <span>AI Exam Hub</span>
          </button>

          {/* Reminders / WhatsApp / Email settings */}
          <button
            onClick={onOpenReminders}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              is10MinWarning
                ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse'
                : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Reminders</span>
            {is10MinWarning && <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />}
          </button>

          {/* Wall Poster Print PDF */}
          <button
            onClick={onOpenPrintPoster}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600/60 text-slate-200 text-xs font-medium transition"
            title="Download formatted wall poster PDF in case electricity goes off"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Wall Poster PDF</span>
          </button>

          {/* PWA Install Trigger */}
          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition"
              title="Install ChronosStudy as desktop or mobile app"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/40 text-slate-300 text-xs"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install (iOS)</span>
            </button>
          )}
        </div>
      </div>

      {/* Real-time Active Session Status Sub-Bar */}
      <div className="w-full bg-[#06080d] border-t border-slate-800/80 px-4 py-1.5 text-xs font-mono-tech flex flex-wrap items-center justify-between gap-2 text-slate-400">
        <div className="flex items-center gap-3">
          {activeSession ? (
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">NOW ACTIVE:</span>
              <span className="text-slate-100 font-bold">{activeSession.code}</span>
              <span className="text-slate-400 hidden sm:inline">- {activeSession.title}</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px]">
                {activeSession.minutesRemaining}m remaining
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="text-[11px] uppercase">STATUS:</span>
              <span className="text-slate-300">Self-Directed Study / Break</span>
            </div>
          )}
        </div>

        {nextSession && (
          <div className="flex items-center gap-2 text-right">
            <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">NEXT UP:</span>
            <span className="text-slate-200 font-medium">{nextSession.code}</span>
            <span className="text-slate-400">at {nextSession.startTime}</span>
            <span className="text-cyan-300 font-bold">({nextSession.minutesUntilStart}m)</span>
          </div>
        )}
      </div>

      {/* iOS Safari Install Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              Install on iPhone / iPad Safari
            </h3>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              1. Tap the <strong>Share</strong> button (box with upward arrow) at the bottom of Safari.<br />
              2. Scroll down and choose <strong>Add to Home Screen</strong>.<br />
              3. ChronosStudy will be accessible right from your home screen like an app!
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-lg bg-cyan-600 hover:bg-cyan-500 py-2 text-xs font-semibold text-white transition"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
