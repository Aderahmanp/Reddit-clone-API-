const express = require('express'),
      router = express.Router(),
      topicController = require('../controllers/topic')


// Testing Router

router.get('/', function(req, res) {
    res.send('Welcome to routes')
})

router.post('/createTopic', topicController.newTopic),





module.exports = router                             