# Train/Bus Seat Reservation System - Separated Project

This version separates the college project into three parts:

1. `frontend/` - React dashboard
2. `backend/` - Express API + mutex logic
3. `database/` - SQLite schema and database helper

## Run

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in Terminal 2, normally:
`http://localhost:5173`

The frontend proxies `/api` requests to the backend at port 3000.

## OS Concept Demonstrated

Two passengers can request the same seat almost simultaneously. The backend uses a mutex around the critical section:

Request -> Mutex Lock -> Critical Section -> Seat Check -> Booking -> Unlock

Only one passenger can successfully reserve the same seat.
