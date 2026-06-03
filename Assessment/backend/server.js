const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST || 'database',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'app_db',
    port: process.env.DB_PORT || 5432
});

// Initialize database
async function initializeDatabase() {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                completed BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        client.release();
        console.log('✓ Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
        setTimeout(initializeDatabase, 2000);
    }
}

// API Routes
app.get('/api/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO todos (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

app.put('/api/todos/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle todo' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// Start server
async function start() {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`✓ Backend running on port ${PORT}`);
    });
}

start();
