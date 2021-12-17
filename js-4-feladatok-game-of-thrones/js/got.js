'use strict';

const createAnyElemet = (element, attributes) => {
    const newElement = document.createElement(element);
    for (const k in attributes) {
        newElement.setAttribute(k, attributes[k]);
    }
    return newElement;
}



/* 
function success(response) {
    let adat = response;
    console.log(adat);
    console.log(adat[3])
    return [] = [...adat];
}
 */

// Adatbázis letöltése
async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result; // a result egy Promise
    } catch (error) {
        console.error(error);
    }
}


// Megkeresi a vezetéknevet. Két névtag közül a másodikat, vagy ha csak egy van, akkor azt 
// adja eredményül.
const firstNameFinder = (name = '') => (name.includes(' ')) ? name.split(' ')[1] : name;


// Neveknek a keresztnévtagok ABC szerinti sorbarendezése
let sortByName = (ArrayOfObj) => {
    return ArrayOfObj.sort((a, b) => {
        const firstData = firstNameFinder(a.name);
        const secondData = firstNameFinder(b.name);
        if (firstData < secondData) return -1
        return firstData > secondData ? 1 : 0
    });
}


// Arcképcsarnok léterhozása
const makePortraitsQueue = (arr) => {
    const containerOfPortraits = document.querySelector('.container__portraits');
    containerOfPortraits.textContent = '';
    for (let i = 0; i < 48; i++) {
        const conatinerOfPortrait = createAnyElemet('div', {
            class: 'container__portrait'
        });
        const containerOfPortraitImage = createAnyElemet('div', {
            class: 'container__portraitimage'
        });
        const containerOfPortraitText = createAnyElemet('div', {
            class: 'container__portraittext'
        });
        const portraitImage = createAnyElemet('img', {
            class: 'portrait__image'
        });

        portraitImage.setAttribute('src', `./${arr[i].portrait}`);
        portraitImage.setAttribute('alt', `Portrait of ${arr[i].name}`);
        portraitImage.setAttribute('title', `${arr[i].name}`);

        containerOfPortraitText.textContent = arr[i].name;

        containerOfPortraitImage.appendChild(portraitImage);
        conatinerOfPortrait.appendChild(containerOfPortraitImage);
        conatinerOfPortrait.appendChild(containerOfPortraitText);

        containerOfPortraits.appendChild(conatinerOfPortrait);

    }
}


// Kép megjelenítése
const fillPictureField = (picture, nameOfCast) => {
    const containerOfPicture = document.querySelector('.container__picture');
    containerOfPicture.textContent = '';
    const keys = ['class', 'src', 'alt', 'title'];
    
    if (!picture) picture = '../assets/pictures/sky_16-03_gameofthrones-uebersicht_sub_s.webp';
    const values = [
        'picture__image',
        `./${picture}`,
        `Picture of ${nameOfCast}`,
        `${nameOfCast}`
    ];
    const myObj = {
        [keys.shift()]: values.shift(),
        [keys.shift()]: values.shift(),
        [keys.shift()]: values.shift(),
        [keys.shift()]: values.shift()
    }
    
    const pictureFromMovie = createAnyElemet('img', myObj);
    containerOfPicture.appendChild(pictureFromMovie);
}

// Ház címerének megjelenítése
const fillHouseField = (house) => {
    const containerOfHouses = document.querySelector('.container__houses');
    containerOfHouses.textContent = '';
    if (house) {
        const pictureOfHouse = createAnyElemet('img', {
            class: 'picture__House',
            src: `./assets/houses/${house}.png`,
            alt: `Picture of ${house}`,
            title: `${house}`
        });
        containerOfHouses.appendChild(pictureOfHouse);
    }
}


// Adattábla kitöltése
const fillDetailsFieldData = (name, picture, bio, house) => {
    // Kép
    fillPictureField(picture, name);
    
    // Név
    const containerOfName = document.querySelector('.container__name');
    containerOfName.textContent = `${name}`;
    
    // Ház címere
    fillHouseField(house);
    
    // bio
    const containerOfBio = document.querySelector('.container__bio');
    containerOfBio.textContent = bio ? bio : '';
}


// Adattábla kitöltéséhez adatok megadása (kép, név, címer, részletek)
const fillDetailsField = (arr = [{}], nameOfCast = '') => {
    console.log(arr, nameOfCast);
    if (nameOfCast !== '') {
        const detailOfCast = arr.find(({
            name
        }) => name === nameOfCast);
        
        console.log(detailOfCast);
        
        const {
            name,
            picture,
            bio,
            house
        } = detailOfCast;

        fillDetailsFieldData(name, picture, bio, house);
        
    } else {
        const [name, picture, bio, house] = [
            'Character not found',
            '../assets/pictures/sky_16-03_gameofthrones-uebersicht_sub_s.webp',
            '',
            ''
        ];
        console.log('hiba kezelve')
        fillDetailsFieldData(name, picture, bio, house);
    }
}

// Törli a megjelőlést a képcsarnokban
const clearActiveStyle = () => {
    const clearedClass = document.querySelectorAll('.container__portraittext--active')
    for (let item of clearedClass) {
        if (item.className.includes('--active')) {
            item.className = item.className.split('--')[0];
        }
    }
}

// Kiválaszott név mejfelőlése a képcsarnokban
function markOnThePortrait(nameOfPortrait = '', arr) {
    const portraitText = document.querySelectorAll('.container__portraittext');
    clearActiveStyle();
    const markedItem = [...portraitText].find((item) => item.textContent === nameOfPortrait);
    let markedName = '';
    if (markedItem) {
        markedItem.classList.replace('container__portraittext', 'container__portraittext--active');
        markedName = markedItem.textContent;
    } else {
        markedName = ''
    }
    fillDetailsField(arr, markedName);
}

const clickHandler = (arr) => {
    const portraitText = document.querySelectorAll('.container__portraittext');
    portraitText.forEach(item => item.addEventListener('click', function (ev) {
        markOnThePortrait(this.textContent, arr);
        console.log(this); // a név, amire kattintunk
        console.log(this.textContent); // a név, amire kattintunk
    }));
};



const findInDatabase = (item = '', arr = [{}]) => {
    const findedItem = [...arr].find(x => x.name.toLocaleUpperCase() === item.toUpperCase());
    //return findedItem ? findedItem : false;
    const obj = (findedItem ? findedItem : {});
    //fillDetailsField(arr, obj.name);
    const portraitText = document.querySelectorAll('.container__portraittext');
    //clearActiveStyle(portraitText);
    markOnThePortrait(obj.name, arr);
}

// Enter leütésével a beírt nevet átadja az adatbázissal továbbadja a findInDatabase függvénynek
const SerachInputHandler = (arr = [{}]) => {
    const searchInput = document.querySelector('#got_search');
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') findInDatabase(searchInput.value, arr);
    })
}



// **************************************************************
// MAIN program

//console.log(request('./json/got.json'));

// ABC-sorrendbe rendezett adatbázis, az eredmény egy Promise
const sortedDataOfGot = request('./json/got.json')
    .then(sortByName);

// Arcképcsarnok létrehozása az ABC-sorrenbe rendezett adatbázis alapján 
sortedDataOfGot.then(makePortraitsQueue);

// Klikkelés kezelése
sortedDataOfGot.then(clickHandler);

// Keresőmezőbe írás kezelése
sortedDataOfGot.then(SerachInputHandler);


