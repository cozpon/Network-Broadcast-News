
// jshint esversion:6

const net = require('net'); // load TCP library
const clients = []; // store Chat Clients
let PORT = process.env.PORT || 6969;


// once you get data from client, broadcast it to all clients
const broadcast = (sender, message) => clients
  .filter(c => c !== sender)
  .forEach(c => {
    c.write(message.toString());
  });


// Start a TCP server
const server = net.createServer((client) => { // "connection" listener
  console.log("New Client Connected");
  clients.push( client ); // puts client into storage list
  client.username = null;
  // prompt for username
  client.write("What is your username, daddio?\n");
  client.on('data', (data) => {
    // the first message should be client's username
    if( client.username === null){
      // set the username to data
      client.username = data.slice(0, data.length - 1).toString();
      client.write(`Welcome ${client.username}\n`);
      console.log(clients);
    } else {
      // broadcast the message to all other clients
      broadcast(client, `${client.username}:` + data.toString());
    }
  });
  client.on('end', () => {
    clients.splice(clients.indexOf(client), 1);
    broadcast(client, `${client.username}: left the chat.\n`);
    console.log('Client disconnected');
  });



  // client.on('end', function () {
  //     clients.splice(clients.indexOf(client), 1);
  //     broadcast(`${client.username}: left the chat.\n`);
  // });
});
server.on('error', (err) => {
  throw err;
});

server.listen(PORT, '10.0.1.161', () => { // "listening" listener
  console.log(`Server Bound, ${PORT}`, "daddio!");
});




