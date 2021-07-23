AFRAME.registerComponent("player-movement",{
    init: function(){
        this.walk()
    },
    walk: function(){
        window.addEventListener("keydown",(event)=>{
            if(event.key == "w" || event.key == "ArrowUp" ||
            event.key == "a" || event.key == "ArrowLeft" ||
            event.key == "s" || event.key == "ArrowRight" ||
            event.key == "d" || event.key == "ArrowDown"){
                var entity = document.querySelector("#sound2");
                entity.components.sound.playSound();
            }
        })
    }
});