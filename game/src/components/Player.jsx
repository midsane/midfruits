import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PlayerBar } from "./playerBar";
import { useEffect } from "react";

import {
  OBSTACLE_POSITION,
  MAGIC_POINTS,
  playerMoves,
  SPEED,
  HEALTH_POINTS,
  ENEMY_COORDINATES,
  img1,
} from "../Data/data";
import { activeRoomAtom, currentPlayerAtom, magicItemsAtom, playersAtom, socketIdAtom } from "../store/atoms";
import { CopyMinus, PlaySquare } from "lucide-react";
import { useSocket } from "../hooks/usesocket";

const Player = () => {
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [magicItem, setMagicItem] = useRecoilState(magicItemsAtom);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerAtom)
  const { sendRoomData, getRoomData } = useSocket()
  const activeRoom = useRecoilValue(activeRoomAtom)
  const playerId = useRecoilValue(socketIdAtom)

  useEffect(() => {
    // const handleBounce = () => {
    //   const p1 = { top: players[0].top, left: players[0].left }
    //   const p2 = { top: players[1].top, left: players[1].left }

    //   const diffTop = Math.abs(p1.top - p2.top)
    //   const diffLeft = Math.abs(p1.left - p2.left)

    //   const participants = players.map(player => ({ ...player }))
    //   if (diffTop < 80 && diffLeft < 80) {

    //     const scenario1 = Math.abs(p1.top + bounce - (p2.top - bounce))
    //     const scenario2 = Math.abs(p2.top + bounce - (p1.top - bounce))

    //     if (scenario1 > scenario2) {
    //       participants[0].top += bounce
    //       participants[1].top -= bounce
    //     }
    //     else {
    //       participants[1].top += bounce
    //       participants[0].top -= bounce
    //     }

    //     const scenario3 = Math.abs(p1.left + bounce - (p2.left - bounce))
    //     const scenario4 = Math.abs(p2.left + bounce - (p1.left - bounce))

    //     if (scenario3 > scenario4) {
    //       participants[0].left += bounce
    //       participants[1].left -= bounce
    //     }
    //     else {
    //       participants[1].left += bounce
    //       participants[0].left -= bounce
    //     }

    //     setPlayers(participants)

    //     setPlayers(participants)
    //   }

    // }

    // const currentPlayerNewPosition = { ...currentPlayer }


    // const checkCollisionWithOtherPlayers = (p1, p2) => {
    //   const diffTop = Math.abs(p1.top - p2.top);
    //   const diffLeft = Math.abs(p1.left - p2.left);
    //   if (diffTop < 6 && diffLeft < 6) return true;
    //   else return false;
    // };

    // const checkCollisionWithEnemy = (p) => {
    //   return ENEMY_COORDINATES.some((obs) => {
    //     const diffTop = Math.abs(p.top - obs.top);
    //     const diffLeft = Math.abs(p.left - obs.left);
    //     return diffTop < 5 && diffLeft < 5;
    //   });
    // }

    // const checkCollisonWithObstacles = (p) => {
    //   return OBSTACLE_POSITION.some((obs) => {
    //     const diffTop = Math.abs(p.top - obs.top);
    //     const diffLeft = Math.abs(p.left - obs.left);

    //     return diffTop < 5 && diffLeft < 5;
    //   });
    // };

    // const checkCollisionWithMagic = () => {
    //   console.log("inside collison checker for magic")
    //   magicItem.forEach((magicCoor) => {
    //     const magicTop = magicCoor.top;
    //     const magicLeft = magicCoor.left;
    //     const collidingPlayer = players.participants.find((player) => {
    //       const playerTop = player.top;
    //       const playerLeft = player.left;
    //       console.log(player.top)
    //       console.log(player.left)
    //       console.log(magicTop)
    //       console.log(magicLeft)
    //       const diffTop = Math.abs(magicTop - playerTop);
    //       const diffLeft = Math.abs(magicLeft - playerLeft);
    //       return diffTop < 10 && diffLeft < 10;
    //     });

    //     if (collidingPlayer) {

    //       setPlayers((players) => {
    //         const newPlayers = players.participants.map((player) => {
    //           if (player.playerId === collidingPlayer.playerId) {
    //             if (magicCoor.type === "mana") {

    //               return { ...player, manaBar: player.manaBar + MAGIC_POINTS };
    //             }
    //             else {

    //               return { ...player, healthBar: player.healthBar + 40 };
    //             }

    //           }
    //           return player;
    //         })

    //         const newState = {...players, participants: players.participants.map(p => ({...p}))}

    //         newState.participants = newPlayers
    //         return newState
    //       }
    //       );

    //       setMagicItem((magicItem) => {
    //         return magicItem.filter(mi => mi != magicCoor)
    //       });

    //     }
    //   })
    // }



    const checkCollisionWithObjects = (currentPlayerState) => {
      const collding = OBSTACLE_POSITION.some(obs => {
        const topDiff = Math.abs(obs.top - currentPlayerState.top);
        const leftDiff = Math.abs(obs.left - currentPlayerState.left);
        return topDiff < 7 && leftDiff < 7 ;
      })
      
      return collding
    }

    const inputFnc = (event) => {
      setCurrentPlayer(prev => {
        const currentPlayerState = {...prev}
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

        if(checkCollisionWithObjects(currentPlayerState)) {
          sendRoomData(players, currentPlayerState, activeRoom)
          return prev
        }
        sendRoomData(players, currentPlayerState, activeRoom)
        return currentPlayerState
      })
    

    };

    document.addEventListener("keydown", inputFnc);
    return () => {
      document.removeEventListener("keydown", inputFnc);
    };
  }, []);

  
  const remPlayers = players.participants.filter(({playerId: pid}) => {
    return pid !== playerId
  })

  console.log(remPlayers)
  console.log(currentPlayer)
  
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

    style={{ top: `${player.top}%`, left: `${player.left}%` }}
    className="image-container"
  >
    {/* <PlayerBar val={player.healthBar} type="health" />
    <PlayerBar val={player.manaBar} type="mana" /> */}
    <p>{(player.playerName.slice(0,5)) + "..."}</p>
    <img
      className={`${player.dx === -1 ? "invert" : ""}`}
      src={playerMoves[player.currentFrame]}
      alt="player"
    />
  </div>)
}


export { Player };

