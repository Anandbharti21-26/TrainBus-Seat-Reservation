# Backend - Train/Bus Seat Reservation System

Express + TypeScript backend.

## Run
```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

Main API:
- `GET /api/health`
- `GET /api/state`
- `POST /api/book`
- `POST /api/cancel`
- `POST /api/reset`
- `POST /api/vehicle`

The booking critical section is protected by an async mutex so simultaneous requests cannot confirm the same seat.
Data is persisted in SQLite through the database module.
