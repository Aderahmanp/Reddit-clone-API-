const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topic')

router.post('/createTopic', topicController.newTopic)

router.put('/upVote/:id', topicController.upVote)

router.put('/downVote/:id', topicController.downVote)

router.get('/show', topicController.showTopic)

module.exports = router
