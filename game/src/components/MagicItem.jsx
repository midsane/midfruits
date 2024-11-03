import { useRecoilState } from "recoil";
import { magicItemsAtom } from "../store/atoms";
import { Obstacle } from "./Obstacle";
import { MAGIC_ITEM_COORDINATES } from "../Data/data";
import { useEffect } from "react";

const MagicItem = () => {

  const [magicItem, setMagicItem] = useRecoilState(magicItemsAtom);

  const randomGenerate = () => {
    const ArrToChooseFrom = MAGIC_ITEM_COORDINATES.filter(m => !magicItem.includes(m))

    if (ArrToChooseFrom.length === 0 || magicItem.length > 8) return
    const randomInd = Math.floor(Math.random() * ArrToChooseFrom.length)


    setMagicItem(magicItem => {
      const newMagicItem = magicItem.map(m => (m))
      newMagicItem.push(ArrToChooseFrom[randomInd])
      return newMagicItem
    })

  };

  useEffect(() => {
    const magicItemInterval = setInterval(() => {
      randomGenerate();
    }, 2000);

    return () => clearInterval(magicItemInterval);
  }, [magicItem]);

  return (
    <>
      {magicItem.map((p, i) => (
        <Obstacle key={i} obstaclesData={p} />
      ))}
    </>
  );
};

export { MagicItem };
