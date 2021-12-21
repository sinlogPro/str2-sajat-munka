import {
    stateOfHungary,
    stateOfUSA
} from './states.js';

const country = ['Magyarország', 'USA'];
const arrOfStates = [stateOfHungary, stateOfUSA];


function fillOptions(nameOfSelect = {}, options = []) {
    options.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        nameOfSelect.appendChild(option);
    });
};

const dellAllOptions = (nameOfSelect = {}) => {
    nameOfSelect.textContent = '';
    const option = document.createElement('option');
    option.textContent = 'Choose...';
    nameOfSelect.appendChild(option);
};

// Országnevek kitöltése
const countrySelect = document.querySelector('#country');
fillOptions(countrySelect, country);


// Megye- ill. államnevek kitöltése
const fillSateOptions = (selectedCountry = '') => {
    const stateSelect = document.querySelector('#state');
    const selectedStateIndex = country.indexOf(selectedCountry);
    dellAllOptions(stateSelect);
    fillOptions(stateSelect, arrOfStates[selectedStateIndex]);
};


countrySelect.addEventListener('change', (ev) => {
    //console.log(ev.target.value);
    fillSateOptions(ev.target.value);
})
