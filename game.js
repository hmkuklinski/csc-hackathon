const compostItems = document.querySelectorAll('.compost');

const trashcan = document.querySelector('.trashcan');
const bunny= document.querySelector('.bunny');

const text = document.querySelector("#text"); // text section under the game window- provides instructions/background information
const button1 = document.querySelector("#button1"); // for the previous button
const button2 = document.querySelector("#button2"); //for the reset button- both text,score
const button3 = document.querySelector("#button3"); //for the next button and Play Game
const button4= document.querySelector("#button4"); //game menu
const classic = document.getElementById('classic');
const extreme= document.getElementById('extreme');
const startButton = document.querySelector("#start-btn");

/* list of the game instructions!
 --> these will change once the user hits the previous/next buttons below the game window!
*/
const gameInstructions = ["Hello! My name is Benji the Bunny!", "Ruckus the Racoon knocked over this trashcan and I need your help to clean it up!", 
"Some of these items are compostable, which means that we can use it to help grow new plants and trees!", 
"This allows for a healthy environment full of nutritious food for every animal and human being around.", 
"To get started, first move your mouse over one of the compostable items." ,
"Click the mousepad/mouse and drag it over to the trashcan. Then release it. ","Try it once and then hit the next button to continue",
"For every item you add to the trashcan, you get a point",
"The timer will go for about 30 seconds. You want to get as much points as possible in that time period.",
"I'll keep your score in the top corner for you to see. Be careful, though. If you miss an item, you might lose some points.", 
"It is important to note that the compostables will be moving in the game, but I've made them stationary for the tutorial.",
"If you are ready to start the game, hit the Select Game Mode button!"];

/* our location in the gameInstructions arrayList */
let currentGameInstructionIndex = 0;

/* function to change the text in the text section */
function updateInstruction() {
    text.textContent= gameInstructions[currentGameInstructionIndex]; //displays the instructions in textbox below game-window
    startButton.style.display="none"; //don't need to display the timer button
}
updateInstruction();

/* ------for our previous button ------ */
button1.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentGameInstructionIndex>0){ //don't want to decrease index value if we are at index 0, only if greater than 1 can we go backwards
        currentGameInstructionIndex --;
        updateInstruction();
    }
    button3.textContent = "Next"; //need to reset the button3 text if the user reaches the end of the instructions and wants to go back so that it doesn't say play game
});

/* ------ for our reset button  ------ */
button2.addEventListener("click", (e) => {
    e.preventDefault();
    currentGameInstructionIndex =0; //sets the directions to the first item in the array
    updateInstruction();
    resetScore(0); //calls the resetScore function to update the score to zero
    
    //what buttons do we want displayed when we hit the reset button (for directions)
    button1.style.display="inline-block";
    button3.style.display="inline-block";
    button4.style.display="none";
    startButton.style.display="none";
    classic.style.display="none";
    extreme.style.display="none";
    
    //in button4, we change the start over button to the tutorial button option, since it goes to beginning of directions and resets everything
    //need to reset the button from displaying tutorial (with a color of purple) to the original text
    button2.textContent="Start Over"; 
    button2.style.backgroundColor= "red";

    //in classic and extreme modes, we set the game4 button to "return to game menu", but want "select game menu" on reset
    button4.textContent="Select Game Mode";
    resetDraggedItems();
});

/* ------ the next button ------ */
button3.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentGameInstructionIndex < gameInstructions.length -1){ //will change to the next instruction in our arrayList as long as the index is within our arrayList
        currentGameInstructionIndex++; //want to move to the next index to display the next instruction
        updateInstruction();
    }
    else if (currentGameInstructionIndex == gameInstructions.length-1){
        document.getElementById('button4').style.display= "inline-block"; //game mode
        document.getElementById('button3').style.display="none";
    }
});

//select game mode --> tutorial, classic mode, expert mode
button4.addEventListener("click", (e) => {
    e.preventDefault();
    text.textContent="Select Game Mode";
    button1.style.display="none";
    button2.textContent="Tutorial"; //the reset button doubles as tutorial- goes back to first instructions and resets compost items
    button2.style.backgroundColor="purple"; 
    button4.style.display="none"; //already hit selected game menu button and we are in the menu, don't need the button anymore
    classic.style.display="inline-block";
    classic.style.backgroundColor= "blue";
    extreme.style.display="inline-block";
    extreme.style.backgroundColor= "orange";
});

//classic game mode
startButton.style.display="none";
let extremeModeSelected= false;
let classicModeSelected=false;
classic.addEventListener("click", (e)=>{
    classicModeSelected =true;
    text.textContent= "Classic Mode Selected"
    button2.style.display="none";
    extreme.style.display="none";
    classic.style.display="none";
    button4.style.display="inline-block"; //will allow user to go back to select game option
    button4.textContent= "Return to Game Menu";
   
    startButton.style.display="inline-block";
    startButton.addEventListener('click', function(){
        startButton.textContent= "Game In Progress";
        button4.style.display="none";
        let timeDuration =30;
        timerButtonClicked(timeDuration);
    });  
    button4.addEventListener('click', (e) =>{
        text.textContent= "Select Game Mode";
        startButton.style.display="none";
        button2.style.display="inline-block";
    });
});

extreme.addEventListener("click", (e) =>{
    extremeModeSelected= true;
    text.textContent= "Extreme Mode Selected";
    button2.style.display="none";
    extreme.style.display="none";
    classic.style.display="none";
    button4.style.display="inline-block"; //will allow user to go back to select game option
    button4.textContent= "Return to Game Menu";

    startButton.style.display="inline-block";
    startButton.addEventListener('click', function(){
        startButton.textContent= "Game In Progress";
        button4.style.display="none";
        let timeDuration =30;
        timerButtonClicked(timeDuration);
    });  

});
//the timer function
let numberOfTimersSet = 0;
let extremeRandom;
let randomizeTimer;
function countdownClock(time){
    let timer=setInterval(function(){
        if (time == 0){
            clearInterval(timer); //resets timer
            clearInterval(extremeRandom);
            timerCompleted(); //resets boolean value
            //addToScoreList(score); //adds score to scoreboard 
            resetDraggedItems();
            document.getElementById('score').textContent= "Scoreboard: " +score;
            document.getElementById('timer').textContent= "Time's Up!";
            document.getElementById('text').textContent= "Nice try. Think you can do better? Try Again!";
            button2.style.display="inline-block";
            button2.textContent="New Player";
            startButton.textContent="New Game";
            startButton.addEventListener('click', function(){
                resetScore(0);
                numberOfTimersSet++;
                startButton.textContent= "Game In Progress";
                button4.style.display="none";
                let timeDuration =30;
                timerButtonClicked(timeDuration);
            });
            button2.addEventListener("click", (e) =>{
                resetDraggedItems();
                resetScore(0);
                classicModeSelected=false;
                extremeModeSelected=false;
                document.getElementById('timer').textContent= "Time: 30";
            });
            button4.style.display="inline-block";
            button4.addEventListener("click", (e) =>{
                resetScore(0);
                resetDraggedItems();
                document.getElementById('text').textContent= "Select your Game Level"
                classicModeSelected=false;
                extremeModeSelected=false;
                startButton.style.display="none";
                document.getElementById('timer').textContent= "Time: 30";
            });
        } else {
            time--;
            document.getElementById('timer').textContent= "Time: " + time;
            document.getElementById('text').textContent= "Hurry! As fast as you can!"
            if (time<=10 && time>5){
                document.getElementById('text').textContent="Less than 10 Seconds!";
            }
            else if (time<=5){
                document.getElementById('text').textContent= "Time is almost up!!"
            }
            else if (time<=15 &&time>10){
                document.getElementById('text').textContent= "Halfway there!"
            }
        }
    },1000);

    //for extreme mode
    extremeRandom = setInterval(function(){
        if (extremeModeSelected){
            randomizeDroppedItems();
        }
    },3000);
};

//function to see if button is already pressed- prevents creation of another countdown
let timerAlreadySet = false;
function timerButtonClicked(time) {
    if (!timerAlreadySet){
        countdownClock(time);
        timerAlreadySet = true;
    }
}

//resets the boolean value- allows us to start another timer
function timerCompleted() {
    timerAlreadySet= false;
}



/* ------ for the score! ------ */
let score=0;
let scoreList= [] //keeps track of past scores
function addPoint (points){
    score += points; //updates the score
    const scoreElem = document.getElementById("score"); //finds html element that has id score
    scoreElem.textContent= "Score: " + score; //changes the text to
}

function resetScore(points){
    score= points;
    let scoreElem = document.getElementById("score"); //see notes above in function addPoint()
    scoreElem.textContent = "Score: " + score;
}
function addToScoreList (score){
    scoreList.push(score);
}

/* ------ for the compostable items!! ------ */

compostItems.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

/* ------ event listeners for the trash can!! ------ */
trashcan.addEventListener("dragenter", dragEnter); //when the draggable item enters the drop zone
trashcan.addEventListener("dragover", dragOver); //when the item is dragged over the droppable item
trashcan.addEventListener("drop", drop); //when the user releases the mouse click and it is over the droppable item


/* ------ drag functions!! ------ */
let draggedImage;
function dragStart(event){
    event.dataTransfer.setData("text", event.target.id); //gives us the id of the dragged item
    draggedImage = event.target.id; 
}

//used to help signify that the compost can be dragged here
function dragEnter(event){
    event.target.classList.add("trashcan-hover") //when we hover, it adds the class trashcan hover (changes our image to lid off)
}
function dragOver(event){
    event.preventDefault(); //prevents it from extracting the URL of image
}

let draggedItemsCount = 0;
function drop(event){
    event.preventDefault(); //prevents it from trying to navigate to the URL of image
    const info = event.dataTransfer.getData("text"); 

    // ------ This is code to eliminate them one by one ------

    if (info == "banana-peel"){ //is the dragged item of class compost?
        const compostItem = document.getElementById(draggedImage);
        compostItem.style.display="none";
    }
    else if (info == "apple-core"){
        const compostItem = document.getElementById(draggedImage);
        compostItem.style.display = "none";
    }
    else if (info == "grass"){
        const compostItem = document.getElementById(draggedImage);
        compostItem.style.display = "none";
    }
    else if (info == "rotten") {
        const compostItem = document.getElementById(draggedImage);
        compostItem.style.display = "none";
    }
    draggedItemsCount++;
    if (classicModeSelected){
        if (draggedItemsCount%4 == 0 ){ //when all four items are dragged, will reset images
            resetDraggedItems();
        }
    }
    
    if (timerAlreadySet){
        addPoint(1);
    }
    else { //failsafe for cheaters who try to earn extra points before the timer is started
        text.textContent= "The score won't change until you start the timer!";
    }
    event.target.classList.remove("trashcan-hover") //after release, the picture will become normal class .trashcan (closed compost bin)
}

function resetDraggedItems() {
    const compostItems = document.getElementsByClassName("compost");

    for (let i=0;i<compostItems.length;i++){
        compostItems[i].style.display="block";
    }
}

function randomizeDroppedItems() {
    //first need to create an array list to select our compost elements
    let compostableItemsList = ["grass", "rotten","apple-core", "banana-peel"]; //HTML IDs needed
    let randomIndex = Math.floor(Math.random()*compostableItemsList.length); //selects a random index (normally would add one to index value, but length satisfies conditions)
    let randomSelection = compostableItemsList[randomIndex];
    let changeDisplay = document.getElementById(randomSelection);
    
    const xPos = Math.random() * 65; // Adjust the value as needed
    changeDisplay.style.transform = `translateX(${xPos}px)`;
    changeDisplay.style.display = "block";
    
    randomizeTimer= setTimeout(function(){
        document.getElementById(randomSelection).style.display= "none"; //disappears after 2 seconds
    },2000);
}