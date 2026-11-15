import { CheckCircle2, Info, Lock, RotateCcw, Search, Terminal, Unlock, XCircle } from 'lucide-react';
import type { ActivityLogEntry, LogLevel } from '../types/reservation';

interface ActivityLogPanelProps {
  logs: ActivityLogEntry[];
}

function getLogIcon(level: LogLevel) {
  switch (level) {
    case 'lock':
      return <Lock className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" aria-hidden="true" />;
    case 'check':
      return <Search className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" aria-hidden="true" />;
    case 'success':
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />;
    case 'release':
      return <Unlock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />;
    case 'error':
      return <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />;
    case 'cancel':
      return <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />;
    default:
      return <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />;
  }
}

export function ActivityLogPanel({ logs }: ActivityLogPanelProps) {
  return (
    <section
      aria-label="System activity log"
      className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col flex-1"
    >
      <div className="bg-[#12335B] text-white px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-200" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight">System Activity Log</h2>
        </div>
        <span className="text-xs font-mono tabular-nums text-blue-100/85">
          {logs.length} events
        </span>
      </div>

      <div className="p-3 sm:p-4 flex-1 overflow-y-auto max-h-[290px] divide-y divide-slate-100">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No mutex events recorded yet. Book a seat or run the simultaneous test to observe lock acquisition.
          </div>
        ) : (
          logs.map((entry) => (
            <div
              key={entry.id}
              className="py-2 flex items-start gap-2.5 text-xs leading-relaxed"
            >
              {getLogIcon(entry.level)}
              <span className="font-mono tabular-nums text-slate-500 shrink-0">
                {entry.time}
              </span>
              <span className="text-slate-400 shrink-0" aria-hidden="true">
                -
              </span>
              <span
                className={`${
                  entry.level === 'error'
                    ? 'text-rose-800 font-medium'
                    : entry.level === 'success'
                      ? 'text-emerald-900 font-medium'
                      : entry.level === 'lock'
                        ? 'text-purple-900 font-medium'
                        : 'text-slate-800'
                }`}
              >
                {entry.message}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
