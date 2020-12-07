//References
const X_Class = 'x'
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const nextButton = document.getElementById('nextButton')
const deleteButton = document.getElementById('deleteButton')
let counter
let markedNumbers = new Array()

//Initializes Game
startGame()

function startGame(){
//Adding the Button Logic
restartButton.addEventListener('click', startGame)
deleteButton.addEventListener('click', deleteMarks)
nextButton.addEventListener('click', finish)

//Cell Index Initializing Attribute
index = 0
//Adding Attributes to the Cell Elements 
cellElements.forEach(cell => { cell.classList.remove(X_Class); index++; cell.number= 0 + index; cell.myBool = false; cell.addEventListener('click', select)})


//For Hover Effect
board.classList.add(X_Class)

//Clearing the Inputs from last run
counter = 0;
markedNumbers=[]

//Removes the Endscreen and Next Button
winningMessageElement.classList.remove('show')
nextButton.classList.remove('show')
}

function select(e){

const cell = e.target
const currentClass = X_Class

if(cell.myBool == false && counter <6){

 placeMark(cell,currentClass)

} 
else if(cell.myBool == true && counter <=6){

 removeMark(cell,currentClass)

}


//Next Button Trigger
if(counter == 6){
  //Next Button appears after 6 marks
  nextButton.classList.add('show')
} else{
  nextButton.classList.remove('show')
}

}

function deleteMarks(){
  //Reseting attributes
  cellElements.forEach( cell=> {cell.classList.remove(X_Class); cell.myBool = false})
  counter = 0
  markedNumbers= []
  nextButton.classList.remove('show')
}

function placeMark(cell,currentClass){
  cell.classList.add(currentClass)
  cell.myBool = true;
  counter++;
  markedNumbers.push(cell.number)
}

function removeMark(cell,currentClass){
  cell.classList.remove(currentClass)
  cell.myBool = false;
  counter--;
  markedNumbers.pop()
}

function finish(){
//InsertionSort
  for(i = 0; i < markedNumbers.length; i++){
    for(j = markedNumbers.length-1; j > 0;j--){
      if(markedNumbers[j-1] > markedNumbers[j]){

        temp = markedNumbers[j];
        markedNumbers[j] = markedNumbers[j - 1];
        markedNumbers[j - 1] = temp;
          
      }
    }
  }

  winningMessageTextElement.innerText = 'Thanks your numbers are:' + markedNumbers.toString()
  winningMessageElement.classList.add('show')
}
