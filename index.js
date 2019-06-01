
var player1_name = "";
var player2_name = "";
var hasSecondPlayed;




var leaderboardArray  = [];

function startGame(n)
{

    var clockWise = false;
    var antiClockwise = false;
    var dy;
    var spacing = 400;
    var rectOnScreen = [];

    var a = {};
    
    if(n === 1)
      { 

        a.name =  player1_name;
        a.score = 0;

        // if("leaderboard" in localStorage)
        // {
        //   leaderboardArray = JSON.parse(localStorage.getItem("leaderboard"));
         
        // }
        leaderboardArray.push(a);
        //localStorage.setItem("leaderboard",JSON.stringify(leaderboardArray));
      }
    if(n === 2)
     {
       a.name = player2_name;
       a.score = 0;

      //  if("leaderboard" in localStorage)
      //  {
      //    leaderboardArray = JSON.parse(localStorage.getItem("leaderboard"));
      //  }
       leaderboardArray.push(a);
       //localStorage.setItem("leaderboard",JSON.stringify(leaderboardArray));
     }    



   function compare(c,b) {
      if (c.score < b.score)
         return -1;
      if (c.score > b.score)
        return 1;
      return 0;
    }
    
    leaderboardArray.sort(compare);
    // var time = 0;
    // var gameState = "play";

    var blocks = [{width:200,height:50},{width:120,height:120}];

    function renderBackground()
    {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(0,0,canvas.width,canvas.height);
          // background1.angle += Math.PI/60;
          // background1.draw_background(ctx);
    }

    function keydownListener(e)
    {
        console.log(e);
        if(game1.powerMeterStatus === false) 
        player1.powerMeter += 0.05;
        if(e.keyCode == 37)
          antiClockwise = true;
        else if(e.keyCode == 39)
          clockWise = true;  
    }

    function pauseGame()
    {
        dy = 0;
        document.removeEventListener('keydown',keydownListener);
        document.removeEventListener('keyup',keyUpListener);
        game1.state = "pause";
    
    }

    function playGame()
    {
        dy = player1.gameSpeed;
        document.addEventListener('keydown',keydownListener);
        document.addEventListener('keyup',keyUpListener);
        game1.state = "play";
    }

    function keyUpListener(e)
    {
        if(e.keyCode == 37)
        antiClockwise = false;
      else if(e.keyCode == 39)
        clockWise = false;  
    }
    function drawScore()
    {
      // ctx.fillStyle = "white";
      // ctx.font = '24px serif';
      // ctx.fillText('Score',800,100)
      // ctx.fillText(player1.score, 820, 150);
      score.textContent = player1.score; 
    }
    function updateSprite()
    { 

    
      if(clockWise == true)
      {
        sprite1.angle +=sprite1.rotationSpeed;
      
      } 
      else if(antiClockwise == true) 
      sprite1.angle -= sprite1.rotationSpeed;
      sprite1.draw(ctx);
    }



    function updateRect()
    {
        
        if(rectOnScreen[0].y+dy > canvas.width)
        {
          rectOnScreen.shift();
          player1.gameSpeed += 0.05;
          dy = player1.gameSpeed;
          if(game1.powerMeterStatus === false)
          player1.powerMeter += 3;
        }
        
        for(i = 0;i < rectOnScreen.length;i++)
        {
          rectOnScreen[i].y += dy;
          rectOnScreen[i].draw(ctx);
        } 
        if(rectOnScreen[rectOnScreen.length-1].y > spacing)
        {
        var index = Math.floor(Math.random() * Math.floor(blocks.length));
        var x_gen;
        
        if(blocks[index].width > sprite1.radius && blocks[index].width < 2*sprite1.radius-30)
        {
          x_gen = sprite1.x+sprite1.radius-blocks[index].width-10-sprite1.orbRadius;
        }
        else
        {
          while(true)
          { 
            x_gen = Math.floor(Math.random() * Math.floor(150+blocks[index].width))+450-blocks[index].width;
            if(x_gen+blocks[index].width < 550)
            break;
            else if(x_gen > 550)
            break; 
          }
        } 
          var block1 = new block(blocks[index].width,blocks[index].height,x_gen,0,false,1);
          console.log(block1)
          rectOnScreen.push(block1);
          
        }
        

    }
function startDraw()
{  
  
 
  draw  = setInterval (function()
    {    
      if(game1.state == "play") 
        { 
          // consdrawole.log(game1.time);
          game1.time++;
          //console.log(game1.time);
          if(game1.time % 10 === 0)
          { 
            player1.incrementScore(1);
            a.score = player1.score;
          }
          //  if(game1.time % 500 === 0)
          // {
          //   var block1 = new block(40,40,400,0,false,2);
          //   rectOnScreen.push(block1);
          // }
           if(game1.time % 500 === 0)
          {
            var block1 = new block(40,40,550,0,false,3);
            rectOnScreen.push(block1);
          }
        }
         if(game1.time === game1.horlicksPowerStartTime + 300)
         {
           game1.horlicksPowerStatus = false;
           sprite1.rotationSpeed -= Math.PI/270;
         } 
          
         
     
           leaderboardArray.sort(compare);
         leaderboard.innerHTML = "<div class = 'header left'>Player Name</div><div class = 'header right'>Score</div>";
         for(var i = leaderboardArray.length-1;i >= 0;i--)
         {
                leaderboard.insertAdjacentHTML("beforeend","<div class = 'element'>" + leaderboardArray[i].name + "</div>");
                leaderboard.insertAdjacentHTML("beforeend","<div class = 'element'>" + leaderboardArray[i].score + "</div");
                   
         } 

        renderBackground(); 
        
        power_meter_filled.style.width = player1.powerMeter + "%";
        //Filling power meter
        console.log(game1.powerMeterStartTime);
        if(game1.powerMeterStartTime &&  game1.time === game1.powerMeterStartTime  + 300 && game1.powerMeterStatus === true)
        {
              game1.powerMeterStatus = false;
              player1.powerMeter = 0;
              game1.powerMeterStartTime  = 0;

        }
        else if(player1.powerMeter >= 100 && game1.powerMeterStatus === false) 
        {
        
          game1.powerMeterStatus = true;
          game1.powerMeterStartTime = game1.time;
        }
        
      
        
        drawScore(ctx);
        updateSprite();
        updateRect();
        
        console.log(game1.powerMeterStatus)
        if(game1.powerMeterStatus === true && sprite1.angleBetweenOrbs !== 0)
        {
            sprite1.orbsFuse();
        }

        else if(game1.powerMeterStatus === false && sprite1.angleBetweenOrbs !== Math.PI)
        {
            sprite1.unwrap();
          
        }
        else if(sprite1.collisionDetection(rectOnScreen) >= 0) 
        { 

          if(rectOnScreen[sprite1.collisionDetection(rectOnScreen)].type == 3)
          {
                game1.horlicksPowerStatus = true;
                game1.horlicksPowerStartTime = game1.time;
                sprite1.rotationSpeed += Math.PI/270;
                rectOnScreen.splice(sprite1.collisionDetection(rectOnScreen),1);
          }
          else
          {
                  console.log(rectOnScreen[sprite1.collisionDetection(rectOnScreen)].type);
                  dy = 0;
                  document.removeEventListener('keydown',keydownListener);
                  document.removeEventListener('keyup',keyUpListener);
                  clockWise = false;
                  antiClockwise = false;
                
                  clearInterval(draw);
                  if(gameType == 2 && !hasSecondPlayed)
                  { 
                    hasSecondPlayed = true;
                    message.style.display = "";
                    mainMenu.style.display = "none";
                    playAgain.style.display = "none";
                    twoPlayerMessage.style.display = "";
                    game_canvas.style.display = 'none';
                    game_sidebar.style.display = 'none';
                    leaderboard.style.display = 'none';
                    setTimeout(function(){
                      game_canvas.style.display = '';
                      game_sidebar.style.display = '';
                      leaderboard.style.display = '';
                      message.style.display = "none";
                      startGame(2);
                    }
                      
                      ,3000);
            
                  } 
                  else
                  {
                    // game_card.style.display = "";
                    // button_set_player_choose.style.display = "";
                   
                    message.style.display = "";
                    mainMenu.style.display = "";
                    playAgain.style.display = "";
                    twoPlayerMessage.style.display = "none";

                    // input_singlePlayer.style.display = "none";
                    // input_twoPlayer.style.display = "none";
                    // start.style.display = "none"; 
                    game_canvas.style.display = 'none';
                    game_sidebar.style.display = 'none';
                    leaderboard.style.display = 'none';
                  }  
          }       
        }

        
    },1000/50);

}


    //Defining canvas
    var canvas = document.querySelector("#game_canvas");
    var ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;

    //Creating sprite
    var sprite1 = new sprite(Math.PI/2,500,800,100);

    //Creating player
    var player1 = new player();

    dy = player1.gameSpeed;

    //Adding first block
    var index = Math.floor(Math.random() * Math.floor(blocks.length));
    var block1 = new block(blocks[index].width,blocks[index].height,250,0,false,1);
    rectOnScreen.push(block1);

    //Adding left button and right button event listeners
    document.addEventListener('keydown',keydownListener);
    document.addEventListener('keyup',keyUpListener);

    //Adding pause and play button
    var pauseButton = document.querySelector("#pause_button");
    var playButton = document.querySelector("#play_button");

    pauseButton.addEventListener("click",pauseGame);
    playButton.addEventListener("click",playGame);

    //Selecting score card
    var score = document.querySelector('.score');
    
    //Filling power meter
    var power_meter_filled = document.querySelector('.power_meter_filled');

    //Initialising background
    //var background1 = new background(canvas.width,canvas.height);

    //Starting new game
    var game1 = new game();
    console.log(game1);

    //draw();
    startDraw();
  
   // player_name.insertAdjacentHTML("beforeend","<div>" + player1_name + "</div>")
   // player_name.insertAdjacentHTML("beforeend","<div>" + player1.score + "</div>")
}

var gameType;

var game_card = document.querySelector('.game_card');

var singlePlayerButton = document.querySelector("#single_player");
var twoPlayerButton = document.querySelector('#two_player');

var start = document.querySelector('.start');

var input_singlePlayer = document.querySelector('.input_singlePlayer');
var input_twoPlayer = document.querySelector('.input_twoPlayer');

var game_sidebar = document.querySelector('.game_sidebar');
var leaderboard = document.querySelector('.leaderboard');
var player_name = document.querySelector('.player_name');
var player_score = document.querySelector('.player_score'); 
var game_canvas = document.querySelector('#game_canvas');
var button_set_player_choose = document.querySelector('.button_set_player_choose');


var message = document.querySelector('.message');
var mainMenu = document.querySelector('.main_menu');
var playAgain = document.querySelector('.play_again');
var twoPlayerMessage = document.querySelector('.two_player_message');

message.style.display = "none";

//Displaying display

input_singlePlayer.style.display = "none";
input_twoPlayer.style.display = "none";
start.style.display = "none";

singlePlayerButton.addEventListener("click",function()
{
       input_singlePlayer.style.display = "";
       start.style.display = "";
       button_set_player_choose.style.display = "none";
       gameType = 1; 
       
});

twoPlayerButton.addEventListener("click",function()
{
   input_singlePlayer.style.display = "";
   input_twoPlayer.style.display = "";
   start.style.display = "";

   button_set_player_choose.style.display = "none";


   gameType = 2;  

});

start.addEventListener("click",function()
{ 
    


  if(gameType == 1)
  { 
     player1_name = input_singlePlayer.value;
     if(input_singlePlayer.value == "")
      alert("Please enter name of player1:");
     else
     { 
       game_card.style.display = "none";
       game_canvas.style.display = '';
       game_sidebar.style.display = '';
       leaderboard.style.display = '';
       startGame(1);
       input_singlePlayer.value = "";
     } 
  }
  if(gameType == 2)
  { 
    hasSecondPlayed = false;

    if(input_singlePlayer.value == "" || input_twoPlayer.value == "")
     alert("Enter name of both players");
    else
    {       
            game_card.style.display = "none";
            game_canvas.style.display = '';
            game_sidebar.style.display = '';
            leaderboard.style.display = ''; 
            player1_name = input_singlePlayer.value;
            player2_name = input_twoPlayer.value;
            startGame(1);
    }
 
 
  }
   
  
});

mainMenu.addEventListener("click",function()
{     
    message.style.display = "none";
    game_card.style.display = "";
    start.style.display = "none";
    button_set_player_choose.style.display = "";
    input_singlePlayer.style.display = "none";
   input_twoPlayer.style.display = "none";
    
});

playAgain.addEventListener("click",function()
{
  game_card.style.display = "none";
  message.style.display = "none";
  game_canvas.style.display = '';
  game_sidebar.style.display = '';
  leaderboard.style.display = ''; 
  
  startGame(1);
});