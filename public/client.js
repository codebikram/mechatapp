//connection socket
const socket = io();

let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message-area');
let button = document.querySelector('.btn-send')


//get name
let name;
do {
    name = prompt("Enter your name: ")

} while (!name)

//enter button press event
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// send click event
button.addEventListener('click', () => {
    let message = textarea.value
    // console.log(message)
    sendMessage(message)
})

// send message function
function sendMessage(message) {
    let msg = {
        userName: name,
        message: message.trim()
    }
    // console.log(msg)
    // append message
    appendMessage(msg, 'outgoing')
    textarea.value = ""
    scrollToBottom()

    //send to server
    socket.emit('message', msg)

}

//apppend message function
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markUp = `
    <h4> ${msg.userName} </h4>
    <p> ${msg.message} </p>
    `
    mainDiv.innerHTML = markUp

    messagearea.appendChild(mainDiv)

}
//scroll function
function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}

//receive msg
socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})