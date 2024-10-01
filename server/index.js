const expres = require("express");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hellow World!</h1>");
});
