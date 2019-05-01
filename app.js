const express = require('express')
const topicRoutes = require('./routes/topic')

// initialise PORT
const PORT = process.env.PORT || 1234

// Running Express Aplication
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// initilization of plug'in Middleware, Routes
app.use('/',topicRoutes)

// Listen server
app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`)
})

module.exports = app