var mainGame = function()
{
    this.canvas = document.getElementById("main-canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "yellow";
    this.CANVAS_WIDTH = 680;
    this.CANVAS_HEIGHT = 300;

    //Booleans
    this.HasStarted = true;
    this.IsPause = false;
    this.IsOver = false;
    this.SPRITEIMAGE = new Image();


    this.TestCharacter= new StaticObject(30,30,20,20,this.SPRITEIMAGE,20,20,20,20);
};

mainGame.prototype =
    {
        GameUpdateLoop : function(now) {
            // MainGame.refreshLoop();
            if(MainGame.IsPause === false && MainGame.IsOver === false)
            {
                MainGame.clear();
                MainGame.TestCharacter.updatePosition();
                MainGame.TestCharacter.Draw(MainGame.ctx);
            }

            requestAnimationFrame(MainGame.GameUpdateLoop);
        },

        clear : function(){
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        },
    };

addEventListener('keyup', function (e) {
    var key = e.keyCode;
    if(key === 32)
    {
        MainGame.TestCharacter.accelerate(0.1)
    }
})

window.addEventListener('keydown', function(e){
    var key = e.keyCode;

    if(key === 32)
    {
        MainGame.TestCharacter.accelerate(-0.2)
    }
});


var MainGame = new mainGame();
MainGame.GameUpdateLoop();

