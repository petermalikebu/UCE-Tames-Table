import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, CheckCircle, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audio';

const TIMER_PRESETS = [
  { label: '90m Dawn Sprint', minutes: 90 },
  { label: '120m Block', minutes: 120 },
  { label: '50m Deep Work', minutes: 50 },
  { label: '25m Pomodoro', minutes: 25 },
];

export const PomodoroTimer: React.FC = () => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(90);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(90 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      audioEngine.playCompleteChime();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining]);

  const setPreset = (mins: number) => {
    setSelectedMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsRunning(false);
  };

  const toggleRun = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(selectedMinutes * 60);
  };

  const totalSeconds = selectedMinutes * 60;
  const progressPercent = Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100);

  const displayMinutes = Math.floor(secondsRemaining / 60);
  const displaySeconds = secondsRemaining % 60;

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h3 className="font-hud text-lg font-bold text-white tracking-wide">
            FOCUSED STUDY SPRINT TIMER
          </h3>
        </div>
        <span className="text-xs font-mono-tech text-cyan-400">
          {isRunning ? 'FOCUS ACTIVE' : 'IDLE'}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIMER_PRESETS.map(p => (
          <button
            key={p.minutes}
            onClick={() => setPreset(p.minutes)}
            className={`py-1.5 px-2 rounded-lg text-xs font-mono-tech font-semibold border transition ${
              selectedMinutes === p.minutes
                ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-sm'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Circular Display */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="84" stroke="#1e293b" strokeWidth="8" fill="transparent" />
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="#06b6d4"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="527.7"
              strokeDashoffset={527.7 - (527.7 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="font-mono-tech text-3xl md:text-4xl font-extrabold text-white tracking-wider">
              {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono-tech text-slate-400 mt-1 uppercase">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={toggleRun}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Study Sprint</span>
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
