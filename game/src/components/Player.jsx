import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";

import {
  OBSTACLE_POSITION,
  playerMoves,
} from "../Data/data";
import { activeRoomAtom, currentPlayerAtom, fruitsDataAtom, playersAtom, socketIdAtom } from "../store/atoms";
import { useSocket } from "../hooks/usesocket";

const EVEN_POINTS = -5;
const PRIME_POINTS = 10;
const ODD_POINTS = -3;

const Player = () => {
  const players = useRecoilValue(playersAtom);
  const fruitsData = useRecoilValue(fruitsDataAtom)

  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerAtom)
  const { sendRoomData, deleteFruit } = useSocket()
  const activeRoom = useRecoilValue(activeRoomAtom)
  const playerId = useRecoilValue(socketIdAtom)

  const fruitsDataRef = useRef(fruitsData);

  const pointsGainSoundRef = useRef()
  const pointsLoseEvenSoundRef = useRef()
  const pointsLoseOddSoundRef = useRef()

  useEffect(() => {
    pointsGainSoundRef.current = new Audio("/assets/elizabeth_sound.mp3")
    pointsLoseEvenSoundRef.current = new Audio("/assets/saiki-yare-yare-ringtone.mp3")
    pointsLoseOddSoundRef.current = new Audio("/assets/hit-by-a-wood-230542.mp3")
  }, [])

  useEffect(() => {
    fruitsDataRef.current = fruitsData;
  }, [fruitsData]);

  const checkCollisionWithFruits = (currentPlayerState) => {

    for (const fruit of fruitsDataRef.current) {
      const topDiff = Math.abs(fruit.top - currentPlayerState.top);
      const leftDiff = Math.abs(fruit.left - currentPlayerState.left);


      if (topDiff < 10 && leftDiff < 5) {
        switch (fruit.categ) {
          case "prime":
            pointsGainSoundRef.current.play()
            return { index: fruit.index, worth: PRIME_POINTS }
          case "even":
            pointsLoseEvenSoundRef.current.play()
            return { index: fruit.index, worth: EVEN_POINTS }
          case "odd":
            pointsLoseOddSoundRef.current.play()
            return { index: fruit.index, worth: ODD_POINTS }
        }
      }
    }
    return false
  }

  const checkCollisionWithObjects = (currentPlayerState) => {
    const collding = OBSTACLE_POSITION.some(obs => {
      const topDiff = Math.abs(obs.top - currentPlayerState.top);
      const leftDiff = Math.abs(obs.left - currentPlayerState.left);

      return topDiff < 7 && leftDiff < 5;
    })

    return collding
  }

  useEffect(() => {

    const inputFnc = (event) => {
      setCurrentPlayer(prev => {
        const currentPlayerState = { ...prev }
        switch (event.key) {

          case "ArrowUp":
            currentPlayerState.top--;
            break;

          case "ArrowLeft":
            currentPlayerState.left--;
            currentPlayerState.dx = -1;
            break;

          case "ArrowDown":
            currentPlayerState.top++;
            break;

          case "ArrowRight":
            currentPlayerState.left++;
            currentPlayerState.dx = 1;
            break;

          default: return prev;
        }

        currentPlayerState.currentFrame = (currentPlayerState.currentFrame + 1) % playerMoves.length

        if (checkCollisionWithObjects(currentPlayerState)) {
          sendRoomData(players, currentPlayerState, activeRoom)
          return prev
        }

        const collisionWithFruit = checkCollisionWithFruits(currentPlayerState)

        if (collisionWithFruit) {
          

          currentPlayerState.points += collisionWithFruit.worth;
          deleteFruit(activeRoom, collisionWithFruit.index)
        }


        sendRoomData(currentPlayerState, activeRoom)
        return currentPlayerState
      })


    };

    document.addEventListener("keydown", inputFnc);
    return () => {
      document.removeEventListener("keydown", inputFnc);
    };
  }, []);


  const remPlayers = players.participants.filter(({ playerId: pid }) => {
    return pid !== playerId
  })



  return (
    <>
      {remPlayers.map((p, i) => <EachPlayer player={p} key={i} />)}
      <EachPlayer player={currentPlayer} />
    </>
  );

};

const EachPlayer = ({ player }) => {
  if (!player) return <></>

  return (<div

    style={{ top: `${player.top}%`, left: `${player.left}%`, zIndex: 10 }}
    className="image-container h-fit w-fit"
  >
    {/* <PlayerBar val={player.healthBar} type="health" />
    <PlayerBar val={player.manaBar} type="mana" /> */}
    <span className="flex text-sm justify-between w-full h-4" >
      <p>{(player.playerName.slice(0, 3)) + ".."}</p>
      <p className="font-bold text-red-600"  >{player.points}</p>
    </span>

    <img
      className={`${player.dx === -1 ? "invert" : ""}`}
      src={playerMoves[player.currentFrame]}
      alt="player"
    />
  </div>)
}


export { Player };

