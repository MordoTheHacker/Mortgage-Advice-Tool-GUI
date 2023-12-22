// Control progress bar
const progressBar = document.getElementsByClassName('progressive_bar')[0];
var compound = 1;
const id = setInterval(() => {
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
    if(compound > 70){
        clearInterval(id);
    }
    progressBar.style.setProperty('--width', compound);
    compound += width;
}, 100);



