export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  creditUnits: number;
  color: string; // Tailwind color class or hex
  accentBorder: string;
  glowColor: string;
  examWeight: string;
  iconName: string;
  keyTopics: string[];
  recommendedStrategy: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface StudySlot {
  id: string;
  day: DayOfWeek;
  startTime: string; // "02:30"
  endTime: string;   // "04:00"
  durationMinutes: number;
  slotType: 'dawn_1' | 'dawn_2' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'sunday_synth' | 'sunday_eval';
  slotLabel: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  focusArea: string;
  notes?: string;
}

export interface UniversityClassSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number; // 1 to 11
  timeRange: string; // e.g. "16:00 - 17:00" or approximate period time
  subjectCode: string;
  subjectName: string;
  venueCode: string; // VIR, LT1, AV2, B, ESC
  venueName: string; // "Virtual Room", "Lecture Theatre 1", etc.
  isVirtual: boolean;
}

export interface WeekCurriculum {
  weekNumber: number;
  title: string;
  theme: string;
  phase: 'Phase 1: Foundations' | 'Phase 2: Deep Core' | 'Phase 3: Critical Analysis' | 'Phase 4: Past Papers' | 'Phase 5: Timed Mocks' | 'Phase 6: High-Yield Mastery';
  startDate: string;
  targetDeliverables: string[];
  subjects: {
    [subjectId: string]: {
      topics: string[];
      keyQuestions: string[];
      completed: boolean;
    };
  };
}

export interface UserProfile {
  name: string;
  regNumber: string;
  program: string;
  primaryEmail: string;
  secondaryEmail: string;
  whatsappPhone: string;
  targetExamWeeks: number;
  examTargetDate: string; // ISO date string
}

export interface NotificationSettings {
  browserNotificationsEnabled: boolean;
  soundAlertsEnabled: boolean;
  advanceMinutes: number; // 10
  autoOpenWhatsApp: boolean;
  vibrationEnabled: boolean;
}

export interface CompletedSessionLog {
  id: string;
  slotId: string;
  dateStr: string; // YYYY-MM-DD
  subjectId: string;
  durationMinutes: number;
  completedAt: string;
  notes: string;
}
