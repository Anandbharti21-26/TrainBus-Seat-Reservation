import { Bus, CheckCircle2, RotateCcw, TrainFront } from 'lucide-react';
import type { VehicleMode } from '../types/reservation';

interface HeaderBarProps {
  vehicleMode: VehicleMode;
  onVehicleModeChange: (mode: VehicleMode) => void;
  onResetDemo: () => void;
  isBusy: boolean;
}

export function HeaderBar({
  vehicleMode,
  onVehicleModeChange,
  onResetDemo,
  isBusy,
}: HeaderBarProps) {
  return (
    <header className="bg-[#0F294A] text-white border-b border-slate-800/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
            {vehicleMode === 'bus' ? (
              <Bus className="w-6 h-6 text-blue-200" aria-hidden="true" />
            ) : (
              <TrainFront className="w-6 h-6 text-blue-200" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Train/Bus Seat Reservation System
            </h1>
            <p className="text-sm text-blue-100/85 font-normal">
              Race Condition &amp; Mutex Demonstration
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center bg-[#091B33] p-1 rounded-lg border border-white/10"
            role="group"
            aria-label="Vehicle layout selector"
          >
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onVehicleModeChange('bus')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 ${
                vehicleMode === 'bus'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-100/80 hover:text-white'
              }`}
            >
              <Bus className="w-3.5 h-3.5" aria-hidden="true" />
              Bus (12 Seats)
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onVehicleModeChange('train')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 ${
                vehicleMode === 'train'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-100/80 hover:text-white'
              }`}
            >
              <TrainFront className="w-3.5 h-3.5" aria-hidden="true" />
              Train (16 Seats)
            </button>
          </div>

          <button
            type="button"
            disabled={isBusy}
            onClick={onResetDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-blue-50 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Demo
          </button>

          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#0B223E] border border-emerald-400/30 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <div className="leading-tight">
              <div className="text-xs font-semibold text-white whitespace-nowrap">
                System Online
              </div>
              <div className="text-[11px] text-emerald-200/90 whitespace-nowrap">
                Booking System Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
