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

    const currentPlayerNewPosition = { ...currentPlayer }


    // const checkCollisionWithOtherPlayers = (p1, p2) => {
    //   const diffTop = Math.abs(p1.top - p2.top);
    //   const diffLeft = Math.abs(p1.left - p2.left);
    //   if (diffTop < 6 && diffLeft < 6) return true;
    //   else return false;
    // };

    const checkCollisionWithEnemy = (p) => {
      return ENEMY_COORDINATES.some((obs) => {
        const diffTop = Math.abs(p.top - obs.top);
        const diffLeft = Math.abs(p.left - obs.left);
        return diffTop < 5 && diffLeft < 5;
      });
    }

    const checkCollisonWithObstacles = (p) => {
      return OBSTACLE_POSITION.some((obs) => {
        const diffTop = Math.abs(p.top - obs.top);
        const diffLeft = Math.abs(p.left - obs.left);

        return diffTop < 5 && diffLeft < 5;
      });
    };

    // const checkCollisionWithMagic = () => {

    //   magicItem.forEach((magicCoor) => {
    //     const magicTop = magicCoor.top;
    //     const magicLeft = magicCoor.left;
    //     const collidingPlayer = players.find((player) => {
    //       const playerTop = player.top;
    //       const playerLeft = player.left;
    //       const diffTop = Math.abs(magicTop - playerTop);
    //       const diffLeft = Math.abs(magicLeft - playerLeft);
    //       return diffTop < 7 && diffLeft < 7;
    //     });

    //     if (collidingPlayer) {

    //       setPlayers((players) => {
    //         const newPlayers = players.map((player) => {
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

    //         return newPlayers
    //       }
    //       );

    //       setMagicItem((magicItem) => {
    //         return magicItem.filter(mi => mi != magicCoor)
    //       });

    //     }
    //   })
    // }

    const inputFnc = (event) => {

      switch (event.key) {

        case "ArrowUp":
          setPlayers((players) => {

            const currentPlayerInd = players.participants.findIndex(p => {
              return p.playerId === currentPlayer.playerId
            })
            const newPlayers = { ...players, participants: players.participants.map(p => ({ ...p })) }

            const newFrame = (players.participants[currentPlayerInd].currentFrame + 1) % playerMoves.length;

            newPlayers.participants[currentPlayerInd].currentFrame = newFrame;
            return newPlayers
          })

          currentPlayerNewPosition.top -= SPEED;
          break;

        case "ArrowLeft":
          setPlayers((players) => {

            const currentPlayerInd = players.participants.findIndex(p => {
              return p.playerId === currentPlayer.playerId
            })
            const newPlayers = { ...players, participants: players.participants.map(p => ({ ...p })) }

            const newFrame = (players.participants[currentPlayerInd].currentFrame + 1) % playerMoves.length;

            newPlayers.participants[currentPlayerInd].dx = 1;
            newPlayers.participants[currentPlayerInd].currentFrame = newFrame;
            return newPlayers
          })
          currentPlayerNewPosition.left -= SPEED;
          break;

        case "ArrowDown":
          setPlayers((players) => {

            const currentPlayerInd = players.participants.findIndex(p => {
              return p.playerId === currentPlayer.playerId
            })
            const newPlayers = { ...players, participants: players.participants.map(p => ({ ...p })) }

            const newFrame = (players.participants[currentPlayerInd].currentFrame + 1) % playerMoves.length;

            newPlayers.participants[currentPlayerInd].currentFrame = newFrame;
            return newPlayers
          })
          currentPlayerNewPosition.top += SPEED;
          break;

        case "ArrowRight":
          setPlayers((players) => {

            const currentPlayerInd = players.participants.findIndex(p => {
              return p.playerId === currentPlayer.playerId
            })
            const newPlayers = { ...players, participants: players.participants.map(p => ({ ...p })) }

            const newFrame = (players.participants[currentPlayerInd].currentFrame + 1) % playerMoves.length;

            newPlayers.participants[currentPlayerInd].dx = -1;
            newPlayers.participants[currentPlayerInd].currentFrame = newFrame;
            return newPlayers
          })

          currentPlayerNewPosition.left += SPEED;
          break;
      }

      // checkCollisionWithMagic();

      if (null)
        return;
      else {

        if (checkCollisonWithObstacles({
          top: currentPlayerNewPosition.top,
          left: currentPlayerNewPosition.left,
        })
        ) {
          console.log("here")

          setPlayers(players => {
            const currentPlayerInd = players.participants.findIndex(p => {
              return p.playerId === currentPlayer.playerId
            })
            currentPlayerNewPosition.top = players.participants[currentPlayerInd].top;
            currentPlayerNewPosition.left = players.participants[currentPlayerInd].left;
            return players
          })

        }



        setPlayers((players) => {

          const currentPlayerInd = players.participants.findIndex(p => {
            return p.playerId === currentPlayer.playerId
          })
          const newPlayers = { ...players, participants: players.participants.map(p => ({ ...p })) }

          newPlayers.participants[currentPlayerInd].top = currentPlayerNewPosition.top
          newPlayers.participants[currentPlayerInd].left = currentPlayerNewPosition.left
          sendRoomData(newPlayers, activeRoom)
          return newPlayers
        })



      }
    };

    document.addEventListener("keydown", inputFnc);
    return () => {
      document.removeEventListener("keydown", inputFnc);
    };
  }, []);

  useEffect(() => {
    setCurrentPlayer(() => {
      console.log(players)
      const currentPlayer = players.participants.filter(({ playerId: pid }) =>
        pid === playerId
      )
      console.log(currentPlayer)
      return currentPlayer[0]
    })
  }, [players])


  console.log(players)
  const remPlayers = players.participants.filter(({ playerId: pid }) => pid != playerId)
  console.log(remPlayers)

  return (
    <>
      {<EachPlayer player={currentPlayer} />}
      {remPlayers.map((player, ind) => (
        <EachPlayer key={ind} player={player} />
      ))}
    </>
  );
};

const EachPlayer = ({ player }) => {
  if (!player) return <></>

  return (<div

    style={{ top: `${player.top}%`, left: `${player.left}%` }}
    className="image-container"
  >
    <PlayerBar val={player.healthBar} type="health" />
    <PlayerBar val={player.manaBar} type="mana" />
    <img
      className={`${player.dx === 1 ? "invert" : ""}`}
      src={playerMoves[player.currentFrame]}
      alt="player"
    />
  </div>)
}


export { Player };

