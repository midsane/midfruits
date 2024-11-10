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

const PRIME_NUMBERS = [
  11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
  89, 97,
];

const EVEN_NUMBERS = [
  14, 18, 26, 34, 38, 46, 52, 58, 62, 68, 74, 76, 82, 86, 94, 20, 12, 48, 54,
];

const ODD_NUMBERS = [
  21, 33, 39, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99, 15, 25, 35, 45, 55, 65,
  75, 85, 95,
];

const generatePrimeNumbers = () => {
  return PRIME_NUMBERS[Math.floor(Math.random() * PRIME_NUMBERS.length)];
};

const generateOddNumbers = () => {
  return ODD_NUMBERS[Math.floor(Math.random() * ODD_NUMBERS.length)];
};

const generateEvenNumbers = () => {
  return EVEN_NUMBERS[Math.floor(Math.random() * EVEN_NUMBERS.length)];
};

const fixedFruitsData = [
  { index: 1, type: "number", categ: "prime", top: 10, left: 20 },
  { index: 2, type: "number", categ: "even", top: 40, left: 20 },
  { index: 3, type: "number", categ: "odd", top: 60, left: 30 },
  { index: 4, type: "number", categ: "prime", top: 80, left: 40 },
  { index: 5, type: "number", categ: "prime", top: 30, left: 70 },
  { index: 6, type: "number", categ: "odd", top: 40, left: 60 },
  { index: 7, type: "number", categ: "odd", top: 70, left: 10 },
  { index: 8, type: "number", categ: "even", top: 80, left: 20 },
  { index: 9, type: "number", categ: "odd", top: 50, left: 60 },
  { index: 10, type: "number", categ: "odd", top: 70, left: 60 },
  { index: 11, type: "number", categ: "prime", top: 40, left: 30 },
  { index: 12, type: "number", categ: "even", top: 80, left: 80 },
  { index: 13, type: "number", categ: "prime", top: 20, left: 70 },
  { index: 14, type: "number", categ: "odd", top: 80, left: 75 },
  { index: 15, type: "number", categ: "prime", top: 70, left: 50 },
  { index: 16, type: "number", categ: "even", top: 10, left: 10 },
  { index: 17, type: "number", categ: "prime", top: 40, left: 90 },
  { index: 18, type: "number", categ: "odd", top: 10, left: 85 },
  { index: 19, type: "number", categ: "prime", top: 70, left: 90 },
  { index: 20, type: "number", categ: "odd", top: 30, left: 40 },
  { index: 21, type: "number", categ: "prime", top: 10, left: 40 },
  { index: 22, type: "number", categ: "even", top: 40, left: 40 },
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

const fruitsData = {};

const FRUIT_GENERATION_TIME = 2000;
const FULL_GAME_TIME = 3 * 60 * 1000;


const generateNewFruits = (currentFruits) => {
  let newFruitData = [];
  console.log("trying to generate new fruits");
  let flag = true;
  for (let fixedFruit of fixedFruitsData) {
    flag = true;
    for (let fruit of currentFruits) {
      if (fixedFruit.top == fruit.top && fixedFruit.left == fruit.left) {
        flag = false;
      }
    }
    if (flag) newFruitData.push(fixedFruit);
  }

  if (newFruitData.length === 0) return -1;

  const randInd = Math.floor(Math.random() * newFruitData.length);
  return newFruitData[randInd];
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

      if (peopleReady === allRoomData[roomName].roomLimit) {
        allRoomData[roomName].gameHasStarted = true;
        io.in(roomName).emit("start-game-response", {
          status: 200,
          msg: "start the game in the room",
          players: allRoomData[roomName],
        });

        fruitsData[roomName] = [];

        const intervalId = setInterval(() => {
          const randomFruit = generateNewFruits(fruitsData[roomName]);
          if (randomFruit == -1) return;
          switch (randomFruit.categ) {
            case "prime":
              randomFruit.val = generatePrimeNumbers();
              break;
            case "even":
              randomFruit.val = generateEvenNumbers();
              break;
            case "odd":
              randomFruit.val = generateOddNumbers();
              break;
          }
          fruitsData[roomName].push(randomFruit);
          io.to(roomName).emit("get-fruit", fruitsData[roomName]);
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

  socket.on("delete-fruit", ({ roomName, index }) => {
    console.log(index);
    const newFruitsData = fruitsData[roomName].filter((f) => f.index !== index);
    fruitsData[roomName] = newFruitsData;
    io.to(roomName).emit("delete-fruit-index", index);
  });

  socket.on("send-room-data", ({ currentPlayer, roomName }) => {
    if (!allRoomData[roomName]) return;
    if (!currentPlayer) return;
    const currentPlayerInd = allRoomData[roomName].participants.findIndex(
      (p) => {
        return p.playerId === currentPlayer.playerId;
      }
    );

    allRoomData[roomName].participants[currentPlayerInd] = currentPlayer;

    socket.to(roomName).emit("get-room-data", allRoomData[roomName]);
  });

  socket.on("join-room", ({ roomName, username }) => {
    const roomLimit = allRoomData[roomName]?.roomLimit;

    if (!allRoomData[roomName]) {
      socket.emit("join-room-response", {
        status: 200,
        msg: "room doesn't exist",
      });
      console.log("!room doesn't exist ");
      return;
    }

    doesPlayersAlreadyExist = allRoomData[roomName].participants.some((p) => {
      p.playerId === socket.id;
    });

    if(doesPlayersAlreadyExist){
      console.log('player already exist in the room')
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
        delete fruitsData[key];
      }
    }

    console.log("now allroomdata is", allRoomData);
  });
});
