const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const db = require('./util/database');

const path = require('path');

const courseRoutes = require('./routes/course');
const userRoutes = require('./routes/user');
const enrollRoutes = require('./routes/enroll');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/course", courseRoutes);
app.use("/users", userRoutes);
app.use('/enroll', enrollRoutes);

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Upload API endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    const image = req.file.filename;
    res.json(image)
});

const storagePro = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profiles')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
});
const uploadPro = multer({ storage: storagePro });

// Upload API endpoint
app.post('/upload/profile', uploadPro.single('file'), (req, res) => {
    const image = req.file.filename;
    res.json(image)
});

app.listen(11230, () => {
    console.log('Server is running on port 11230');
});
