const express = require('express')
const router = express.Router()
const run_sql = require('../db')
const bcrypt = require('bcrypt')

// methods for authentication
const validPassword = (plainTextPassword, passwordHash) => bcrypt.compareSync(plainTextPassword, passwordHash)

// Log in page
router.get('/log_in', (req, res) => {
  res.render('log_in')
})

// Logging a user in
router.post('/session', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  run_sql('SELECT * FROM users WHERE email = $1', [email], db_res => {
    if (db_res.rows.length == 0) {
      res.render('log_in')
    } else {
      const user = db_res.rows[0]
      if (validPassword(password, user.password_digest)) {
        req.session.userId = user.id
        res.redirect('/')
      } else {
        res.render('log_in')
      }
    }
  })
})

// Logging a user out
router.delete('/session', (req, res) => {
  req.session.userId = undefined
  req.session.destroy();
  res.redirect('/')
})

module.exports = router