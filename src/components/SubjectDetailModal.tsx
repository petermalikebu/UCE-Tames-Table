import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import { Subject } from '../types';

interface SubjectDetailModalProps {
  subject: Subject | null;
  onClose: () => void;
  onOpenAI: (subjectCode: string, topic: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  onClose,
  onOpenAI,
}) => {
  if (!subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-[#090d16] p-6 shadow-2xl text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-tech font-bold text-sm text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                {subject.code}
              </span>
              <span className="text-xs text-slate-400">{subject.creditUnits} Credit Units</span>
            </div>
            <h3 className="font-hud text-xl font-bold text-white mt-1">
              {subject.name}
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <h4 className="font-mono-tech text-slate-400 uppercase text-[11px] font-bold mb-1">
              Course Description & Objectives:
            </h4>
            <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {subject.description}
            </p>
          </div>

          <div>
            <h4 className="font-mono-tech text-slate-400 uppercase text-[11px] font-bold mb-2">
              Core Syllabus Topic Units:
            </h4>
            <div className="space-y-1.5">
              {subject.keyTopics.map((topic, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200 font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5">
            <h4 className="font-mono-tech text-amber-300 uppercase text-[11px] font-bold flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              Recommended High-Yield Exam Strategy:
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {subject.recommendedStrategy}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAI(subject.code, subject.keyTopics[0]);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open in AI Exam Tutor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
