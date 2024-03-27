const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

dotenv.config({ path: './config.env' })
const mongoURI = `mongodb+srv://${process.env.EMAIL}:${process.env.PASSWORD}@cluster0.dy55g1k.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const connectToMongo = () => {

    mongoose.connect(mongoURI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB Atlas');
    });


}
module.exports = connectToMongo;