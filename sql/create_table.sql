CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Schedules (
    scheduleID SERIAL PRIMARY KEY,
    userid int NOT NULL,
    sday int,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid)
);