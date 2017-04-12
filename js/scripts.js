var newGameElem = document.getElementById('js-newGameElement'); //Przycisk zainicjowania nowej gry
var newGameBtn = document.getElementById('js-newGameButton'); //nowy przycisk
var pickRock = document.getElementById('js-playerPick_rock'); //zmienna -> kamień
var pickPaper = document.getElementById('js-playerPick_paper'); //zmienna -> papier
var pickScissors = document.getElementById('js-playerPick_scissors'); //zmienna -> nożyce
var pickElem = document.getElementById('js-playerPickElement'); //zmienna odpowiedzialna za określenie stanu kontenera z opcjami do wyboru przycisków gry
var resultsElem = document.getElementById('js-resultsTableElement'); //zmienna odpowiedzialna za określenie stanu kontenera z wynikiem gry
var playerPointsElem = document.getElementById('js-playerPoints'); //zmienna przechowująca punkty gracza
var playerNameElem = document.getElementById('js-playerName'); //zmienna przechowująca imię gracza
var computerPointsElem = document.getElementById('js-computerPoints'); //zmienna przechowująca punkty komputera
var playerPickElem = document.getElementById('js-playerPick');//zmienna przechowujaca wybór gracza
var computerPickElem = document.getElementById('js-computerPick');//zmienna przechowująca wybór komputera
var playerResultElem = document.getElementById('js-playerResult');//zmienna - rezultat po stronie gracza
var computerResultElem = document.getElementById('js-computerResult'); //zmienna - rezultat po stronie komputera

newGameBtn.addEventListener('click', newGame); //Listener przycisku inicjującego grę
pickRock.addEventListener('click', function() { playerPick('rock') }); //listener ocekujący na wybór gracza na przycisku kamień
pickPaper.addEventListener('click', function() { playerPick('paper') }); //listener ocekujący na wybór gracza na przycisku papier
pickScissors.addEventListener('click', function() { playerPick('scissors') }); //listener ocekujący na wybór gracza na przycisku nożyce


// inicjacja i zakończenie gry
var gameState = 'notStarted';  //started // ended
var player = {
	name: '',
	score: 0
	};
var computer = {
	score: 0
	};


//Funkcja, która wyświetla elementy gry w zależności od jej stanu - rozpoczęta, zakończona, nierozpoczęta
function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}
//punktacja - 
function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;

	showTheWinner();
	setGameElements();
}
//Funkcja odpala nową grę i pobiera imię gracza
function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}
//losowanie wyboru komputera
function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}
//funcja sprawdza, co wybrał gracz w danej rundzie i typuje zwycięzcę rudny -> wynik idzie do setGamePoints
function playerPick(playerPick) {
	var computerPick = getComputerPick();
    
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
    
	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
}
//funkcja sprawdza, kto wygrał rundę
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

		if (playerPick == computerPick) {
			winnerIs = 'noone'; // remis
		} else if (
			(computerPick == 'rock' &&  playerPick == 'scissors') ||
			(computerPick == 'scissors' &&  playerPick == 'paper') ||
			(computerPick == 'paper' &&  playerPick == 'rock')) {
        
			winnerIs = 'computer';
		}

		if (winnerIs == 'player') {
			playerResultElem.innerHTML = "Wygrana!";
			player.score++;
		} else if (winnerIs == 'computer') {
			computerResultElem.innerHTML = "Wygrana!";
			computer.score++;
		}
		setGameElements();
}
//wskazanie zwycięzcy - jeżeli gracz ma 10 punktów - alert: Wygrał gracz
function showTheWinner() {
    if (player.score == 10) {
        alert("Wygrał gracz " + player.name);
        gameState = 'ended';
    //jeżeli komputer ma ==10 punktów - wygrał komputer    
	}else if (computer.score == 10) {
        alert("Wygrał komputer");
        gameState = 'ended';
	}
}