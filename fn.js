var colorArray = ["green","red","yellow","blue"];
var userClickPattern= [];
var gamePatternArray =[];
var started= false;
var hsc=0;
callUs();



$("body").keypress ( function(){
    if (!started){
        nextSequence();  
        started=true;
    }
});


$(".btn").click(function(){
     
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickPattern);
    check();


});


function nextSequence(){
    
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColour = colorArray[randomNum];
    gamePatternArray.push(randomChosenColour);


   
    $("#level-title").text("Level "+gamePatternArray.length);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);  
    highScore(); 
    // console.log(gamePatternArray);
    console.log(gamePatternArray);
}

function playSound(colour){
    var audio = new Audio(colour+ ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed"); 
    } ,200);
}


function check() {

    for (var i = 0; i < userClickPattern.length; i++) {
        if (userClickPattern[i] !== gamePatternArray[i]) {
            
            $("#level-title").text("Game Over! Press A Key to Start Again");
            var audio = new Audio("wrong.mp3");
            audio.play();
            gamePatternArray=[];
            userClickPattern=[];
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            started=false;
            saveUs();
            hsc=hsc-1;
           
            $("#high-score").text("High Score = "+ hsc);
            
            return;
        }
    }


    if (userClickPattern.length === gamePatternArray.length) {
       
        userClickPattern = [];
        $("#high-score").text("High Score = "+ hsc);
       
        setTimeout(function(){
            nextSequence();
        },300);  
    }
}
a

function saveUs(){
    localStorage.setItem("data",hsc);
}
function callUs(){
    hsc=localStorage.getItem("data");
   
}
function highScore(){
        if (gamePatternArray.length>=hsc){
            hsc=gamePatternArray.length;
        }
}
