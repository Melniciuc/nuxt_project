CREATE TABLE `acceleration_telemetry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`acc_x` real NOT NULL,
	`acc_y` real NOT NULL,
	`acc_z` real NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `position_telemetry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	`z` real NOT NULL,
	`speed_kmh` real NOT NULL,
	`created_at` integer NOT NULL
);
