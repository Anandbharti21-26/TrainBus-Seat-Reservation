import { ArrowRight, CheckCircle2, Cpu, Lightbulb, Lock, SearchCheck, ShieldCheck, Unlock, XCircle } from 'lucide-react';
import type { MutexSnapshot } from '../types/reservation';

interface RaceConditionPanelProps {
  mutex: MutexSnapshot;
  p1Name: string;
  p2Name: string;
  targetSeat: string;
}

export function RaceConditionPanel({
  mutex,
  p1Name,
  p2Name,
  targetSeat,
}: RaceConditionPanelProps) {
  const step = mutex.activeStep;
  const activeSeat = mutex.targetSeatId || targetSeat;

  const isMutexActive =
    step === 'mutex_acquire' || step === 'critical_section' || step === 'seat_check';
  const isCriticalActive = step === 'critical_section' || step === 'seat_check';
  const isCheckActive = step === 'seat_check';
  const isComplete = step === 'complete';
  const isRejected = step === 'rejected';

  return (
    <section
      aria-label="Race condition prevention diagram"
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
    >
      <div className="bg-[#12335B] text-white px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-200" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight">Race Condition Prevention</h2>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-md border ${
            mutex.locked
              ? 'bg-amber-500/20 border-amber-300/40 text-amber-100'
              : 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100'
          }`}
        >
          {mutex.locked ? (
            <>
              <Lock className="w-3 h-3" aria-hidden="true" />
              LOCKED ({mutex.holder})
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3" aria-hidden="true" />
              MUTEX FREE
            </>
          )}
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Visual OS Pipeline Flow */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 overflow-x-auto">
          <div className="min-w-[440px] flex items-center justify-between gap-2">
            {/* Concurrent Requesters */}
            <div className="flex flex-col gap-2.5 shrink-0">
              <div
                className={`px-3 py-2 rounded-lg border text-xs transition-colors ${
                  mutex.holder === p1Name
                    ? 'bg-blue-600 text-white border-blue-700 font-semibold'
                    : 'bg-blue-50 text-blue-950 border-blue-200'
                }`}
              >
                <div className="font-semibold truncate max-w-[110px]">
                  {p1Name || 'Passenger A'}
                </div>
                <div className="text-[11px] font-mono opacity-85">Seat {activeSeat}</div>
              </div>

              <div
                className={`px-3 py-2 rounded-lg border text-xs transition-colors ${
                  mutex.waitingQueue.includes(p2Name)
                    ? 'bg-amber-50 text-amber-950 border-amber-300 font-semibold'
                    : mutex.holder === p2Name
                      ? 'bg-indigo-600 text-white border-indigo-700 font-semibold'
                      : 'bg-indigo-50 text-indigo-950 border-indigo-200'
                }`}
              >
                <div className="font-semibold truncate max-w-[110px]">
                  {p2Name || 'Passenger B'}
                </div>
                <div className="text-[11px] font-mono opacity-85">
                  {mutex.waitingQueue.includes(p2Name) ? 'Waiting...' : `Seat ${activeSeat}`}
                </div>
              </div>
            </div>

            {/* Converging connector */}
            <div className="flex flex-col items-center justify-center text-slate-400 shrink-0">
              <span className="text-xs font-mono leading-none">┐</span>
              <ArrowRight className="w-4 h-4 text-slate-500 my-0.5" aria-hidden="true" />
              <span className="text-xs font-mono leading-none">┘</span>
            </div>

            {/* Mutex Lock Node */}
            <div
              className={`px-3 py-3 rounded-xl border text-center shrink-0 transition-all ${
                isMutexActive
                  ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                  : 'bg-purple-50 text-purple-950 border-purple-200'
              }`}
            >
              <Lock className="w-4 h-4 mx-auto mb-1" aria-hidden="true" />
              <div className="text-xs font-semibold leading-tight">Mutex</div>
              <div className="text-[11px] opacity-90">Lock</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />

            {/* Critical Section Node */}
            <div
              className={`px-3 py-3 rounded-xl border text-center shrink-0 transition-all ${
                isCriticalActive
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'bg-emerald-50 text-emerald-950 border-emerald-200'
              }`}
            >
              <Cpu className="w-4 h-4 mx-auto mb-1" aria-hidden="true" />
              <div className="text-xs font-semibold leading-tight">Critical</div>
              <div className="text-[11px] opacity-90">Section</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />

            {/* Seat Check Node */}
            <div
              className={`px-3 py-3 rounded-xl border text-center shrink-0 transition-all ${
                isCheckActive
                  ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                  : 'bg-sky-50 text-sky-950 border-sky-200'
              }`}
            >
              <SearchCheck className="w-4 h-4 mx-auto mb-1" aria-hidden="true" />
              <div className="text-xs font-semibold leading-tight">Seat</div>
              <div className="text-[11px] opacity-90">Check</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />

            {/* Final Outcome Node */}
            <div
              className={`px-3 py-3 rounded-xl border text-center shrink-0 transition-all ${
                isRejected
                  ? 'bg-rose-600 text-white border-rose-700'
                  : isComplete
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {isRejected ? (
                <XCircle className="w-4 h-4 mx-auto mb-1" aria-hidden="true" />
              ) : (
                <CheckCircle2
                  className={`w-4 h-4 mx-auto mb-1 ${isComplete ? 'text-white' : 'text-emerald-600'}`}
                  aria-hidden="true"
                />
              )}
              <div className="text-xs font-semibold leading-tight">
                {isRejected ? 'Conflict' : 'Booking'}
              </div>
              <div className="text-[11px] opacity-90">
                {isRejected ? 'Rejected' : 'Safe!'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Queue Status if waiting */}
        {mutex.waitingQueue.length > 0 && (
          <div className="px-3.5 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
            <span className="font-medium">
              Waiting for Mutex release: <span className="font-mono font-semibold">{mutex.waitingQueue.join(', ')}</span>
            </span>
            <span className="font-mono text-[11px] text-amber-800">Blocked</span>
          </div>
        )}

        <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            The <span className="font-semibold text-slate-800">Mutex lock</span> allows only one booking operation to enter the{' '}
            <span className="font-semibold text-slate-800">Critical Section</span> at a time. When two passengers request the same seat concurrently, the second request waits until the lock is released and then sees the updated reserved state.
          </p>
        </div>
      </div>
    </section>
  );
}
