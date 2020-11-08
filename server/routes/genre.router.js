const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // grab all genres names from the DB and used array_agg to create an 
  // array of genres and their corresponding movies in that genre
  pool.query(`SELECT "name", array_agg("title")
              FROM "genres"
              JOIN "MovieGenres" ON "genres"."id" = "MovieGenres"."Genres_ID"
              JOIN "movies" ON "MovieGenres"."Movies_ID" = "movies"."id"
              GROUP BY "genres"."id";`)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log(`ERROR in genre router ${err}`);
    res.sendStatus(500);
  });
});

// grab genres from DB by performing a many-many query to get related genres based off movie ID
router.get('/:id', (req, res) => {
  pool.query(`SELECT "name" FROM "MovieGenres"
              JOIN "movies" ON "MovieGenres"."Movies_ID" = "movies"."id"
              JOIN "genres" ON "MovieGenres"."Genres_ID" = "genres"."id"
              WHERE "Movies_ID" = $1;`, 
              [req.params.id])      // $1
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log(`ERROR in specifics genres router ${err}`);
    res.sendStatus(500);
  });
});

module.exports = router;