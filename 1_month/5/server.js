const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  const resmaker = () => {
    if (req) {
      console.log(`Request ${TimeMarker}, ID: ${id}`);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World, request time ${TimeMarker},ID: ${id}`);
  };
  let TimeMarker = new Date();
  let id = req.url.split('=')[1];
  setTimeout(() => resmaker(), 100);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
