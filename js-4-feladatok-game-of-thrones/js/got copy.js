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
        //success(result);
        //sortName(result)
        return result; // a result egy Promise
    } catch (error) {
        console.error(error);
    }
}


// Megkeresi a vezetéknevet. Két névtag közül a másodikat, vagy ha csak egy van, akkor azt 
// adja eredményül.
const firstNameFinder = (name = '') => (name.includes(' ')) ? name.split(' ')[1] : name;


// Neveknek a keresztvéntagok ABC szerinti sorbarendezése
let sortByName = (ArrayOfObj) => {
    return ArrayOfObj.sort((a, b) => {
        const firstData = firstNameFinder(a.name);
        const secondData = firstNameFinder(b.name);
        if (firstData < secondData) return -1
        return firstData > secondData ? 1 : 0
    });
}

// TÖRÖLHETÖ
// Nevek ABC szerinti sorbarendezése
const sortByName2 = (ArrayOfObj = [{
    name: ''
}]) => {
    return ArrayOfObj.sort((a, b) => {
        if (a.name < b.name) return -1
        return a.name > b.name ? 1 : 0
    });
}
// -------------------------------------

/* 
// Adatok eltárolása tömbben
let arrOfGOT = [];
function makeArrayfromResponse(response) {
    return arrOfGOT = response.map(x => x);    
} */


const makePortraitsQueue = (arr) => {
    //arr = ArrayOfObj.map(x => x);

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
    // clickHandler();
}


const clearActiveStyle = (elements) => {
    for (let item of elements) {
        if (item.className.includes('--active')) {
            item.className = item.className.split('--')[0];
        }
    }
}


//containerOfPortraitText.addEventListener('click', )

const fillDetailsField = (arr = [{}], obj = {}) => {

}


const clickHandler = (arr) => {
    const containerOfPicture = document.querySelector('.container__picture');
    const containerOfName = document.querySelector('.container__name');
    const containerOfHouses = document.querySelector('.container__houses');
    const containerOfBio = document.querySelector('.container__bio');
    const portraitText = document.querySelectorAll('.container__portraittext');
    //console.log(portraitText);
    portraitText.forEach(item => item.addEventListener('click', function () {

        //portraitText.classList.replace('container__portraittext', 'container__portraittext--active');
        clearActiveStyle(portraitText);
        this.classList.replace('container__portraittext', 'container__portraittext--active');

        console.log(this);


        const detailOfCast = arr.find(({
            name
        }) => name === this.textContent);
        console.log(detailOfCast);

        // Kép
        containerOfPicture.textContent = '';
        const keys = ['class', 'src', 'alt', 'title'];
        const values = [
            'picture__image',
            `./${detailOfCast.picture}`,
            `Picture of ${detailOfCast.name}`,
            `${detailOfCast.name}`
        ];

        const myObj = {
            [keys.shift()]: values.shift(),
            [keys.shift()]: values.shift(),
            [keys.shift()]: values.shift(),
            [keys.shift()]: values.shift()
        }
        console.log(myObj);

        const pictureFromMovie = createAnyElemet('img', myObj);

        /* 
            const pictureFromMovie = createAnyElemet('img', {
            class: 'picture__image',
            src: `./${detailOfCast.picture}`,
            alt: `Picture of ${detailOfCast.name}`,
            title: `${detailOfCast.name}`
        });        
        */

        // pictureFromMovie.setAttribute('src', `./${detailOfCast.picture}`);
        // pictureFromMovie.setAttribute('alt', `Picture of ${detailOfCast.name}`);
        // pictureFromMovie.setAttribute('title', `${detailOfCast.name}`);

        containerOfPicture.appendChild(pictureFromMovie);

        // Név
        const {
            name,
            bio,
            house
        } = detailOfCast;
        containerOfName.textContent = `${name}`;

        // Ház címere **************
        containerOfHouses.textContent = '';
        //console.log(detailOfCast.house);
        //console.log(house);
        if (house) {
            const pictureOfHouse = createAnyElemet('img', {
                class: 'picture__House',
                src: `./assets/houses/${house}.png`,
                alt: `Picture of ${house}`,
                title: `${house}`
            });
            containerOfHouses.appendChild(pictureOfHouse);
        }
        //console.log(`./assets/houses/${detailOfCast.house}`);


        // bio
        containerOfBio.textContent = bio ? bio : '';



    }));
};



const findInDatabase = (item = '', arr = [{}]) => {
    const findedItem = [...arr].find(x => x.name.toLocaleUpperCase() === item.toUpperCase());
    return findedItem ? findedItem : false;
}


const SerachInputHandler = (arr = [{}]) => {
    const searchInput = document.querySelector('#got_search');
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') findInDatabase(searchInput.value, arr);
    })
}




// MAIN
console.log(request('./json/got.json'));

// ABC-sorrendbe rendezett 
const sortedDataOfGot = request('./json/got.json')
    .then(sortByName);
//.then(makeArrayfromResponse);
//.then(makePortraitsQueue);
//.then(success);


sortedDataOfGot.then(makePortraitsQueue);
sortedDataOfGot.then(clickHandler);

sortedDataOfGot.then(SerachInputHandler);





/* 
const getObj = () => fetch("./json/got.json")
    .then(response => {
        console.log(response);
        return response.json()
    })
        
    .then(json => {
        console.log(json)
        return json;
    })
    .catch(error => console.log(error));

 */