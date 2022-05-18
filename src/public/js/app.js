import io from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector("form");

const message = document.querySelector('#message');
const form2 = welcome.querySelector("form");

const h1 = document.querySelector('#roomName');

message.hidden = true;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const value = input.value;
    socket.emit("room", { payload: input.value }, () => {
        welcome.hidden = true;
        message.hidden = false;
        h1.innerHTML = value;
    });
    input.value = '';
})

socket.on("welcome", (msg) => {
    console.log(msg);
})