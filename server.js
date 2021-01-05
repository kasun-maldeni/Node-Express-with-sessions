// packages required
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const methodOverride = require('method-override')

// Database
const run_sql = require('./db')

// controllers
const homeRoutes = require('./controllers/home')
const userRoutes = require('./controllers/users')
const sessionRoutes = require('./controllers/sessions')

const PORT = 4567
let app = express()

// setting views to work with ejs
app.set('view engine', 'ejs')

// setting public folder
app.use(express.static('public'))

// allowing POST requests to send parameters in the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allowing PATCH and DELETE requests to come through
app.use(methodOverride('_method'))

// enabling sessions
app.use(session({
  key: 'user_sid',
  secret: process.env['EXPRESS_SESSION_SECRET_KEY'],
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))

// ROUTES
app.use(homeRoutes)
app.use(userRoutes)
app.use(sessionRoutes)

// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
