game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player", //loads image named "player" (named in resources.js)
                width: 64, //Sets width to 64. //:D
                height: 64, //Sets height to 64.
                spritewidth: "64", //draws from sprite and sets to 64
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        this.type = "PlayerEntity";
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20); //sets movement speed
        this.facing = "right";
        //keeps track of which direction your chharacter is going :D
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.dead = false;
        this.attack = game.data.playerAttack;
        this.lastAttack = new Date().getTime(); //Haven't used this yet
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        this.now = new Date().getTime();
        
        if (this.health <= 0){
            this.dead = true;
            //states that if health is less than or equal to zero, then the player is dead.
        }
        
        if (me.input.isKeyPressed("right")) {
            //sets position of x by adding the velocity defined aboove in set velocity and then 
            //multiplying it by me.timer.tick
            this.body.vel.x += this.body.accel.x * me.timer.tick; //me.timer.tick makes movement look smooth
            this.facing = "right";
            this.flipX(true); //Se  ts orc to walk to the right instead of the left
        } else if (me.input.isKeyPressed("left")) {
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }




        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets current animation to attakc and once that is done 
                //it goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that next time we start this sequence of animation we start off 
                //from the begining of the animation  instead of where we left off
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk"); //says that  if not using walking animation, use walking animation
            }
        } else if(!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);

        return true;
    },
    
    loseHealth: function(damage){
      this.health = this.health - damage;
      console.log(this.health);
    },
    
    
    collideHandler: function(response) {
        if(response.b.type==='EnemyBaseEntity') {   
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
            
            if(ydif<-40 && xdif< 70 && xdif>-35) {
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            
            
            
            else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x - 1;
            }else if(xdif<60 && this.facing==='left' && xdif>0) {
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x +1;
            }
            //chekcinig to see if its been 400 miliseconds since the last time the base was hit
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                this.lastHit = this.now; //once that has been checked it will update the last hit variable and say that this is the new time
                response.b.loseHealth(game.data.playerAttack);
            }
        }else if(response.b.type==='EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            
            if (xdif>0){
                this.pos.x = this.pos.x + 1;
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
               // this.pos.x = this.pos.x - 1;
                if(this.facing==="right"){
                    this.body.vel.x = 0;
                }
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <=40) && 
                    (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;    
                //if the creeps health is lower than our attack, then execute code in if statement
                if(response.b.health <= game.data.playerAttack){
                    //adds one gold for every creep kill
                    game.data.gold += 1;
                    console.log("Current gold: " + game.data.gold);
                }
                
                response.b.loseHealth(game.data.playerAttack);
            }
        }
    }
});

