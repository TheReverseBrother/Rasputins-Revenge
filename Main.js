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

    //Toasts
    this.STARTLINK = document.getElementById("startLink");
    this.STARTTOAST = document.getElementById("mobileWelcomeToast");
    this.CONTROLTOAST = document.getElementById("controlLink");

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

        startGame: function()
        {


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
                document.getElementById('main-canvas'),
                arenaWidth, arenaHeight);
        },
        resizeElement: function (element, w, h) {
            element.style.width  = w + 'px';
            element.style.height = h + 'px';
        },



        AddMenuOptions: function()
        {
            MainGame.STARTLINK.addEventListener('click',function(e)
            {
                MainGame.startGame();
                MainGame.STARTTOAST.style.display = "none";
                MainGame.STARTTOAST.style.opacity = 0;
            })
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
            console.log("NIGGA");
            MainGame.jetPack(-0.2);
            e.preventDefault();
        },
        //Tomas
        touchEnd: function(e)
        {
            var x = e.changedTouches[0].pageX;
            MainGame.jetPack(0.1);
            e.preventDefault();
        },
        touchPause: function(e)
        {
            var x = e.changedTouches[0].pageX;
            MainGame.pause();
            e.preventDefault();
        },
        //Tomas
        jetPack: function(g)
        {
            MainGame.TestCharacter.gravity = g
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
}
MainGame.GameUpdateLoop();
window.addEventListener("resize", MainGame.fitScreen);
window.addEventListener("orientationchange", MainGame.fitScreen);
