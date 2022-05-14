const express = require('express');
//middleware funtion place holder

const server = express();

const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})


module.exports = server;
