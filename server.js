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

// POST route for movies
app.post('/api/add-movie', (req, res) => {
    console.log("attempting to add " + req.body.movie_name);
    if (req.body.movie_name) {
        db.query('INSERT INTO movies (movie_name) VALUES (?)', req.body.movie_name, function (err, results) {
            if (err) throw err;
            console.log(results);
        });
        res.status(200);
        res.send("Movie added!")
    } else {
        res.status(400);
        res.send("Error adding movie :(");
    }
});

// POST route for reviews
app.post('/api/update-review', (req, res) => {
    console.log("attempting to add review " + req.body.movie_id + " " + req.body.review);
    if (req.body.movie_id && req.body.review) {
        db.query('INSERT INTO reviews (movie_id, review) VALUES (?, ?)', [req.body.movie_id, req.body.review], function (err, results) {
            if (err) throw err;
            console.log(results);
        });
        res.status(200);
        res.send("Review added!")
    } else {
        res.status(400);
        res.send("Error adding review :(");
    }
});

// DELETE route


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);