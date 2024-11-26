import img1 from "../assets/character__1_-removebg-preview.png";
import img4 from "../assets/character__4_-removebg-preview.png";
import img5 from "../assets/character__5_-removebg-preview.png";
import img6 from "../assets/character__6_-removebg-preview.png";

import mushroomImg from "../assets/Mushroom__1_-removebg-preview.png";
import treeImg from "../assets/ancientTree__1_-removebg-preview.png";

import enemyimg1 from "../assets/enemy1-removebg-preview.png";
import enemyimg2 from "../assets/enemy2-removebg-preview.png";
import enemyimg3 from "../assets/enemy3-removebg-preview.png";
import enemyimg4 from "../assets/enemy4-removebg-preview.png";

import grassImg from "../assets/grass__1_-removebg-preview.png";
import stoneImg from "../assets/stone__1_-removebg-preview.png";
import fireImg from "../assets/fire-removebg-preview (1).png"

import sword2 from "../assets/sword2-removebg-preview.png";
import sword1 from "../assets/sword1-removebg-preview.png";
import deadpoolImg from "../assets/deadpoolfix-removebg-preview.png";

import firefruit from "../assets/firefruit-removebg-preview.png";
import gomugomu from "../assets/gomugomu-removebg-preview.png";
import fruit1 from "../assets/fruit1-removebg-preview.png";
import fruit2 from "../assets/fruit2-removebg-preview.png";
import fruit3 from "../assets/fruit3-removebg-preview.png";
import fruit4 from "../assets/fruit4-removebg-preview.png";
import fruit5 from "../assets/fruit5-removebg-preview.png";

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
  { top: 80, left: 0, type: "fire" },
  { top: 85, left: 0, type: "grass" },
  { top: 90, left: 0, type: "stone" },

  { top: 0, left: 95, type: "grass" },
  { top: 5, left: 95, type: "grass" },
  { top: 10, left: 95, type: "mushroom" },
  { top: 15, left: 95, type: "stone" },
  { top: 20, left: 95, type: "grass" },
  { top: 25, left: 95, type: "tree" },
  { top: 30, left: 95, type: "grass" },
  { top: 35, left: 95, type: "fire" },
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
  { top: 0, left: 15, type: "fire" },
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
  { top: 0, left: 85, type: "fire" },
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
  { top: 35, left: 50, type: "fire" },

  { top: 90, left: 15, type: "stone" },
  { top: 90, left: 20, type: "grass" },
  { top: 90, left: 25, type: "grass" },
  { top: 90, left: 30, type: "grass" },
  { top: 90, left: 35, type: "mushroom" },
  { top: 90, left: 35, type: "mushroom" },
  { top: 90, left: 40, type: "grass" },
  { top: 90, left: 45, type: "fire" },
  { top: 90, left: 50, type: "stone" },
  { top: 90, left: 55, type: "grass" },
  { top: 90, left: 60, type: "grass" },
  { top: 90, left: 65, type: "grass" },
  { top: 90, left: 70, type: "grass" },
  { top: 90, left: 75, type: "grass" },
  { top: 90, left: 80, type: "grass" },
  { top: 90, left: 85, type: "grass" },
  { top: 90, left: 90, type: "fire" },
];

const SPEED = 1;

const playerMoves = [img1, img4, img5, img6];
const fruitArr = [firefruit, gomugomu, fruit2, fruit4, fruit5];

const enemyMoves = [enemyimg1, enemyimg2, enemyimg3, enemyimg4];

export {
  SPEED,
  OBSTACLE_POSITION,
  playerMoves,
  enemyMoves,
  stoneImg,
  grassImg,
  mushroomImg,
  treeImg,
  img1,
  sword2,
  sword1,
  deadpoolImg,
  fruitArr,
  fireImg
};
