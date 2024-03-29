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
        // LED.innerHTML = `${i} | ${findIndex(i)}`; // debug line
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
    sendData();
}

async function sendData(){
    const response  = await fetch("http://sandbox:3000/matrix", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'LEDMatrix': matrixData })
    });
    return response.json;
}

window.addEventListener("load", () => setupBoard());