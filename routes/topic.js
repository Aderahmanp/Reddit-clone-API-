const express = require('express'),
      router = express.Router(),
      topicController = require('../controllers/topic')


// Testing Router

router.get('/', function(req, res) {
    res.send('Welcome to routes')
})

router.post('/createTopic', topicController.newTopic),

router.put('/upVote/:id', topicController.upVote)

router.put('/downVote/:id', topicController.downVote)

router.get('/show', topicController.showTopic)



module.exports = router                             