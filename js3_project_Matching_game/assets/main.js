
const createAnyElemet = (element, attributes) => {
    const newElement = document.createElement(element);
    for (const k in attributes) {
        newElement.setAttribute(k, attributes[k]);
    }
    return newElement;
}



const getRandomInteger = (min, max) =>  Math.trunc(Math.random() * (max - min + 1) + min);


const figuresOnTheCards = () => {
    const figuresSet = ['🍄', '🍎', '🦊', '🌼', '🌞'];
    let randomArray = [];
    do {
        let randomNumber = getRandomInteger(1,10);
        if (!randomArray.includes(randomNumber)) randomArray.push(randomNumber);
    } while (randomArray.length < 10);
    randomArray = randomArray.map(x => (x > 5) ? x - 5 : x);
    console.log(randomArray);
    return randomArray.map(x => figuresSet[x-1]);
}


// Játéktér készítése
const makeGameTable = () => {
    const figures = figuresOnTheCards();
    document.querySelector('.container__time').textContent = '00:00';
    document.querySelector('.container__sumNumberOfClick').textContent = '0';

    document.querySelector('.container__cards').textContent = '';
    const cardsContainer = document.querySelector('.container__cards');
    for (let i = 0; i < 10; i++ ) {
        const cardBox = createAnyElemet('div', {class: 'cardbox', id: `card-${i}`});
        const cardBoxInner = createAnyElemet('div', {class: 'cardbox__inner'});
        const cardFront = createAnyElemet('div', {class: 'card--front'});
        const cardBack = createAnyElemet('div', {class: 'card--back'});
        cardBox.appendChild(cardBoxInner);
        cardBoxInner.appendChild(cardFront);
        cardBoxInner.appendChild(cardBack);
        cardsContainer.appendChild(cardBox);
        cardBack.textContent = figures[i];
        cardFront.textContent = '✦';
    }
    console.log(figures);
}


let cardBox = document.querySelectorAll(".cardbox");
let timeoutID;

// A két felfordított kártya objektuma
const figureOfFrontCards = {
    firstCard: {
        id: '',
        figure: ''
    },
    secondCard: {
        id: '',
        figure: ''
    },
    storeCard (numberOfClick, {id, figure}) {
        if (numberOfClick === 1 ) {
            this.firstCard.id = id;
            this.firstCard.figure = figure;
        };
        if (numberOfClick === 2 ) {
            if (this.firstCard.id !== id) {
                this.secondCard.id = id;
                this.secondCard.figure = figure;
            }
        };        
    },
    match () {
        return (this.firstCard.figure === this.secondCard.figure) ? true : false;
    },
    delete () {
        this.firstCard.id = '';
        this.firstCard.figure = '';
        this.secondCard.id = '';
        this.secondCard.figure = '';
    }
}

// 
const gameStatusIndicator = {
    startStop : 'stop',
    sumNumberOfClick : 0
}


const clickHandler = () => {
    let clickCounter = 0;
    cardBox.forEach(item => item.addEventListener('click', item.fn = function fn() {
        this.classList.toggle('front'); // Felfordítja a kártyát.
        gameStatusIndicator.sumNumberOfClick++;
        document.querySelector('.container__sumNumberOfClick').textContent = gameStatusIndicator.sumNumberOfClick;
        
        // START GAME
        if (gameStatusIndicator.sumNumberOfClick === 1) {
            gameStatusIndicator.startStop = 'started';
            TimeFunc();  // Elindítja az időszámlálót.
        }
        
        // Ha kártya fix, akkor nem lehet rá kattintani. 
        cardBox.forEach(item => {
            if (item.className.includes('fix')) {
                item.removeEventListener('click', item.fn, false);
            }
        });
        
        // Kattintásszámláló: 1, 2.
        clickCounter +=1;
        
        // Első kártyára kattintás
        if (clickCounter === 1) {
            figureOfFrontCards.storeCard(clickCounter, {id: this.id, figure: this.textContent}); // Első kártya adatainak tárolása
        }
        
        // Második kártyára kattintás
        if (clickCounter === 2) {
            figureOfFrontCards.storeCard(clickCounter, {id: this.id, figure: this.textContent}); // Második kártya adatainak tárolása
            cardBox.forEach(item => item.removeEventListener('click', item.fn, false)); // Ha két kártya már fel van fordítva, akkor a többbire nem lehet kattintani.
            
            // Ha a két felfordított kártyán azonos figura van, akkor nem fordulnak vissza. 'fix' osztály hozzáadásával.
            if (figureOfFrontCards.match() === true) {
                document.querySelector(`#${figureOfFrontCards.firstCard.id}`).classList.add('fix');
                document.querySelector(`#${figureOfFrontCards.secondCard.id}`).classList.add('fix');
            } else figureOfFrontCards.delete();

            // Ellenőrzi, hogy minden kártya fel van-e fordítva.
            if ([...cardBox].every(item => item.className.includes('fix'))) {
                console.log('VÉGE');
                gameStatusIndicator.startStop = 'stop';
                gameStatusIndicator.sumNumberOfClick = 0;
                clearInterval(countTime);  // Megállítja az időszámlálót.
                timeoutID = setTimeout(startNewGame, 4000);  // Újraindítja a játékot.
            }

            timeoutID = setTimeout(cardsTurnBack, 1500);  
            clickCounter = 0;
        } 
    }, false));
}


function cardsTurnBack() {  
    cardBox.forEach(item => item.classList.remove('front'));
    clickHandler();
   };


const startNewGame = () => {
    clearTimeout(timeoutID);
    makeGameTable();
    cardBox = document.querySelectorAll(".cardbox");
    clickHandler();
}


// MAIN PROGRAM
startNewGame();


// *** Timer *** //
let countTime = 0;
const TimeFunc = () => {
    const startTime = new Date();
    countTime = setInterval(() => {
        const now = new Date();
        const delta = now - startTime;
        const seconds = Math.floor(delta / 1000) % 60
        const minutes = Math.floor(delta / 1000 / 60 ) % 100;
        document.querySelector('.container__time').textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
    }, 1000);
}




