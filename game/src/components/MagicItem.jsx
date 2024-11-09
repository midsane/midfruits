import { useRecoilValue } from "recoil";
import { Obstacle } from "./Obstacle";
import { fruitsDataAtom } from "../store/atoms";


const Fruits = () => {

  const fruitsData = useRecoilValue(fruitsDataAtom)
  console.log(fruitsData)
  return (
    <>
      {fruitsData.map((p, i) => (
        <Obstacle key={i} obstaclesData={p} />
      ))}
    </>
  );
};

export { Fruits };
