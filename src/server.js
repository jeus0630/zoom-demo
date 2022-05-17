import http from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("home");
})

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", function connection(socket) {
    sockets.push(socket);
    socket["nickname"] = "anonymous";
    socket.on("close", () => {
        console.log('disconnected from browser');
    })

    socket.on("message", message => {
        const data = JSON.parse(message.toString());

        if (data.type === 'text') {
            console.log({ ...data, nickname: socket.nickname });
            sockets.map(aSocket => aSocket.send(JSON.stringify({ ...data, nickname: socket.nickname })));
        }

        if (data.type === 'nickname')
            socket["nickname"] = data.payload;

    })
})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
})