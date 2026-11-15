import { Armchair, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import type { ReservationStats } from '../types/reservation';

interface StatsStripProps {
  stats: ReservationStats;
}

export function StatsStrip({ stats }: StatsStripProps) {
  const cards = [
    {
      label: 'Total Seats',
      value: stats.totalSeats,
      icon: Armchair,
      cardClass: 'bg-white border-slate-200',
      iconWrapClass: 'bg-blue-50 text-blue-600 border-blue-100',
      valueClass: 'text-slate-900',
    },
    {
      label: 'Available Seats',
      value: stats.availableSeats,
      icon: CheckCircle2,
      cardClass: 'bg-emerald-50/60 border-emerald-200/80',
      iconWrapClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      valueClass: 'text-emerald-950',
    },
    {
      label: 'Reserved Seats',
      value: stats.reservedSeats,
      icon: XCircle,
      cardClass: 'bg-rose-50/60 border-rose-200/80',
      iconWrapClass: 'bg-rose-100 text-rose-700 border-rose-200',
      valueClass: 'text-rose-950',
    },
    {
      label: 'Booking Conflicts Prevented',
      value: stats.conflictsPrevented,
      icon: ShieldCheck,
      cardClass: 'bg-indigo-50/60 border-indigo-200/80',
      iconWrapClass: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      valueClass: 'text-indigo-950',
    },
  ];

  return (
    <section aria-label="Reservation statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl border ${card.cardClass} transition-colors`}
          >
            <div
              className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${card.iconWrapClass}`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-600 truncate">
                {card.label}
              </div>
              <div className={`text-2xl font-bold font-mono tabular-nums leading-tight mt-0.5 ${card.valueClass}`}>
                {card.value}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
