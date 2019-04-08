import ChatMessage from './modules/ChatMessage.js'
import UserNickname from './modules/UserNickname.js'

// var app = new Vue({
//     el: '#users',
//     data: {
//       userCount: 0
//     }
//   })

const socket = io();

function setUserId({sID, message}) {
    // debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;

}

function appendMessage(message) {
    vm.messages.push(message);
}

function appendUser(nickname) {
    vm.users.push(nickname);
}

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
    },

    components: {
        newmessage: ChatMessage,
        newuser: UserNickname
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);

socket.addEventListener('user nickname', appendUser);
socket.addEventListener('disconnect', appendUser);