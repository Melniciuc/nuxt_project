CREATE TABLE `telemetry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`speed_kmh` real NOT NULL,
	`acc_x` real NOT NULL,
	`acc_y` real NOT NULL,
	`acc_z` real NOT NULL,
	`recorded_at` real NOT NULL,
	`created_at` integer NOT NULL
);
