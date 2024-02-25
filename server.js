const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

app.get('/course/detail', (req, res) => {
    pool.query('SELECT * FROM trn_course_detail', (error, results) => {
    if (error) {
        res.status(500).send('Internal Server Error');
        return;
    }
    res.json(results);
    });
}); 

const PORT = process.env.PORT || 11230;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
