import React, { useState } from 'react';
import { 
  Building2, 
  Video, 
  MapPin, 
  Clock, 
  Info, 
  Calendar,
  Share2
} from 'lucide-react';
import { UNIVERSITY_CLASS_TIMETABLE, USER_PROFILE } from '../data/timetableData';

const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

const SUBJECT_ROWS = [
  { code: 'EDF 512A', name: 'Educational Psychology' },
  { code: 'EDF 521B', name: 'Testing and Measurements' },
  { code: 'EDF 522B', name: 'Curriculum Theory' },
  { code: 'EDF 532B', name: 'Philosophy of Education' },
  { code: 'SCE 501', name: 'Laboratory Practice and Management' },
  { code: 'SCE 502', name: 'Introduction to Science Education' },
];

const VENUE_KEY = [
  { code: 'VIR', name: 'Virtual Lecture Room (Online / LMS)', isVirtual: true, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40' },
  { code: 'LT1', name: 'Lecture Theatre 1 (Main Hall)', isVirtual: false, color: 'text-amber-400 bg-amber-950/60 border-amber-500/40' },
  { code: 'AV2', name: 'Audio Visual Room 2', isVirtual: false, color: 'text-purple-400 bg-purple-950/60 border-purple-500/40' },
  { code: 'B', name: 'Biology Laboratory (Science Block)', isVirtual: false, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' },
  { code: 'ESC', name: 'Education Science Complex', isVirtual: false, color: 'text-sky-400 bg-sky-950/60 border-sky-500/40' },
];

export const ClassTimetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');

  const getSlot = (subjectCodePrefix: string, day: string, period: number) => {
    return UNIVERSITY_CLASS_TIMETABLE.find(
      c => c.day === day && c.period === period && c.subjectCode.startsWith(subjectCodePrefix)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                Official University Schedule
              </span>
              <span className="text-xs text-slate-400 font-mono-tech">
                {USER_PROFILE.regNumber}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-hud text-white mt-1.5 tracking-wide">
              CLASS TIMETABLE FOR UCE/1/143/26
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Official faculty lecture schedule across Periods 1 to 11. Most evening classes (Periods 8–11) run between 15:00 and 18:30.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {VENUE_KEY.map(v => (
              <span
                key={v.code}
                className={`px-2 py-1 rounded text-[11px] font-mono-tech font-bold border ${v.color}`}
              >
                {v.code}: {v.isVirtual ? 'Virtual' : 'Physical'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Official Matrix Grid - Responsive Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono-tech text-cyan-400 font-semibold uppercase tracking-wider">
            UCE/1/143/26 PERIOD MATRIX (PERIODS 1 – 11)
          </div>
          <span className="text-xs text-slate-400">Scroll horizontally on mobile →</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-mono-tech border-b border-slate-800">
                <th className="p-3 text-left border-r border-slate-800 w-28 sticky left-0 bg-slate-950 z-10">
                  Subject Code
                </th>
                <th className="p-3 text-left border-r border-slate-800 min-w-[140px]">
                  Course Name
                </th>
                {DAYS.map(day => (
                  <th key={day} colSpan={11} className="p-2 text-center border-r border-slate-800 bg-slate-900/60">
                    <span className="font-bold text-cyan-300">{day.toUpperCase()}</span>
                    <div className="grid grid-cols-11 gap-1 text-[9px] text-slate-400 mt-1 font-normal">
                      {PERIODS.map(p => (
                        <span key={p} className="text-center">{p}</span>
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBJECT_ROWS.map((row, rIdx) => {
                const prefix = row.code.split(' ')[0] + ' ' + row.code.split(' ')[1].slice(0, 3);
                return (
                  <tr
                    key={row.code}
                    className={`border-b border-slate-800/80 hover:bg-slate-800/40 transition ${
                      rIdx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'
                    }`}
                  >
                    <td className="p-3 font-mono-tech font-bold text-white border-r border-slate-800 sticky left-0 bg-slate-900 z-10 shadow-sm">
                      {row.code}
                    </td>
                    <td className="p-3 text-slate-300 border-r border-slate-800 whitespace-nowrap">
                      {row.name}
                    </td>

                    {DAYS.map(day => (
                      <React.Fragment key={day}>
                        {PERIODS.map(period => {
                          const slot = getSlot(prefix, day, period);
                          return (
                            <td
                              key={`${day}-${period}`}
                              className={`p-1 text-center border-r border-slate-800/50 min-w-[28px] ${
                                slot ? 'bg-cyan-950/40' : ''
                              }`}
                            >
                              {slot ? (
                                <span
                                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono-tech font-bold border shadow-sm ${
                                    slot.venueCode === 'VIR'
                                      ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200'
                                      : slot.venueCode === 'LT1'
                                      ? 'bg-amber-600/30 border-amber-400 text-amber-200'
                                      : slot.venueCode === 'AV2'
                                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                                      : slot.venueCode === 'B'
                                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                                      : 'bg-sky-600/30 border-sky-400 text-sky-200'
                                  }`}
                                  title={`${slot.subjectCode} at Period ${slot.period} (${slot.timeRange}) in ${slot.venueName}`}
                                >
                                  {slot.venueCode}
                                </span>
                              ) : (
                                <span className="text-slate-700 text-[10px]">•</span>
                              )}
                            </td>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Day by Day Lecture Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-hud text-lg font-bold text-white tracking-wide">
            DAILY LECTURE HIGHLIGHTS & VENUES
          </h3>
          <div className="flex items-center gap-1">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNIVERSITY_CLASS_TIMETABLE.filter(c => c.day === selectedDay).map(slot => (
            <div
              key={slot.id}
              className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-md hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold">
                  Period {slot.period}
                </span>
                <span className="text-xs font-mono-tech text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {slot.timeRange}
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-hud mt-1">
                {slot.subjectCode}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{slot.subjectName}</p>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  {slot.isVirtual ? (
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span className="font-medium">{slot.venueName}</span>
                </div>
                <span className="font-mono-tech font-bold text-cyan-400">
                  [{slot.venueCode}]
                </span>
              </div>
            </div>
          ))}

          {UNIVERSITY_CLASS_TIMETABLE.filter(c => c.day === selectedDay).length === 0 && (
            <div className="col-span-full p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-sm">
              No faculty lectures scheduled for {selectedDay}. Entire availability is dedicated to private study revision!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
