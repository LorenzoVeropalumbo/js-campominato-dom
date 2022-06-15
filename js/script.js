// Controllo quando l'utente clicca play
const startGame = document.getElementById("start-game");

// inizio il loop del gioco
startGame.addEventListener('click', gameLoop);
function gameLoop(){
  
  // Creazione campo di gioco
  const gameField = document.getElementById("main-grid");

  // GameReset
  console.clear();
  gameField.innerHTML = '';
  gameField.className = '';
  
  // Variabili
  const numberOfBombs = 16;
  let gameMaxRange;
  let difficultyClass;
  
  // setto il livello di diffoltà all'utente
  let settingDifficulty = document.getElementById("difficulty-level").value;

  switch(settingDifficulty) {
    
    case "2":
      gameMaxRange = 81;
      difficultyClass = "medium";
      break;
    case "3":
      gameMaxRange = 49;
      difficultyClass = "hard";
      break;
    default:
      gameMaxRange = 100;
      difficultyClass = "easy";
      break;
  }

  // Genero le bombe e le salvo in un array
  const bombsLocation = bombsGeneretor(1, gameMaxRange, numberOfBombs);
  console.log(bombsLocation);
  
  // Game variables
  const points = [];
  const maxPoints =  gameMaxRange - numberOfBombs;

  // Field generetor
  generetorField();

  function generetorField() {
    // creazione delle celle
    for (let i = 1; i <= gameMaxRange; i++) {
      // popolo le celle
      const fieldSquare = document.createElement("div");
      fieldSquare.innerHTML = `<span>${i}</span>`;
      fieldSquare.classList.add("square");
      fieldSquare.classList.add(difficultyClass);
      if(bombsLocation.includes(i)){
        fieldSquare.classList.add("bombs");
      }
      fieldSquare.addEventListener('click', checkClickSquare);
      gameField.append(fieldSquare);
    }
  }


  function checkClickSquare() {
  
    const userValue = parseInt(this.querySelector('span').innerHTML);

    if(bombsLocation.includes(userValue)){
  
      endGames('lost', points)
    } else {
      
      // -- 2.2 -- controllo il numero dato non è nell'array dei punti
      if(!points.includes(userValue) && !isNaN(userValue) && userValue < gameMaxRange && userValue > 0){
            
        points.push(userValue)
      }
      
      // -- 2.3 -- controllo se ha vinto e temino il gioco
      if(points.length === maxPoints){
            
        endGames('win', points)
      }
    }
  }
}
// // gli scrivo il livello di difficoltà selezionato
// alert("you have select difficulty " + difficultyLevel);

// const bombsLocation = bombsGeneretor(1, gameMaxRange, numberOfBombs);
// console.log(bombsLocation);

// // Game variables
// const points = [];
// let gameLoops = true;
// const maxPoints =  gameMaxRange - numberOfBombs;

// // -- 1 -- avvio il ciclo del gioco
// while(gameLoops){

//   // User interaction
//   const userValue = parseInt(prompt("Dammi un numero"))

//   // -- 2.1 -- controllo il numero dato dall'utente e se è una bomba temino il gioco
//   if(bombsLocation.includes(userValue)){

//     gameLoops = endGames('lost', points)
//   } else {

//     // -- 2.2 -- controllo il numero dato non è nell'array dei punti
//     if(!points.includes(userValue) && !isNaN(userValue) && userValue < gameMaxRange && userValue > 0){
      
//       points.push(userValue)
//     }

//     // -- 2.3 -- controllo se ha vinto e temino il gioco
//     if(points.length === maxPoints){
      
//       gameLoops = endGames('win', points)
//     }
//   }
// }

// -----------------------------------
//              FUNCTION 
// -----------------------------------

// Genera le bombe in posizioni randomiche tra un min e un massimo
function bombsGeneretor(minRange, maxRange, numberOfBombs) {
  
  // function variables
  const bombsArrey = [];
  let randomPosition;

  // popolo bombsArrey
  while(bombsArrey.length < numberOfBombs){
    randomPosition = getRndInteger(minRange, maxRange)

    // controlla se quel numero è stato già inserito in bombsArrey
    if(!bombsArrey.includes(randomPosition)){
      bombsArrey.push(randomPosition)
    }
  }

  return bombsArrey;
}

// Genera dei numeri rangom
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// chiude il gioco e da una risposta di vittoria o sconfitta
function endGames(value, points) {
  
  if(value === "lost"){
    
    alert("hai perso")
    alert("hai totalizzato " + points.length + " punti")
  } else {

    alert("hai vinto")
    alert("hai totalizzato " + points.length + " punti")
  }
}