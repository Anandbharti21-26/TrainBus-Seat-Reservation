# Database

SQLite database for the Train/Bus Seat Reservation System.

Files:
- `schema.sql` - table structure
- `database.ts` - SQLite connection and initialization
- `reservation.db` - created automatically when the backend starts

Tables:
- `seats`
- `bookings`
- `activity_logs`
- `system_stats`

The database is used by the backend to persist seats, bookings, cancellation history, logs, and conflict counts.
