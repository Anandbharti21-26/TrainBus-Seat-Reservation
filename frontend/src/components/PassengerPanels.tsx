import { AlertCircle, CheckCircle2, Play, Ticket, User, XCircle } from 'lucide-react';
import type { Seat } from '../types/reservation';

export interface SimultaneousOutcome {
  seatId: string;
  firstPassenger: string;
  firstSuccess: boolean;
  firstMessage: string;
  secondPassenger: string;
  secondSuccess: boolean;
  secondMessage: string;
}

interface PassengerPanelsProps {
  seats: Seat[];
  p1Name: string;
  p1Seat: string;
  p2Name: string;
  p2Seat: string;
  onP1NameChange: (name: string) => void;
  onP1SeatChange: (seatId: string) => void;
  onP2NameChange: (name: string) => void;
  onP2SeatChange: (seatId: string) => void;
  onBookSingle: (passengerIndex: 1 | 2) => void;
  onTestSimultaneous: () => void;
  loadingP1: boolean;
  loadingP2: boolean;
  loadingSimultaneous: boolean;
  singleFeedback: { passengerIndex: 1 | 2; success: boolean; message: string } | null;
  simultaneousOutcome: SimultaneousOutcome | null;
}

export function PassengerPanels({
  seats,
  p1Name,
  p1Seat,
  p2Name,
  p2Seat,
  onP1NameChange,
  onP1SeatChange,
  onP2NameChange,
  onP2SeatChange,
  onBookSingle,
  onTestSimultaneous,
  loadingP1,
  loadingP2,
  loadingSimultaneous,
  singleFeedback,
  simultaneousOutcome,
}: PassengerPanelsProps) {
  const isAnyBusy = loadingP1 || loadingP2 || loadingSimultaneous;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Passenger 1 Card */}
      <section
        aria-label="Passenger 1 booking"
        className="bg-white border border-slate-200 rounded-xl overflow-hidden"
      >
        <div className="bg-blue-600 text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-100" aria-hidden="true" />
            <h2 className="text-sm font-semibold">Passenger 1</h2>
          </div>
          <span className="text-[11px] font-mono text-blue-100">Thread A</span>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label htmlFor="p1-name" className="block text-xs font-medium text-slate-700 mb-1">
              Passenger Name
            </label>
            <input
              id="p1-name"
              type="text"
              value={p1Name}
              onChange={(e) => onP1NameChange(e.target.value)}
              placeholder="Enter passenger name"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="p1-seat" className="block text-xs font-medium text-slate-700 mb-1">
              Select Seat
            </label>
            <select
              id="p1-seat"
              value={p1Seat}
              onChange={(e) => onP1SeatChange(e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {seats.map((seat) => (
                <option key={seat.id} value={seat.id}>
                  {seat.id} — {seat.status === 'reserved' ? `Reserved (${seat.passengerName})` : 'Available'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={isAnyBusy || !p1Name.trim()}
            onClick={() => onBookSingle(1)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Ticket className="w-4 h-4 shrink-0" aria-hidden="true" />
            {loadingP1 ? 'Acquiring Lock...' : 'Book Seat'}
          </button>

          {singleFeedback && singleFeedback.passengerIndex === 1 && (
            <div
              role="status"
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                singleFeedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {singleFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span>{singleFeedback.message}</span>
            </div>
          )}
        </div>
      </section>

      {/* Passenger 2 Card */}
      <section
        aria-label="Passenger 2 booking"
        className="bg-white border border-slate-200 rounded-xl overflow-hidden"
      >
        <div className="bg-indigo-600 text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-100" aria-hidden="true" />
            <h2 className="text-sm font-semibold">Passenger 2</h2>
          </div>
          <span className="text-[11px] font-mono text-indigo-100">Thread B</span>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label htmlFor="p2-name" className="block text-xs font-medium text-slate-700 mb-1">
              Passenger Name
            </label>
            <input
              id="p2-name"
              type="text"
              value={p2Name}
              onChange={(e) => onP2NameChange(e.target.value)}
              placeholder="Enter passenger name"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="p2-seat" className="block text-xs font-medium text-slate-700 mb-1">
              Select Seat
            </label>
            <select
              id="p2-seat"
              value={p2Seat}
              onChange={(e) => onP2SeatChange(e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {seats.map((seat) => (
                <option key={seat.id} value={seat.id}>
                  {seat.id} — {seat.status === 'reserved' ? `Reserved (${seat.passengerName})` : 'Available'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={isAnyBusy || !p2Name.trim()}
            onClick={() => onBookSingle(2)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Ticket className="w-4 h-4 shrink-0" aria-hidden="true" />
            {loadingP2 ? 'Acquiring Lock...' : 'Book Seat'}
          </button>

          {singleFeedback && singleFeedback.passengerIndex === 2 && (
            <div
              role="status"
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                singleFeedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {singleFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span>{singleFeedback.message}</span>
            </div>
          )}
        </div>
      </section>

      {/* Simultaneous Booking Simulation Trigger */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <button
          type="button"
          disabled={isAnyBusy || !p1Name.trim() || !p2Name.trim()}
          onClick={onTestSimultaneous}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 border border-amber-500 rounded-xl transition-colors cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4 fill-slate-950 shrink-0" aria-hidden="true" />
          <span>{loadingSimultaneous ? 'Running Concurrent Race...' : 'Test Simultaneous Booking'}</span>
        </button>
        <p className="text-xs text-slate-600 text-center">
          Fires both requests simultaneously for Seat <span className="font-mono font-semibold text-slate-900">{p1Seat}</span> using Mutex protection.
        </p>

        {simultaneousOutcome && (
          <div
            role="status"
            aria-live="polite"
            className="pt-2 border-t border-slate-100 space-y-2 text-xs"
          >
            <div className="font-semibold text-slate-700">
              Simultaneous Race Result (Seat {simultaneousOutcome.seatId}):
            </div>
            <div
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${
                simultaneousOutcome.firstSuccess
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {simultaneousOutcome.firstSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div>
                <span className="font-semibold">{simultaneousOutcome.firstPassenger}:</span>{' '}
                {simultaneousOutcome.firstSuccess
                  ? 'Booking Successful'
                  : 'Booking Failed — Seat Already Reserved'}
              </div>
            </div>

            <div
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${
                simultaneousOutcome.secondSuccess
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {simultaneousOutcome.secondSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div>
                <span className="font-semibold">{simultaneousOutcome.secondPassenger}:</span>{' '}
                {simultaneousOutcome.secondSuccess
                  ? 'Booking Successful'
                  : 'Booking Failed — Seat Already Reserved'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
