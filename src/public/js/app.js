import io from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector("form");

const message = document.querySelector('#message');
const form2 = message.querySelector("form");

const h1 = document.querySelector('#roomName');
const ul = document.querySelector('ul');


message.hidden = true;

let roomName;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const value = input.value;
    roomName = value;
    socket.emit("room", { payload: input.value }, () => {
        welcome.hidden = true;
        message.hidden = false;
        h1.innerHTML = value;
    });
    input.value = '';
})

form2.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form2.querySelector("input");
    const value = input.value;
    socket.emit("newMessage", roomName, value, () => {
        const li = `<li>Me: ${value}</li>`
        ul.insertAdjacentHTML('beforeend', li);
    });
    input.value = '';
})

socket.on("welcome", (msg) => {
    console.log(msg);
})

socket.on("bye", (msg) => {
    console.log(msg);
})

socket.on("newMessage", msg => {
    const li = `<li>${msg}</li>`
    ul.insertAdjacentHTML('beforeend', li);
})