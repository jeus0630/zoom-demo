import io from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room", { payload: input.value }, () => {
        console.log(123);
    });
    input.value = '';
})