// ************ Requires ************
const express = require('express');
const methodOverride =  require('method-override'); 
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
const cors = require('cors');
const {SESSION_KEY}  = require('./credentials');
const app = express();

// ************ Middlewares ************
app.use(cors())
app.use(session(
  {cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 //expired entries every 24h
  }),
  secret: SESSION_KEY,
  resave: true,
  secret: 'keyboard cat',
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 

// ************ Route System ************
const mainRouter = require('./routes/mainRouter'); 
app.use('/', mainRouter);

// ************ Server ************
app.listen(process.env.PORT || 3000, function() {
  console.log("Server running in port 3000");
})

