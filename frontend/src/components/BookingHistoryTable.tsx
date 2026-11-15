import { CalendarClock, CheckCircle2, RotateCcw, ShieldAlert, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { BookingRecord, BookingStatus } from '../types/reservation';

interface BookingHistoryTableProps {
  bookings: BookingRecord[];
  onCancelBooking: (bookingId: string) => void;
  cancellingId: string | null;
}

type HistoryFilter = 'all' | 'confirmed' | 'conflicts' | 'cancelled';

function renderStatusLabel(status: BookingStatus) {
  switch (status) {
    case 'Confirmed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Confirmed
        </span>
      );
    case 'Conflict Prevented':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md whitespace-nowrap">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Failed - Seat Already Reserved
        </span>
      );
    case 'Failed - Seat Already Reserved':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md whitespace-nowrap">
          <XCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Failed - Seat Already Reserved
        </span>
      );
    case 'Cancelled':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md whitespace-nowrap">
          <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Cancelled
        </span>
      );
  }
}

export function BookingHistoryTable({
  bookings,
  onCancelBooking,
  cancellingId,
}: BookingHistoryTableProps) {
  const [filter, setFilter] = useState<HistoryFilter>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'confirmed') return b.status === 'Confirmed';
    if (filter === 'conflicts') {
      return b.status === 'Conflict Prevented' || b.status === 'Failed - Seat Already Reserved';
    }
    if (filter === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <section
      aria-label="Booking history"
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
    >
      <div className="bg-[#12335B] text-white px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-blue-200" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight">Booking History</h2>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-[#0B223E] rounded-lg border border-white/10 self-start sm:self-auto">
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'conflicts', label: 'Conflicts' },
              { id: 'cancelled', label: 'Cancelled' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-100/80 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <th scope="col" className="py-3 px-4 whitespace-nowrap">Booking ID</th>
              <th scope="col" className="py-3 px-4 whitespace-nowrap">Passenger Name</th>
              <th scope="col" className="py-3 px-4 whitespace-nowrap">Seat Number</th>
              <th scope="col" className="py-3 px-4 whitespace-nowrap">Date &amp; Time</th>
              <th scope="col" className="py-3 px-4 whitespace-nowrap">Status</th>
              <th scope="col" className="py-3 px-4 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-xs text-slate-500">
                  No matching reservations found for this filter.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                    {booking.id}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                    {booking.passengerName}
                  </td>
                  <td className="py-2.5 px-4 font-mono tabular-nums font-semibold text-slate-800 whitespace-nowrap">
                    {booking.seatId}
                  </td>
                  <td className="py-2.5 px-4 font-mono tabular-nums text-xs text-slate-600 whitespace-nowrap">
                    {booking.timestamp}
                  </td>
                  <td className="py-2.5 px-4 whitespace-nowrap">
                    {renderStatusLabel(booking.status)}
                  </td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    {booking.status === 'Confirmed' ? (
                      <button
                        type="button"
                        disabled={cancellingId === booking.id}
                        onClick={() => onCancelBooking(booking.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors cursor-pointer disabled:opacity-55 whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                      </button>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
