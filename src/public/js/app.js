const ul = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const msgForm = document.querySelector('#message');

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {

});

// 서버에서 메세지 받을때
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    console.log(data);
    const li = `<li>${data.nickname}: ${data.payload}</li>`
    ul.insertAdjacentHTML('beforeend', li);
});

// 서버에서 종료했을때
socket.addEventListener('close', function (event) {
    console.log('Bye Server!');
})

nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = nickForm.querySelector('input');
    const { value } = input;
    input.value = null;
    socket.send(JSON.stringify({
        type: 'nickname',
        payload: value
    }));
})

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = msgForm.querySelector('input');
    const { value } = input;
    input.value = null;
    socket.send(JSON.stringify({
        type: 'text',
        payload: value
    }));
})