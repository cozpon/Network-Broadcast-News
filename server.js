
// jshint esversion:6
const clients = [];
const net = require('net');

const server = net.createServer((client) => {
  // server is creating connection to client Socket.
  client.setEncoding('utf8');
  client.on('data', (chunk) => {
    console.log(chunk);
  });


  client.on('end', () => { // on client disconnection
    console.log('disconnected from server!');
  });
  client.pipe(client);
  client.write('hello from the Server.');

  clients.push(server.address());
  console.log(clients); // put client information into array
});

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log("Server Active, daddio!");
});

// client.setMaxListeners(infinity);
 //client.destroy(); // kill client after server's response