const express = require('express')
const router = express.Router()
const run_sql = require('../db')
const bcrypt = require('bcrypt')

// methods for password hashing
const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

// sign up page
router.get('/sign_up', (req, res) => {
  res.render('sign_up')
})

// Creating a new user
router.post('/users', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const password_digest = generateHash(password)
  run_sql('INSERT INTO users(email, password_digest) VALUES($1, $2)', [email, password_digest], db_res => {
    res.redirect('/')
  })
})

module.exports = router