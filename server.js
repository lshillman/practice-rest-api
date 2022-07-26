const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    
    console.log(`Connected to the movies_db database.`));

// GET route
app.get('/api/movies', (req, res) =>
  {
    db.query('SELECT * FROM movies', function (err, results) {
        console.table(results);
        res.json(results);
    });
  }
);

// POST route

// PUT route

// DELETE route




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);