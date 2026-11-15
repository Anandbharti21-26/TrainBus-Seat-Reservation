PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS seats (
    id TEXT PRIMARY KEY,
    row_number INTEGER NOT NULL,
    side TEXT NOT NULL,
    position INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'available',
    passenger_name TEXT,
    booking_id TEXT,
    locked_by TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    passenger_name TEXT NOT NULL,
    seat_id TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (seat_id) REFERENCES seats(id)
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    time TEXT NOT NULL,
    message TEXT NOT NULL,
    level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS system_stats (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    conflicts_prevented INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO system_stats (id, conflicts_prevented) VALUES (1, 0);
