import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Download, 
  Volume2, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Calendar,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { USER_PROFILE } from '../data/timetableData';
import { NotificationSettings } from '../types';
import { downloadICSFile } from '../utils/icsGenerator';
import { audioEngine } from '../utils/audio';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onUpdateSettings: (newSettings: Partial<NotificationSettings>) => void;
  onRequestPermission: () => Promise<boolean>;
  whatsAppUrl: string;
  emailUrl: string;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onRequestPermission,
  whatsAppUrl,
  emailUrl,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const granted = await onRequestPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
  };

  const handleDownloadCalendar = () => {
    downloadICSFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-[#090d16] p-6 shadow-2xl text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
            <Bell className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-hud text-xl font-bold text-white tracking-wide">
              REAL-TIME NOTIFICATIONS & 10-MINUTE ADVANCE ALARMS
            </h3>
            <p className="text-xs text-slate-400 font-mono-tech">
              Automated reminders configured for Peter Malikebu Jr ({USER_PROFILE.regNumber})
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Channel 1: Mobile & Desktop 10-Min Native Calendar Synchronization */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Google Calendar / Apple Calendar Auto-Alert Sync (.ics)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Exports the full 6-week study schedule and lecture classes directly to your phone's calendar with 
                    <strong> native 10-minute vibrating notifications</strong> configured automatically!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[11px] text-emerald-300/80 font-mono-tech">
                ✓ Works 100% offline even when browser is closed or phone is locked.
              </span>
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Import File Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Schedule (.ics)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Channel 2: WhatsApp Realtime Line */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    WhatsApp Instant Dispatch
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                      {USER_PROFILE.whatsappPhone}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    1-Click button to send customized 10-minute study prompts directly to your WhatsApp line.
                  </p>
                </div>
              </div>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <span>Trigger WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Channel 3: Email Alerts */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Email Notifications
                  </h4>
                  <div className="text-xs text-slate-300 mt-0.5 space-y-0.5 font-mono-tech">
                    <div>Primary: <span className="text-cyan-300">{USER_PROFILE.primaryEmail}</span></div>
                    <div>Secondary: <span className="text-cyan-300">{USER_PROFILE.secondaryEmail}</span></div>
                  </div>
                </div>
              </div>

              <a
                href={emailUrl}
                className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <span>Send Email Alert</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Channel 4: Browser Notification API & Web Audio Chimes */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
            <h4 className="text-xs font-mono-tech uppercase text-slate-400 font-bold">
              In-Browser Audio & Pop-up Alarms:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Browser Push Permission */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Browser Push Alerts</div>
                  <div className="text-[10px] text-slate-400 font-mono-tech">
                    Status: {permissionStatus}
                  </div>
                </div>
                {permissionStatus !== 'granted' ? (
                  <button
                    onClick={handleRequestPermission}
                    className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition"
                  >
                    Enable
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400 font-mono-tech font-bold text-xs">
                    <Check className="w-3.5 h-3.5" /> Active
                  </span>
                )}
              </div>

              {/* Sound Alerts */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Futuristic Audio Chime</div>
                  <div className="text-[10px] text-slate-400 font-mono-tech">
                    {settings.soundAlertsEnabled ? '10-min warning sound ON' : 'Muted'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => audioEngine.playWarningChime()}
                    className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:text-cyan-300"
                    title="Test chime"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="checkbox"
                    checked={settings.soundAlertsEnabled}
                    onChange={e => onUpdateSettings({ soundAlertsEnabled: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition"
          >
            Save & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
