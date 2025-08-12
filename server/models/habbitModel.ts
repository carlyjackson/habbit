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

// === Habbit operations ===

// Create a habbit
export async function createHabbit({
  name,
  description,
  category,
}: {
  name: string;
  description?: string;
  category: string;
}) {
  const query = `
    INSERT INTO habbits (name, description, category)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, description || null, category];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Delete a habbit
export async function deleteHabbit(name: string) {
  const query = `DELETE FROM habbits WHERE name = $1 RETURNING *;`;
  const result = await pool.query(query, [name]);
  return result.rows[0];
}

// get all habbits 
export async function getAllHabbits() {
  const query = `SELECT * FROM habbits;`;
  const result = await pool.query(query);
  return result.rows;
}

export default pool;
