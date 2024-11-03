import img1 from "../assets/character__1_-removebg-preview.png";
import img2 from "../assets/character__2_-removebg-preview.png";
import img3 from "../assets/character__3_-removebg-preview.png";
import img4 from "../assets/character__4_-removebg-preview.png";
import img5 from "../assets/character__5_-removebg-preview.png";
import img6 from "../assets/character__6_-removebg-preview.png";
import img7 from "../assets/character__7_-removebg-preview.png";
import img8 from "../assets/character__8_-removebg-preview.png";
import magicItemImg from "../assets/MagicItem__1_-removebg-preview.png"
import healthPotionImg from "../assets/HealthPotion-removebg-preview.png";
import mushroomImg from "../assets/Mushroom__1_-removebg-preview.png";
import treeImg from "../assets/ancientTree__1_-removebg-preview.png";

import enemyimg1 from "../assets/enemy1-removebg-preview.png";
import enemyimg2 from "../assets/enemy2-removebg-preview.png";
import enemyimg3 from "../assets/enemy3-removebg-preview.png";
import enemyimg4 from "../assets/enemy4-removebg-preview.png";

import simg1 from "../assets/swordsman1.png";
import simg2 from "../assets/swordsman2.png";
import simg3 from "../assets/swordsman3.png";
import simg4 from "../assets/swordsman4.png";
import grassImg from "../assets/grass__1_-removebg-preview.png";
import stoneImg from "../assets/stone__1_-removebg-preview.png";

import sword2 from "../assets/sword2-removebg-preview.png"
import sword1 from "../assets/sword1-removebg-preview.png"
import deadpoolImg from "../assets/deadpoolfix-removebg-preview.png"



const MAGIC_POINTS = 10;
const HEALTH_POINTS = 10;
const MAGIC_ITEM_COORDINATES = [
  { top: 10, left: 20, type: "mana" },
  { top: 20, left: 30, type: "mana" },
  { top: 30, left: 15, type: "mana" },
  { top: 40, left: 25, type: "mana" },
  { top: 50, left: 75, type: "health" },
  { top: 60, left: 80, type: "mana" },
  { top: 60, left: 80, type: "mana" },
  { top: 50, left: 70, type: "mana" },
  { top: 80, left: 60, type: "health" },
  { top: 10, left: 90, type: "mana" },
  { top: 20, left: 80, type: "mana" },
  { top: 10, left: 75, type: "mana" },
  { top: 20, left: 65, type: "mana" },
  { top: 70, left: 60, type: "health" },
  { top: 60, left: 90, type: "mana" },
  { top: 10, left: 20, type: "mana" },
  { top: 20, left: 20, type: "mana" },
  { top: 30, left: 90, type: "mana" },
  { top: 40, left: 20, type: "health" },
  { top: 50, left: 10, type: "mana" },
  { top: 60, left: 80, type: "mana" },
  { top: 10, left: 20, type: "mana" },
  { top: 55, left: 70, type: "mana" },
  { top: 30, left: 60, type: "health" },
  { top: 65, left: 70, type: "mana" },
  { top: 50, left: 20, type: "mana" },
  { top: 75, left: 45, type: "mana" },
  { top: 5, left: 5, type: "mana" },
  { top: 75, left: 20, type: "health" },
  { top: 80, left: 60, type: "mana" },
  { top: 80, left: 70, type: "mana" },
  { top: 40, left: 10, type: "mana" },
  { top: 50, left: 30, type: "mana" },
  { top: 80, left: 80, type: "health" },
];

const ENEMY_COORDINATES = [
  { top: 20, left: 15, type: "horse" },
  { top: 50, left: 15, type: "horse" },
  { top: 60, left: 15, type: "horse" },
  { top: 70, left: 15, type: "horse" },
  { top: 40, left: 15, type: "horse" },
  { top: 30, left: 80, type: "horse" },
];

const OBSTACLE_POSITION = [
  { top: 0, left: 0, type: "grass" },
  { top: 5, left: 0, type: "tree" },
  { top: 10, left: 0, type: "grass" },
  { top: 15, left: 0, type: "mushroom" },
  { top: 20, left: 0, type: "grass" },
  { top: 25, left: 0, type: "grass" },
  { top: 30, left: 0, type: "grass" },
  { top: 35, left: 0, type: "mushroom" },
  { top: 40, left: 0, type: "tree" },
  { top: 45, left: 0, type: "grass" },
  ,
  { top: 45, left: 0, type: "stone" },
  { top: 50, left: 0, type: "grass" },
  { top: 55, left: 0, type: "mushroom" },
  { top: 60, left: 0, type: "grass" },
  { top: 65, left: 0, type: "grass" },
  { top: 70, left: 0, type: "grass" },
  { top: 75, left: 0, type: "grass" },
  { top: 80, left: 0, type: "grass" },
  { top: 85, left: 0, type: "grass" },
  { top: 90, left: 0, type: "stone" },

  { top: 0, left: 95, type: "grass" },
  { top: 5, left: 95, type: "grass" },
  { top: 10, left: 95, type: "mushroom" },
  { top: 15, left: 95, type: "stone" },
  { top: 20, left: 95, type: "grass" },
  { top: 25, left: 95, type: "tree" },
  { top: 30, left: 95, type: "grass" },
  { top: 35, left: 95, type: "grass" },
  { top: 40, left: 95, type: "mushroom" },
  { top: 45, left: 95, type: "grass" },
  { top: 50, left: 95, type: "grass" },
  { top: 55, left: 95, type: "tree" },
  { top: 60, left: 95, type: "stone" },
  { top: 65, left: 95, type: "grass" },
  { top: 70, left: 95, type: "grass" },
  { top: 75, left: 95, type: "grass" },
  { top: 80, left: 95, type: "grass" },
  { top: 85, left: 95, type: "grass" },
  { top: 90, left: 95, type: "stone" },

  { top: 0, left: 5, type: "grass" },
  { top: 0, left: 10, type: "grass" },
  { top: 0, left: 15, type: "grass" },
  { top: 0, left: 20, type: "grass" },
  { top: 0, left: 25, type: "grass" },
  { top: 0, left: 30, type: "grass" },
  { top: 0, left: 35, type: "grass" },
  { top: 0, left: 40, type: "grass" },
  { top: 0, left: 45, type: "grass" },
  { top: 0, left: 50, type: "grass" },
  { top: 0, left: 55, type: "grass" },
  { top: 0, left: 60, type: "grass" },
  { top: 0, left: 65, type: "grass" },
  { top: 0, left: 70, type: "grass" },
  { top: 0, left: 75, type: "grass" },
  { top: 0, left: 80, type: "stone" },
  { top: 0, left: 85, type: "grass" },
  { top: 0, left: 90, type: "grass" },

  { top: 75, left: 5, type: "grass" },
  { top: 80, left: 5, type: "grass" },
  { top: 85, left: 5, type: "grass" },
  { top: 90, left: 10, type: "stone" },
  { top: 90, left: 5, type: "grass" },

  { top: 10, left: 45, type: "grass" },
  { top: 18, left: 45, type: "tree" },

  { top: 20, left: 45, type: "grass" },
  { top: 25, left: 45, type: "grass" },
  { top: 30, left: 45, type: "grass" },
  { top: 35, left: 45, type: "grass" },

  { top: 10, left: 50, type: "grass" },
  { top: 15, left: 50, type: "grass" },
  { top: 20, left: 50, type: "grass" },
  { top: 25, left: 50, type: "stone" },
  { top: 30, left: 50, type: "grass" },
  { top: 35, left: 50, type: "grass" },

  { top: 90, left: 15, type: "stone" },
  { top: 90, left: 20, type: "grass" },
  { top: 90, left: 25, type: "grass" },
  { top: 90, left: 30, type: "grass" },
  { top: 90, left: 35, type: "mushroom" },
  { top: 90, left: 35, type: "mushroom" },
  { top: 90, left: 40, type: "grass" },
  { top: 90, left: 45, type: "grass" },
  { top: 90, left: 50, type: "stone" },
  { top: 90, left: 55, type: "grass" },
  { top: 90, left: 60, type: "grass" },
  { top: 90, left: 65, type: "grass" },
  { top: 90, left: 70, type: "grass" },
  { top: 90, left: 75, type: "grass" },
  { top: 90, left: 80, type: "grass" },
  { top: 90, left: 85, type: "grass" },
  { top: 90, left: 90, type: "grass" },
];

const SPEED = 1;

const playerMoves = [img1, img2, img4, img5, img7, img6];

const enemyMoves = [enemyimg1, enemyimg2, enemyimg3, enemyimg4];

export {
  SPEED,
  OBSTACLE_POSITION,
  MAGIC_ITEM_COORDINATES,
  ENEMY_COORDINATES,
  MAGIC_POINTS,
  HEALTH_POINTS,
  playerMoves,
  enemyMoves,
  stoneImg,
  grassImg,
  magicItemImg,
  mushroomImg,
  treeImg,
  healthPotionImg,
  img1,
  simg4,
  sword2,
  sword1,
  deadpoolImg
};
