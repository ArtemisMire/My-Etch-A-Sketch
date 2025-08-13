const inner = document.querySelector('#inner');
const girdSize = document.querySelector('#gridSize');
const currentSize = document.querySelector('#currentSize');
inner.classList.toggle('inner');
const div = document.createElement('div');
let cubeSize = (600 / 16);
div.style.width = (cubeSize + "px");
div.style.height = (cubeSize + "px");
for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
        div.classList.add('cell');
        inner.appendChild(div.cloneNode(true));
    };
};

girdSize.addEventListener('click', (e) => {
    let size = girdSize.value;
    let cubeSize = (600 / size);
    div.style.width = (cubeSize + "px");
    div.style.height = (cubeSize + "px");
    inner.innerHTML = '';
    for (i=0; i<size; i++) {
        for(j=0; j<size; j++) {
            div.classList.add('cell');
            inner.appendChild(div.cloneNode(true));
        };
    };
    currentSize.textContent = `${size} x  ${size}`;
    cells = document.querySelectorAll('.cell');
    coloredCells = [];
    changeCellColor(cells);
});


let cells = document.querySelectorAll('.cell');
const tools = document.querySelector('#tools');

let currentTool = '';
var currentColor = 'black';

function getCurrentTool(tools) {
    tools.addEventListener('click', event => {        
        let target = event.target;
        switch (target.id) {
            case 'clearGrid':                
                coloredCells.forEach(cell => cell.style.background = 'white');
                break
            case 'eraser':
                currentTool = 'eraser';
                break;
            case 'rgb':
                currentTool = 'rgb';    
                break;
            case 'pallete' :
                currentTool = 'pallete';
                break;
            };
    });         
}

function getCurrentColor(currentTool) {
    if (currentTool == 'eraser') currentColor = 'white';
    else if (currentTool == 'pallete') {
        currentColor = document.querySelector('#pallete').value;
    }
    return currentColor;
}
function getRandomColor() {
    let r = (Math.round(Math.random() * 255));
    let g = (Math.round(Math.random() * 255));
    let b = (Math.round(Math.random() * 255));
    return (`${r}, ${g}, ${b}`);
}

let coloredCells = [];
function changeCellColor(cells) {
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            getCurrentTool(tools);
            if (currentTool != 'rgb') getCurrentColor(currentTool);
            else if (currentTool == 'rgb') currentColor = `rgb(${getRandomColor()})`;
            cell.style.background = currentColor;
            if (!coloredCells.includes(cell)) coloredCells.push(cell);
        });
    });
}
changeCellColor(cells);
