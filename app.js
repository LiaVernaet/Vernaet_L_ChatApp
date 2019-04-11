// initialize an express app and set it up 
const express = require('express');
const app = express();
const io = require('socket.io')();
var http = require('http').Server(app);
var fs = require('fs');
var clients = io.sockets.clients();
console.log("connected be the".clients);
var socket = io.connect();
// var uploader = new SocketIOFileUpload(socket);

// uploader.listenOnInput(document.getElementById("fileUploader"));

// var userCount = 0;
// console.log(userCount);

// app.use(express.static(__dirname, '/'));

// io.on('connection', function(socket){
//   fs.readFile('image.png', function(err, data){
//     socket.emit('imageConversionByClient', { image: true, buffer: data });
//     socket.emit('imageConversionByServer', "data:image/png;base64,"+ data.toString("base64"));
//   });
// });

// some config stuff
const port = process.env.PORT || 3000;

// tell our app to use the public folder for static files
app.use(express.static('public'));

// instantiate the only route we need
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server variable for socket.io to use
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// socket.io chat app stuff to follow
//plug in the chat app package
 io.attach(server);

// socket.set('nickname', 'Guest');

// for (var socketId in io.sockets.sockets) {
//     io.sockets.sockets[socketId].get('nickname', function(err, nickname) {
//         console.log(nickname);
//     });
// }

// io.on('connection', function(socket){
//     console.log('a user has connected', socket);
//     socket.emit('connected', {sID:`${socket.id}`, message: 'new connection'} );
    // userCount++;


    ///listen for incoming messages and send them to everyone

    socket.on('chat message', function(msg) {
        //check the message contents
        console.log('message', msg, 'socket', socket.id);

        //send a message to every connected client
        io.emit('chat message', { id: `${socket.id}`, message: msg});
    })

    socket.on('user nickname', function(usr) {
        //check the message contents
        console.log('nickname', usr, 'socket', socket.id);

        //send a message to every connected client
        io.emit('user nickname', { id: `${socket.id}`, nickname: usr});
    })

    // socket.on('user image', function(img) {
    //     //check the message contents
    //     console.log('image', img, 'socket', socket.id);

    //     //send a message to every connected client
    //     io.emit('user image', { id: `${socket.id}`, image: img});
    // })


    socket.on('disconnect', function() {
        console.log('a user has disconnected');
        // userCount--;
    });
    

    
});
