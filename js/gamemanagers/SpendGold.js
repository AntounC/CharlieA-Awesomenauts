game.SpendGold = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
            this.lastBuy = this.now;
            if(!this.buying){//if not buying then
                this.startBuying();
            }else{
                this.stopBuying();
            }
            
        } 
        
        this.checkBuyKeys();
        
        return true;  
    },
    
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        //loads the image used for the goldscreen which I named gold-screen in resources.js
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;//updates game when buyscreen is up
        game.data.buyscreen.setOpacity(0.8);//makes buy screen a little see through soo players can see whats up
        me.game.world.addChild(game.data.buyscreen, 34);
        //sets it so that my player can not move or jump when the buyscreen is up/when the game is paused on the buyscreen
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        //binds F1-F6 keys to buy stuff when the buy screen is up^
        this.setBuyText();
     },
     
     setBuyText: function(){
        game.data.buytext = new (me.Renderable.extend({
                    init: function(){
                      this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);  
                      this.font = new me.Font("Arial", 26, "white");
                      this.updateWhenPaused = true;
                      this.alwaysUpdate = true;
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y + 50);
                        this.font.draw(renderer.getContext(), "Skill 1: Hard Hitter. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 100);
                        this.font.draw(renderer.getContext(), "Skill 2: Gotta Go Fast!! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 150);
                        this.font.draw(renderer.getContext(), "Skill 3: Tank. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 200);
                        this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 250);
                        this.font.draw(renderer.getContext(), "W Ability: Eat Creep For Health (Lol): " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 300);
                        this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear m8:  " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 350);
                    }
                    

                }));
        me.game.world.addChild(game.data.buytext, 35);
     },
    
    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        //unbinds F1-F6 keys to keep players from accidently buying stuff wqhen the buy screen is not present
        me.game.world.removeChild(game.data.buytext);
    },
    
    checkBuyKeys: function(){
        if(me.input.isKeyPressed("F1")){
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
        }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(4)){
                this.makePurchase(4);
            }
        }else if(me.input.isKeyPressed("F4")){
            if(this.checkCost(5)){
                this.makePurchase(5);
            }
        }else if(me.input.isKeyPressed("F5")){
            if(this.checkCost(6)){
                this.makePurchase(6);
            }
        }
    },
    
    checkCost: function(skill){
        //states that if skill 1 was selected and that the player has equal or more gold than the cost to level up skill1 then It returns true, if not it returns false
            if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
                return true;
            }else if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
                return true;
            }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
                return true;
            }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
                return true;
            }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
                return true;
            }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
                return true;
            }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
                return true;
            }
            else{
                return false;
            }
    },
    
    makePurchase: function(skill) {
        if (skill === 1) {
            game.data.gold -= ((game.data.skill1 + 1) * 10);
            game.data.skill1 += 1;
            game.data.playerAttack += 1;
        }else if(skill === 2){
            game.data.gold -= ((game.data.skill2 + 1) * 10);
            game.data.skill2 += 1;
        }else if(skill === 3){
            game.data.gold -= ((game.data.skill3 + 1) * 10);
            game.data.skill3 += 1;
        }else if(skill === 4){
            game.data.gold -= ((game.data.ability1 + 1) * 10);
            game.data.ability1 += 1;
        }else if(skill === 5){
            game.data.gold -= ((game.data.ability2 + 1) * 10);
            game.data.ability2 += 1;
        }else if(skill === 6){
            game.data.gold -= ((game.data.ability3 + 1) * 10);
            game.data.ability3 += 1;
        }
    }
});






