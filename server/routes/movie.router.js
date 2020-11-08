const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// grab all the movies in movies table in DB
router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "movies"
              ORDER BY "title" ASC;`)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log(`ERROR in movie router ${err}`)
    res.sendStatus(500);
  });
})

// grab movie info from movies table in DB based on specific movie ID
router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM "movies" WHERE id=$1;`, 
    [req.params.id])      // $1
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log(`ERROR in movie ID router ${err}`)
    res.sendStatus(500);
  });
})


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const insertMovieGenreQuery = `
      INSERT INTO "MovieGenres" ("Movies_ID", "Genres_ID")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;