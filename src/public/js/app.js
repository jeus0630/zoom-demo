// Put all your frontend code here.
const socket = new WebSocket("ws://localhost:3000");

const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const ul = document.querySelector("ul");

nicknameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = nicknameForm.querySelector("input");
    const obj = {
        type: "nickname",
        payload: input.value
    };
    socket.send(JSON.stringify(obj));
    input.value = "";
});

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    const obj = {
        type: "message",
        payload: input.value
    };
    socket.send(JSON.stringify(obj));
    input.value = "";
});

socket.addEventListener("message", ({ data }) => {
    const li = `<li>${data}</li>`;
    ul.insertAdjacentHTML("beforeend", li);
});
