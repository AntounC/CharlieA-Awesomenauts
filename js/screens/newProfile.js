game.NewProfile = me.ScreenObject.extend({
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("register").style.visibility = "visible";
                
                
                me.input.bindKey(me.input.KEY.B);
                me.input.bindKey(me.input.KEY.Q);
                me.input.bindKey(me.input.KEY.E);
                me.input.bindKey(me.input.KEY.W);
                me.input.bindKey(me.input.KEY.A);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                      this._super(me.Renderable, 'init', [10, 10, 300, 50]);  
                      this.font = new me.Font("Arial", 26, "white");
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Pick a username and password m8", this.pos.x, this.pos.y + 50);
                    }
                    

                })));
                
                
                
	},
	
	
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("register").style.visibility = "hidden";
	}
});



