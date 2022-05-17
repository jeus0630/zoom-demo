const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// 서버에서 메세지 받을때
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// 서버에서 종료했을때
socket.addEventListener('close', function (event) {
    console.log('Bye Server!');
})