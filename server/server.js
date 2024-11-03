const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(process.env.PORT || 3000, () =>
  console.log(`server is runnig on port ${process.env.PORT || 3000}`)
);

let allRoomData = [];
/* 

  {
    "roomName": {
      host: "socket.id of host",
      participants: 
        [
          {
            playerId: "",
            playerName: "",
            dx: 1,
            currentFrame: "",
            top: "",
            left: "",
            manaBar: "",
            healthBar: "",
            points: "",

          }
        ]
    }
  },..

*/

const initiaPlayerPosition = [
  {
    top: 10,
    left: 90,
  },
  {
    top: 40,
    left: 90,
  },
  {
    top: 20,
    left: 20,
  },
  {
    top: 20,
    left: 20,
  },
];

const getUniquePosition = (participantsData) => {
  for (let { top: Top, left: Left } of initiaPlayerPosition) {
    for (let { top, left } of participantsData) {
      if (Top !== top && Left !== left) {
        return { top, left };
      }
    }
  }
};

const randomPosition = () => {
  const randIndex = Math.floor(Math.random() * initiaPlayerPosition.length);
  return initiaPlayerPosition[randIndex];
};

io.on("connection", (socket) => {
  console.log("a new client got connected to the server ");
  console.log(allRoomData)
  socket.on("send-room-data", ({ roomData, roomName }) => {
    allRoomData[roomName] = roomData;
    console.log(allRoomData[roomName]);
    io.to(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("join-room", ({ roomName, username }) => {
    const randomIndex = Math.floor(Math.random() * initiaPlayerPosition.length);
    const top = initiaPlayerPosition[randomIndex].top;
    const left = initiaPlayerPosition[randomIndex].left;
    console.log("new user joined the room");
    allRoomData[roomName]?.participants.push({
      playerId: socket.id,
      playerName: username,
      dx: Math.random() > 0.5 ? 1 : -1,
      currentFrame: 0,
      top,
      left,
      manabar: 5,
      healthBar: 50,
      points: 0,
    });
    console.log(allRoomData);
    console.log(allRoomData[roomName]);

    socket.join(roomName);
    console.log("user is indeed joining room, now emitting on get-room-dasta ");

    io.in(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("create-room", ({ roomName, roomLimit, hostname }) => {
    const { top, left } = randomPosition();
    allRoomData[roomName] = {
      hostId: socket.id,
      hostName: hostname,
      roomLimit,
      participants: [],
    };

    socket.join(roomName);
   
    console.log("client joined the room");
    console.log(allRoomData[roomName]);
    io.in(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("disconnect", ()=> {
    console.log("socket got disconnected")
    console.log(socket)
   const rooms = Array.from(socket.rooms);
    console.log("room in which disconnected socxketr was", rooms)
    rooms.forEach((room) => {
      const roomData = allRoomData[room]
      const remParticipants = roomData.participants.filter(player => player.playerId != socket.id)
      allRoomData[room].participants = remParticipants;
    })
    console.log("now allroomdata is", allRoomData)
  } ) 
});
