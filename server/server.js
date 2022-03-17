const webSocket = require("ws");
const http = require('http');

function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

//data
let floors = [
  {
    id: uuid(),
    name: "floor 1",
    floorPlanUrl: 'https://static.educalingo.com/img/en/800/floor-plan.jpg',
    zones: [
      {
        id: uuid(),
        name: "zone 1",
        points: [
          {
            id: uuid(),
            x: 50,
            y: 50
          },
          {
            id: uuid(),
            x: 100,
            y: 100
          },
          {
            id: uuid(),
            x: 100,
            y: 75
          }
        ]
      }
    ],
    newZone: {
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
    },
  },
  {
    id: uuid(),
    name: "floor 2",
    floorPlanUrl: 'https://r1.nubex.ru/s615-3e1/f736_f0/2%20%D1%8D%D1%82%D0%B0%D0%B6.jpg',
    zones: [
      {
        id: uuid(),
        name: "zone 1",
        points: [
          {
            id: uuid(),
            x: 50,
            y: 50
          },
          {
            id: uuid(),
            x: 100,
            y: 100
          },
          {
            id: uuid(),
            x: 100,
            y: 75
          }
        ]
      }
    ],
    newZone: {
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
    }
  },
  {
    id: uuid(),
    name: "floor 3",
    floorPlanUrl: 'https://i0.wp.com/www.nepole.ru/generait/kirp_dom_s_pilystrami/640/93_plan_per_et_kirp_doma.jpg',
    zones: [
      {
        id: uuid(),
        name: "zone 1",
        points: [
          {
            id: uuid(),
            x: 50,
            y: 50
          },
          {
            id: uuid(),
            x: 100,
            y: 100
          },
          {
            id: uuid(),
            x: 100,
            y: 75
          }
        ]
      }
    ],
    newZone: {
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
    }
  }
]

//ports
const webSocketServerPort = 5000;
const httpServerPort = 5001


//http server

const getAllFloorId = (floors) => {
  const allFloorId = floors.map((floor) => {
    return floor.id;
  });
  return allFloorId;
}

const onHttpServerStart = () => {
  console.log("http server started on port: " + httpServerPort);
}

http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.writeHead(200, {
    'content-type': 'application/json'
  })
  let allFloorId = {
    allFloorsId: getAllFloorId(floors)
  }
  allFloorId = JSON.stringify(allFloorId)
  response.end(allFloorId);
}).listen(httpServerPort, onHttpServerStart)


//web socket server
const onWebSocketServerStart = () => {
  console.log('Web socket server started on ' + webSocketServerPort);
}

const webSocketServer = new webSocket.Server({
  port: webSocketServerPort,
}, onWebSocketServerStart)

webSocketServer.on('connection', function connection(webSocket) {
  webSocket.on('message', function message(message) {
    message = JSON.parse(message);
    switch (message.event) {
      case 'zones_update':
        setFloorDataById(message.floorId, message.data);
        broadcastInFloorExeptSender(message);
        break;
      case 'new_zone_update':
        setFloorNewZoneById(message.floorId, message.newZone)
        broadcastInFloorExeptSender(message);
        break;
      case 'connection':
        webSocket.userId = message.userId;
        webSocket.floorId = message.floorId;
        const floor = getFloorById(webSocket.floorId);
        message.floor = floor;
        webSocket.send(JSON.stringify(message));
        broadcastInFloorMessage(message);
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
    if (client.userId === message.userId) {
      return;
    } else {
      client.send(textMessage);
    }
  })
}


const broadcastInFloorMessage = (message) => {
  message = JSON.stringify(message);
  webSocketServer.clients.forEach((client) => {
    if (client.floorId === message.floorId) {
      client.send(message);
    }
  })
}

const broadcastInFloorExeptSender = (message) => {
  const textMessage = JSON.stringify(message);
  webSocketServer.clients.forEach((client) => {
    if ((client.floorId === message.floorId) && (client.userId !== message.userId)) {
      client.send(textMessage);
    }
  })
}

const getFloorById = (floorId) => {
  const floor = floors.filter((floor) => {
    return floor.id === floorId;
  })
  return floor[0];
}

const setFloorDataById = (floorId, newData) => {
  const newFloors = floors.map((floor) => {
    if (floor.id !== floorId) {
      return floor;
    } else {
      const newFloorData = {
        ...newData,
        newZone: floor.newZone,
      }
      return newFloorData;
    }
  })
  floors = newFloors;
}

const setFloorNewZoneById = (floorId, newZone) => {
  const newFloors = floors.map((floor) => {
    if (floor.id !== floorId) {
      return floor;
    } else {
      const newFloorData = {
        ...floor,
        newZone: newZone,
      }
      return newFloorData;
    }
  })
  floors = newFloors;
}