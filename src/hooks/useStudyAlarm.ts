import { useState, useEffect, useRef, useCallback } from 'react';
import { StudySlot, UniversityClassSlot, NotificationSettings } from '../types';
import { MASTER_STUDY_TIMETABLE, UNIVERSITY_CLASS_TIMETABLE, USER_PROFILE } from '../data/timetableData';
import { audioEngine } from '../utils/audio';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export interface SessionMatch {
  type: 'study' | 'class';
  title: string;
  code: string;
  startTime: string;
  endTime: string;
  venueOrFocus: string;
  notes?: string;
  minutesUntilStart: number;
  minutesRemaining: number;
}

export function useStudyAlarm() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeSession, setActiveSession] = useState<SessionMatch | null>(null);
  const [nextSession, setNextSession] = useState<SessionMatch | null>(null);
  const [is10MinWarning, setIs10MinWarning] = useState<boolean>(false);
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('chronos_notification_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      browserNotificationsEnabled: false,
      soundAlertsEnabled: true,
      advanceMinutes: 10,
      autoOpenWhatsApp: false,
      vibrationEnabled: true,
    };
  });

  const lastAlertedSessionRef = useRef<string | null>(null);

  // Update settings in local storage
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('chronos_notification_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Request browser notification permission
  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }
    const perm = await Notification.requestPermission();
    const granted = perm === 'granted';
    updateSettings({ browserNotificationsEnabled: granted });
    return granted;
  };

  const evaluateSchedule = useCallback(() => {
    const now = new Date();
    setCurrentTime(now);

    const dayName = DAY_NAMES[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    // Convert today's study slots into minutes
    const todayStudySlots = MASTER_STUDY_TIMETABLE.filter(s => s.day === dayName);
    const todayClassSlots = UNIVERSITY_CLASS_TIMETABLE.filter(c => c.day === dayName);

    const candidateSessions: SessionMatch[] = [];

    todayStudySlots.forEach(slot => {
      const [sh, sm] = slot.startTime.split(':').map(Number);
      const [eh, em] = slot.endTime.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;

      candidateSessions.push({
        type: 'study',
        title: slot.subjectName,
        code: slot.subjectCode,
        startTime: slot.startTime,
        endTime: slot.endTime,
        venueOrFocus: slot.focusArea,
        notes: slot.notes,
        minutesUntilStart: Math.round(startMin - currentMinutes),
        minutesRemaining: Math.round(endMin - currentMinutes),
      });
    });

    todayClassSlots.forEach(cls => {
      const [timeStartStr, timeEndStr] = cls.timeRange.split(' - ');
      const [sh, sm] = timeStartStr.split(':').map(Number);
      const [eh, em] = timeEndStr.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;

      candidateSessions.push({
        type: 'class',
        title: cls.subjectName,
        code: cls.subjectCode,
        startTime: timeStartStr,
        endTime: timeEndStr,
        venueOrFocus: `${cls.venueName} [${cls.venueCode}]`,
        notes: `Class Period ${cls.period} (${cls.isVirtual ? 'Virtual lecture' : 'On-campus physical'})`,
        minutesUntilStart: Math.round(startMin - currentMinutes),
        minutesRemaining: Math.round(endMin - currentMinutes),
      });
    });

    // Check if any session is currently active
    const active = candidateSessions.find(
      s => s.minutesUntilStart <= 0 && s.minutesRemaining > 0
    );
    setActiveSession(active || null);

    // Find next upcoming session today
    const upcoming = candidateSessions
      .filter(s => s.minutesUntilStart > 0)
      .sort((a, b) => a.minutesUntilStart - b.minutesUntilStart)[0];

    setNextSession(upcoming || null);

    // Evaluate 10-minute warning
    if (upcoming && upcoming.minutesUntilStart <= settings.advanceMinutes && upcoming.minutesUntilStart > 0) {
      setIs10MinWarning(true);

      const alertKey = `${upcoming.code}-${upcoming.startTime}-${now.toDateString()}`;
      if (lastAlertedSessionRef.current !== alertKey) {
        lastAlertedSessionRef.current = alertKey;

        // Sound alert
        if (settings.soundAlertsEnabled) {
          audioEngine.playWarningChime();
        }

        // Vibration
        if (settings.vibrationEnabled && 'vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }

        // Native Browser Notification
        if (settings.browserNotificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification(`⚡ 10-Min Alert: ${upcoming.code} Starts Soon!`, {
              body: `Starting at ${upcoming.startTime}: ${upcoming.title} (${upcoming.venueOrFocus}). Time to prepare!`,
              icon: '/icon-192.png',
              badge: '/icon-192.png',
              tag: alertKey,
            });
          } catch {
            // Notification failed
          }
        }
      }
    } else {
      setIs10MinWarning(false);
    }
  }, [settings]);

  useEffect(() => {
    evaluateSchedule();
    const interval = setInterval(evaluateSchedule, 1000);
    return () => clearInterval(interval);
  }, [evaluateSchedule]);

  // Create WhatsApp message URI
  const getWhatsAppReminderUrl = (session?: SessionMatch | null) => {
    const target = session || nextSession || activeSession;
    const phone = USER_PROFILE.whatsappPhone.replace(/[^0-9]/g, '');
    let text = `⚡ *CHRONOS STUDY ALERT - Peter Malikebu (UCE/1/143/26)*\n`;
    if (target) {
      text += `📖 *Upcoming Session*: ${target.code} - ${target.title}\n`;
      text += `⏰ *Time*: ${target.startTime} - ${target.endTime}\n`;
      text += `🎯 *Focus / Venue*: ${target.venueOrFocus}\n`;
      text += `💡 *Strategy*: Active recall, past questions & core summaries.\n`;
    } else {
      text += `📅 Ready for today's master timetable revision blocks! Check your Chronos timetable.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Create Email reminder mailto URI
  const getEmailReminderUrl = (session?: SessionMatch | null) => {
    const target = session || nextSession || activeSession;
    const to = `${USER_PROFILE.primaryEmail},${USER_PROFILE.secondaryEmail}`;
    const subject = encodeURIComponent(
      `[Chronos Reminder] 10-Min Notice: ${target ? target.code : 'Study Block'} (${target ? target.startTime : ''})`
    );
    const body = encodeURIComponent(
      `Hello Peter,\n\nThis is your real-time 10-minute study alert from ChronosStudy.\n\n` +
      `Subject: ${target ? target.code + ' - ' + target.title : 'Scheduled Session'}\n` +
      `Time: ${target ? target.startTime + ' - ' + target.endTime : 'N/A'}\n` +
      `Focus / Venue: ${target ? target.venueOrFocus : 'N/A'}\n` +
      `Notes: ${target?.notes || 'Core concepts revision'}\n\n` +
      `Student ID: ${USER_PROFILE.regNumber}\nProgram: ${USER_PROFILE.program}\n\n` +
      `"Success in teacher education is built by consistent daily discipline."`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return {
    currentTime,
    activeSession,
    nextSession,
    is10MinWarning,
    settings,
    updateSettings,
    requestNotificationPermission,
    getWhatsAppReminderUrl,
    getEmailReminderUrl,
  };
}
