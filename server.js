const express = require('express');
const app = express();
const cors = require('cors');

const courseRoutes = require('./routes/course');
const userRoutes = require('./routes/user');
const enrollRoutes = require('./routes/enroll');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/course", courseRoutes);
app.use('/users', userRoutes);
app.use('/enroll', enrollRoutes);

app.listen(11230, () => {
    console.log('Server is running on port 11230');
});


