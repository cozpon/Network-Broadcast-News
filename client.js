// jshint esversion:6
const net = require('net');
const client = new net.connect(6969, '0.0.0.0', () => {
  client.write("This is Client, saying hello to Server");
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if(chunk !== null) {
      client.write(chunk.toString());
    }
  });
});
  client.on('error', (err) => {
  throw err;
});

client.on('data', (chunk) => {
console.log("Message from Server:", chunk.toString());
});

client.on('end', () => {
  console.log("client disconnected");
});



