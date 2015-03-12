game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player", //loads image named "player" (named in resources.js)
                width: 64, //Sets width to 64. //:D :D :D :D :D :D :D :D
                height: 64, //Sets height to 64.
                spritewidth: "64", //draws from sprite and sets to 64
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20); //sets movement speed
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //sets position of x by adding the velocity defined aboove in set velocity and then 
            //multiplying it by me.timer.tick
            this.body.vel.x += this.body.accel.x * me.timer.tick; //me.timer.tick makes movement look smooth
            this.flipX(true); //Sets orc to walk to the right instead of the left
        } else {
            this.body.vel.x = 0;
        }
     if(me.input.isKeyPressed("attack")) {
            if(!this.renderable.isCurrentAnimation("attack")) {
                //sets current animation to attakc and once that is done 
                //it goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that next time we start this sequence of animation we start off 
                //from the begining of the animation  instead of where we left off
                this.renderable.setAnimationFrame();
            }   
        }  
           
    else if(this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk"); //says that  if not using walking animation, use walking animation
            }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
        

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);

        return true;
    }
});

game.PlayerBaseEntity = me.Entity.extend({
   init : function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y, {
           image: "tower", 
           width: 100,
           height: 100,
           spritewidth: "100",
           spriteheight: "100", 
           getShape: function () {
               return (new me.Rect(0, 0, 100, 70)).toPolygon();
           }
           
       }]);
    
       this.broken = false; //states the base is not broken when started
       this.health = 10; //makes healtth for base 10
       this.alwaysUpdate = true; //states that even if the base is not within screen sight, it is still constantly updating
       this.body.onCollision = this.onCollision.bind(this); //checks for collisions within the PlayerEntityBase
       this.type = "PlayerBaseEntity";
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       this.renderable.setCurrentAnimation("idle");
   
   },
   
   update:function(delta) {
       if(this.health<=0) { //creates update function used for if statement
           this.broken = true; //states that if health is less than or equal to 0, then we are dead.
           this.renderable.setCurrentAnimation("broken");
       }
       this.body.update(delta);
       
       this._super(me.Entity, "update", [delta]);
       return true;
   },
   
   onCollision: function() {
       
   }
   
});

game.EnemyBaseEntity = me.Entity.extend({
   init : function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y, {
           image: "tower",
           width: 100,
           height: 100,
           spritewidth: "100",
           spriteheight: "100", 
           getShape: function () {
               return (new me.Rect(0, 0, 100, 70)).toPolygon();
           }
           
       }]);
    
       this.broken = false; //states the base is not broken when started
       this.health = 10; //makes healtth for base 10
       this.alwaysUpdate = true; //states that even if the base is not within screen sight, it is still constantly updating
       this.body.onCollision = this.onCollision.bind(this); //checks for collisions within the PlayerEntityBase
       
       this.type = "EnemyBaseEntity";
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       this.renderable.setCurrentAnimation("idle");
   
   },
   
   update:function(delta) {
       if(this.health<=0) { //creates update function used for if statement
           this.broken = true; //states that if health is less than or equal to 0, then we are dead.
           this.renderable.setCurrentAnimation("broken");
       }
       this.body.update(delta);
       
       this._super(me.Entity, "update", [delta]);
       return true;
   },
   
   onCollision: function() {
       
   }
   
});