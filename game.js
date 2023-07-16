buttonColors = ["red", "blue", "green", "yellow"]

gamePattern = []
userClickPattern = []

started = false
level = 0


$(document).keydown(function () { 
    if(!started){
        $("#level-title").text("level "+level)
        nextSequense()
        started = true
    }
});

$(".btn").on("click", function(){

    userChosenColor = this.id
    userClickPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickPattern.length-1)
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){

        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequense();
            },1000)
        }
    }else{
        audioPerder = new Audio("sounds/wrong.mp3")
        audioPerder.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
    
}

function startOver() { 
    started = false
    gamePattern = []
    level = 0
}

function nextSequense() {  
    userClickPattern = []
    level++
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()*4)
    randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
}



function playSound(name){
    audioBotones = new Audio("sounds/"+name +".mp3")
    audioBotones.play()
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}




