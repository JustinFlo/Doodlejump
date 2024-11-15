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

//physics
let velocityX = 0;
let velocityY = 0; //doodler jump speed
let initalVelocityY = -8; //starting velocity y
let gravity = 0.4;

//platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 70;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;

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
        doodlerRightImg.src = "./jimbo-right.png"; //look back, should show image
        doodler.img = doodlerRightImg;
        doodlerRightImg.onload = function() {
            context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)
        }

        doodlerLeftImg = new Image();
        doodlerLeftImg.src = "./jimbo.png";

        platformImg = new Image();
        platformImg.src = "./platform.png"

        velocityY = initalVelocityY;
        placePlatforms();
        requestAnimationFrame(update);
        document.addEventListener("keydown", moveDoodler);
}

function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0 , board.width, board.height),  

    //doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth){
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width < 0){
        doodler.x = boardWidth;
    }
    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height){
        gameOver = true;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)

    //platforms
    for(let i = 0; i < platformArray.length; i++){
        let platform= platformArray[i];
        if ( velocityY < 0 && doodler.y < boardHeight*3/4){
            platform.y -= initalVelocityY //slide platform down
        }
        if(detectCollision(doodler, platform) && velocityY) {
           velocityY = initalVelocityY; //jump 
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }

    //clear and add platforms
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight){
        platformArray.shift(); //removes first element from array
        newPlatform();
    }

    //score
    updateScore();
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.fillText(score, 5, 20);

    if (gameOver){
        context.fillText("Game Over: Press 'Space' to restart", boardWidth/7, boardHeight*7/8);
    }
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
    else if (e.code =="Space" && gameOver){
        //reset
        let doodler = {
            img : doodlerRightImg,
            x : doodlerX,
            y : doodlerY,
            width : doodlerWidth,
            height : doodleHeight
        }
        velocityX = 0;
        velocityY = initalVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false;
        placePlatforms();
    }
}

function placePlatforms(){
    platformArray = [];

    //starting platforms

    let platform = {
        img : platformImg,
        x : boardWidth/20,
        y: boardHeight - 50,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);

    //platform = {
     //   img : platformImg,
      //  x : boardWidth/2,
      //  y: boardHeight - 150,
      //  width : platformWidth,
      //  height : platformHeight
  //  }

   // platformArray.push(platform);
   
   for (let i = 0; i < 6; i++){
    let randomX = Math.floor(Math.random() * boardWidth*3/4);
    
    let platform = {
        img : platformImg,
        x : randomX,
        y: boardHeight - 75*i - 150,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);
   } 
}

function newPlatform(){
    let randomX = Math.floor(Math.random() * boardWidth*3/4);
    
    let platform = {
        img : platformImg,
        x : randomX,
        y: -platformHeight,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);
   
}
function detectCollision(a, b){
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

function updateScore(){
    let points = Math.floor(50*Math.random());
    if (velocityY < 0){
        maxScore += points;
        if (score < maxScore){
            score = maxScore;
        }
    }
    else if (velocityY >= 0){
        maxScore -= points;
    }
}