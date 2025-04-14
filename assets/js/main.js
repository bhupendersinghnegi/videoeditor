import { addElementCanvas } from "./Shaps.js";
import { getImages, iconsLoad } from "./Api.js";
import { addColor } from "./ChangeColor.js";
import { ResizeElement } from "./ResizeElement.js";
import { keyPressed } from "./KeyPress.js";
import { addHistory } from "./MovmentHistory.js";
import { fontAlign, fontFamily, fontSize, fontWeight, textColor } from "./UpdateFont.js";
import { elementUpdate } from "./MoveElement.js";
import { createElementByJson } from "./CreateElementByJson.js";
import { addTemplate } from "./Template.js";
import { layerBoxContainer } from "./Layers.js";

let onPage = 1, totalPage = 1;
let elements = {};
const movementHistory = [];
// const movementHistory = {};

let shadesID = 0;
let activeBox;
let fetchElement; // This contains the active element json all the time 


let textBackgoundValue;
let bgBackgoundValue;
let backBackgoundValue;
const sectionContainer = document.querySelector(`.section--container__mid`);
let canvas = document.querySelector(`.canvas--sheet-${onPage}`);
let canvasContent = document.querySelector(`.canvas--sheet-${onPage} .section--container__content`);
const textOption = document.querySelector('.text-option');
const colorinput = document.querySelector('#colorinput');
const styleFontSize = document.querySelector('.fontStyle-size');
const styleFontFamliy = document.querySelector('.fontStyle-famliy');
const styleFontWeight = document.querySelector('.fontStyle-weight');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const offsetFromLeft = document.querySelector('.section--container__canvas').offsetLeft + canvasContent.offsetLeft;
const offsetFromTop = document.querySelector('.section--container__canvas').offsetTop + canvasContent.offsetTop;

const templateContainer = document.querySelector('.template-container .template-info');



document.querySelector('.section--info__number>span').textContent = onPage;
// create functions 
let addedElement;
function addShape(shapeColor, element, url, textValue, fontFamily, shape) {

    // This is used to set zIndex of the element
    let indexValue = shadesID === 1 ? 10 : (shadesID - 1) * 2 + 10;

    if (element === 'shape') {
        if (shape === 'round') {
            addedElement = { selectShape: '', display: true, slelectLayer: '', layerloaked: false, shadesID, layername: `<div class="layers--name__edit" contenteditable="true" bis_skin_checked="1">Layer ${shadesID}</div>`, element: 'shape', index: `${indexValue}`, shape: 'round', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: 100, height: 100, top: 200, left: 200, borderr: 100, rotate: 0, translate: '0 0', bg: shapeColor };
        }
        if (shape === 'line') {
            addedElement = { selectShape: '', display: true, slelectLayer: '', layerloaked: false, shadesID, layername: `<div class="layers--name__edit" contenteditable="true" bis_skin_checked="1">Layer ${shadesID}</div>`, element: 'shape', index: `${indexValue}`, shape: 'react', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: 300, height: 20, top: 250, left: 100, rotate: 0, translate: '0 0', bg: shapeColor };
        }
        if (shape === 'react') {
            addedElement = { selectShape: '', display: true, slelectLayer: '', layerloaked: false, shadesID, layername: `<div class="layers--name__edit" contenteditable="true" bis_skin_checked="1">Layer ${shadesID}</div>`, element: 'shape', index: `${indexValue}`, shape: 'react', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: 100, height: 100, top: 200, left: 200, rotate: 0, translate: '0 0', bg: shapeColor };
        }
    }
    if (element === 'image') {
        addedElement = { selectShape: '', display: true, slelectLayer: '', layerloaked: false, shadesID, layername: `<div class="layers--name__edit" contenteditable="true" bis_skin_checked="1">Layer ${shadesID}</div>`, element: 'image', url, index: `${indexValue}`, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: 100, height: 100, top: 100, left: 100, translate: '0 0' };
    }
    if (element === 'text') {
        addedElement = {
            selectShape: '', display: true, slelectLayer: '', layerloaked: false, shadesID, layername: `<div class="layers--name__edit" contenteditable="true" bis_skin_checked="1">Layer ${shadesID}</div>`, element: 'text', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, textDecoration: 'none', fontStyle: 'unset', textTransform: 'unset', lineHeight: 1.4, letterSpace: 0, textalign: 'center',
            value: ` <div class="textBox" contenteditable="true">${textValue}</div>`, color: '#000', size: 16, font: fontFamily, weight: 400, index: `${indexValue}`, width: 180, height: 40, top: 250, left: 190, translate: '0 0'
        };
    }
    elements = {
        ...elements,
        ['page' + onPage]: {
            ...elements['page' + onPage],
            ['element' + shadesID]: { ...addedElement },
            elementinpage: shadesID
        }
    }
    addElementCanvas(canvasContent, shadesID, addedElement);

    elements['page' + onPage]['element' + (shadesID - 1)].selectShape = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${addedElement.shadesID}"]`);
    elements['page' + onPage]['element' + (shadesID - 1)].slelectLayer = document.querySelector(`.layers--element[data-layer="${addedElement.shadesID}"]`);
    addedElement.selectShape = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${addedElement.shadesID}"]`);



    addHistory({ ...addedElement, action: 'create', backState: 'create', forwordState: 'delete' });
    // debugger
    fetchElement = elements['page' + onPage]['element' + (shadesID - 1)];
    // console.log(elements['page' + onPage]['element' + (shadesID - 1)]);
    // console.log(onPage, shadesID, elements);
}

// Update Elements lest after deleting
function updateElements(update) {
    elements = update;
}
// shadesID update
function shadesidUpdate() {
    shadesID++;
}
// To add canvas as Element in element object
function loadBack() {
    elements = {
        ...elements,
        ['page' + onPage]: {
            background: { shadesID, element: 'backCanvas', bg: '' },
            elementinpage: 1
        }
    }
    shadesID++;
}
loadBack();
// After deleting a element minus share id
function deleteElement(selectElement, indexElement, deleteButton, pageNumber) {
    if (fetchElement?.layerloaked) return
    const selectElementId = selectElement.dataset.shadesid;
    if (deleteButton) {
        const deleteLayer = fetchElement;
        deleteLayer.action = 'delete';
        deleteLayer.bg = selectElement?.style.backgroundColor;
        deleteLayer.backState = selectElement?.style.backgroundColor;
        deleteLayer.top = Number(selectElement?.style.top.replace('px', ''));
        deleteLayer.left = Number(selectElement?.style.left.replace('px', ''));
        deleteLayer.width = Number(selectElement?.style.width.replace('px', ''));
        deleteLayer.height = Number(selectElement?.style.height.replace('px', ''));
        deleteLayer.index = Number(selectElement?.style.zIndex);
        addHistory(deleteLayer, true);
    }

    delete elements['page' + onPage]['element' + indexElement];
    document.querySelector(`.layers--group[data-layer="${onPage}"] .layers--element[data-layer="${selectElementId}"]`).remove();
    console.log(document.querySelector(`.layers--group[data-layer="${onPage}"] .layers--element[data-layer="${selectElementId}"]`));

    selectElement.remove();
    shadesID--;
}
// Update fetchElement content
function updateFetchElement(object) {
    fetchElement = object;
}
function updateMovementHistory(object) {
    debugger
    movementHistory = object;
}
// events
styleFontFamliy.addEventListener('change', function (El) {
    fontFamily(elements, shadesID, El.target.value)
})
textOption.addEventListener('click', function (El) {
    if (El.target.classList.contains('fontAdd')) {
        addShape('', 'text', '', 'Add New Text', El.target.dataset.family)
    }
})
styleFontWeight.addEventListener('change', function (El) {
    fontWeight(elements, shadesID, El.target.value)
})
styleFontSize.addEventListener('change', function (El) {
    fontSize(elements, shadesID, El.target.value)
})
document.querySelector('.fontStyle-align').addEventListener('click', function (Event) {
    if (Event.target.closest('.font-align')) {
        fontAlign(elements, shadesID, Event.target.closest('.font-align').dataset.textalign)
    }
})

// Delete a canvas
function deleteTotalPage(){
    totalPage--;
    onPage--;
}
// Add new template
function createCanvas(){
    onPage++; totalPage++;
    addTemplate(totalPage);
    layerBoxContainer();
    canvas = document.querySelector(`.canvas--sheet-${totalPage}`);
    canvasContent = document.querySelector(`.canvas--sheet-${totalPage} .section--container__content`);

    addHistory({
        action: 'bgCreateFunction',
        canvasContent: canvas,
        activePage: onPage
    });
    document.querySelector('.section--container').scrollTop = canvas.clientHeight * totalPage;
    moveTemplate(totalPage);
    shadesID = 0;
    loadBack();
}
document.querySelector('.template-addmore').addEventListener('click', createCanvas)

// To go to canvas page 
function moveTemplate(selectPage) {
    canvas = document.querySelector(`.canvas--sheet-${selectPage}`);
    canvasContent = document.querySelector(`.canvas--sheet-${selectPage} .section--container__content`);
    document.querySelector('.section--container__mid').scrollTop = canvas.clientHeight * [selectPage - 1];
    document.querySelector('.layers--group__pages .layer--active').classList.remove('layer--active');
    document.querySelector(`.layers--group__pages .layers--group[data-layer="${onPage}"]`).classList.add('layer--active');
}
sectionContainer.addEventListener('click', function (Event) {
    if (Event.target.closest('.section--container__content')) {
        const tempNumber = Event.target.closest('.section--container__canvas').dataset.canvas
        onPage = tempNumber;
        moveTemplate(tempNumber);
        document.querySelector('.template-view.active')?.classList.remove('active');
        document.querySelector(`.template-view[data-template="${tempNumber}"]`)?.classList.add('active');
    }
})
templateContainer.addEventListener('click', function (Event) {
    if (Event.target.closest('.template-view')) {
        const tempNumber = Event.target.closest('.template-view').dataset.template;
        onPage = tempNumber;
        shadesID = elements['page' + tempNumber].elementinpage;
        moveTemplate(tempNumber);
        document.querySelector('.template-view.active')?.classList.remove('active');
        Event.target.closest('.template-view').classList.add('active');
    }
})

// Show and hide templates
document.querySelector('.templates_on').addEventListener('click', function () {
    document.body.classList.toggle('temp--on');
})

// Side menu open all option and call add element on canvas
document.querySelector('.icons').addEventListener('click', function (El) {
    if (El.target.closest('.icon')) {

        document.querySelector('.icon__active')?.classList.remove('icon__active');
        document.querySelector('.icon--box.active')?.classList.remove('active');

        El.target.closest('.icon').classList.add('icon__active');
        El.target.closest('.icon').querySelector('.icon--box')?.classList.add('active');
    }

    if (El.target.closest('.laod_image')) {
        getImages()
    }
    if (El.target.closest('.laod_icons')) {
        iconsLoad('.social-icons')
    }
    if (El.target.closest('.saveImage')) {
        const getDesign = [
            { "shadesID": 0, "element": "backCanvas", "bg": "" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 1, "element": "shape", "index": "10", "shape": "react", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "width": 247, "height": 100, "top": 153, "left": 139, "rotate": 31.9209, "translate": "0 0", "bg": "#800" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 2, "element": "shape", "index": "12", "shape": "round", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "width": 100, "height": 100, "top": 195, "left": -1, "borderr": 100, "rotate": 0, "translate": "0 0", "bg": "#ddd" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 3, "element": "shape", "index": 14, "shape": "round", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "width": 100, "height": 100, "top": 197, "left": 102, "borderr": 100, "rotate": 0, "translate": "0 0", "bg": "#ddd" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 4, "element": "text", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "textDecoration": "none", "fontStyle": "unset", "textTransform": "unset", "lineHeight": 1.4, "letterSpace": 0, "textalign": "center", "value": " <div class=\"textBox\" contenteditable=\"true\">Add New Text</div>", "color": "#000", "size": 16, "font": "Bungee Inline", "weight": 400, "index": "16", "width": 180, "height": 30, "top": 250, "left": 190, "translate": "0 0" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 5, "element": "text", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "textDecoration": "none", "fontStyle": "unset", "textTransform": "unset", "lineHeight": 1.4, "letterSpace": 0, "textalign": "center", "value": " <div class=\"textBox\" contenteditable=\"true\">Bhupender </div>", "color": "#000", "size": 16, "font": "Bungee Inline", "weight": 400, "index": "18", "width": 180, "height": 30, "top": 328, "left": 44, "translate": "0 0" },
            { "selectShape": {}, "display": true, "slelectLayer": {}, "layerloaked": false, "shadesID": 6, "element": "image", "url": "assets/images/social/youtube.png", "index": "20", "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "width": 100, "height": 100, "top": 100, "left": 100, "translate": "0 0" }]

        // createElementByJson(JSON.stringify(getDesign), true)
        console.log(movementHistory, elements);
    }

    if (El.target.closest('.icon--color')) {
        El.target.closest('.icon--colors')?.querySelector('.active')?.classList.remove('active')
        El.target.classList.add('active')
        addShape(El.target.closest('.icon--color').dataset.color, 'shape', '', '', '', El.target.closest('.icon--color').dataset.shape)
    }
    if (El.target.classList.contains('icon--line')) {
        El.target.closest('.icon--lines')?.querySelector('.active')?.classList.remove('active')
        El.target.classList.add('active')
        strokeStyleSet = El.target.dataset.line;
    }
    if (El.target.classList.contains('iconsImage')) {
        El.target.closest('.social-icons')?.querySelector('.active')?.classList.remove('active')

        El.target.classList.add('active');
        addShape('', 'image', El.target.src)
    }
    if (El.target.classList.contains('shapeImage')) {
        El.target.closest('.icon--image')?.querySelector('.active')?.classList.remove('active')
        El.target.classList.add('active');
        addShape('', 'image', El.target.src)
    }


});

// Make color box UI
let inputID = 1;
function colorMaker(colorShadesOption, shades) {
    const colorShades = document.querySelector(colorShadesOption);
    const colorNumber = ['3', '5', '6', '7', '8', 'a', 'b', 'c', 'd', 'e', 'f']
    const color = [[1], [2], [3], [1, 2], [2, 3], [1, 3], [1, 2, 3]];
    let boxColor = 'ddd';
    if (colorShadesOption === '.fillLine') {
        boxColor = '000'
    }
    if (colorShadesOption === '.fillcanvas') {
        boxColor = 'fff'
    }
    let colorUpdate = 0;
    function colorAdded(item) {
        let r = '0', g = '0', b = '0';
        function getColor(setcolor, setNumber) {
            if (setcolor) {
                setcolor == 1 ? r = setNumber : '';
                setcolor == 2 ? g = setNumber : '';
                setcolor == 3 ? b = setNumber : '';
            }
        }
        colorNumber.map((_, i) => {
            getColor(color[colorUpdate][0], colorNumber[i])
            getColor(color[colorUpdate][1], colorNumber[i])
            getColor(color[colorUpdate][2], colorNumber[i])
            item.insertAdjacentHTML('beforeend', `<div style="background-color:#${r + g + b}" data-getoption="#${r + g + b}"></div>`)
            if (colorNumber.length - 1 === i) {
                colorUpdate++
            }
        })
    }
    color.map((_, i) => {
        colorShades.insertAdjacentHTML('beforeend', `<div class="shades" data-item="${color[i]}"></div>`)
    })
    Array.from(document.querySelectorAll(shades)).map((item) => {
        colorAdded(item);
    })
    colorShades.insertAdjacentHTML('afterbegin', `<div class="colorInput d-flex">
    <label for="colorinput${inputID}"  class="form-label mb-0">Color</label>
    <div class="colorInput-color"><span>#</span>
    <input type="text" max="6" class="form-control changecolorinput" value="${boxColor}" id="colorinput${inputID}">
    <div>
    </div>`)

    inputID++;
}
colorMaker('.fillLine', '.fillLine .shades')
colorMaker('.fillShades', '.fillShades .shades')
colorMaker('.fillcanvas', '.fillcanvas .shades')
// Add color to box and elements
function colorChange(buttonOption, sectionBox, button) {
    let activeBox = document.querySelector('.control-box.active');
    let backBG = fetchElement?.bg;
    if (buttonOption) {
        if (document.querySelector('.section--container__content.section__active')) {
            const backBackground = canvasContent;
            document.querySelector(button).style.backgroundColor = buttonOption;
            sectionBox.querySelector('.changecolorinput').value = buttonOption.replace('#', '');
            elements['page' + onPage].background = buttonOption;
            if (backBackground.style.backgroundColor !== buttonOption) {
                addHistory({
                    action: 'backgroundFunction',
                    backState: backBackground.style.backgroundColor ? backBackground.style.backgroundColor : '#fff', forwordState: buttonOption,
                    selectShape: backBackground,
                })
            }
            backBackground.style.backgroundColor = buttonOption;
            return "Set Background"
        }
        if (activeBox.dataset.element === 'text') {
            sectionBox.querySelector('.changecolorinput').value = buttonOption.replace('#', '');
            document.querySelector(button).style.backgroundColor = buttonOption;
            textColor(elements, shadesID, buttonOption)
        }
        if (activeBox.dataset.element === 'shape') {
            sectionBox.querySelector('.changecolorinput').value = buttonOption.replace('#', '');
            if (buttonOption !== backBG) {
                addColor(buttonOption, fetchElement);
                addHistory({
                    element: fetchElement.element, shape: fetchElement.shape,
                    action: 'shapeBgFunction', backState: backBG, forwordState: fetchElement.bg, selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID
                })
                document.querySelector(button).style.backgroundColor = buttonOption;
            }
        }
    }
}
// On click chagne color or background color to a element
function updateColor(button, colorBox, colorInput) {
    let sectionColorBox = document.querySelector(colorBox);

    sectionColorBox.addEventListener('click', function (El) {
        const buttonOption = El.target.dataset.getoption;
        colorChange(buttonOption, sectionColorBox, button)
    })
    document.querySelector(button).addEventListener('click', function () {
        document.querySelector(colorBox).classList.toggle('d-none')
    })
    document.querySelector(colorInput).addEventListener('change', function (Event) {
        const buttonOption = Event.target.value;
        colorChange(buttonOption, sectionColorBox, button)
    })
}
updateColor('.colorBox--text', '.fillLine', '.fillLine .changecolorinput');
updateColor('.colorBox--canvas', '.fillcanvas', '.fillcanvas .changecolorinput');
updateColor('.colorBox', '.fillShades', '.fillShades .changecolorinput');

// Add shapes into shapes icon option
function renderShaps() {
    const line = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 386 386" width="386" height="386"><path fill="#ddd"  d="m385.1 181.9v21.3h-385.1v-21.3z"/></svg>`;
    const shapes = [
        { name: 'react', bg: '#ddd', givebg: '#ddd', borderr: 0 },
        { name: 'round', bg: '#ddd', givebg: '#ddd', borderr: 100 },
        { name: 'line', image: line, givebg: '#ddd', borderr: 0, }
    ]
    shapes.map(element => {
        document.querySelector('.icon--colors').insertAdjacentHTML('beforeend',
            `<div class="icon--color" style="border-radius:${element.borderr}%;background-color:${element.bg};" data-shape="${element.name}" data-color="${element.givebg}">
        ${element.image ? element.image : ''}
        </div>`)
    })

}
renderShaps()


// Scale the canvas
function zoomCanvas(targetValue) {
    const width = canvasWidth * targetValue;
    const height = canvasHeight * targetValue;
    document.querySelector('.zoomLable span').textContent = Math.round(targetValue * 100)
    if (targetValue === '1') {
        canvas.style.removeProperty('width')
        canvas.style.removeProperty('height')
        canvas.style.removeProperty('transform')
        return canvas.style.removeProperty('scale')
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.scale = targetValue;
    canvas.style.transform = `translate(${width / 2}px , ${height / 2}px)`;
    canvasContent.scrollIntoView({
        block: 'center',
        inline: 'center'
    })
}
document.querySelector('.rangeSlider').addEventListener('input', (Event) => zoomCanvas(Event.target.value))
document.querySelector('.zoomLable .position-absolute').addEventListener('click', function (Event) {
    if (!Event.target.dataset.value) return
    document.querySelector('.rangeSlider').value = Event.target.dataset.value
    zoomCanvas(Event.target.dataset.value);
})


// Start Resize funtion
ResizeElement()

// Start key press event
document.addEventListener("keydown", (Event) => keyPressed(Event))

// Function load after page laoded
function init() {
    textBackgoundValue = document.querySelector('#colorinput1');
    bgBackgoundValue = document.querySelector('#colorinput2');
    backBackgoundValue = document.querySelector('#colorinput3');
    elementUpdate();
    layerBoxContainer();
}
document.addEventListener('DOMContentLoaded', init);

window.ondragstart = function () { return false; }

export {
    templateContainer, // Var
    offsetFromLeft, offsetFromTop,
    textBackgoundValue, bgBackgoundValue, backBackgoundValue,
    styleFontFamliy, styleFontWeight, styleFontSize,
    elements, updateMovementHistory, fetchElement, updateFetchElement, addShape, canvasContent, shadesidUpdate, shadesID, movementHistory, deleteElement, updateElements, sectionContainer,
    onPage, deleteTotalPage, createCanvas
}
