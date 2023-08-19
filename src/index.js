//import express app
const app = require('./app');
//secret variables
require('dotenv').config()
//http
const http = require('http');
//create port
const port = process.env.PORT || 5001;
const DBURL = process.env.DBURL;
const connectDB=require("./config/db.js")

// todo
// add mute and mut video btn in videochat

//importing all Logic needed for specific app
const ChatAppLogic = require('./handlers/chat_app/chatHandler');
const VideoAppLogic = require('./handlers/video_app/videoHandler')
//server creation
const server = http.createServer(app);

server.listen( port,async() => {
  try {
await connectDB()
    console.log('Listening on port ' + port);
  } catch (error) {
    console.log(error);
  }
 
})

//socket creation
const socketIo = require('socket.io');
const io = socketIo(server);


const onConnection = (socket) => {
  //all apps that launch on connection
  ChatAppLogic(io,socket);
  VideoAppLogic(io,socket);
};

//socket connection
io.on('connection', onConnection);