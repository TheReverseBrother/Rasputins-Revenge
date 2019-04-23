var mainGame = function()
{
    this.canvas = document.getElementById("main-canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "yellow";
    this.CANVAS_WIDTH = 680;
    this.CANVAS_HEIGHT = 300;

    //Booleans
    this.HasStarted = false;
    this.IsPause = false;
    this.IsOver = false;
    this.SPRITEIMAGE = new Image();
    this.controlMenu = false;

    //Toasts
    this.STARTLINK = document.getElementById("startLink");
    this.STARTCONTROLLINK = document.getElementById("startControlLink");
    this.STARTTOAST = document.getElementById("mobileWelcomeToast");
    this.CONTROLLINK= document.getElementById("controlLink");
    this.CONTROLTOAST= document.getElementById('controlToast');

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
                MainGame.GameUpdateLoop();
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
                MainGame.GameUpdateLoop();
                MainGame.HasStarted = true;
                MainGame.CONTROLTOAST.style.display = "none";
                MainGame.CONTROLTOAST.style.opacity = 0;
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
                console.log("Fly");
                MainGame.jetPack(-0.2);
            }
            else
            {
                // Shooting Function
                console.log("PEW");
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
    MainGame.startMobileMenu();
}
else
{
    MainGame.GameUpdateLoop();
}
window.addEventListener("resize", MainGame.fitScreen);
window.addEventListener("orientationchange", MainGame.fitScreen);
