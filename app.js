const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/productRoute')
const customerRoutes = require('./routes/customer')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser');
const connectToMongo = require('./db');

connectToMongo();
app.use(cors());
// this use for rest api post man requests
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, '../storemanager', 'build')));
// app.use('/', express.static(path.join(__dirname, 'public/build')));

// Serve images from a directory named 'uploads'
app.use('/', express.static('public'));

app.use('/', productRoutes);
app.use('/', customerRoutes);
app.use(authRoutes);

// add this line at the end of the code
app.use('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, './views/404.html'));
});

app.listen(port, () => {
    console.log(`your server is listening on port" http://localhost:${port}`)
})