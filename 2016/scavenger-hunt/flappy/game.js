
var canvas = document.getElementById("game_canvas");
var context = canvas.getContext("2d");

var flappy = new Image();
var pipes = new Image();
var bg = new Image();

flappy.src = "https://image.spreadshirtmedia.com/image-server/v1/designs/12679277,width=178,height=178/red-flappy-bird.png";
pipes.src = "https://sites.google.com/site/zieglerscratch/_/rsrc/1472878134063/flappy-bird/mariopipe3.png";
bg.src = "http://www.pptgrounds.com/wp-content/uploads/2013/12/Blue-Sky-Texture-PPT-Backgrounds.jpg";

var game = {};
var x = 256;
var y = 128;
var vspeed = 0;
var alive = 1;
var pipe_list = [];

pipe_list[0] = {x:0, y:0}
pipe_list[1] = {x:213, y:-64}
pipe_list[2] = {x:426, y:-32}

// Left: 37
// Up: 38
// Right: 39
// Down: 40

document.onkeydown = function (e) {
    var keycode = e.keyCode;
    
    if(keycode == 32) {
        if(alive){
            vspeed = -3;
        } else {
            alive = 1;
            y = 128;
            vspeed = -1;
            pipe_list[0] = {x:0, y:0}
            pipe_list[1] = {x:213, y:-64}
            pipe_list[2] = {x:426, y:-32}
        }
    }
}

game.update = function () {
    if(alive){
        vspeed += 0.05;
        y += vspeed;
        
        for(var i = 0; i < pipe_list.length; i++){
            pipe_list[i].x -= 1;
            if(pipe_list[i].x < -96) pipe_list[i].x = 640
            
            if (x < pipe_list[i].x + 96 &&
                x + 64 > pipe_list[i].x &&
                y < pipe_list[i].y + 640 &&
                64 + y > pipe_list[i].y
                && (y < pipe_list[i].y+96 || y > pipe_list[i].y+256) ) {
                    alive = false
            }
        }
        
         if(y > 480) alive = false;
         if(y < -64) alive = false;
    }
}

game.draw = function () {
    if(alive){
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if(bg.complete) {
            context.drawImage(bg, 0, 0, canvas.width, canvas.height);
        }
        
        if(flappy.complete) {
            context.drawImage(flappy, x, y, 64, 64);
        }
        
        if(pipes.complete) {
            for(var i = 0; i < pipe_list.length; i++) {
                context.drawImage(pipes, pipe_list[i].x, pipe_list[i].y, 96, 640);
            }
        }
    } else {
        context.font="48px serif";
        context.fillText("Press Space to Retry",128,256);
    }
}

game.run = function() {
    var loops = 0, skipTicks = 1000 / game.fps,
    maxFrameSkip = 10,
    nextGameTick = (new Date).getTime();
    
    loops = 0;
    game.update();
    game.draw();
};

// Start the game loop
window.setInterval(game.run, 0);
