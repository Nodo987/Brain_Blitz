// Select option buttons for choosing game theme, number of players, and grid size
const chooseGameThemeOptionBtns = document.querySelectorAll(".choose_game_theme"); // select game theme options
const chooseNumberOfPlayersBtns = document.querySelectorAll(".Choose_number_of_players"); // select number of players options
const chooseGridSizeOptionsBtns = document.querySelectorAll(".Choose_grid_size"); // select grid size options

// Select HTML elements based on selected game options
const displayDivBasedOnGridSize = document.querySelectorAll(".started_game_body"); // select display divs based on grid size option
const displayDivBasedOnNumberOfPlayers = document.querySelectorAll(".number_of_player"); // select display divs based on number of players option

// Select start and restart game buttons
const startGameBtn = document.querySelectorAll(".start_btn"); // select start game button
const restartBtn = document.querySelectorAll(".restart_btn"); // select restart game button
const resumeBtn = document.querySelector(".resume_btn")//select resume game button
const menuBtn = document.querySelector(".Menu_btn")//select menu button 

//select menu container
const menuContaner = document.querySelector(".Paused_Game_Container")

// Select HTML elements for game interface, such as elements for 4x4 or 6x6 grid
const element4x4 = document.querySelectorAll(".element4x4"); // select elements for 4x4 grid
const element6x6 = document.querySelectorAll(".element6x6"); // select elements for 6x6 grid

// Select game over tab and displays for single-player game
const blackBacground = document.getElementById("Black_background"); // select black background for game over tab
const gameOverTab = document.querySelectorAll(".Game_over_tab"); // select game over tab
const elapsedTimeDisplay = document.getElementById("Time_needed_for_singleplayer_game_over_tab"); // select display for elapsed time in single-player game over tab
const moveCountDisplay = document.getElementById("Moves_count_for_singleplayer_game_over_tab"); // select display for move count in single-player game over tab

//select containers for player stats for multiplyer game
const playerStatforTwoPlayerGame = document.querySelectorAll(".player_stats_two_player") //two players
const playerStatforThreePlayerGame = document.querySelectorAll(".player_stats_three_player") //three players
const playerStatforFourPlayerGame = document.querySelectorAll(".player_stats_four_player")//for players


//variables

//game option variables

let gameTheme = "numbers" //player can choose betwene number and icons
let numberOfPlayers = "1" //max number of players is 4
let gridSize = "4x4" //player can choose between 4x4 and 6x6

//numberandIconButtonsVariables

//this variables stores game elements after they are created
let numberElementsFor4x4;//this stores buttons for 4x4 game
let numberElementsFor6x6; //this stores buttons for 6x6 game
let buttonNumberTextFor4x4//this stores button numbers for 4x4
let buttonNumberTextFor6x6//this stores button numbers for 6x6

//variables for singleplayer game 

//this is variable for stop timer
let MinutesAfterTenIncrease;
let MinutesBeforeTenIncrease;
let SecondsAfterTenIncrease;
let SecondsUnderTenincrease;

//this variable is for display timer
const timerPLaceholder = document.getElementById("Timer_placeholder")

  //this is variables for timer
  let secondsUnderTen = 0
  let secondsAfterTen = 0
  let MinutesBeforeTen = 0
  let MinutesAfterTen = 0

//arrays

//all the numbers are icons name, icons used for game where player choose icons as a theme
let images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]


//let create objects for multyplyer game

//this is bluepring for player section
class Player{
    constructor(name, moveCounter, correctMoveCount){
        this.name = name;//this is player name
        this.moveCounter = moveCounter;//this shows how many moves player did 
        this.correctMoveCount = correctMoveCount;//this shows how many correct moves player did
    }
}
//this is player one
let playerOne = new Player("PLayer 1", 0, 0)

//this is player two
let playerTwo = new Player("PLayer 2", 0, 0)

//this is player three
let playerthree = new Player("PLayer 3", 0, 0)

//this is player four
let playerFour = new Player("PLayer 4", 0, 0)



//this function set active style on correct element and take value from this element
function setActiveStleAndValues(){

    // Set active style on game theme option buttons and update gameTheme variable
    chooseGameThemeOptionBtns.forEach(Btn => {
        Btn.addEventListener("click", () => {
            setActiveStyleOnCorrectElement(chooseGameThemeOptionBtns, Btn)
            gameTheme = Btn.value
        } )
    })

    // Set active style on players number option and update numberOfPlayers variable
    chooseNumberOfPlayersBtns.forEach(Btn => {
         Btn.addEventListener("click", () => {
            setActiveStyleOnCorrectElement(chooseNumberOfPlayersBtns, Btn)
            numberOfPlayers = Btn.value
        })
    })

   // Set active style on grid size option and update gridSize variable
    chooseGridSizeOptionsBtns.forEach(Btn => {
        Btn.addEventListener("click", () => {
            setActiveStyleOnCorrectElement(chooseGridSizeOptionsBtns, Btn)
            gridSize = Btn.value
        })
    })     

    // This is a universal function that sets the active style on the clicked element and removes it from the others
    function setActiveStyleOnCorrectElement(x, y){
        for(let i = 0; i < x.length; i++){
            x[i].classList.remove("active_Option_button")
        }
        y.classList.add("active_Option_button")
    }

}

//this function starting game
function startGame(){
    let NeedtoCheckGameOptionVariables = true
    startGameBtn.forEach(Btn => {
        restartGame()
        Btn.addEventListener("click", () => {

            if(NeedtoCheckGameOptionVariables){
                toggleDIsplayOnAndOff()
                checkGameOptionVariables()
                NeedtoCheckGameOptionVariables = false
            }
            
            else{
                toggleDIsplayOnAndOff()
                resetVariables()
                NeedtoCheckGameOptionVariables = true
            }
        })

    })
    
}

//this function restart game
function restartGame(){
    restartBtn.forEach(Btn => {

        Btn.addEventListener("click", () => {
            resetVariables()
            checkGameOptionVariables()
        })

    })
}

//this function show and hide menu
function showMenu(){
    menuBtn.addEventListener("click", () => {
        toggleDisplayOff()
        stopTimer()
    })

    resumeBtn.addEventListener("click", () => {
        toggleDisplayOff()
        timer()
    })

    function toggleDisplayOff(){
        menuContaner.classList.toggle("Display_off")
        blackBacground.classList.toggle("Display_off")
    }
}

//this function cecks game function variables and call proper functions
function checkGameOptionVariables(){

    addDisplayOffForAllElements()
    checkGameTheme()
    checkNumberOfPlayers()
    checkGridSize()

    //tis function checks game theme propertie and call proper function
    function checkGameTheme(){
        switch (gameTheme) {
            case "icons":
                gameThemeIsIcons()
                break;
        
            default:
                gameThemeIsNumbers()
                break;
        }
    }

    //this function checks number of players and call proper function
    function checkNumberOfPlayers(){
        switch (numberOfPlayers) {
            case "2":
                gameForTwoPlayer()
                break;
            case "3":
                gameForThreePlayer()
                break;
            case "4":
                gameForFourPlayer()
                break;        
        
            default:
                gameForOnePlayer()
                break;
        }
    }

    //this function checks grid size and call proper function
    function checkGridSize(){
        switch (gridSize) {
            case "6x6":
                gridSizeis6x6()
                break;
        
            default:
                gridSizeis4x4()
                break;
        }
    }
}

//gameFunctions

//game function based on theme of game

//if game theme is numbers run this
function gameThemeIsNumbers(){

    //this section runs if player choose 4x4 as a grid size
    ifPlayerChoose4x4()
    function ifPlayerChoose4x4(){
        if(gridSize == "4x4"){
        createElementsForGridSize4x4()
        switch (numberOfPlayers) {
            case "2":
                multyplyerGame(numberElementsFor4x4, 8, 8)
                break;
            case "3":
                multyplyerGame(numberElementsFor4x4, 8)
                break;
            case "4":
                multyplyerGame(numberElementsFor4x4, 8)
                break;        
        
            default:
                singleplayer(numberElementsFor4x4, 8)
                break;
        }
    }}

   //this section rus inf player choose 6x6 as a grid size
   ifPlayerChoose6x6()
   function ifPlayerChoose6x6(){ 
    if(gridSize == "6x6"){
        createElementsForGridSize6x6()
        switch (numberOfPlayers) {
            case "2":
                multyplyerGame(numberElementsFor6x6, 18)
                break;
            case "3":
                multyplyerGame(numberElementsFor6x6, 18)
                break;
            case "4":
                multyplyerGame(numberElementsFor6x6, 18)
                break;        
        
            default:
                singleplayer(numberElementsFor6x6)
                break;
        }
    }}
}

//if game theme is Icons run this
function gameThemeIsIcons(){

    //this section runs if player choose 4x4 as a grid size
    ifPlayerChoose4x4()
    function ifPlayerChoose4x4(){
        if(gridSize == "4x4"){
            createElementsForGridSize4x4()
            switch (numberOfPlayers) {
                case "2":
                    multyplyerGame(numberElementsFor4x4, 8)
                    break;
                case "3":
                    multyplyerGame(numberElementsFor4x4, 8)
                    break;
                case "4":
                    multyplyerGame(numberElementsFor4x4, 8)
                    break;        
            
                default:
                    singleplayer(numberElementsFor4x4, 8)
                    break;
            }
        }
    }
    

    //this section rus inf player choose 6x6 as a grid size
    ifPlayerChoose6x6()
    function ifPlayerChoose6x6(){
        if(gridSize == "6x6"){

            createElementsForGridSize6x6()
            switch (numberOfPlayers) {
                case "2":
                    multyplyerGame(numberElementsFor6x6, 18)
                    break;
                case "3":
                    multyplyerGame(numberElementsFor6x6, 18)
                    break;
                case "4":
                    multyplyerGame(numberElementsFor6x6, 18)
                    break;        
            
                default:
                    singleplayer(numberElementsFor6x6, 18)
                    break;
            }
        }
    }

}

//game function based on numbers of player

//if only one player run this
function gameForOnePlayer(){
    displayDivBasedOnNumberOfPlayers[0].classList.remove("Display_off")
}

//if two player run this
function gameForTwoPlayer(){
    displayDivBasedOnNumberOfPlayers[1].classList.remove("Display_off")
}

//if Three player run this
function gameForThreePlayer(){
    displayDivBasedOnNumberOfPlayers[2].classList.remove("Display_off")
}

//if Four player run this
function gameForFourPlayer(){
    displayDivBasedOnNumberOfPlayers[3].classList.remove("Display_off")
}

//game function based on grid size

//if grid size is 4x4 runthis
function gridSizeis4x4(){

    //give display on to 4x4 grid table
    displayDivBasedOnGridSize[0].classList.remove("Display_off")

}

//if grid size is 6x6 runthis
function gridSizeis6x6(){
    
    //give display on to 6x6 grid table
    displayDivBasedOnGridSize[1].classList.remove("Display_off")
    
}

//this function reboots all elements display
function addDisplayOffForAllElements(){

    //this loop add display off to all grid table elements
    for(let i = 0; i < 2; i++){
        displayDivBasedOnGridSize[i].classList.add("Display_off")
    }

    //this loop add display off to all player stat elements
    for(let i = 0; i < 4; i++){
        displayDivBasedOnNumberOfPlayers[i].classList.add("Display_off")
    }

}

//toggle display off based on situation on starting screen and started game containers
function toggleDIsplayOnAndOff(){

    //this is starting screen variable
    const startingScreen = document.getElementById("starting_screen")

    //this is started game variable
    const startedGame = document.getElementById("started_game")

    startingScreen.classList.toggle("Display_off")
    startedGame.classList.toggle("Display_off")


}

function stopTimer(){
    clearInterval(SecondsUnderTenincrease)
    clearInterval(SecondsAfterTenIncrease)
    clearInterval(MinutesBeforeTenIncrease)
    clearInterval(MinutesAfterTenIncrease)  
}

//this function resets variables
function resetVariables(){
    stopTimer()

    switch (numberOfPlayers) {
        case "2":
            addDisplayNone(1)
            break;
        case "3":
            addDisplayNone(1)
            break;
        case "4":
            addDisplayNone(1)
            break;        
        default:
            addDisplayNone(0)
            break;
    }

    function addDisplayNone(x){
        gameOverTab[x].classList.add("Display_off")
        blackBacground.classList.add("Display_off")
        menuContaner.classList.add("Display_off")
    }
    
}

//this function creates all number elements for grid size 6x6
function createElementsForGridSize6x6(){
    for(let i = 0; i < element6x6.length;i++){
        element6x6[i].innerHTML = ""
    }

    for(let i = 0; i < 18; i++){


        
        for(let j = 0; j < 2; j++){

            let randomNumber = Math.floor(Math.random() * 36)
            let numberElementBtn = document.createElement("button")
            numberElementBtn.classList.add("Display_flex")
            numberElementBtn.value = i + 1
            numberElementBtn.classList.add("ElementButtonStyle")

            //this if statment runs if player choose numebers as a game theme 
            if(gameTheme == "numbers"){
                let buttonNumberTextFor = document.createElement("p")
                buttonNumberTextFor.textContent = i + 1
                numberElementBtn.appendChild(buttonNumberTextFor)
            }

            //this if statment runs if player choose icons as a game theme
            else{
                let buttonIconPlaceholder = document.createElement("img")
                buttonIconPlaceholder.setAttribute("src", "./images/Icons/"+images[i]+".svg" )
                buttonIconPlaceholder.classList.add("Icon_button_style")
                numberElementBtn.appendChild(buttonIconPlaceholder)
            }
            if(element6x6[randomNumber].childElementCount == 0){
                element6x6[randomNumber].appendChild(numberElementBtn)
            }
            else{
                j = j-1
            }
        }
    }

    numberElementsFor6x6 = document.querySelectorAll(".ElementButtonStyle")
    
}

//this function creates all number elements for grid size 4x4
function createElementsForGridSize4x4(){
    
for(let i = 0; i < element4x4.length;i++){
    element4x4[i].innerHTML = ""
}

for(let i = 0; i < 8; i++){


    
    for(let j = 0; j < 2; j++){

        let randomNumber = Math.floor(Math.random() * 16)
        let numberElementBtn = document.createElement("button")
        numberElementBtn.value = i + 1
        numberElementBtn.classList.add("ElementButtonStyle")
        
        //this if statment runs if player choose numebers as a game theme 
        if(gameTheme == "numbers"){
            let buttonNumberTextFor = document.createElement("p")
            buttonNumberTextFor.textContent = i + 1
            numberElementBtn.appendChild(buttonNumberTextFor)
        }

        //this if statment runs if player choose icons as a game theme
        else{
            let buttonIconPlaceholder = document.createElement("img")
            buttonIconPlaceholder.setAttribute("src", "./images/Icons/"+images[i]+".svg" )
            buttonIconPlaceholder.classList.add("Icon_button_style")
            numberElementBtn.appendChild(buttonIconPlaceholder)
        }
        if(element4x4[randomNumber].childElementCount == 0){
            element4x4[randomNumber].appendChild(numberElementBtn)
        }
        else{
            j = j-1
        }
    }
}

numberElementsFor4x4 = document.querySelectorAll(".ElementButtonStyle")
            
}   

//this function runs while Number of players is 1
function singleplayer(x, y){

    //this variable is for display timer
    timerPLaceholder.textContent = "00 : 00"

    //this variable is for display move amount
    const moveAmountPlaceholder = document.getElementById("singlePlayerMoveAmount")
    moveAmountPlaceholder.textContent = 0



    //variables for singleplayer game 
    let firstElementValue;
    let secondElementValue;
    let movesCounter = 0;
    let correctMovesCounter = 0;
    let moveCount = 0;

    //call functions
    singlePlayerGameRules()

    //Used Variables in this function
    secondsUnderTen = 0
    secondsAfterTen = 0
    MinutesBeforeTen = 0
    MinutesAfterTen = 0

    timer()

    //this function disable all buttons after player choose second button
    function disableAllBtns(){
        for(let i = 0; i < x.length; i++){
            x[i].disabled = true
        }
        setTimeout(() => {
            for(let i = 0; i < x.length; i++){
                if(x[i].style.opacity == "1"){
                    x[i].disabled = true
                }
                else{
                    x[i].disabled = false
                }
            } 
        }, 700)
    }

    //this is the actuall singleplayer game start function
    function singlePlayerGameRules(){

        //this loop targets all the game elements
        x.forEach(Button => {
            Button.addEventListener("click", () => {

                //this two lines displaying element after click and give it active class thet means it have yellow background for few secends
                Button.classList.add("active")
                Button.style.opacity = "1";
                Button.disabled = true

                if(moveCount == 1){
                    disableAllBtns()
                }

                
                    if (moveCount == 0) {
                        firstElementValue = Button.value; //there firstelement value gets button value for compariso
                        secondElementValue = 0;
                        moveCount = 1;//this variable count which move is now first or second
                    } else if (moveCount == 1) {
                        setTimeout(() => {
                        secondElementValue = Button.value;//there secondelement value gets button value for comparison 
                        //variables under this are used for stats
                        movesCounter += 1
                        moveAmountPlaceholder.textContent = movesCounter
                        moveCount = 0;

                        //here is comparison if first and second elements are same player get additional score and of there is no other hiden elements game end 
                        if (secondElementValue == firstElementValue) { 
                            correctMovesCounter += 1;
                            for (let i = 0; i < x.length; i++) {
                                if (x[i].value == secondElementValue || x[i].value == firstElementValue) {
                                    x[i].classList.remove("active")
                                }
                            }
                            if (correctMovesCounter == y) {
                                gameOverTabFunction(`${MinutesAfterTen}${MinutesBeforeTen} : ${secondsAfterTen}${secondsUnderTen}`, `${movesCounter} Moves`)
                                clearInterval(SecondsUnderTenincrease)
                                clearInterval(SecondsAfterTenIncrease)
                                clearInterval(MinutesBeforeTenIncrease)
                                clearInterval(MinutesAfterTenIncrease)
                            }
                        } else {
                            for (let i = 0; i < x.length; i++) {
                                if (x[i].value == secondElementValue || x[i].value == firstElementValue) {
                                    x[i].style.opacity = "0";
                                    x[i].disabled = false
                                }
                            }
                        }
                    }, 500)
                    }
                
               
            });
        });

    }

    
}

//this function runs while number of players is 2-4
function multyplyerGame(x, y){

    //dom elements for multyplyer game
    const twoPlayerMoveStat = document.querySelectorAll(".Move_count_for_two_players")
    const threePlayerMoveStat = document.querySelectorAll(".Move_count_for_three_players")
    const fourPlayerMoveStat = document.querySelectorAll(".Move_count_for_four_players")
    const winnerPlayerNamePlaceholder = document.getElementById("Placeholder_for_winner_name_text")
    const playerStatsContainers = document.getElementById("container_for_player_stats")
    playerStatsContainers.innerHTML = ""
    resetPlayerMoveStat()
    resetPlayerStats()

    //variables
    let playerCount = 1
    let moveCount = 0
    let firstElement = 0
    let secondElement = 0
    let correctMoves = 0
    let sortedArray;
    let highestPairs;

    //functions

    //this function reset all player stats and prepare it for round
    function resetPlayerStats(){
        playerOne.correctMoveCount = 0
        playerOne.moveCounter = 0

        playerTwo.correctMoveCount = 0
        playerTwo.moveCounter = 0

        playerthree.correctMoveCount = 0
        playerthree.moveCounter = 0

        playerFour.correctMoveCount = 0
        playerFour.moveCounter = 0

    }

    //this function reset all player stat text placeholders, so it's not diplay old stat
    function resetPlayerMoveStat(){
        twoPlayerMoveStat.forEach(stat => {
            stat.textContent = 0
        })
        threePlayerMoveStat.forEach(stat => {
            stat.textContent = 0
        })
        fourPlayerMoveStat.forEach(stat => {
            stat.textContent = 0
        })
    }

    //this function increase player overal move count based on number of player and player count
    function increasePlayerMoveCount(){
        switch (playerCount) {
            case 2:
                playerTwo.moveCounter += 1
                forChangeVariablesBasedOnPlayerNumbers(twoPlayerMoveStat,threePlayerMoveStat,fourPlayerMoveStat, playerTwo.moveCounter)
                break;
            case 3:
                playerthree.moveCounter += 1
                forChangeVariablesBasedOnPlayerNumbers(twoPlayerMoveStat,threePlayerMoveStat,fourPlayerMoveStat, playerthree.moveCounter)
                break;  
            case 4:
                playerFour.moveCounter += 1
                forChangeVariablesBasedOnPlayerNumbers(twoPlayerMoveStat,threePlayerMoveStat,fourPlayerMoveStat, playerFour.moveCounter)
                break;     
            default:
                playerOne.moveCounter += 1
                forChangeVariablesBasedOnPlayerNumbers(twoPlayerMoveStat,threePlayerMoveStat,fourPlayerMoveStat, playerOne.moveCounter)
                break;
        }
    }

    //this function do same but instead of increase overal move count it increase corect move count
    function increasePlayerCorectMoveCount(){
        switch (playerCount) {
            case 2:
                playerTwo.correctMoveCount += 1
                break;
            case 3:
                playerthree.correctMoveCount += 1
                break;  
            case 4:
                playerFour.correctMoveCount += 1
                break;     
            default:
                playerOne.correctMoveCount += 1
                break;
        }
    }
    
    //this function sort players correct move numbers and choose winner, if two or more player have same amount of correct moves it's tie
    function ChooseWinner(){
        let winnersCount = 0
        sortedArray= [playerOne, playerTwo, playerthree, playerFour]
        sortedArray.sort((a, b) => b.correctMoveCount - a.correctMoveCount);
        highestPairs = sortedArray[0].correctMoveCount


        chooseWinnerBasedOnSortedArray()
        //this function check how many players get highest score

        function chooseWinnerBasedOnSortedArray(){
        for(let i = 0; i < sortedArray.length; i++){
            if(sortedArray[i].correctMoveCount == highestPairs){
                winnersCount += 1
            }
        }
        if(winnersCount == 1){
            winnerPlayerNamePlaceholder.textContent = sortedArray[0].name + " Wins"
        }
        else{
            winnerPlayerNamePlaceholder.textContent = "It’s a tie!"}
        }
    }
    
    //this function create game over tab element give them correct clases and display them
    function addGameOverTab(){
        ChooseWinner()
        for (let i = 0; i < parseFloat(numberOfPlayers); i++){
            let divElement = document.createElement("div")
            divElement.classList.add("Timer_final_time_container")
            divElement.classList.add("Stats_box")
            divElement.classList.add("width_auto")
            if(sortedArray[i].correctMoveCount == highestPairs){
                divElement.classList.add("winner_style")
            }
            let firstPElement = document.createElement("p")
            firstPElement.textContent = sortedArray[i].name
            firstPElement.classList.add("Stats_small_text")
            let secondPElement = document.createElement("p")
            secondPElement.textContent = sortedArray[i].correctMoveCount
            secondPElement.classList.add("Stats_count_text")
            divElement.appendChild(firstPElement)
            divElement.appendChild(secondPElement)
            playerStatsContainers.appendChild(divElement)

        }
    }

    //this is just blueprint for give variables real meanings based on number of player amount
    function forChangeVariablesBasedOnPlayerNumbers(x,z,i,y){
        if(numberOfPlayers == "2"){
            x[playerCount - 1].textContent = y
        }
        else if(numberOfPlayers == "3"){
            z[playerCount - 1].textContent = y
        }
        else if(numberOfPlayers == "4"){
            i[playerCount - 1].textContent = y
        }
    }
    
    //this function disable all buttons after player choose second button
    function disableAllBtns(){
        for(let i = 0; i < x.length; i++){
            x[i].disabled = true
        }
        setTimeout(() => {
            for(let i = 0; i < x.length; i++){
                if(x[i].style.opacity == "1"){
                    x[i].disabled = true
                }
                else{
                    x[i].disabled = false
                }
            } 
        }, 700)
    }

    removeActiveStyle()
    addActiveStyle(playerCount - 1)
    
    x.forEach(Button => {
        Button.addEventListener("click", () => {

            //this two lines displaying element after click and give it active class thet means it have yellow background for few secends
            Button.classList.add("active")
            Button.style.opacity = "1";
            Button.disabled = true

            if(moveCount == 1){
                disableAllBtns()
            }
            
            
                if (moveCount == 0) {
                    firstElement = Button.value; //there firstelement value gets button value for compariso
                    secondElement = 0;
                    moveCount = 1;//this variable count which move is now first or second
                } else if (moveCount == 1) {
                    setTimeout(() => {
                    secondElement = Button.value;//there secondelement value gets button value for comparison 

                    //variables under this are used for stats
                    moveCount = 0;

                    //here is comparison if first and second elements are same player get additional score and of there is no other hiden elements game end 
                    if (secondElement == firstElement) { 
                        correctMoves += 1;

                        increasePlayerMoveCount()
                        increasePlayerCorectMoveCount()

                        for (let i = 0; i < x.length; i++) {
                            if (x[i].value == secondElement || x[i].value == firstElement) {
                                x[i].classList.remove("active")
                            }
                        }
                        if (correctMoves == y) {//Y is declared based on what is display grid size
                            gameOverTabFunction()
                            addGameOverTab()
                        }
                    } else {
                        for (let i = 0; i < x.length; i++) {
                            if (x[i].value == secondElement || x[i].value == firstElement) {
                                x[i].style.opacity = "0";
                                x[i].disabled = false
                                
                            }
                        }
                        increasePlayerMoveCount()
                        if(playerCount < parseInt(numberOfPlayers)){
                            playerCount  += 1
                        }
                        else if(playerCount == parseInt(numberOfPlayers)){
                            playerCount = 1
                        }
                        removeActiveStyle()
                        addActiveStyle(playerCount - 1)
                    }
                }, 500)
                }
        });
    });
}

//this function counts how much time needs player to done level
function timer(){

    //this function increase seconds under ten
    function increaseSecondsUnderTen(){
        secondsUnderTen += 1
        if(secondsUnderTen == 10){
            secondsUnderTen = 0
        }

        giveTimeplaceholderValue()
    }

    //this function increase seconds after ten
    function increaseSecondsAfterTen(){
        secondsAfterTen += 1
        if(secondsAfterTen == 6){
            secondsAfterTen = 0
        }

        giveTimeplaceholderValue()
    }

    //this function increase minutes under ten
    function increaseMinutesBeforeTen(){
        MinutesBeforeTen += 1
        if(MinutesBeforeTen == 10){
            MinutesBeforeTen = 0
        }
        giveTimeplaceholderValue()
    }

     //this function increase minutes after ten
     function increaseMinutesAfterTen(){
        MinutesAfterTen += 1
        giveTimeplaceholderValue()
    }

    //this function displays timer seconds
    function giveTimeplaceholderValue() {
        timerPLaceholder.textContent = `${MinutesAfterTen}${MinutesBeforeTen} : ${secondsAfterTen}${secondsUnderTen}`
    }

   //this increase variables by 1 
   SecondsUnderTenincrease = setInterval(increaseSecondsUnderTen,1000)
   SecondsAfterTenIncrease = setInterval(increaseSecondsAfterTen, 10000) 
   MinutesBeforeTenIncrease = setInterval(increaseMinutesBeforeTen, 60000)
   MinutesAfterTenIncrease = setInterval(increaseMinutesAfterTen, 600000) 

    

   
   
}

//this function calls game over screen
function gameOverTabFunction(y,z){
    
    //this switch statment check which type of game over tab is needed
    switch (numberOfPlayers) {
        case "2":
            toggleShowOffAndOn(1)
            break;
        case "3":
            toggleShowOffAndOn(1)
            break;
        case "4":
            toggleShowOffAndOn(1)
            break;        
        default:
            toggleShowOffAndOn(0)
            elapsedTimeDisplay.textContent = y
            moveCountDisplay.textContent = z
            break;
    }

    //this function toogle class
    function toggleShowOffAndOn(x){
        gameOverTab[x].classList.toggle("Display_off")
        blackBacground.classList.toggle("Display_off")
    }
}

//this function removes active styles for all player stat tabs
function removeActiveStyle(){
    playerStatforTwoPlayerGame.forEach(stat => {
        stat.classList.remove("active")
    })
    playerStatforThreePlayerGame.forEach(stat => {
        stat.classList.remove("active")
    })
    playerStatforFourPlayerGame.forEach(stat => {
        stat.classList.remove("active")
    })
}

//this function add active styles on correct player tab
function addActiveStyle(x){
    if(numberOfPlayers == "2"){
        playerStatforTwoPlayerGame[x].classList.add("active")
    }
    else if(numberOfPlayers == "3"){
        playerStatforThreePlayerGame[x].classList.add("active")
    }
    else if(numberOfPlayers == "4"){
        playerStatforFourPlayerGame[x].classList.add("active")
    }
}
 

startGame()
showMenu()
setActiveStleAndValues()