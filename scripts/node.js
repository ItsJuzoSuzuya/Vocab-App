const http = require("http");
const fs = require("fs");
const { debug } = require("util");
const port = 5500;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "/ext/html" });
  fs.readFile("Vocab-App/index.html", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(error);
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port", port);
  }
});
