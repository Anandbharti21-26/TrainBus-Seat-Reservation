export type VehicleMode = 'bus' | 'train';

export type SeatStatus = 'available' | 'reserved' | 'processing';

export interface Seat {
  id: string;
  row: number;
  side: 'left' | 'right';
  position: number;
  status: SeatStatus;
  passengerName: string | null;
  bookingId: string | null;
  lockedBy: string | null;
}

export type BookingStatus =
  | 'Confirmed'
  | 'Failed - Seat Already Reserved'
  | 'Conflict Prevented'
  | 'Cancelled';

export interface BookingRecord {
  id: string;
  passengerName: string;
  seatId: string;
  timestamp: string;
  status: BookingStatus;
}

export type LogLevel = 'info' | 'lock' | 'check' | 'success' | 'release' | 'error' | 'cancel';

export interface ActivityLogEntry {
  id: string;
  time: string;
  message: string;
  level: LogLevel;
}

export interface MutexSnapshot {
  locked: boolean;
  holder: string | null;
  waitingQueue: string[];
  activeStep: 'idle' | 'request' | 'mutex_acquire' | 'critical_section' | 'seat_check' | 'complete' | 'rejected';
  targetSeatId: string | null;
}

export interface ReservationStats {
  totalSeats: number;
  availableSeats: number;
  reservedSeats: number;
  conflictsPrevented: number;
}

export interface SystemState {
  vehicleMode: VehicleMode;
  seats: Seat[];
  bookings: BookingRecord[];
  logs: ActivityLogEntry[];
  stats: ReservationStats;
  mutex: MutexSnapshot;
}

export interface BookingApiResponse {
  success: boolean;
  booking: BookingRecord;
  message: string;
  state: SystemState;
}
