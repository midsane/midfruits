import { motion } from "framer-motion";
import { VolumeOff, Volume1 } from "lucide-react";
import { useEffect, useState } from "react";

const Music = ({ audioval = "audio", initialVal=false, loop=true, volume=1 }) => {
    const [audio] = useState(new Audio(`/assets/${audioval}.mp3`));
    const [audioPlaying, setAudioPlaying] = useState(initialVal);
    
    useEffect(() => {
        audio.loop = loop
        audio.volume = volume
        if(audioPlaying){
            audio.play()
        }

        return () => {
            if(audioPlaying) audio.pause()
        }
       
    }, [])

    const handleMusic = () => {
        setAudioPlaying(state => {
            if  (state) audio.pause()
            else audio.play()
            return !state
        })
    }
   
    return (<motion.div
        onClick={audioval != "" ? handleMusic : handlesoundeffect}
        className="w-fit h-fit p-2 rounded fixed z-[100] top-5 left-10 cursor-pointer bg-pink-300" >
        {audioPlaying? <Volume1 /> : <VolumeOff />}
    </motion.div>)
}

export { Music }

