import { atom } from "recoil";
import { img1 } from "../Data/data";


const fruitsDataAtom = atom({
  key: "fruitsDataAtom",
  default: [],
});

const playersAtom = atom({
  key: "playersAtom",
  default: null,
});

const currentPlayerAtom = atom({
  key: "currentPlayerAtom",
  default: null,
});

const charaFrameAtom = atom({
  key: "charaFrame1Atom",
  default: img1,
});

const usernameAtom = atom({
  key: "usernameAtom",
  default: "",
});

const activeRoomAtom = atom({
  key: "activeRoomAtom",
  default: "",
});

const socketIdAtom = atom({
  key: "socketIdAtom",
  default: null,
});

const isRoomInvalidAtom = atom({
  key: "isRoomFullAtom",
  default: null,
});

const startGameAtom = atom({
  key: "startGameAtom",
  default: false,
});

const timeRemGameAtom = atom({
  key: "timeRemGameAtom",
  default: 3 * 60 * 1000,
});

const gameHasEndedAtom = atom({
  key: "gameHasEndedAtom",
  default: false,
});

export {
  playersAtom,
  charaFrameAtom,
  usernameAtom,
  currentPlayerAtom,
  activeRoomAtom,
  socketIdAtom,
  isRoomInvalidAtom,
  fruitsDataAtom,
  startGameAtom,
  timeRemGameAtom,
  gameHasEndedAtom,
};
