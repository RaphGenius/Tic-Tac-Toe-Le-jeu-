let currentPlayer = "X";

//Cible pour écrire info
const info = document.querySelector(".info");
info.textContent = `C'est au joueur ${currentPlayer} de jouer`;
let lock = false;
//Event pour chacunes des cells
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => cell.addEventListener("click", handleClick));
//un index correspond à une case
const currentGame = ["", "", "", "", "", "", "", "", ""];
// On recupere les valeurs de l'élement avec e target
//On récupere les info de la propriété data avec getAttribute()
function handleClick(e) {
  const clickedBox = e.target;
  //On récupère l'attribut de l'index
  const boxIndex = clickedBox.getAttribute("data-index");

  if (currentGame[boxIndex] !== "" || lock) {
    return;
  }

  // On cible l'empachement avec l'index de l'attribut data et on lui donne la valeur de X ou O
  currentGame[boxIndex] = currentPlayer;
  clickedBox.textContent = currentPlayer;

  verification();
}

//Chaque chiffre est un index
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function verification() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combinationToCheck = winningCombinations[i];

    let a = currentGame[combinationToCheck[0]];
    let b = currentGame[combinationToCheck[1]];
    let c = currentGame[combinationToCheck[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    } else if (a === b && b === c) {
      info.textContent = `Le joueur ${currentPlayer} a gagné ! GG ! Appuyer sur F5 pour recommencer`;
      lock = true;
      return;
    }
  }
  //Match nul, toutes les cases sont prises sans gagnants
  if (!currentGame.includes("")) {
    info.textContent = `Match Nul !`;
    lock = true;
    return;
  }
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  info.textContent = `Au tour de ${currentPlayer}`;
}
