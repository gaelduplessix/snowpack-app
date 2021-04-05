const http = require('http');
const ws = require('nodejs-websocket');

// Test HTTP Server
const server = http.createServer();
server.listen(3001);
server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"hello":"world"}');
  res.end();
});

// Test WS Server
ws.createServer(function (conn) {
  console.log('New connection');
  conn.on('text', function (str) {
    console.log('Received ' + str);
    conn.sendText(str.toUpperCase() + '!!!');
  });
  conn.on('close', function (code, reason) {
    console.log('Connection closed');
  });
  conn.on('error', () => {
    console.log('Connection error');
  });
}).listen(3002);
