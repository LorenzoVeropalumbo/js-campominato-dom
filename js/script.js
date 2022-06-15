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
      fieldSquare.addEventListener('click', checkClickSquare);
      gameField.append(fieldSquare);
    }
  }


  function checkClickSquare() {
  
    const userValue = parseInt(this.querySelector('span').innerHTML);

    if(bombsLocation.includes(userValue)){
      endGames(points);
      let userMessage = document.getElementById("user-message");
      userMessage.innerHTML = `Peccato, hai perso :-( Hai azzeccato ${points.length} tentavi. Gioca ancora`;

    } else {
      
      // -- 2.2 -- controllo il numero dato non è nell'array dei punti
      if(!points.includes(userValue) && !isNaN(userValue) && userValue < gameMaxRange && userValue > 0){
        
        points.push(userValue);
        console.log(points);
        this.classList.add("blue");
      }
      
      // -- 2.3 -- controllo se ha vinto e temino il gioco
      if(points.length === maxPoints){
        endGames(points)

        let userMessage = document.getElementById("user-message");
        userMessage.innerHTML = `Congraturazioni, hai vinto, hai azzeccato ${points.length} tentavi. Gioca ancora!!`;
      }
    }
  }

   // chiude il gioco e da una risposta di vittoria o sconfitta
  function endGames(points) {
      
    let squares = document.querySelectorAll(".square");
    let i = 1;
    for (let index = 0; index < squares.length; index++) { 
      
      if(bombsLocation.includes(i)){     
        squares[i - 1].classList.add("bombs");
      }
      
      squares[index].style.pointerEvents = "none";
      i++;
    }

    
  }
}
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