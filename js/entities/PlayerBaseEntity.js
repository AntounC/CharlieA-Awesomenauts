game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }

            }]);

        this.broken = false; //states the base is not broken when started
        this.health = game.data.playerBaseHealth; //makes healtth for base 10
        this.alwaysUpdate = true; //states that even if the base is not within screen sight, it is still constantly updating
        this.body.onCollision = this.onCollision.bind(this); //checks for collisions within the PlayerEntityBase
        this.type = "PlayerBase";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        if (this.health <= 0) { //creates update function used for if statement
            this.broken = true; //states that if health is less than or equal to 0, then we are dead.
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage){
      this.health = this.health - damage;  
    },
    
    onCollision: function() {

    }

});