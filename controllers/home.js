const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {userId: req.session.userId})
})

module.exports = router
