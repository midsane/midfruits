import { motion } from "framer-motion"
import { CrossIcon, User, CirclePlus, PackagePlus } from "lucide-react"
import { Link } from "react-router-dom"

export const Modal = ({ textArray, handleClose }) => {
    return (<motion.div
    >
        <h6 className="fixed text-amber-300 title2 text-[0.4rem] top-[5%] left-1/2 translate-x-[-50%]" >MidBlade</h6>
        <PlayGame textArray={textArray} />

        <motion.div
            initial={{ transform: "rotate(345deg" }}
            animate={{ transform: "rotate(-45deg" }}
            transition={{ duration: 1, type: "spring" }}
            onClick={handleClose}
            className="absolute top-3 right-6 hover:scale-110 cursor-pointer active:scale-95" >
            <CrossIcon size={2} />
        </motion.div>
    </motion.div>)
}

const PlayGame = ({ textArray }) => {
    return (<div
        className="flex justify-center items-center gap-[0.1rem] text-[0.1rem] flex-col pixelify-sans bg-yellow-200 w-10 h-6 rounded-sm fixed top-1/4 left-1/2 translate-x-[-50%]" >
        {textArray.map((content, ind) => <Button content={content} key={ind} />)}

    </div>)
}

const Button = ({ content }) => {
    let ButtonSvg = <></>
    let btnLink = ""
    switch (content) {
        case "Play Solo":
            ButtonSvg = <User size={2} />
            btnLink = "";
            break;
        case "Join a Room":
            ButtonSvg = <CirclePlus size={2} />
            break;

        case "Create Room":
            btnLink = "/create-room"
            ButtonSvg = <PackagePlus size={2} />
    }
    return (<div className="flex gap-[0.125rem] justify-center items-center" >
        {ButtonSvg}
        <Link to={btnLink} >
            <button onClick={() => handleBtn(content)} className="bg-pink-300 px-1 active:scale-95 hover:scale-105 w-fit min-w-5 duration-75 ease-linear h-fit py-[1px] rounded-full" >{content}</button>
        </Link>

    </div>)
}