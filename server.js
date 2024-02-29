const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration'
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/course', (req, res) => {
  pool.query('SELECT * FROM trn_course_detail', (error, results) => {
  if (error) {
      res.status(500).send('Internal Server Error');
      return;
  }
  res.json(results);
  });
});

app.get('/course/detail/:id', (req, res) => {
  const courseId = req.params.id;
  pool.query('SELECT * FROM trn_course_detail WHERE train_course_id = ?', [courseId], (error, results) => {
    if (error) {
      console.error('Error fetching course details:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Course not found');
      return;
    }
    res.json(results[0]);
  });
});


const PORT = process.env.PORT || 11230;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
