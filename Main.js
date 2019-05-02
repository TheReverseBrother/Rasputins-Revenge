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
    this.NukeID = 0;
    this.HeartID = 0;
    this.BGMID = 0;

    //Counts
    this.COUNTER = 0;
    this.WAVES = 0;
    this.SCORE = 0;
    this.HIGH_SCORE = 0;

    //Const
    this.ENEMY_SPEED = -1.5;
    this.STANDARD_DELAY = 5;
    this.CHTR_DELAY = 8;
    this.Lives = 2;

    //Arrays
    this.PositionArray = [700,700,680, 720,740,760,780,800,820];
    this.EnemyArray = [];
    this.BulletArray = [];
    this.ExplosionArray = [];
    this.BULLET_SPEED = 1;

    //Power ups
    this.HeartArray = [];
    this.NukeArray = [];
    this.NUKE_SPEED = -1;
    this.HEART_SPEED = -1;

    //Sprite Sheet
    this.SPRITEIMAGE = new Image();
    this.SPRITEIMAGE.src = "./images/SpriteSheet.png";
    this.EXPLOSIONSPRITES = new Image();
    this.EXPLOSIONSPRITES.src = "./images/explosion1.png";

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

    //Explosion
    this.Explosion = [
        { SPRITE_X : 459, SPRITE_Y : 228, SPRITE_WIDTH : 189, SPRITE_HEIGHT : 175},
        { SPRITE_X : 674, SPRITE_Y : 228, SPRITE_WIDTH : 189, SPRITE_HEIGHT : 175},
        { SPRITE_X : 890, SPRITE_Y : 228, SPRITE_WIDTH : 190, SPRITE_HEIGHT : 175},
        { SPRITE_X : 6  , SPRITE_Y : 424, SPRITE_WIDTH : 215, SPRITE_HEIGHT : 203},
        { SPRITE_X : 218, SPRITE_Y : 424, SPRITE_WIDTH : 215, SPRITE_HEIGHT : 203},
        { SPRITE_X : 445, SPRITE_Y : 424, SPRITE_WIDTH : 215, SPRITE_HEIGHT : 203},
        { SPRITE_X : 661, SPRITE_Y : 424, SPRITE_WIDTH : 215, SPRITE_HEIGHT : 203},
        { SPRITE_X : 899, SPRITE_Y : 437, SPRITE_WIDTH : 177, SPRITE_HEIGHT : 174}
    ],
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
    this.SHOOTING_SOUND = new Audio("./Sounds/gunshot.wav");
    this.SONG_SOUND = new Audio("./Sounds/Rasputin8Bit.mp3");
    this.SONG_SOUND.loop = true;
    this.SONG_SOUND.volume = 0.6;
    this.DEATH_SOUND = new Audio("./Sounds/GameOver.wav");
    this.NUKE_SOUND = new Audio("./Sounds/nuke.wav");



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
            Rasputin.SONG_SOUND.play();
            // Rasputin.refreshLoop();
            if(Rasputin.IsPause === false && Rasputin.IsOver === false)
            {
                Rasputin.clear();
                Rasputin.checkEndConditions();
                Rasputin.backgroundManager();
                Rasputin.characterManager();
                Rasputin.enemyManager();
                Rasputin.bulletManager();
                Rasputin.nukeManager();
                Rasputin.heartManager();
                Rasputin.explosionManager();
                Rasputin.HUDmanager();
            }
            if(!Rasputin.IsOver)
            {
                Rasputin.id = requestAnimationFrame(Rasputin.GameUpdateLoop);
            }
            else
            {
                console.log("In End Game")
                clearInterval(Rasputin.IntervalID);
                clearInterval(Rasputin.NukeID);
                clearInterval(Rasputin.HeartID);
                cancelAnimationFrame(Rasputin.id);
                Rasputin.saveScore();
                Rasputin.HasStarted = false;
                if(Rasputin.mobile)
                {
                    Rasputin.RESTARTTOAST.style.display = "block";
                    Rasputin.RESTARTTOAST.style.opacity = 1;
                }

                Rasputin.GameOverMenu();
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
            Rasputin.LifeArray.push(Rasputin.lifeOne);
            Rasputin.LifeArray.push(Rasputin.lifeTwo);
            Rasputin.LifeArray.push(Rasputin.lifeThree);
        },

        GameOverMenu: function()
        {
            Rasputin.clear();
            Rasputin.backgroundManager();
            Rasputin.endAnimation();
            Rasputin.endMenuText();
            Rasputin.SONG_SOUND.pause();
            if(Rasputin.HasStarted === false)
            {
                Rasputin.EndAnimID = requestAnimationFrame(Rasputin.GameOverMenu)
            }
        },

        HUDmanager: function()
        {
          Rasputin.drawLives();
          Rasputin.drawScore();
          Rasputin.drawHiScore();
        },

        drawLives: function()
        {
            for(let i = 0; i <= Rasputin.Lives; i ++)
            {
                Rasputin.LifeArray[i].Draw(Rasputin.ctx);
            }
        },

        drawScore: function()
        {
            Rasputin.ctx.save();

            let string = "Score : "+ Rasputin.SCORE;
            Rasputin.ctx.font = "20px Arial";
            Rasputin.ctx.fillStyle = "Black";
            Rasputin.ctx.fillText(string,580,25);

        },

        drawHiScore: function()
        {
            if(Rasputin.SCORE > Rasputin.HIGH_SCORE)
            {
                Rasputin.HIGH_SCORE = Rasputin.SCORE;
            }
            let string = "HiScore : "+ Rasputin.HIGH_SCORE;

            Rasputin.ctx.fillText(string,560,285);

            Rasputin.ctx.restore();
        },

        explosionManager: function()
        {
            for(let i = 0; i < Rasputin.ExplosionArray.length; i +=1)
            {
                Rasputin.ExplosionArray[i].render(Rasputin.ctx);
                if(Rasputin.ExplosionArray[i].cellIndex === 0)
                {
                    Rasputin.ExplosionArray[i].setInVisible();
                }

            }
        },
        //Author: Tomas
        pause: function()
        {
            if(Rasputin.IsPause === false )
            {
                Rasputin.IsPause = true;
            }
            else if(Rasputin.IsPause === true)
            {
                Rasputin.SONG_SOUND.pause();
                Rasputin.IsPause = false;
            }
        },

        //Author: Tomas
        checkEndConditions: function()
        {
          Rasputin.EnemyReachesEnd();
          Rasputin.EnemyCollidesWithPlayer();
          Rasputin.playerHitsBottomOrTop();
          Rasputin.CheckLives();
        },
        CheckLives: function()
        {
          if(Rasputin.Lives < 0)
          {
              Rasputin.IsOver = true;
              console.log("Lives");
              Rasputin.playSound(Rasputin.DEATH_SOUND);
          }
        },
        //Author: Tomas
        EnemyReachesEnd: function()
        {
            for(let i = 0; i < Rasputin.EnemyArray.length; i+=1)
            {
                if(Rasputin.EnemyArray[i].getVisible())
                {
                    if(Rasputin.EnemyArray[i].x === - Rasputin.EnemyArray[i].width)
                    {
                        Rasputin.Lives -=1;
                        Rasputin.EnemyArray[i].setInVisible();
                    }
                }
            }
        },

        //Author: Tomas
        EnemyCollidesWithPlayer: function()
        {
            for(let i = 0; i < Rasputin.EnemyArray.length; i+=1)
            {
                if(Rasputin.EnemyArray[i].getVisible()) {
                    if (Rasputin.TestCharacter.checkCrash(Rasputin.EnemyArray[i]))
                    {
                        // Rasputin.IsOver = true;
                        Rasputin.Lives -=1;
                        // Rasputin.TestCharacter.setInVisible();
                        Rasputin.EnemyArray[i].setInVisible();
                    }
                }
            }
        },

        //Author: Tomas
        playerHitsBottomOrTop: function()
        {
          if((Rasputin.TestCharacter.y <= -30)|| (Rasputin.TestCharacter.y >= 300))
          {
              Rasputin.IsOver = true;
              console.log("Top Bottom")
              Rasputin.playSound(Rasputin.DEATH_SOUND);
          }
        },

        //Author: Tomas
        characterManager: function()
        {
            Rasputin.TestCharacter.gravityBehaviour();
            Rasputin.TestCharacter.render(Rasputin.ctx);
        },

        //Author: Tomas
        startGame: function()
        {
            console.log("In start");
            Rasputin.HasStarted = true;
            // Rasputin.addLivesToArray();
            Rasputin.setHighScoreOnStart();
            Rasputin.IntervalID = setInterval(Rasputin.difficultyManager,5000);
            Rasputin.NukeID = setInterval(Rasputin.spawnNuke,30000);
            Rasputin.HeartID = setInterval(Rasputin.spawnHeart, 20000);
            // Rasputin.BGMID = setInterval(Rasputin.playBackGroundMusic, 244000);
            Rasputin.GameUpdateLoop();
        },

        playBackGroundMusic: function()
        {
            let i = Rasputin.SONG_SOUND.play();
        },


        //Author: Tomas
        difficultyManager: function()
        {
            console.log("WELLL");
            console.log(Rasputin.COUNTER);
            if(Rasputin.HasStarted)
            {
                if(!Rasputin.IsPause && Rasputin.COUNTER === 0)
                {
                    console.log("in here");
                    Rasputin.spawnEnemy(1);
                }
                else
                {
                    var z = Math.floor((Math.random() * Rasputin.COUNTER) + 1);
                    Rasputin.spawnEnemy(z);
                }
                if((Rasputin.WAVES % 12) === 0)
                {
                    Rasputin.ENEMY_SPEED -= 1;
                    Rasputin.COUNTER = Rasputin.COUNTER/2;
                }
            }
        },

        //Author: Tomas
        spawnEnemy: function(number)
        {
            Rasputin.COUNTER += 1;
            for(let i = 0; i <= number; i += 1)
            {
                var z = Math.floor((Math.random() * 4) + 1);
                var y = Math.floor((Math.random() * 270) + 1);

                Rasputin.EnemyArray.push(new StaticObject(36,36,Rasputin.PositionArray[z],y,Rasputin.SPRITEIMAGE,Rasputin.ENEMY));
            }
            Rasputin.WAVES +=1
        },

        //Author: Tomas
        enemyManager: function()
        {
            Rasputin.enemyMovementBehaviour();
            Rasputin.renderEnemies();

        },

        //Author: Tomas
        renderEnemies: function()
        {
            for(let i = 0; i < Rasputin.EnemyArray.length; i +=1)
            {
                Rasputin.EnemyArray[i].Draw(Rasputin.ctx);
            }
        },

        //Author: Tomas
        enemyMovementBehaviour: function()
        {
            for(let i = 0; i < Rasputin.EnemyArray.length; i +=1)
            {
                Rasputin.EnemyArray[i].updatePositionX(Rasputin.ENEMY_SPEED);
            }
        },

        //Author: Tomas
        backgroundManager: function()
        {
            Rasputin.BACKGROUND_IMAGE_OFFSET += -0.5;
            Rasputin.BACKGROUND_IMAGE_OFFSCREEN_OFFSET += -0.5;
            Rasputin.ctx.drawImage(Rasputin.SPRITEIMAGE,Rasputin.BG_SPRITE_X,
                Rasputin.BG_SPRITE_Y,Rasputin.BG_SPRITE_WIDTH,Rasputin.BG_SPRITE_HEIGHT,
                Rasputin.BACKGROUND_IMAGE_OFFSET,0,Rasputin.CANVAS_WIDTH,Rasputin.CANVAS_HEIGHT
            );
            Rasputin.ctx.drawImage(Rasputin.SPRITEIMAGE,Rasputin.BG_SPRITE_X,
                Rasputin.BG_SPRITE_Y,Rasputin.BG_SPRITE_WIDTH,Rasputin.BG_SPRITE_HEIGHT,
                Rasputin.BACKGROUND_IMAGE_OFFSCREEN_OFFSET,0,Rasputin.CANVAS_WIDTH,Rasputin.CANVAS_HEIGHT
            );
            if(Rasputin.BACKGROUND_IMAGE_OFFSCREEN_OFFSET === -Rasputin.CANVAS_WIDTH)
            {
                Rasputin.BACKGROUND_IMAGE_OFFSCREEN_OFFSET = Rasputin.CANVAS_WIDTH;
            }
            if(Rasputin.BACKGROUND_IMAGE_OFFSET === -Rasputin.CANVAS_WIDTH)
            {
                Rasputin.BACKGROUND_IMAGE_OFFSET = Rasputin.CANVAS_WIDTH;
            }
        },

        //Author: Tomas
        bulletManager: function()
        {
            Rasputin.renderBullets();
            Rasputin.bulletMovementBehaviour();
            Rasputin.bulletEnemyCollision();
        },

        //Author: Tomas
        bulletEnemyCollision: function()
        {
            for(let i = 0; i < Rasputin.EnemyArray.length; i +=1)
            {
                for(let j = 0; j < Rasputin.BulletArray.length; j+= 1)
                {
                    if(Rasputin.EnemyArray[i].getVisible() && Rasputin.BulletArray[j].getVisible())
                    {
                        if(Rasputin.BulletArray[j].checkCrash(Rasputin.EnemyArray[i]))
                        {
                            Rasputin.EnemyArray[i].setInVisible();
                            Rasputin.BulletArray[j].setInVisible();
                            Rasputin.ExplosionArray.push(new AnimatedObject(Rasputin.EXPLOSIONSPRITES,Rasputin.Explosion,
                                Rasputin.EnemyArray[i].x,Rasputin.EnemyArray[i].y,40,40,Rasputin.STANDARD_DELAY));
                            Rasputin.SCORE += 1;
                        }
                    }
                }
            }
        },

        //Author: Tomas
        renderBullets: function()
        {
            for(let i = 0; i < Rasputin.BulletArray.length; i +=1)
            {
                Rasputin.BulletArray[i].Draw(Rasputin.ctx);
            }
        },

        //Author: Tomas
        bulletMovementBehaviour: function()
        {
            for(let i = 0; i < Rasputin.BulletArray.length; i +=1)
            {
                Rasputin.BulletArray[i].updatePositionX(Rasputin.BULLET_SPEED);
                if(Rasputin.BulletArray[i].x > 680)
                {
                    Rasputin.BulletArray[i].setInVisible();
                }
            }
        },

        //Author: Tomas
        createBullet: function()
        {
            let x = Rasputin.TestCharacter.x + Rasputin.TestCharacter.width;
            let y = Rasputin.TestCharacter.y + 10;
            Rasputin.BulletArray.push(new StaticObject(20,20,x, y,Rasputin.SPRITEIMAGE, Rasputin.BULLET ));
            Rasputin.playSound(Rasputin.SHOOTING_SOUND);

        },

        //Author: Nathan
        spawnNuke: function()
        {
            console.log(Rasputin.NukeArray);

            var z = Math.floor((Math.random() * 4) + 1);

            var y = Math.floor((Math.random() * 270) + 1);

            Rasputin.NukeArray.push(new StaticObject(47,40,Rasputin.PositionArray[z],y,Rasputin.SPRITEIMAGE,Rasputin.NUKE));

        },

        //Author: Nathan
        nukeManager: function()
        {
            Rasputin.renderNuke();
            Rasputin.nukeMovementBehaviour();
            Rasputin.bulletNukeCollision();
            Rasputin.NukeCollidesWithPlayer();

        },

        //Author: Nathan
        renderNuke: function()
        {
            for(let i = 0; i < Rasputin.NukeArray.length; i +=1)
            {
                Rasputin.NukeArray[i].Draw(Rasputin.ctx);
            }
        },

        //Author: Nathan
        nukeMovementBehaviour: function()
        {
            for(let i = 0; i < Rasputin.NukeArray.length; i +=1)
            {
                Rasputin.NukeArray[i].updatePositionX(Rasputin.NUKE_SPEED);
            }
        },

        //Author: Nathan
        NukeCollidesWithPlayer: function()
        {
            for(let i = 0; i < Rasputin.NukeArray.length; i+=1)
            {
                if(Rasputin.NukeArray[i].getVisible()) {
                    if (Rasputin.TestCharacter.checkCrash(Rasputin.NukeArray[i]))
                    {
                        Rasputin.Lives -=1;
                        Rasputin.NukeArray[i].setInVisible();
                    }
                }
            }
        },

        //Author: Nathan
        bulletNukeCollision: function()
        {
            for(let i = 0; i < Rasputin.NukeArray.length; i +=1)
            {
                for(let j = 0; j < Rasputin.BulletArray.length; j+= 1)
                {
                    if(Rasputin.NukeArray[i].getVisible() && Rasputin.BulletArray[j].getVisible())
                    {
                        if(Rasputin.BulletArray[j].checkCrash(Rasputin.NukeArray[i]))
                        {
                            Rasputin.NukeArray[i].setInVisible();
                            Rasputin.BulletArray[j].setInVisible();
                            for(let x = 0; x < Rasputin.EnemyArray.length; x += 1)
                            {
                                if(Rasputin.EnemyArray[x].getVisible())
                                {
                                    Rasputin.ExplosionArray.push(new AnimatedObject(Rasputin.EXPLOSIONSPRITES,Rasputin.Explosion,
                                        Rasputin.EnemyArray[x].x,Rasputin.EnemyArray[x].y,30,30,Rasputin.STANDARD_DELAY));
                                    Rasputin.EnemyArray[x].setInVisible();
                                    Rasputin.playSound(Rasputin.NUKE_SOUND);
                                }
                            }
                                Rasputin.SCORE += 5;
                        }
                    }
                }
            }
        },

        //Author: Nathan
        spawnHeart: function(number)
        {
            {
                var z = Math.floor((Math.random() * 4) + 1);
                var y = Math.floor((Math.random() * 270) + 1);

                Rasputin.HeartArray.push(new StaticObject(18,19,Rasputin.PositionArray[z],y,Rasputin.SPRITEIMAGE,Rasputin.HEART));
            }
        },

        //Author: Nathan
        heartManager: function()
        {
            Rasputin.renderHeart();
            Rasputin.HeartCollidesWithPlayer();
            Rasputin.heartMovementBehaviour();

        },

        heartMovementBehaviour: function()
        {
            for(let i = 0; i < Rasputin.HeartArray.length; i +=1)
            {
                Rasputin.HeartArray[i].updatePositionX(Rasputin.HEART_SPEED);
            }
        },

        //Author: Nathan
        renderHeart: function()
        {
            for(let i = 0; i < Rasputin.HeartArray.length; i +=1)
            {
                Rasputin.HeartArray[i].Draw(Rasputin.ctx);
            }
        },

        //Author: Nathan
        HeartCollidesWithPlayer: function()
        {
            for(let i = 0; i < Rasputin.HeartArray.length; i+=1)
            {
                if(Rasputin.HeartArray[i].getVisible()) {
                    if (Rasputin.TestCharacter.checkCrash(Rasputin.HeartArray[i]))
                    {
                        if(Rasputin.Lives < 2)
                        {
                            Rasputin.Lives +=1;
                        }

                        Rasputin.HeartArray[i].setInVisible();
                    }
                }
            }
        },

        restartGame: function()
        {
            Rasputin.COUNTER = 0;
            Rasputin.WAVES = 0;
            Rasputin.SCORE = 0;
            Rasputin.BulletArray = [];
            Rasputin.EnemyArray = [];
            Rasputin.ExplosionArray = [];
            Rasputin.NukeArray = [];
            Rasputin.HeartID = [];
            Rasputin.lives = 2;
            Rasputin.lives = true;
            Rasputin.HasStarted = true;
            Rasputin.IsOver = false;
            Rasputin.TestCharacter = new AnimatedObject(this.SPRITEIMAGE,this.Charfly,20,20,60,60, this.CHTR_DELAY);;
            cancelAnimationFrame(Rasputin.EndAnimID);
        },

        setHighScoreOnStart: function()
        {
            let cookie =  document.cookie;

            if (cookie === "")
            {
                Rasputin.HIGH_SCORE = 0;
            }
            else
            {
                let split = cookie.split("=");
                let x = split[1];
                Rasputin.HIGH_SCORE = parseInt(x);
            }
        },

        saveScore: function()
        {
            document.cookie = "high_SCORE=" +Rasputin.HIGH_SCORE;
        },


        endAnimation: function()
        {
          for(let i = 0 ; i < Rasputin.EndAnimationArray.length; i ++)
          {
              Rasputin.EndAnimationArray[i].Draw(Rasputin.ctx);
              Rasputin.EndAnimationArray[i].updatePositionX(Rasputin.ENEMY_SPEED -2);
              if(Rasputin.EndAnimationArray[i].x < -Rasputin.EndAnimationArray[i].width)
              {
                  Rasputin.EndAnimationArray[i].x = 680;
              }
          }
        },

        endMenuText: function()
        {
            Rasputin.ctx.save();
            Rasputin.ctx.fillStyle= "white";
            Rasputin.ctx.font = "40px Arial";
            Rasputin.ctx.fillText("Game Over",                  235,    60);
            Rasputin.ctx.restore();

            Rasputin.ctx.save();
            Rasputin.ctx.fillStyle= "white";
            Rasputin.ctx.font = "25px Arial";
            Rasputin.ctx.fillText("High Score : " +Rasputin.HIGH_SCORE,260,    100);
            Rasputin.ctx.fillText("Your Score : " +Rasputin.SCORE,260,    135);
            Rasputin.ctx.fillText("You survived : "+ Rasputin.WAVES + " Waves",              210,    180);
            Rasputin.ctx.restore();

        },

        playSound: function(soundToPlay)
        {
            soundToPlay.cloneNode(true).play();
        },
        //All Mobile Elements Go Beyond Here
        //Tomas
        detectMobile: function()
        {
            Rasputin.mobile = 'ontouchstart' in window;
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
            var arenaSize = Rasputin.calculateArenaSize(
                Rasputin.getViewportSize());

            Rasputin.resizeElementsToFitScreen(arenaSize.width,
                arenaSize.height);
        },

        resizeElementsToFitScreen: function (arenaWidth, arenaHeight) {
            Rasputin.resizeElement(
                document.getElementById('main-canvas'), arenaWidth, arenaHeight);

            Rasputin.resizeElement(document.getElementById('mobileWelcomeToast'),arenaWidth,arenaHeight);
            Rasputin.resizeElement(document.getElementById('controlToast'),arenaWidth,arenaHeight);

        },

        resizeElement: function (element, w, h) {
            element.style.width  = w + 'px';
            element.style.height = h + 'px';
        },

        startMobileMenu: function()
        {
            Rasputin.STARTTOAST.style.display = "block";
            Rasputin.STARTTOAST.style.opacity = 1;
        },


        AddMenuOptions: function()
        {
            Rasputin.STARTLINK.addEventListener('click',function(e)
            {
                Rasputin.HasStarted = true;
                Rasputin.startGame();
                Rasputin.STARTTOAST.style.display = "none";
                Rasputin.STARTTOAST.style.opacity = 0;
                Rasputin.CONTROLTOAST.style.display = "none";
                Rasputin.CONTROLTOAST.style.opacity = 0;
            });

            Rasputin.CONTROLLINK.addEventListener('click',function()
            {
                Rasputin.drawMobileInstructions();
                Rasputin.controlMenu = true;
                Rasputin.STARTTOAST.style.display = "none";
                Rasputin.STARTTOAST.style.opacity = 0;
                Rasputin.CONTROLTOAST.style.display = "block";
                Rasputin.CONTROLTOAST.style.opacity = 1;
            });

            Rasputin.STARTCONTROLLINK.addEventListener('click', function()
            {
                Rasputin.HasStarted = true;
                Rasputin.CONTROLTOAST.style.display = "none";
                Rasputin.CONTROLTOAST.style.opacity = 0;
            });
            Rasputin.RESTARTLINK.addEventListener('click', function()
            {
                Rasputin.restartGame();
                console.log("FUCK ");
                Rasputin.RESTARTTOAST.style.display = "none";
                Rasputin.RESTARTTOAST.style.opacity = 0;
                Rasputin.startGame();

            });
        },

        //Tomas
        AddTouchEventControllers: function()
        {
            console.log("HEY");
            Rasputin.canvas.addEventListener('touchstart',Rasputin.touchStart);
            Rasputin.canvas.addEventListener('touchend',Rasputin.touchEnd);
            Rasputin.canvas.addEventListener('touchmove',Rasputin.touchPause)
        },

        //Tomas
        touchStart: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x < Rasputin.canvas.width/2)
            {
                if(!Rasputin.IsPause && !Rasputin.IsOver)
                {
                    Rasputin.jetPack(-0.2);
                }
            }
            else
            {
                // Shooting Function
                if(!Rasputin.IsOver && !Rasputin.IsPause)
                {
                    Rasputin.createBullet();
                }
            }

            e.preventDefault();
        },

        //Tomas
        touchEnd: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x < Rasputin.canvas.width/2)
            {
                if(!Rasputin.IsPause && !Rasputin.IsOver)
                {
                    Rasputin.jetPack(0.1);
                }
            }
            e.preventDefault();
        },

        touchPause: function(e)
        {
            var x = e.changedTouches[0].pageX;
            if( x > Rasputin.canvas.width/2)
            {
                // Rasputin.pause();
            }

            e.preventDefault();
        },

        //Tomas
        jetPack: function(g)
        {
            Rasputin.TestCharacter.gravity = g
        },

        drawMobileInstructions: function () {
            var cw = this.canvas.width,
                ch = this.canvas.height,
                TOP_LINE_OFFSET = 115,
                LINE_HEIGHT = 40;

            Rasputin.ctx.save();

            Rasputin.initializeContextForMobileInstructions();

            Rasputin.drawMobileDivider(cw, ch);

            Rasputin.drawControls();

            Rasputin.ctx.restore();
        },

        drawMobileDivider: function (cw, ch) {
            Rasputin.ctx.beginPath();
            Rasputin.ctx.moveTo(cw/2, 0);
            Rasputin.ctx.lineTo(cw/2, ch);
            Rasputin.ctx.stroke();
        },

        initializeContextForMobileInstructions: function () {
            Rasputin.ctx.textAlign = 'center';
            Rasputin.ctx.textBaseline = 'middle';

            Rasputin.ctx.font = '20px fantasy';

            Rasputin.ctx.shadowBlur = 2;
            Rasputin.ctx.shadowOffsetX = 2;
            Rasputin.ctx.shadowOffsetY = 2;
            Rasputin.ctx.shadowColor = 'rgb(0,0,0)';

            Rasputin.ctx.fillStyle = 'yellow';
            Rasputin.ctx.strokeStyle = 'yellow';
        },

        drawControls : function()
        {
            Rasputin.ctx.fillText('Tap This side to keep Player up', 150, 30);
            Rasputin.ctx.fillText('Tap This side to Shoot', 500, 30);
            Rasputin.ctx.fillText('Swipe this side to pause', 500, 260);
        }
    };
//Tomas
addEventListener('keyup', function (e) {
    var key = e.keyCode;
    if(key === 32)
    {
        if(!Rasputin.IsOver && !Rasputin.IsPause)
        {
            Rasputin.jetPack(0.1);
        }
    }
})
//Tomas
window.addEventListener('keydown', function(e){
    var key = e.keyCode;

    if(key === 32)
    {
        if(!Rasputin.IsOver && !Rasputin.IsPause)
        {
            Rasputin.jetPack(-0.2);

        }
        // Rasputin.createBullet();
    }
    if(key === 39)
    {
        if(!Rasputin.IsOver && !Rasputin.IsPause)
        {
            Rasputin.createBullet();
        }
    }
    if(key === 80)
    {
        Rasputin.pause();
    }
});

//Tomas
var Rasputin = new mainGame();
Rasputin.detectMobile();
//Tomas
if(Rasputin.mobile)
{
    Rasputin.AddTouchEventControllers();
    Rasputin.AddMenuOptions();
    window.onload = function()
    {
        Rasputin.ctx.drawImage(Rasputin.SPRITEIMAGE,Rasputin.BG_SPRITE_X, Rasputin.BG_SPRITE_Y,
            Rasputin.BG_SPRITE_WIDTH, Rasputin.BG_SPRITE_HEIGHT, Rasputin.BACKGROUND_IMAGE_OFFSET,0,Rasputin.CANVAS_WIDTH,Rasputin.CANVAS_HEIGHT);
    };
    Rasputin.startMobileMenu();
}
else
{
    Rasputin.startGame();
}
// window.addEventListener("resize", Rasputin.fitScreen);
window.addEventListener("orientationchange", Rasputin.fitScreen);

