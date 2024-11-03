
class Sound {
    
    constructor(src){
        this.audio = new Audio(src);
    }

    play(){
        this.audio.play()
    }

    pause(){
        this.audio.pause()
    }


}

export {Sound}