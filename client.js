// jshint esversion:6
let PORT = process.env.PORT || 6969;
const net = require('net');

const server = new net.Socket();
server.connect(PORT, '10.0.1.161', () => {
console.log(`connectedtoServer, ${PORT}`, "daddio!");
  // |---- readable
  // v                 v---- writable
  process.stdin.pipe( server );

  // |---- readable
  // v         v---- writable
  server.pipe( process.stdout );
});

