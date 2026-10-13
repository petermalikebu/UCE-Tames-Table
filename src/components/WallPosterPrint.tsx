import React from 'react';
import { Printer, Download, ArrowLeft, ShieldCheck, CheckSquare, Clock } from 'lucide-react';
import { MASTER_STUDY_TIMETABLE, UNIVERSITY_CLASS_TIMETABLE, SUBJECTS, USER_PROFILE } from '../data/timetableData';

interface WallPosterPrintProps {
  onBack: () => void;
}

export const WallPosterPrint: React.FC<WallPosterPrintProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Screen-Only Control Bar */}
      <div className="no-print flex items-center justify-between bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
          <div>
            <h3 className="font-hud text-base font-bold text-white">
              PRINTABLE WALL POSTER & PDF EXPORT
            </h3>
            <p className="text-xs text-slate-400">
              Clean high-contrast paper format. Click Print and select "Save as PDF" or print directly to paper!
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Wall Poster (PDF)</span>
        </button>
      </div>

      {/* Printable Poster Canvas */}
      <div className="wall-poster-container bg-white text-slate-950 p-6 md:p-10 rounded-2xl shadow-2xl border border-slate-300 max-w-5xl mx-auto">
        {/* Poster Header */}
        <div className="border-b-4 border-slate-900 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold">
              UNIVERSITY CERTIFICATE IN EDUCATION (UCE) • MASTER REVISION SCHEDULE
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-serif mt-1">
              6-WEEK INTENSIVE EXAM STUDY WALL POSTER
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-700 font-medium font-mono">
              <span>Candidate: <strong className="text-slate-900">{USER_PROFILE.name}</strong></span>
              <span>•</span>
              <span>Reg No: <strong className="text-slate-900">{USER_PROFILE.regNumber}</strong></span>
              <span>•</span>
              <span>WhatsApp: <strong>+265 986 272 736</strong></span>
            </div>
          </div>

          <div className="border-2 border-slate-900 p-2.5 rounded-lg text-center min-w-[130px] bg-slate-50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">OFFLINE POLICY</div>
            <div className="text-base font-black text-slate-950">WALL POSTED</div>
            <div className="text-[9px] text-slate-500 font-mono">Electricity-Proof</div>
          </div>
        </div>

        {/* 6 Subjects Quick Reference */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            1. THE 6 EXAM SUBJECTS & CORE REVISION PRIORITIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {SUBJECTS.map(s => (
              <div key={s.id} className="p-2 border border-slate-300 rounded bg-slate-50">
                <div className="font-bold font-mono text-slate-900">{s.code}</div>
                <div className="font-semibold text-slate-800 text-[11px]">{s.name}</div>
                <div className="text-[10px] text-slate-600 mt-1 line-clamp-2">{s.keyTopics[0]}, {s.keyTopics[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Daily Schedule Matrix (Monday to Saturday covers all 6 subjects!) */}
        <div className="mb-6">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              2. MASTER DAILY REVISION TIMETABLE (MONDAY – SATURDAY: ALL 6 COURSES COVERED DAILY)
            </h2>
            <span className="text-[10px] font-mono text-slate-600">10.5 Study Hours / Day</span>
          </div>

          <table className="w-full text-left text-xs border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-200 text-slate-900 font-bold border-b border-slate-400 text-[11px]">
                <th className="p-2 border border-slate-400 w-28">Session Slot</th>
                <th className="p-2 border border-slate-400 w-24">Time Window</th>
                <th className="p-2 border border-slate-400">Monday</th>
                <th className="p-2 border border-slate-400">Tuesday</th>
                <th className="p-2 border border-slate-400">Wednesday</th>
                <th className="p-2 border border-slate-400">Thursday</th>
                <th className="p-2 border border-slate-400">Friday</th>
                <th className="p-2 border border-slate-400">Saturday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-[11px]">
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Dawn Block 1</td>
                <td className="p-2 font-mono border border-slate-400">02:30 - 04:00</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Dawn Block 2</td>
                <td className="p-2 font-mono border border-slate-400">04:00 - 05:30</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Morning Block</td>
                <td className="p-2 font-mono border border-slate-400">08:30 - 10:30</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Midday Block</td>
                <td className="p-2 font-mono border border-slate-400">11:00 - 13:00</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Afternoon Block</td>
                <td className="p-2 font-mono border border-slate-400">13:30 - 15:30</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
              </tr>
              <tr className="bg-amber-50">
                <td className="p-2 font-bold border border-slate-400">Class Lecture Block</td>
                <td className="p-2 font-mono border border-slate-400">16:00 - 18:00</td>
                <td colSpan={5} className="p-2 border border-slate-400 font-medium text-center text-slate-800">
                  ATTEND FACULTY LECTURES AS PER UCE/1/143/26 TIMETABLE (VIR / PHYSICAL LABS)
                </td>
                <td className="p-2 border border-slate-400 text-center font-medium">Catch-up / Rest</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50 border border-slate-400">Night Recall Block</td>
                <td className="p-2 font-mono border border-slate-400">20:00 - 21:30</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 501</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 532</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 521</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 512</td>
                <td className="p-2 border border-slate-400 font-semibold">SCE 502</td>
                <td className="p-2 border border-slate-400 font-semibold">EDF 522</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sunday Special Commitment */}
        <div className="mb-6 p-3 border border-slate-400 rounded bg-slate-50 text-xs">
          <div className="font-bold text-slate-900 mb-1">
            SUNDAY SPECIAL PROTOCOL (CHURCH & FELLOWSHIP RESTORATION):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
            <div>• <strong>03:00 - 05:30 (Dawn):</strong> Comprehensive 6-Subject Weekly Mock Simulation Quiz (10 Qs each).</div>
            <div>• <strong>05:30 - 19:30:</strong> Church Service, Fellowship, Family & Mental Rest.</div>
            <div className="sm:col-span-2">• <strong>20:00 - 21:30 (Evening):</strong> Weekly Audit, Checkbox Verification, and Week-Ahead Goal Reset.</div>
          </div>
        </div>

        {/* University Class Schedule Reference */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            3. OFFICIAL CLASS LECTURES (UCE/1/143/26)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
            <div className="border border-slate-300 p-2 rounded">
              <strong className="block text-slate-900 border-b pb-0.5">MONDAY</strong>
              <div>• EDF 532B (P3 - VIR)</div>
              <div>• SCE 501 (P4 - VIR)</div>
              <div>• EDF 521B (P7 - VIR)</div>
            </div>
            <div className="border border-slate-300 p-2 rounded">
              <strong className="block text-slate-900 border-b pb-0.5">TUESDAY</strong>
              <div>• EDF 512A (P9 - VIR)</div>
            </div>
            <div className="border border-slate-300 p-2 rounded">
              <strong className="block text-slate-900 border-b pb-0.5">WEDNESDAY</strong>
              <div>• EDF 522B (P8 - VIR)</div>
              <div>• SCE 502 (P10 - LT1)</div>
            </div>
            <div className="border border-slate-300 p-2 rounded">
              <strong className="block text-slate-900 border-b pb-0.5">THURSDAY</strong>
              <div>• EDF 512A (P3 - VIR)</div>
              <div>• SCE 502 (P7 - AV2)</div>
              <div>• EDF 532B (P10 - VIR)</div>
            </div>
            <div className="border border-slate-300 p-2 rounded">
              <strong className="block text-slate-900 border-b pb-0.5">FRIDAY</strong>
              <div>• EDF 512A (P2 - VIR)</div>
              <div>• SCE 501 (P6 - B)</div>
              <div>• SCE 501 (P8 - ESC)</div>
              <div>• EDF 521B (P9 - VIR)</div>
              <div>• EDF 522B (P11 - VIR)</div>
            </div>
          </div>
        </div>

        {/* Handwritten Progress Tracking Checkboxes for Wall */}
        <div className="border-t-2 border-slate-900 pt-4 text-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            4. 6-WEEK WALL CHECKLIST (TICK WITH PEN AS WEEKS ADVANCE)
          </h2>
          <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-mono">
            {[1, 2, 3, 4, 5, 6].map(w => (
              <div key={w} className="border border-slate-400 p-2 rounded bg-slate-50">
                <div className="font-bold text-slate-900">WEEK {w}</div>
                <div className="h-6 w-6 border-2 border-slate-900 mx-auto my-1.5 rounded flex items-center justify-center">
                  ☐
                </div>
                <div className="text-[9px] text-slate-500">Sign & Date</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-300 text-center text-[10px] text-slate-500 font-mono">
          ChronosStudy Wall Master • Candidate: Peter Malikebu Jr • "The discipline you sow today becomes the distinction you harvest tomorrow."
        </div>
      </div>
    </div>
  );
};
