AFRAME.registerComponent("enemy-bullets",{
    init: function () {
        setInterval(this.shootEnemyBullets,2000)
    },
    shootEnemyBullets: function(){
        var els = document.querySelectorAll(".enemy");

        console.log(els)

        for(var i=0; i<els.length; i++){
            var enemyBullet = document.createElement("a-entity")
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
              });
      
              enemyBullet.setAttribute("material", "color", "black");
      
              pos = els[i].getAttribute("position");
      
              enemyBullet.setAttribute("position", {
                x: pos.x+1.5,
                y: pos.y+3.5,
                z: pos.z,
              });

              var scene = document.querySelector("#scene");
              scene.appendChild(enemyBullet)

              var position1 = new THREE.Vector3();
              var position2 = new THREE.Vector3();
  
              //shooting direction
              var enemy = els[i].object3D;
              var player = document.querySelector("#weapon").object3D;
  
              player.getWorldPosition(position1);
              enemy.getWorldPosition(position2);
  
              //set the velocity and it's direction
              var direction = new THREE.Vector3();
  
              direction.subVectors(position1, position2).normalize();
  
              enemyBullet.setAttribute("velocity", direction.multiplyScalar(8));
  
              enemyBullet.setAttribute("dynamic-body", {
                  shape: "sphere",
                  mass: "0",
            });

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if (playerLife <= 0) {
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);
                        playerLife = 0;
                        element.setAttribute("text", {
                            value: playerLife
                        });

                        //remove tanks                        
                        var tankEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])

                        }
                    }

                }
            });

  
        }   
    }
})