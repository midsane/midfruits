import { grassImg, stoneImg, mushroomImg, treeImg, fireImg } from "../Data/data"
import { OBSTACLE_POSITION } from "../Data/data"
import { motion } from "framer-motion"
const Obstacle = ({ obstaclesData }) => {
    let imgToRender;

    switch (obstaclesData.type) {
        case "stone":
            imgToRender = stoneImg;
            break;
        case 'grass':
            imgToRender = grassImg;
            break;
        case "tree":
            imgToRender = treeImg;
            break;
        case "mushroom":
            imgToRender = mushroomImg;
            break;
        case "fire":
            imgToRender = fireImg
            break;
        default:
            imgToRender = null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
                top: obstaclesData.top + "%",
                left: obstaclesData.left + "%",
            }}
            className={` w-20 h-20 absolute z-0`} >
            {imgToRender ? <img

                src={imgToRender} /> : <div className=" w-full h-full relative" >
                <img
                    className="absolute w-full h-full"
                    src={obstaclesData.img}></img >
                    <div className="w-fit px-1 h-fit left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] absolute rounded-full bg-gradient-to-r to-amber-100 border border-stone-500 from-yellow-300" >
                        <p className=" text-md" >{obstaclesData.val}</p>
                </div>
            </div>
            }
        </motion.div>

    )
}

const ObstaclePosition = () => {
    return (<>{
        OBSTACLE_POSITION.map((p, i) =>
            <Obstacle key={i} obstaclesData={p} />)
    }</>)
}

export { ObstaclePosition, Obstacle }