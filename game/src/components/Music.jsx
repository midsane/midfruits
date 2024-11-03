import { useState } from "react";
const Music = () => {
    const[audio] = useState(new Audio("/assets/audio.mp3"));
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleMusic = () => {
        setAudioPlaying(state => {
            if (state) audio.pause()
            else audio.play()
            return !state
        })
    }

    return (<div
        onClick={handleMusic}
        className="w-fit h-fit p-2 rounded absolute z-20 cursor-pointer bg-pink-400" >
        {audioPlaying ? "pause" : "play"}
    </div>)
}

export { Music }

