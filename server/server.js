const webSocket = require("ws");

const port = 5000;

const onServerStart = () => {
  console.log('Server started on ' + port);
}

const webSocketServer = new webSocket.Server({
  port: port,
}, onServerStart)

webSocketServer.on('connection', function connection(webSocket) {
  webSocket.on('message', function message(message) {
    message = JSON.parse(message);
    switch (message.event) {
      case 'zones_update':
        broadcastMessageExeptSender(message);
        break;
      case 'new_zone_update':
        broadcastMessageExeptSender(message);
        break;
      case 'connection':
        webSocket.userId = message.userId;
        broadcastMessage(message);
        break;
    }
  })
});

const broadcastMessage = (message) => {
  message = JSON.stringify(message);
  webSocketServer.clients.forEach((client) => {
    client.send(message);
  })
}

const broadcastMessageExeptSender = (message) => {
  const textMessage = JSON.stringify(message);
  webSocketServer.clients.forEach((client) => {
    if (client.userId === message.userId){
      return;
    } else {
      client.send(textMessage);
    }
  })
}