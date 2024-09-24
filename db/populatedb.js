const { Client } = require("pg");
require("dotenv").config();

const createSemestersTable = `
    CREATE TABLE IF NOT EXISTS semesters (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        year INTEGER,
        semester VARCHAR(255),
        UNIQUE (year, semester)
    );
`;

const createCoursesTable = `
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        code VARCHAR(100),
        name VARCHAR(255),
        description VARCHAR(500),
        subject VARCHAR(255),
        semester_id INTEGER,
        FOREIGN KEY (semester_id) REFERENCES semesters(id),
        UNIQUE (code, name, description, subject, semester_id)
    );
`;

const insertSemesters = `
    INSERT INTO semesters (year, semester)
    VALUES (2023, 'fall'), (2024, 'winter'), (2024, 'summer')
    ON CONFLICT DO NOTHING;  -- Prevents duplicates if running multiple times
`;

const insertCourses = `
    INSERT INTO courses (code, name, description, subject, semester_id) 
    VALUES 
    ('csca08', 'intro to computer science I', 'brief intro to python and computer science topics', 'computer science', 1),
    ('csca48', 'intro to computer science II', 'intro to C and computer science topics', 'computer science', 2),
    ('cscab07', 'intro to software design', 'intro to software design topics', 'computer science', 3)
    ON CONFLICT DO NOTHING;  -- Prevents duplicates if running multiple times
`;

async function main() {
    console.log("seeding....");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });

    try {
        await client.connect();
        
        // Execute each SQL statement separately
        await client.query(createSemestersTable);
        await client.query(createCoursesTable);
        await client.query(insertSemesters);
        await client.query(insertCourses);
        
        console.log("done");
    } catch (err) {
        console.error("Error executing queries", err);
    } finally {
        await client.end();
    }
}

main();

