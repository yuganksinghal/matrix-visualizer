var colorPicker;
var paintbrush = '#888';
const rows = 8;
const columns = 32;
var matrixData = new Array(rows*columns);
const total = rows * columns;

function setupBoard() {
    colorPicker = document.querySelector('#colorPicker');
    const LEDMatrix = document.querySelector('#LEDMatrix');
    for (let i = 0; i < rows * columns; i++) {
        let LED = document.createElement('div');
        LED.classList.add("led");
        LED.innerHTML = `<div hidden>${i} | ${findIndex(i)}</div>`;
        LED.dataset.matrixIndex = findIndex(i);
        LED.addEventListener('mousedown', (event) => paintPixel(event));
        LEDMatrix.appendChild(LED);
    }
    matrixData.fill("off");
}

function onColorChange() {
    paintbrush = colorPicker.value;
}

function findIndex(i) {
    let matrixColumn = Math.floor(i / rows);
    let reverseColumn = (matrixColumn % 2 == 1);
    let index = reverseColumn ? ((matrixColumn + 1) * rows - (i % rows + 1) ) : i;
    return index;
}

function paintPixel(e) {
    const eraseState = document.querySelector('#eraser').checked;
    const pixel = e.target;
    pixel.style.backgroundColor = eraseState ? '' : paintbrush;
    matrixData[pixel.dataset.matrixIndex] = eraseState ? 'off' : paintbrush;
}

window.addEventListener("load", () => setupBoard());