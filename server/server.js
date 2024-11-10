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

let allRoomData = {};
/* 

  {
    "roomName": {
      host: "socket.id of host",
      gameHasStarted: false,
      fruitsData: [
        {
          type: "prime",
          top: 10,
          left: 20
        },
        //type- prime/even except 2/ odd;
      ]
      participants: 
        [
          {
            startGame: false
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

const fixedFruitsData = [
  {
    type: "prime",
    top: 10,
    left: 20,
  },
  {
    type: "even",
    top: 40,
    left: 20,
  },
  {
    type: "odd",
    top: 60,
    left: 20,
  },
];

const initiaPlayerPosition = [
  {
    top: 10,
    left: 80,
  },
  {
    top: 40,
    left: 80,
  },
  {
    top: 20,
    left: 20,
  },
  {
    top: 60,
    left: 20,
  },
];

const FRUIT_GENERATION_TIME = 2000;
const FULL_GAME_TIME = 30000;

const getUniquePosition = (participantsData) => {
  for (let { top: Top, left: Left } of initiaPlayerPosition) {
    for (let { top, left } of participantsData) {
      if (Top !== top && Left !== left) {
        return { top, left };
      }
    }
  }
};

const generateNewFruits = (currentFruits) => {
  let newFruitData = [];
  for (let { top: Top, left: Left } of fixedFruitsData) {
    for (let fruit of currentFruits) {
      if (Top !== fruit.top && Left !== fruit.left) {
        newFruitData.push(fruit);
      }
    }
  }

  const randInd = Math.floor(Math.random() * newFruitData.length);
  return fixedFruitsData[randInd];
};

const randomPosition = () => {
  const randIndex = Math.floor(Math.random() * initiaPlayerPosition.length);
  return initiaPlayerPosition[randIndex];
};

io.on("connection", (socket) => {
  console.log("a new client got connected to the server ");
  console.log(allRoomData);

  socket.on("start-game", (roomName) => {
    try {
      if (!allRoomData[roomName]) {
        socket.emit("start-game-response", {
          status: 400,
          msg: "Room doesn't exist",
        });
      }

      const playerInd = allRoomData[roomName].participants.findIndex(
        (p) => p.playerId === socket.id
      );

      if (playerInd < 0) {
        socket.emit("start-game-response", {
          status: 400,
          msg: "player has not joined the room",
        });
      }

      allRoomData[roomName].participants[playerInd].startGame = true;

      let peopleReady = 0;
      for (const p of allRoomData[roomName].participants) {
        if (p.startGame) {
          peopleReady++;
        }
      }

      console.log(peopleReady);

      if (peopleReady === allRoomData[roomName].roomLimit) {
        allRoomData[roomName].gameHasStarted = true;
        io.in(roomName).emit("start-game-response", {
          status: 200,
          msg: "start the game in the room",
          players: allRoomData[roomName],
        });


        const intervalId = setInterval(() => {
          const randomFruit = generateNewFruits(allRoomData[roomName].fruitsData)
          if(randomFruit == -1) return;
          allRoomData[roomName].fruitsData.push(randomFruit)
          io.to(roomName).emit("get-fruit", allRoomData[roomName]);
        }, FRUIT_GENERATION_TIME);

        
        setTimeout(() => {
          clearInterval(intervalId); 
        }, FULL_GAME_TIME);

        return;
      }

      io.in(roomName).emit("start-game-response", {
        status: 200,
        msg: "player has toggled start game",
        players: allRoomData[roomName],
      });
    } catch (error) {
      console.error(error);
      socket.emit("start-game-response", {
        status: 500,
        msg:
          error.message ||
          "something went wrong while toggling start game status",
      });
    }
  });

  socket.on("send-room-data", ({ currentPlayer, roomName }) => {
    console.log("inside send-room-data");
    if (!allRoomData[roomName]) return;
    if (!currentPlayer) return;
    const currentPlayerInd = allRoomData[roomName].participants.findIndex(
      (p) => {
        return p.playerId === currentPlayer.playerId;
      }
    );

    allRoomData[roomName].participants[currentPlayerInd] = currentPlayer;
    console.log(allRoomData[roomName]);
    socket.to(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("get-player-data", (players) => {
    console.log(players);
  });

  socket.on("join-room", ({ roomName, username }) => {
    const roomLimit = allRoomData[roomName]?.roomLimit;

    console.log("inside join room");
    console.log(allRoomData[roomName]);

    if (!allRoomData[roomName]) {
      socket.emit("join-room-response", {
        status: 200,
        msg: "room doesn't exist",
      });
      console.log("!room doesn't exist ");
      return;
    }
    if (allRoomData[roomName]?.participants.length === roomLimit) {
      socket.emit("join-room-response", {
        status: 200,
        msg: "room is full",
      });
      console.log("room full");
      return;
    }

    const isHeAlreadyAParticipant = allRoomData[roomName].participants.find(
      (p) => p.playerId === socket.id
    );

    console.log(isHeAlreadyAParticipant);

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
      startGame: false,
      points: 0,
    });
    console.log(allRoomData);
    console.log(allRoomData[roomName]);

    socket.join(roomName);
    console.log("user is indeed joining room, now emitting on get-room-dasta ");

    io.in(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("create-room", ({ roomName, roomLimit, hostname }) => {
    try {
      const { top, left } = randomPosition();
      allRoomData[roomName] = {
        hostId: socket.id,
        gameHasStarted: false,
        hostName: hostname,
        roomLimit,
        fruitsData: [],
        participants: [],
      };

      socket.join(roomName, () => {
        console.log("socket joine the room");
      });

      console.log("client joined the room");
      console.log(allRoomData[roomName]);
      socket.emit("create-room-response", "success");
    } catch (error) {
      socket.emit("create-room-response", "failed");
    }
  });

  socket.on("disconnect", () => {
    console.log("socket got disconnected");

    for (const key in allRoomData) {
      const ind = allRoomData[key].participants.findIndex(
        ({ playerId }) => playerId === socket.id
      );

      if (ind >= 0) {
        allRoomData[key].participants.splice(ind, 1);
        console.log("succesfully deleted the socket from the room");
      }
    }

    console.log("now allroomdata is", allRoomData);
  });
});
