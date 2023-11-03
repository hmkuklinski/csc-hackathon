const compostItems = document.querySelectorAll('.compost');

//may need these for the actual game mode
const compostBanana = document.querySelector('.banana-peel');
const compostApple = document.querySelector('.apple-core');
const compostGrass = document.querySelector('.grass-clippings');
const compostRotten = document.querySelector('.rotten-food');

const trashcan = document.querySelector('.trashcan');
const bunny= document.querySelector('.bunny');

const text = document.querySelector("#text"); // text section under the game window- provides instructions/background information
const button1 = document.querySelector("#button1"); // for the previous button
const button2 = document.querySelector("#button2"); //for the reset button- both text,score
const button3 = document.querySelector("#button3"); //for the next button and Play Game

/* list of the game instructions!
 --> these will change once the user hits the previous/next buttons below the game window!
*/
const gameInstructions = ["Hello! My name is Benji the Bunny!", "Kenny the Racoon knocked over this trashcan and I need your help to clean it up.", 
"Some of these items are compostable, which means that we can use it to help grow new plants and trees!", 
"This allows for a healthy environment full of nutritious food for every animal and human being around.", 
"To get started, first move your mouse over one of the compostable items." ,
"Click the mousepad/mouse and drag it over to the trashcan. Then let release it.",
"For every item you add to the trashcan, you get a point",
"The timer will go for about 30 seconds. You want to get as much points as possible in that time period.",
"I'll keep your score in the top corner for you to see. Be careful, though. If you miss an item, you might lose some points.", 
"It is important to note that the trash will be moving in the game, but I've made them stationary for the tutorial.",
"If you are ready to start the game, hit the Play Game button!"];

/* our location in the gameInstructions arrayList */
let currentGameInstructionIndex = 0;

/* function to change the text in the text section */
function updateInstruction() {
    text.textContent= gameInstructions[currentGameInstructionIndex];
    let hideTimerButton = document.getElementById('start-btn');
    hideTimerButton.style.display="none";
}
updateInstruction();

/* ------for our previous button ------ */
button1.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentGameInstructionIndex>0){ //don't want to decrease index value if we are at index 0, only if greater than 1 can we go backwards
        currentGameInstructionIndex --;
        updateInstruction();
    }
    button3.innerHTML = "Next"; //need to reset the button3 text if the user reaches the end of the instructions and wants to go back so that it doesn't say play game
});

/* ------ for our reset button  ------ */
button2.addEventListener("click", (e) => {
    e.preventDefault();
    currentGameInstructionIndex =0; //sets the directions to the first item in the array
    updateInstruction();
    resetScore(); //calls the resetScore function to update the score to zero
    
    //start of button resets (text display, color display, visibility)
    let resetButton1 =document.getElementById('button1').style.display="inline-block";
    let resetButton2 = document.getElementById('button2').textContent="Start Over"; //from tutorial
    let resetButton3 =document.getElementById('button3'); //shows next
    resetButton3.style.display="inline-block";
    let hideGameButton = document.getElementById('button4');
    hideGameButton.style.display="none";
    let hideTimerButton = document.getElementById('start-btn');
    hideTimerButton.style.display="none";
    let tutorialButton= document.getElementById('button2')
    tutorialButton.style.backgroundColor= "red";
    let classicButtonReset = document.getElementById('classic');
    classicButtonReset.style.display="none";
    let extremeButtonReset = document.getElementById('extreme');
    extremeButtonReset.style.display="none";
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

//select game mode --> classic mode
button4.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('button1').style.display="none";
    let tutorialButton= document.getElementById('button2');
    tutorialButton.textContent="Tutorial";
    tutorialButton.style.backgroundColor="purple";
    document.getElementById('button4').style.display="none";
    let classicButton = document.getElementById('classic');
    classicButton.style.display="inline-block";
    classicButton.style.backgroundColor= "blue";
    let extremeButton =document.getElementById('extreme');
    extremeButton.style.display="inline-block";
    extremeButton.style.backgroundColor= "orange";
});

//classic game mode
let classicTimerButton= document.getElementById('start-btn');
classicTimerButton.style.display="none";

classic.addEventListener("click", (e)=>{
    document.getElementById('button2').style.display="none";
    document.getElementById('extreme').style.display="none";
    document.getElementById('classic').style.display="none";
   
    classicTimerButton.style.display="inline-block";
    classicTimerButton.addEventListener('click', function(){
        let timeDuration =30;
        timerButtonClicked(timeDuration);
       
    });
    
});
//the timer function
let numberOfTimersSet = 0;
function countdownClock(time){
    let timer=setInterval(function(){
        if (time == 0){
            clearInterval(timer); //resets timer
            timerCompleted(); //resets boolean value
            addToScoreList(score); //adds score to scoreboard
            resetScore(); 
            resetDraggedItems();

            document.getElementById('score').textContent= "Scoreboard: " +scoreList[numberOfTimersSet];
            document.getElementById('timer').textContent= "Time's Up!";
            document.getElementById('text').textContent= "Nice try. Think you can do better? Try Again!";
            document.getElementById('start-btn').textContent = "Restart Timer";
            numberOfTimersSet++;
            
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
};

//function to see if button is already pressed- prevents creation of another countdown
let timerAlreadySet = false;
function timerButtonClicked(time) {
    if (!timerAlreadySet){
        countdownClock(time);
        timerAlreadySet = true;
    }
}
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
    score=0;
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

function dragStartClassic(event){
    event.dataTransfer.setData("text", "compost");
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

    if (info == "compost") {
        const compostItem = document.getElementById(draggedImage);
        compostItem.style.display = "none";
    }

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
    if (draggedItemsCount%4 == 0){
        resetDraggedItems();
    }
    if (timerAlreadySet){
        addPoint(1);
    }
    else {
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

/*
function randomizeDroppedItems() {
    //first need to create an array list to select our compost elements
    let compostableItemsList = [];
    let divs = document.getElementsByTagName('div'); //will select all the div elements on the page

    for (let i=0;i<divs.length;i++){
        if(divs[i].className=="compost"){
            compostableItemsList.push(divs[i]); //if div class is compost, will add item to list
        }
    }
    let randomIndex = Math.floor(Math.random()*compostableItemsList.length); //selects a random index (normally would add one to index value, but length satisfies conditions)
    let randomSelection = compostableItemsList[randomIndex];
    let changeDisplay = document.getElementsById(randomSelection);
    changeDisplay.style.display= "block";
    setTimeout(function(){
        document.getElementById(randomSelection).style.display= "none"; //disappears after 2 seconds
        randomizeDroppedItems(); //select a new random item
    },2000);
   // randomizeDroppedItems();
}
*/
