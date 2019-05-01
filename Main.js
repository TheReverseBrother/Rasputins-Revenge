var mainGame = function()
{
    this.canvas = document.getElementById("main-canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "yellow";
    this.CANVAS_WIDTH = 680;
    this.CANVAS_HEIGHT = 300;


    //Animation And Timeout Ids
    this.id = 0;
    this.IntervalID = 0;
    this.EndAnimID = 0;

    //Counts
    this.COUNTER = 0;
    this.WAVES = 0;
    this.SCORE = 0;
    this.HIGH_SCORE = 0;

    //Const
    this.ENEMY_SPEED = -1;
    this.STANDARD_DELAY = 5;
    this.CHTR_DELAY = 8;
    this.Lives = 2;

    //Arrays
    this.PositionArray = [700,700,680, 720,740,760,780,800,820];
    this.EnemyArray = [];
    this.BulletArray = [];
    this.BULLET_SPEED = 1;

    //Power ups
    this.HeartArray = [];
    this.NukeArray = [];
    this.NUKE_SPEED = -1;

    //Sprite Sheet
    this.SPRITEIMAGE = new Image();
    this.SPRITEIMAGE.src = "./images/SpriteSheet.png";

    //Flying Sprite
    this.Charfly = [
        { SPRITE_X : 78, SPRITE_Y : 30, SPRITE_WIDTH : 55, SPRITE_HEIGHT : 48},
        { SPRITE_X : 13, SPRITE_Y : 30, SPRITE_WIDTH : 55, SPRITE_HEIGHT : 48},
    ];

    //Shooting Sprite
    this.Charshoot = [
        { SPRITE_X : 142, SPRITE_Y : 27, SPRITE_WIDTH : 62, SPRITE_HEIGHT : 48},
        { SPRITE_X : 205, SPRITE_Y : 27, SPRITE_WIDTH : 62, SPRITE_HEIGHT : 48},
    ];

    //Player Death
    this.ChtrSpriteDeath = [
        {SPRITE_X : 266, SPRITE_Y : 49, SPRITE_HEIGHT : 31, SPRITE_WIDTH: 59}
    ];
    //Bullet
    this.BULLET = [
        {SPRITE_X : 372, SPRITE_Y : 38, SPRITE_HEIGHT : 18, SPRITE_WIDTH: 22}
    ];
    //Enemy
    this.ENEMY = [
        {SPRITE_X: 334, SPRITE_Y: 33, SPRITE_HEIGHT: 36, SPRITE_WIDTH: 36}
    ];
    //Nuke
    this.NUKE = [
        { SPRITE_X : 344, SPRITE_Y : 91, SPRITE_WIDTH : 47, SPRITE_HEIGHT : 40},
        { SPRITE_X : 399, SPRITE_Y : 72, SPRITE_WIDTH : 53, SPRITE_HEIGHT : 55},
    ];
    //Heart
    this.HEART = [
        {SPRITE_X: 415, SPRITE_Y: 39, SPRITE_HEIGHT: 18, SPRITE_WIDTH: 19}
    ];


    //Background
    this.BG_SPRITE_X = 0;
    this.BG_SPRITE_Y= 90;
    this.BG_SPRITE_HEIGHT= 150;
    this.BG_SPRITE_WIDTH= 335;
    this.BACKGROUND_IMAGE_OFFSCREEN_OFFSET =680;
    this.BACKGROUND_IMAGE_OFFSET =0;

    //Sounds
    this.SHOOTING_SOUND = new Audio("./Sounds/gunshot.mp3");
    this.SONG1_SOUND = new Audio("./Sounds/Rasputin8Bit.mp3");
    this.SONG2_SOUND = new Audio("./Sounds/RasputinRemix.mp3");
    this.DEATH_SOUND = new Audio("./Sounds/GameOver.mp3");
    this.NUKE_SOUND = new Audio("./Sounds/nuke.mp3");



    //Booleans
    this.HasStarted = false;
    this.IsPause = false;
    this.IsOver = false;
    this.controlMenu = false;

    //Toasts
    this.STARTLINK = document.getElementById("startLink");
    this.STARTCONTROLLINK = document.getElementById("startControlLink");
    this.STARTTOAST = document.getElementById("mobileWelcomeToast");
    this.CONTROLLINK= document.getElementById("controlLink");
    this.CONTROLTOAST= document.getElementById('controlToast');
    this.RESTARTTOAST = document.getElementById('restartToast');
    this.RESTARTLINK = document.getElementById('restartLink');

    // this.TestCharacter= new StaticObject(36,36,20,20,this.SPRITEIMAGE,this.ENEMY);
    this.TestCharacter= new AnimatedObject(this.SPRITEIMAGE,this.Charfly,20,20,60,60, this.CHTR_DELAY);

    //Heart Containers
    this.lifeOne = new StaticObject(30,30,5,265,this.SPRITEIMAGE,this.HEART);
    this.lifeTwo = new StaticObject(30,30,35,265,this.SPRITEIMAGE,this.HEART);
    this.lifeThree = new StaticObject(30,30,65,265,this.SPRITEIMAGE,this.HEART);

    this.LifeArray = [this.lifeOne,this.lifeTwo,this.lifeThree];
    //Win Animation Characters
    this.enemyOne = new StaticObject(36,36,680,150,this.SPRITEIMAGE,this.ENEMY);
    this.enemyTwo = new StaticObject(36,36,720,200,this.SPRITEIMAGE,this.ENEMY);
    this.enemyThree = new StaticObject(36,36,680,50,this.SPRITEIMAGE,this.ENEMY);

    this.enemyFour = new StaticObject(36,36,760,150,this.SPRITEIMAGE,this.ENEMY);
    this.enemyFive = new StaticObject(36,36,580,150,this.SPRITEIMAGE,this.ENEMY);
    this.enemySix = new StaticObject(36,36,680,150,this.SPRITEIMAGE,this.ENEMY);

    this.EndAnimationArray = [this.enemyOne, this.enemyTwo, this.enemyThree, this.enemyFour, this.enemyFive, this.enemySix,];

};

mainGame.prototype =
    {
        //Author: Tomas
        GameUpdateLoop : function(now)
        {
            // MainGame.refreshLoop();
            if(MainGame.IsPause === false && MainGame.IsOver === false)
            {
                MainGame.clear();
                MainGame.checkEndConditions();
                MainGame.backgroundManager();
                MainGame.characterManager();
                MainGame.enemyManager();
                MainGame.bulletManager();
                // MainGame.nukeManager();
                // MainGame.heartManager();
                MainGame.HUDmanager();
            }
            if(!MainGame.IsOver)
            {
                MainGame.id = requestAnimationFrame(MainGame.GameUpdateLoop);
            }
            else
            {
                console.log("In End Game")
                clearInterval(MainGame.IntervalID);
                cancelAnimationFrame(MainGame.id);
                MainGame.saveScore();
                MainGame.HasStarted = false;
                MainGame.RESTARTTOAST.style.display = "block";
                MainGame.RESTARTTOAST.style.opacity = 1;
                MainGame.GameOverMenu();
            }
        },

        //Author: Tomas
        clear : function(){
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        },

        addAnimations: function()
        {
        },

        addLivesToArray: function()
        {
            MainGame.LifeArray.push(MainGame.lifeOne);
            MainGame.LifeArray.push(MainGame.lifeTwo);
            MainGame.LifeArray.push(MainGame.lifeThree);
        },

        GameOverMenu: function()
        {
            MainGame.clear();
            MainGame.backgroundManager();
            MainGame.endAnimation();
            MainGame.endMenuText();

            if(MainGame.HasStarted === false)
            {
                MainGame.EndAnimID = requestAnimationFrame(MainGame.GameOverMenu)
            }
        },

        HUDmanager: function()
        {
          MainGame.drawLives();
          MainGame.drawScore();
          MainGame.drawHiScore();
        },

        drawLives: function()
        {
            for(let i = 0; i <= MainGame.Lives; i ++)
            {
                MainGame.LifeArray[i].Draw(MainGame.ctx);
            }
        },

        drawScore: function()
        {
            MainGame.ctx.save();

            let string = "Score : "+ MainGame.SCORE;
            MainGame.ctx.font = "20px Arial";
            MainGame.ctx.fillStyle = "Pink";
            MainGame.ctx.fillText(string,580,25);

        },

        drawHiScore: function()
        {
            if(MainGame.SCORE > MainGame.HIGH_SCORE)
            {
                MainGame.HIGH_SCORE = MainGame.SCORE;
            }
            let string = "HiScore : "+ MainGame.HIGH_SCORE;

            MainGame.ctx.fillText(string,570,285);

            MainGame.ctx.restore();
        },
        //Author: Tomas
        pause: function()
        {
            if(MainGame.IsPause === false )
            {
                MainGame.IsPause = true;
            }
            else if(MainGame.IsPause === true)
            {
                MainGame.IsPause = false;
            }
        },

        //Author: Tomas
        checkEndConditions: function()
        {
          MainGame.EnemyReachesEnd();
          MainGame.EnemyCollidesWithPlayer();
          MainGame.playerHitsBottomOrTop();
          MainGame.CheckLives();
        },
        CheckLives: function()
        {
          if(MainGame.Lives < 0)
          {
              MainGame.IsOver = true;
              console.log("Lives");
          }
        },
        //Author: Tomas
        EnemyReachesEnd: function()
        {
            for(let i = 0; i < MainGame.EnemyArray.length; i+=1)
            {
                if(MainGame.EnemyArray[i].getVisible())
                {
                    if(MainGame.EnemyArray[i].x === - MainGame.EnemyArray[i].width)
                    {
                        MainGame.Lives -=1;
                        MainGame.EnemyArray[i].setInVisible();
                    }
                }
            }
        },

        //Author: Tomas
        EnemyCollidesWithPlayer: function()
        {
            for(let i = 0; i < MainGame.EnemyArray.length; i+=1)
            {
                if(MainGame.EnemyArray[i].getVisible()) {
                    if (MainGame.TestCharacter.checkCrash(MainGame.EnemyArray[i]))
                    {
                        // MainGame.IsOver = true;
                        MainGame.Lives -=1;
                        // MainGame.TestCharacter.setInVisible();
                        MainGame.EnemyArray[i].setInVisible();
                    }
                }
            }
        },

        //Author: Tomas
        playerHitsBottomOrTop: function()
        {
          if((MainGame.TestCharacter.y <= -30)|| (MainGame.TestCharacter.y >= 300))
          {
              MainGame.IsOver = true;
              console.log("Top Bottom")
          }
        },

        //Author: Tomas
        characterManager: function()
        {
            MainGame.TestCharacter.gravityBehaviour();
            MainGame.TestCharacter.render(MainGame.ctx);
        },

        //Author: Tomas
        startGame: function()
        {
            console.log("In start");
            MainGame.HasStarted = true;
            // MainGame.addLivesToArray();
            MainGame.setHighScoreOnStart();
            MainGame.IntervalID = setInterval(MainGame.difficultyManager,5000);
            MainGame.GameUpdateLoop();
        },
        //Author: Tomas
        difficultyManager: function()
        {
            console.log("WELLL");
            console.log(MainGame.COUNTER);
            if(MainGame.HasStarted)
            {
                if(!MainGame.IsPause && MainGame.COUNTER === 0)
                {
                    console.log("in here");
                    MainGame.spawnEnemy(1);
                }
                else
                {
                    var z = Math.floor((Math.random() * MainGame.COUNTER) + 1);
                    MainGame.spawnEnemy(z);
                }
                if((MainGame.WAVES % 12) === 0)
                {
                    MainGame.ENEMY_SPEED -= 1;
                    MainGame.COUNTER = MainGame.COUNTER/2;
                }
            }
        },

        //Author: Tomas
        spawnEnemy: function(number)
        {
            MainGame.COUNTER += 1;
            for(let i = 0; i <= number; i += 1)
            {
                var z = Math.floor((Math.random() * 4) + 1);
                var y = Math.floor((Math.random() * 270) + 1);

                MainGame.EnemyArray.push(new StaticObject(36,36,MainGame.PositionArray[z],y,MainGame.SPRITEIMAGE,MainGame.ENEMY));
            }
            MainGame.WAVES +=1
        },

        //Author: Tomas
        enemyManager: function()
        {
            MainGame.enemyMovementBehaviour();
            MainGame.renderEnemies();

        },

        //Author: Tomas
        renderEnemies: function()
        {
            for(let i = 0; i < MainGame.EnemyArray.length; i +=1)
            {
                MainGame.EnemyArray[i].Draw(MainGame.ctx);
            }
        },

        //Author: Tomas
        enemyMovementBehaviour: function()
        {
            for(let i = 0; i < MainGame.EnemyArray.length; i +=1)
            {
                MainGame.EnemyArray[i].updatePositionX(MainGame.ENEMY_SPEED);
            }
        },

        //Author: Tomas
        backgroundManager: function()
        {
            MainGame.BACKGROUND_IMAGE_OFFSET += -0.5;
            MainGame.BACKGROUND_IMAGE_OFFSCREEN_OFFSET += -0.5;
            MainGame.ctx.drawImage(MainGame.SPRITEIMAGE,MainGame.BG_SPRITE_X,
                MainGame.BG_SPRITE_Y,MainGame.BG_SPRITE_WIDTH,MainGame.BG_SPRITE_HEIGHT,
                MainGame.BACKGROUND_IMAGE_OFFSET,0,MainGame.CANVAS_WIDTH,MainGame.CANVAS_HEIGHT
            );
            MainGame.ctx.drawImage(MainGame.SPRITEIMAGE,MainGame.BG_SPRITE_X,
                MainGame.BG_SPRITE_Y,MainGame.BG_SPRITE_WIDTH,MainGame.BG_SPRITE_HEIGHT,
                MainGame.BACKGROUND_IMAGE_OFFSCREEN_OFFSET,0,MainGame.CANVAS_WIDTH,MainGame.CANVAS_HEIGHT
            );
            if(MainGame.BACKGROUND_IMAGE_OFFSCREEN_OFFSET === -MainGame.CANVAS_WIDTH)
            {
                MainGame.BACKGROUND_IMAGE_OFFSCREEN_OFFSET = MainGame.CANVAS_WIDTH;
            }
            if(MainGame.BACKGROUND_IMAGE_OFFSET === -MainGame.CANVAS_WIDTH)
            {
                MainGame.BACKGROUND_IMAGE_OFFSET = MainGame.CANVAS_WIDTH;
            }
        },

        //Author: Tomas
        bulletManager: function()
        {
            MainGame.renderBullets();
            MainGame.bulletMovementBehaviour();
            MainGame.bulletEnemyCollision();
        },

        //Author: Tomas
        bulletEnemyCollision: function()
        {
            for(let i = 0; i < MainGame.EnemyArray.length; i +=1)
            {
                for(let j = 0; j < MainGame.BulletArray.length; j+= 1)
                {
                    if(MainGame.EnemyArray[i].getVisible() && MainGame.BulletArray[j].getVisible())
                    {
                        if(MainGame.BulletArray[j].checkCrash(MainGame.EnemyArray[i]))
                        {
                            MainGame.EnemyArray[i].setInVisible();
                            MainGame.BulletArray[j].setInVisible();
                            MainGame.SCORE += 1;
                        }
                    }
                }
            }
        },

        //Author: Tomas
        renderBullets: function()
        {
            for(let i = 0; i < MainGame.BulletArray.length; i +=1)
            {
                MainGame.BulletArray[i].Draw(MainGame.ctx);
            }
        },

        //Author: Tomas
        bulletMovementBehaviour: function()
        {
            for(let i = 0; i < MainGame.BulletArray.length; i +=1)
            {
                MainGame.BulletArray[i].updatePositionX(MainGame.BULLET_SPEED);
            }
        },

        //Author: Tomas
        createBullet: function()
        {
            let x = MainGame.TestCharacter.x + MainGame.TestCharacter.width;
            let y = MainGame.TestCharacter.y + 10;
            MainGame.BulletArray.push(new StaticObject(20,20,x, y,MainGame.SPRITEIMAGE, MainGame.BULLET ));

        },

        //Author: Nathan
        spawnNuke: function(number)
        {
            for(let i = 0; i <= number; i += 1)
            {
                var z = Math.floor((Math.random() * 4) + 1);
                var y = Math.floor((Math.random() * 270) + 1);

                MainGame.NukeArray.push(new StaticObject(47,40,MainGame.PositionArray[z],y,MainGame.SPRITEIMAGE,MainGame.NUKE));
            }
        },

        //Author: Nathan
        nukeManager: function()
        {
            MainGame.renderNuke();
            MainGame.nukeMovementBehaviour();
            MainGame.bulletNukeCollision();

        },

        //Author: Nathan
        renderNuke: function()
        {
            for(let i = 0; i < MainGame.NukeArray.length; i +=1)
            {
                MainGame.NukeArray[i].Draw(MainGame.ctx);
            }
        },

        //Author: Nathan
        nukeMovementBehaviour: function()
        {
            for(let i = 0; i < MainGame.NukeArray.length; i +=1)
            {
                MainGame.NukeArray[i].updatePositionX(MainGame.NUKE_SPEED);
            }
        },

        //Author: Nathan
        bulletNukeCollision: function()
        {
            for(let i = 0; i < MainGame.NukeArray.length; i +=1)
            {
                for(let j = 0; j < MainGame.BulletArray.length; j+= 1)
                {
                    if(MainGame.NukeArray[i].getVisible() && MainGame.BulletArray[j].getVisible())
                    {
                        if(MainGame.BulletArray[j].checkCrash(MainGame.NukeArray[i]))
                        {
                            MainGame.NukeArray[i].setInVisible();
                            MainGame.BulletArray[j].setInVisible();

                        }
                    }
                }
            }
        },

        //Author: Nathan
        spawnHeart: function(number)
        {
            for(let i = 0; i <= number; i += 1)
            {
                var z = Math.floor((Math.random() * 4) + 1);
                var y = Math.floor((Math.random() * 270) + 1);

                MainGame.HeartArray.push(new StaticObject(18,19,MainGame.PositionArray[z],y,MainGame.SPRITEIMAGE,MainGame.HEART));
            }
        },

        //Author: Nathan
        heartManager: function()
        {
            MainGame.renderHeart();
            MainGame.HeartCollidesWithPlayer;

        },

        //Author: Nathan
        renderHeart: function()
        {
            for(let i = 0; i < MainGame.HeartArray.length; i +=1)
            {
                MainGame.HeartArray[i].Draw(MainGame.ctx);
            }
        },

        //Author: Nathan
        HeartCollidesWithPlayer: function()
        {
            for(let i = 0; i < MainGame.HeartArray.length; i+=1)
            {
                if(MainGame.HeartArray[i].getVisible()) {
                    if (MainGame.TestCharacter.checkCrash(MainGame.HeartArray[i]))
                    {
                        //add life to player
                        MainGame.HeartArray[i].setInVisible();
                    }
                }
            }
        },

        restartGame: function()
        {
            MainGame.COUNTER = 0;
            MainGame.WAVES = 0;
            MainGame.EnemyArray = [];
            MainGame.lives = true;
            MainGame.HasStarted = true;
            MainGame.IsOver = false;
            MainGame.TestCharacter = new AnimatedObject(this.SPRITEIMAGE,this.Charfly,20,20,60,60, this.CHTR_DELAY);;
            cancelAnimationFrame(MainGame.EndAnimID);
        },

        setHighScoreOnStart: function()
        {
            let cookie =  document.cookie;

            if (cookie === "")
            {
                MainGame.HIGH_SCORE = 0;
            }
            else
            {
                let split = cookie.split("=");
                let x = split[1];
                MainGame.HIGH_SCORE = parseInt(x);
            }
        },

        saveScore: function()
        {
            document.cookie = "high_SCORE=" +MainGame.HIGH_SCORE;
        },


        endAnimation: function()
        {
          for(let i = 0 ; i < MainGame.EndAnimationArray.length; i ++)
          {
              MainGame.EndAnimationArray[i].Draw(MainGame.ctx);
              MainGame.EndAnimationArray[i].updatePositionX(MainGame.ENEMY_SPEED);
              if(MainGame.EndAnimationArray[i].x === -MainGame.EndAnimationArray[i].width)
              {
                  MainGame.EndAnimationArray[i].x = 680;
              }
          }
        },

        endMenuText: function()
        {
            MainGame.ctx.save();
            MainGame.ctx.fillStyle= "white";
            MainGame.ctx.font = "40px Arial";
            MainGame.ctx.fillText("Game Over",                  235,    60);
            MainGame.ctx.restore();

            MainGame.ctx.save();
            MainGame.ctx.fillStyle= "white";
            MainGame.ctx.font = "25px Arial";
            MainGame.ctx.fillText("High Score : " +MainGame.HIGH_SCORE,260,    100);
            MainGame.ctx.fillText("Your Score : " +MainGame.SCORE,260,    135);
            MainGame.ctx.fillText("You survived : "+ MainGame.WAVES + " Waves",              210,    180);
            MainGame.ctx.restore();

        },
        //All Mobile Elements Go Beyond Here
        //Tomas
        detectMobile: function()
        {
            MainGame.mobile = 'ontouchstart' in window;
        },

        getViewportSize: function () {
            return {
                width: Math.max(document.documentElement.clientWidth ||
                    window.innerWidth || 0),

                height: Math.max(document.documentElement.clientHeight ||
                    window.innerHeight || 0)
            };
        },

        calculateArenaSize: function (viewportSize) {
            var DESKTOP_ARENA_WIDTH  = 680,  // Pixels
                DESKTOP_ARENA_HEIGHT = 300,  // Pixels
                arenaHeight,
                arenaWidth;

            arenaHeight = viewportSize.width *
                (DESKTOP_ARENA_HEIGHT / DESKTOP_ARENA_WIDTH);

            if (arenaHeight < viewportSize.height) { // Height fits
                arenaWidth = viewportSize.width;      // Set width
            }
            else {                                   // Height does not fit
                arenaHeight = viewportSize.height;    // Recalculate height
                arenaWidth  = arenaHeight *           // Set width
                    (DESKTOP_ARENA_WIDTH / DESKTOP_ARENA_HEIGHT);
            }

            if (arenaWidth > DESKTOP_ARENA_WIDTH) {  // Too wide
                arenaWidth = DESKTOP_ARENA_WIDTH;     // Limit width
            }

            if (arenaHeight > DESKTOP_ARENA_HEIGHT) { // Too tall
                arenaHeight = DESKTOP_ARENA_HEIGHT;    // Limit height
            }

            return {
                width:  arenaWidth,
                height: arenaHeight
            };
        },

        fitScreen: function () {
            var arenaSize = MainGame.calculateArenaSize(
                MainGame.getViewportSize());

            MainGame.resizeElementsToFitScreen(arenaSize.width,
                arenaSize.height);
        },

        resizeElementsToFitScreen: function (arenaWidth, arenaHeight) {
            MainGame.resizeElement(
                document.getElementById('main-canvas'), arenaWidth, arenaHeight);

            MainGame.resizeElement(document.getElementById('mobileWelcomeToast'),arenaWidth,arenaHeight);
            MainGame.resizeElement(document.getElementById('controlToast'),arenaWidth,arenaHeight);

        },

        resizeElement: function (element, w, h) {
            element.style.width  = w + 'px';
            element.style.height = h + 'px';
        },

        startMobileMenu: function()
        {
            MainGame.STARTTOAST.style.display = "block";
            MainGame.STARTTOAST.style.opacity = 1;
        },


        AddMenuOptions: function()
        {
            MainGame.STARTLINK.addEventListener('click',function(e)
            {
                MainGame.HasStarted = true;
                MainGame.startGame();
                MainGame.STARTTOAST.style.display = "none";
                MainGame.STARTTOAST.style.opacity = 0;
                MainGame.CONTROLTOAST.style.display = "none";
                MainGame.CONTROLTOAST.style.opacity = 0;
            });

            MainGame.CONTROLLINK.addEventListener('click',function()
            {
                MainGame.drawMobileInstructions();
                MainGame.controlMenu = true;
                MainGame.STARTTOAST.style.display = "none";
                MainGame.STARTTOAST.style.opacity = 0;
                MainGame.CONTROLTOAST.style.display = "block";
                MainGame.CONTROLTOAST.style.opacity = 1;
            });

            MainGame.STARTCONTROLLINK.addEventListener('click', function()
            {
                MainGame.HasStarted = true;
                MainGame.CONTROLTOAST.style.display = "none";
                MainGame.CONTROLTOAST.style.opacity = 0;
            });
            MainGame.RESTARTLINK.addEventListener('click', function()
            {
                MainGame.restartGame();
                console.log("FUCK ");
                MainGame.RESTARTTOAST.style.display = "none";
                MainGame.RESTARTTOAST.style.opacity = 0;
                MainGame.startGame();

            });
        },

        //Tomas
        AddTouchEventControllers: function()
        {
            console.log("HEY");
            MainGame.canvas.addEventListener('touchstart',MainGame.touchStart);
            MainGame.canvas.addEventListener('touchend',MainGame.touchEnd);
            MainGame.canvas.addEventListener('touchmove',MainGame.touchPause)
        },

        //Tomas
        touchStart: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x < MainGame.canvas.width/2)
            {
                MainGame.jetPack(-0.2);
            }
            else
            {
                // Shooting Function
                MainGame.createBullet();
            }

            e.preventDefault();
        },

        //Tomas
        touchEnd: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x < MainGame.canvas.width/2)
            {
                MainGame.jetPack(0.1);
            }

            e.preventDefault();
        },

        touchPause: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x > MainGame.canvas.width/2)
            {
                MainGame.pause();
            }

            e.preventDefault();
        },

        //Tomas
        jetPack: function(g)
        {
            MainGame.TestCharacter.gravity = g
        },

        drawMobileInstructions: function () {
            var cw = this.canvas.width,
                ch = this.canvas.height,
                TOP_LINE_OFFSET = 115,
                LINE_HEIGHT = 40;

            MainGame.ctx.save();

            MainGame.initializeContextForMobileInstructions();

            MainGame.drawMobileDivider(cw, ch);

            MainGame.drawControls();

            MainGame.ctx.restore();
        },

        drawMobileDivider: function (cw, ch) {
            MainGame.ctx.beginPath();
            MainGame.ctx.moveTo(cw/2, 0);
            MainGame.ctx.lineTo(cw/2, ch);
            MainGame.ctx.stroke();
        },

        initializeContextForMobileInstructions: function () {
            MainGame.ctx.textAlign = 'center';
            MainGame.ctx.textBaseline = 'middle';

            MainGame.ctx.font = '20px fantasy';

            MainGame.ctx.shadowBlur = 2;
            MainGame.ctx.shadowOffsetX = 2;
            MainGame.ctx.shadowOffsetY = 2;
            MainGame.ctx.shadowColor = 'rgb(0,0,0)';

            MainGame.ctx.fillStyle = 'yellow';
            MainGame.ctx.strokeStyle = 'yellow';
        },

        drawControls : function()
        {
            MainGame.ctx.fillText('Tap This side to keep Player up', 150, 30);
            MainGame.ctx.fillText('Tap This side to Shoot', 500, 30);
            MainGame.ctx.fillText('Swipe this side to pause', 500, 260);
        }
    };
//Tomas
addEventListener('keyup', function (e) {
    var key = e.keyCode;
    if(key === 32)
    {
        MainGame.jetPack(0.1);
    }
})
//Tomas
window.addEventListener('keydown', function(e){
    var key = e.keyCode;

    if(key === 32)
    {
        MainGame.jetPack(-0.2);
        // MainGame.createBullet();
    }
    if(key === 39)
    {
        MainGame.createBullet();
    }
});

//Tomas
var MainGame = new mainGame();
MainGame.detectMobile();
//Tomas
if(MainGame.mobile)
{
    MainGame.AddTouchEventControllers();
    MainGame.AddMenuOptions();
    window.onload = function()
    {
        MainGame.ctx.drawImage(MainGame.SPRITEIMAGE,MainGame.BG_SPRITE_X, MainGame.BG_SPRITE_Y,
            MainGame.BG_SPRITE_WIDTH, MainGame.BG_SPRITE_HEIGHT, MainGame.BACKGROUND_IMAGE_OFFSET,0,MainGame.CANVAS_WIDTH,MainGame.CANVAS_HEIGHT);
    };
    MainGame.startMobileMenu();
}
else
{
    MainGame.startGame();
}
// window.addEventListener("resize", MainGame.fitScreen);
window.addEventListener("orientationchange", MainGame.fitScreen);
