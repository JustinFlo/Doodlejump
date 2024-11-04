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
}