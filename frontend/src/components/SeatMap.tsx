import { Bus, Check, Compass, Lock, TrainFront, X } from 'lucide-react';
import type { Seat, VehicleMode } from '../types/reservation';

export type SelectionTarget = 'p1' | 'p2' | 'both';

interface SeatMapProps {
  vehicleMode: VehicleMode;
  seats: Seat[];
  selectedSeatP1: string;
  selectedSeatP2: string;
  selectionTarget: SelectionTarget;
  onSelectionTargetChange: (target: SelectionTarget) => void;
  onSelectSeat: (seatId: string) => void;
}

export function SeatMap({
  vehicleMode,
  seats,
  selectedSeatP1,
  selectedSeatP2,
  selectionTarget,
  onSelectionTargetChange,
  onSelectSeat,
}: SeatMapProps) {
  const rowNumbers = Array.from(new Set(seats.map((s) => s.row))).sort((a, b) => a - b);

  const renderSeatButton = (seat: Seat) => {
    const isSelectedP1 = seat.id === selectedSeatP1;
    const isSelectedP2 = seat.id === selectedSeatP2;
    const isSelected = (isSelectedP1 || isSelectedP2) && seat.status === 'available';

    let styleClass =
      'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 cursor-pointer';
    let stateText = 'Available';
    let StateIcon = Check;

    if (seat.status === 'processing') {
      styleClass =
        'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300 cursor-wait';
      stateText = 'Locked';
      StateIcon = Lock;
    } else if (seat.status === 'reserved') {
      styleClass =
        'bg-rose-600 text-white border-rose-700 cursor-pointer hover:bg-rose-700';
      stateText = 'Reserved';
      StateIcon = X;
    } else if (isSelected) {
      styleClass =
        'bg-blue-600 hover:bg-blue-700 text-white border-blue-700 ring-2 ring-blue-300 ring-offset-1 cursor-pointer';
      stateText = 'Selected';
      StateIcon = Check;
    }

    const selectionLabel =
      seat.status === 'available' && isSelectedP1 && isSelectedP2
        ? 'P1 & P2'
        : seat.status === 'available' && isSelectedP1
          ? 'P1'
          : seat.status === 'available' && isSelectedP2
            ? 'P2'
            : null;

    return (
      <button
        key={seat.id}
        type="button"
        onClick={() => onSelectSeat(seat.id)}
        title={
          seat.status === 'reserved'
            ? `Seat ${seat.id} — Reserved by ${seat.passengerName}`
            : seat.status === 'processing'
              ? `Seat ${seat.id} — Critical Section Locked by ${seat.lockedBy}`
              : `Click to select Seat ${seat.id}`
        }
        aria-label={`Seat ${seat.id}, ${stateText}${seat.passengerName ? `, reserved by ${seat.passengerName}` : ''}`}
        className={`relative h-14 sm:h-15 rounded-lg border font-mono font-semibold transition-all duration-150 flex flex-col items-center justify-center px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${styleClass}`}
      >
        <div className="flex items-center gap-1 text-sm leading-none">
          <StateIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{seat.id}</span>
        </div>
        <span className="text-[10px] font-sans font-medium opacity-90 mt-1 truncate max-w-full">
          {seat.status === 'reserved' && seat.passengerName
            ? seat.passengerName.split(' ')[0]
            : seat.status === 'processing'
              ? 'Locking...'
              : selectionLabel
                ? `Selected (${selectionLabel})`
                : 'Open'}
        </span>
      </button>
    );
  };

  return (
    <section
      aria-label="Visual seat layout"
      className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full"
    >
      <div className="bg-[#12335B] text-white px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {vehicleMode === 'bus' ? (
            <Bus className="w-4 h-4 text-blue-200" aria-hidden="true" />
          ) : (
            <TrainFront className="w-4 h-4 text-blue-200" aria-hidden="true" />
          )}
          <h2 className="text-sm font-semibold tracking-tight">
            {vehicleMode === 'bus' ? 'Seat Layout - Bus' : 'Seat Layout - Train Coach'}
          </h2>
        </div>
        <span className="text-xs text-blue-100/85 font-mono tabular-nums">
          {seats.length} Seats
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-600 inline-block" aria-hidden="true" />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" aria-hidden="true" />
              Selected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-600 inline-block" aria-hidden="true" />
              Reserved
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" aria-hidden="true" />
              Locked / Processing
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-200/75 text-slate-700 text-xs font-semibold">
            <Compass className="w-4 h-4 text-slate-600" aria-hidden="true" />
            <span>{vehicleMode === 'bus' ? 'Front of Bus' : 'Front of Train Coach'}</span>
          </div>

          <div className="space-y-3">
            {rowNumbers.map((rowNum) => {
              const leftSeats = seats
                .filter((s) => s.row === rowNum && s.side === 'left')
                .sort((a, b) => a.position - b.position);
              const rightSeats = seats
                .filter((s) => s.row === rowNum && s.side === 'right')
                .sort((a, b) => a.position - b.position);

              return (
                <div
                  key={rowNum}
                  className="grid grid-cols-[1fr_28px_1fr] sm:grid-cols-[1fr_44px_1fr] items-center gap-2"
                >
                  <div className="grid grid-cols-2 gap-2.5">
                    {leftSeats.map(renderSeatButton)}
                  </div>
                  <div className="text-center text-[11px] font-mono text-slate-400 select-none">
                    R{rowNum}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {rightSeats.map(renderSeatButton)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-200/75 text-slate-700 text-xs font-semibold">
            {vehicleMode === 'bus' ? (
              <Bus className="w-4 h-4 text-slate-600" aria-hidden="true" />
            ) : (
              <TrainFront className="w-4 h-4 text-slate-600" aria-hidden="true" />
            )}
            <span>{vehicleMode === 'bus' ? 'Back of Bus' : 'Rear Vestibule'}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-600">
          <span>Click any seat to assign to:</span>
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
            {(
              [
                { id: 'both', label: 'Both Passengers' },
                { id: 'p1', label: 'Passenger 1' },
                { id: 'p2', label: 'Passenger 2' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectionTargetChange(opt.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectionTarget === opt.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
