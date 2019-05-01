const express = require('express'),
      Topic = require('../models/topic'),
      randomId = require('random-id')


// Generate Random Id
let pattern = 'moovast'
let len = 30
let start = 0
let topicArray = []

// Create New Topic with validation Maximum Character
exports.newTopic = function ( req, res) {
    var id = randomId (len, pattern)
    if (req.body.title.length > 255) {
        return res.status(400).json ({
            success: false,
            message : ' maximum Character 255'
        })
    } 

    else {
        for ( i = 0; i < topicArray.length; i++ ) {
            if ( topicArray[i].title === req.body.title) {
                return res.status(400).json ({
                    success: false,
                    message: 'Topic Already exist'
                })
            }
        }
        
        let newTopic = {
            ...Topic,
            id: id,
            title: req.body.title
        }

        topicArray.push(newTopic)
        res.status (200).json ({
            success : true,
            'data'  : topicArray
        })
    }   
}

// upVote the Topic
exports.upVote = function ( req, res ) {
    for ( i = 0; i < topicArray.length; i++) {
        if (topicArray[i].id === req.params.id) {
            topicArray[i].upVote += 1
            res.status (200).json ({
                success : true,
                'data' : topicArray[i]
                
            })
        }
    }
}

// downVote the Topic
exports.downVote = function ( req, res) {
    for ( i =0; i < topicArray.length; i++) {
        if (topicArray[i].id === req.params.id) {
            topicArray[i].downVote += 1
            res.status (200).json ({
                success : true,
                'data' : topicArray[i]
            })
        }
    }
}

//Show Top 20 Best Upvote
exports.showTopic = function (req, res) {
    const show = topicArray.sort( function (a,b) {
        return b.upVote - a.upVote
    }) .slice(0,20)
    res.status (200).json ({
        success: true,
        'data' : show
    })
}