import ChatMessage from './modules/ChatMessage.js'
import UserNickname from './modules/UserNickname.js'

const socket = io();

//removing bottom lines crashes program
// socket.set('nickname', 'Guest');

// for (var socketId in io.sockets.sockets) {
//     io.sockets.sockets[socketId].get('nickname', function(err, nickname) {
//         console.log(nickname);
//     });
// }
//
var userCount;
function setUserId({sID, message}) {
    // debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;

    userCount++;
    console.log(userCount);

}

function appendMessage(message) {
    vm.messages.push(message);
}

function appendUser(nickname) {
    vm.users.push(nickname);
}

// function appendImage(image) {
//     vm.images.push(image);
// }

const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        image: "",
        messages: [],
        users: []
    },

    methods: {
        dispatchMessage(){
            //send a chat message
            socket.emit('chat message', { content: this.message, image: this.image, name: this.nickname || "Anonymous"} );

            this.message="";

        },

        dispatchUser(){
            
            socket.emit('user nickname', { content: this.nickname || "Anonymous"} );

          }
        //,  dispatchImage(){
            
        //      socket.emit('image', { image: true, buffer: buf.toString('base64') });

        //  }
    },

    components: {
        newmessage: ChatMessage,
        newuser: UserNickname,
        // newimage: UserImage
    }
}).$mount("#app");


// function b64(e){var t="";var n=new Uint8Array(e);var r=n.byteLength;for(var i=0;i<r;i++){t+=String.fromCharCode(n[i])}return window.btoa(t)}

// $(document).ready(function() {
  
//   var socket = io();

//   socket.on('imageConversionByClient', function(data) {
//     $("#img").attr("src","data:image/png;base64,"+b64(data.buffer));
//   });

//   socket.on('imageConversionByServer', function(data) {
//     $("#img2").attr("src",data);
//   });

// });


socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);

// socket.addEventListener('user image', appendImage);
// socket.addEventListener('disconnect', appendImage);

socket.addEventListener('user nickname', appendUser);
socket.addEventListener('disconnect', appendUser);