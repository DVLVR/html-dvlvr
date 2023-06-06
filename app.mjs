import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { json } = express;

const app = express();
app.use(json());
app.use(cors());
app.use(express.static('.')); // Assuming that index.html is in the root of your project

// Create a new instance of Pool with the connection details of your PostgreSQL database
const { Pool } = pkg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CLUB',
  password: 'ZFlex29!',
  port: 5432,
});

app.get('/', (req, res) => {
  res.sendFile('index.html'); // Assuming that index.html is in the root of your project
});

app.post('/add_member', async (req, res) => {
  try {
    const { nombre, contacto, status } = req.body;

    // Execute the SQL query to insert a new member into the database
    const query = 'INSERT INTO public.socixs (nombre, contacto, status) VALUES ($1, $2, $3)';
    const values = [nombre, contacto, status];

    await pool.query(query, values);

    res.send('Bienvenide!');
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).send('Error adding member');
  }
});

app.listen(3000, () => console.log('Escuchando Puerto 3000!'));