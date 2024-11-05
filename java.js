//board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

//doodler. Will be replaced with joker, but when it comes, the jimbo would be known as doodler
let doodlerWidth = 46;
let doodleHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodleHeight;
let doodlerRightImg;
let doodlerLeftImg;

//physics
let velocityX = 0;

//platforms

let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodleHeight
}

window.onload = function(){
    board = document.getElementById("board");
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d");

        //draw doodler(Jimbo)
       // context.fillStyle = "green";
       // context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height);

        //load images

        doodlerRightImg = new Image();
        doodlerRightImg.src = "./doodler-right.png"; //look back, should show image
        doodler.img = doodlerRightImg;
        doodlerRightImg.onload = function() {
            context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)
        }

        doodlerLeftImg = new Image();
        doodlerLeftImg.src = "./doodler-left.png";
    
        requestAnimationFrame(update);
        document.addEventListener("keydown", moveDoodler);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0 , board.width, board.height),  

    //doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth){
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width < 0){
        doodler.x = boardWidth;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)

}

function moveDoodler(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD"){ //move right
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if(e.code == "Arrowllift" || e.code =="KeyA"){ //move left
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
}