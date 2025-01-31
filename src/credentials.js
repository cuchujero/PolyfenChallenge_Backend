require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const SESSION_KEY = process.env.SESSION_KEY;


module.exports = {
    MONGO_URI,
    SESSION_KEY
}