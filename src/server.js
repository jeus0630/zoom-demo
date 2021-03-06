import http from "http";
import WebSocket from "ws";
import express from "express";
import SocketIO from 'socket.io';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on('connection', socket => {
    socket.on("room", (msg, done) => {
        socket.join(msg.payload);
        done();
        socket.to(msg.payload).emit("welcome", `${socket.nickname} has joined!`);
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye", `${socket.nickname} left!`));
    })

    socket.on("newMessage", (roomName, msg, done) => {
        done();
        socket.to(roomName).emit("newMessage", `${socket.nickname}: ${msg}`);
    })

    socket.on("nickname", (name, done) => {
        socket.nickname = name;
        done();
    })
})

// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "anonymous";

//     socket.on("message", (message) => {
//         const obj = JSON.parse(message.toString());

//         if (obj.type === "nickname") {
//             socket["nickname"] = obj.payload;
//             return;
//         }

//         if (obj.type === "message") {
//             const msg = `${socket.nickname}: ${obj.payload}`;
//             sockets.map((socketEl) => socketEl.send(msg));
//         }
//     });
// });

httpServer.listen(3000, handleListen);
