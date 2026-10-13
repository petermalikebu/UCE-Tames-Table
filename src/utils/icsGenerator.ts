import { MASTER_STUDY_TIMETABLE, UNIVERSITY_CLASS_TIMETABLE, USER_PROFILE } from '../data/timetableData';

function formatICSDate(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

const DAY_MAP: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function generateCalendarICS(): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ChronosStudy//UCE 6-Week Master Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Peter Malikebu - 6-Week Study & Class Schedule',
    'X-WR-TIMEZONE:Africa/Blantyre',
  ];

  const startDate = new Date();
  // Align start to the beginning of today
  startDate.setHours(0, 0, 0, 0);

  // Generate 6 weeks (42 days) of study slots
  for (let dayOffset = 0; dayOffset < 42; dayOffset++) {
    const currentDate = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    const dayOfWeek = currentDate.getDay(); // 0-6

    // Find study slots matching this day
    const daySlots = MASTER_STUDY_TIMETABLE.filter(s => DAY_MAP[s.day] === dayOfWeek);

    for (const slot of daySlots) {
      const [startH, startM] = slot.startTime.split(':').map(Number);
      const [endH, endM] = slot.endTime.split(':').map(Number);

      const eventStart = new Date(currentDate);
      eventStart.setHours(startH, startM, 0, 0);

      const eventEnd = new Date(currentDate);
      eventEnd.setHours(endH, endM, 0, 0);

      const uid = `study-${slot.id}-${currentDate.toISOString().slice(0, 10)}@chronosstudy.local`;

      lines.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(eventStart)}`,
        `DTEND:${formatICSDate(eventEnd)}`,
        `SUMMARY:[Study] ${slot.subjectCode} - ${slot.subjectName}`,
        `DESCRIPTION:Study Session: ${slot.slotLabel}\\nFocus Area: ${slot.focusArea}\\nNotes: ${slot.notes || 'Intensive revision'}\\nStudent: ${USER_PROFILE.name} (${USER_PROFILE.regNumber})`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'BEGIN:VALARM',
        'TRIGGER:-PT10M',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: 10 minutes until ${slot.subjectCode} study session begins!`,
        'END:VALARM',
        'END:VEVENT'
      );
    }

    // Add university class slots if Monday through Friday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const classSlots = UNIVERSITY_CLASS_TIMETABLE.filter(c => DAY_MAP[c.day] === dayOfWeek);
      for (const cls of classSlots) {
        const [timeStartStr, timeEndStr] = cls.timeRange.split(' - ');
        const [startH, startM] = timeStartStr.split(':').map(Number);
        const [endH, endM] = timeEndStr.split(':').map(Number);

        const classStart = new Date(currentDate);
        classStart.setHours(startH, startM, 0, 0);

        const classEnd = new Date(currentDate);
        classEnd.setHours(endH, endM, 0, 0);

        const uid = `class-${cls.id}-${currentDate.toISOString().slice(0, 10)}@chronosstudy.local`;

        lines.push(
          'BEGIN:VEVENT',
          `UID:${uid}`,
          `DTSTAMP:${formatICSDate(new Date())}`,
          `DTSTART:${formatICSDate(classStart)}`,
          `DTEND:${formatICSDate(classEnd)}`,
          `SUMMARY:[Class] ${cls.subjectCode} (${cls.venueCode})`,
          `LOCATION:${cls.venueName} [${cls.venueCode}]`,
          `DESCRIPTION:Official Class Lecture\\nSubject: ${cls.subjectName}\\nVenue: ${cls.venueName} (${cls.venueCode})\\nPeriod: ${cls.period}\\nStudent: ${USER_PROFILE.name} (${USER_PROFILE.regNumber})`,
          'STATUS:CONFIRMED',
          'TRANSP:OPAQUE',
          'BEGIN:VALARM',
          'TRIGGER:-PT10M',
          'ACTION:DISPLAY',
          `DESCRIPTION:Reminder: 10 minutes until ${cls.subjectCode} lecture at ${cls.venueName}!`,
          'END:VALARM',
          'END:VEVENT'
        );
      }
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadICSFile(): void {
  const icsData = generateCalendarICS();
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Peter_Malikebu_UCE_6Week_Schedule.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
