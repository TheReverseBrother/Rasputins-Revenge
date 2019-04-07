var mainGame = function()
{
    this.canvas = document.getElementById("aerial-canvas");
    this.ctx = this.canvas.getContext('2d');

};

aerialAssault.prototype =
    {
        startGame: function()
        {
            MainGame.HasStarted = true;
        },

        startMenu: function()
        {

        },

        setHighScoreOnStart: function()
        {
            let cookie =  document.cookie;

            if (cookie === "")
            {
                MainGame.HIGHSCORE = 0;
            }
            else
            {
                let split = cookie.split("=");
                let x = split[1];
                MainGame.HIGHSCORE = parseInt(x);

                document.getElementById("highScore").innerHTML = "Highscore: "+MainGame.HIGHSCORE;
            }

        },

        gameOverMenu: function()
        {

        },

        pausedMenu()
        {
            MainGame.ctx.font = "50px Roboto";
            MainGame.ctx.fillText(     "Game Paused",   185, 80);
            MainGame.ctx.strokeText(   "Game Paused", 185, 80);
            if(MainGame.Lag === true)
            {
                MainGame.ctx.font = "25px Roboto";
                MainGame.ctx.fillText(     "Game is lagging", 220, 120);
                MainGame.ctx.strokeText(   "Game is lagging", 220, 120);
            }
        },



        checkFPS: function()
        {
            if(MainGame.fps < 30)
            {
                MainGame.Lag = true;
                MainGame.ISpaused = 1;
            }
        },

        GameUpdateLoop : function(now) {
            MainGame.refreshLoop();
            if(MainGame.ISpaused === 0 && MainGame.ISOver ===0)
            {

            }
            else if( MainGame.ISpaused === 1)
            {

            }
            else if (MainGame.ISOver === 1)
            {

            }
            requestAnimationFrame(MainGame.GameUpdateLoop);
        },

        clear : function(){
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        },

        resetFunction: function()
        {

        },


        checkCollision: function()
        {

        },

        /*
         * If Any enemy ship reaches the other side of the screen the game is over and this is thrown
         */
        checkIfOver: function()
        {

        },

        playSound: function(soundToPlay)
        {
            if(MainGame.SOUNDON === true)
            {
                soundToPlay.cloneNode(true).play();
            }
        },

        backgroundManager: function()
        {


        },
        writeScoreAndFps: function()
        {
            if(MainGame.CANVAS_SCORE > MainGame.HIGHSCORE)
            {
                MainGame.HIGHSCORE = MainGame.CANVAS_SCORE;
                document.getElementById("highScore").innerHTML = "Highscore: "+MainGame.CANVAS_SCORE;
            }
            document.getElementById("fps").innerHTML = "FPS: "+MainGame.fps;
            document.getElementById("score").innerHTML = "Score: "+MainGame.CANVAS_SCORE;
        },

        pause: function()
        {
            if(MainGame.ISpaused === 0)
            {
                MainGame.ISpaused = 1;
            }
            else if(MainGame.ISpaused === 1)
            {
                MainGame.ISpaused = 0;
            }
            console.log(MainGame.ISpaused);
        },

        saveScore: function()
        {
            document.cookie = "high_SCORE=" +MainGame.HIGHSCORE;
            // localStorage.setItem("high_SCORE=",MainGame.HIGHSCORE);
        },

        //This was modified from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
        refreshLoop: function()
        {
            const now = performance.now();
            while (MainGame.times.length > 0 && MainGame.times[0] <= now - 1000) {
                MainGame.times.shift();
            }
            MainGame.times.push(now);
            MainGame.fps = MainGame.times.length;
        }

    };

window.addEventListener(
    'blur',

    function (e) {
        if (MainGame.HasStarted)
        {
            MainGame.pause();
        }
    }
);


window.addEventListener('keydown', function(e){
    var key = e.keyCode;

    if(key === MainGame.PAUSE_KEY)
    {
        if(MainGame.ISOver != 1)
        {
            MainGame.pause();
        }

    }
    else if(key === MainGame.RESET)
    {
        MainGame.resetFunction();
    }
    if(key === MainGame.START)
    {
        MainGame.startGame();
    }
});


var MainGame = new mainGame();
MainGame.startMenu();

