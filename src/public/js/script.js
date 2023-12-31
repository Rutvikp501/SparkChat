const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

room = room.trim()
username = username.trim()

function copyLink() {
  navigator.clipboard.writeText(room);
  copyAlert()
}

if (username.split("").length <= 3 || room.length < 36) {
  alert('Username should be longer than 3 characters and the roomID has to be in uuid4 format')
  window.location.href = '/chatapp'
}


const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });



// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('span');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;

}

// Add users to DOM
function outputUsers(users) {
 
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});


// room copied
function copyAlert() {
  const url = room;

  Swal.fire({
    title:"Text Copied to Clipboard!",
    confirmButtonColor: '#4D4DBA',
    html: `You can also copy it manually here: <br> <div class="url-alert">${url}</div>`,
    showClass: {
       popup: 'animate__animated animate__fadeInDown'
     },
     hideClass: {
       popup: 'animate__animated animate__fadeOutUp'
     },
    backdrop: `
    #00000099`,
     heightAuto:'false',
     confirmButtonText: 'Ok',
     cancelButtonText: 'No, go back !',
     allowOutsideClick: false ,
     allowEscapeKey:false,
     allowEnterKey:false,
     keydownListenerCapture:true,


  })
}