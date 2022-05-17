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

wss.on("connection", function connection(socket) {
    socket.send("Hello!!");

    socket.on("close", () => {
        console.log('disconnected from browser');
    })

    socket.on("message", message => {
        console.log(message.toString());
    })
})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
})