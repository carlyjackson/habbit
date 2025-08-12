import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  ssl: { rejectUnauthorized: false },
});

// Test connection and create table if not exists
interface QueryResultRow {
  now?: string;
}

interface QueryError extends Error {
  stack?: string;
}

pool.query(
  'SELECT NOW()',
  (err: QueryError | null, res: { rows?: QueryResultRow[] } | undefined) => {
    if (err) {
      console.error('Error connecting to RDS PostgreSQL:', err.stack);
    } else {
      console.log('Connected to RDS PostgreSQL!', res?.rows?.[0]);
      // Create habbits table if it doesn't exist
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS habbits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(1000),
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
      pool
        .query(createTableQuery)
        .then(() => console.log('Table "habbits" is ready!'))
        .catch((err: QueryError) =>
          console.error('Error creating table:', err)
        );
    }
  }
);

export default pool;
