import { atom } from "recoil";
import { img1, simg4 } from "../Data/data";
import { ENEMY_COORDINATES } from "../Data/data";

const fruitsDataAtom = atom({
  key: "fruitsDataAtom",
  default: []
})

const playersAtom = atom({
  key: "playersAtom",
  default: null,
});

const currentPlayerAtom = atom({
  key: 'currentPlayerAtom',
  default: null
})

const enemiesAtom = atom({
  key: "enemiesAtom",
  default: ENEMY_COORDINATES,
});

const magicItemsAtom = atom({
  key: "magicItemsAtom",
  default: [],
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
  default: ""
})

const socketIdAtom = atom({
  key: "socketIdAtom",
  default: null
})

const isRoomInvalidAtom = atom({
  key: "isRoomFullAtom",
  default: null,
});




//  const [enemies, setEnemies] = useState([]);

export {
  playersAtom,
  magicItemsAtom,
  charaFrameAtom,
  enemiesAtom,
  usernameAtom,
  currentPlayerAtom,
  activeRoomAtom,
  socketIdAtom,
  isRoomInvalidAtom,
  fruitsDataAtom
};
