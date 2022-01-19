'use strict';

const clockStage = document.querySelector('.clock');

setInterval(() => {
    const data = new Date(Date.now()).toLocaleTimeString([], 
        {hour12: false, hour: '2-digit',  minute: '2-digit', second: '2-digit'});
    clockStage.textContent = data;    
}, 200);