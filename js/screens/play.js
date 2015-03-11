game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                me.levelDirector.loadLevel("level01"); //loads the first level 
                
                var player = me.pool.pull("player", 0, 420, {}); //pulls player out of the pool and builds him as a variable
                me.game.world.addChild(player, 5);
                
                me.input.bindKey(me.input.KEY.RIGHT, "right");
		
                // add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
