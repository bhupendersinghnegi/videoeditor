import {
    elements, shadesID, fetchElement, updateFetchElement,
    styleFontFamliy, styleFontWeight, styleFontSize, onPage
} from "./main.js";
import {
    addHistory,
    fontCutActive, fontItalicActive, fontUppercaseActive
} from "./MovmentHistory.js";
import { letterSpacing, inputLineHeight } from './UpdateFont.js'

const sectionContainer = document.querySelector('.section--container__mid');
const options = document.querySelector('.options');
const positionElement = document.querySelector('.position-element')
const updateElement = document.querySelector('.updateElement')
const topRadius = document.querySelector('#topradius')
const leftRadius = document.querySelector('#leftradius')
const rightRadius = document.querySelector('#rightradius')
const bottomRadius = document.querySelector('#bottomradius')
const boxWidth = document.querySelector('#boxwidth')
const boxHeight = document.querySelector('#boxheight')
const shapeBox = document.querySelector('.shapeBox .icon--box')
const layersElement = document.querySelector('.layers')
let selectedElement;

function updateOptions(element) {
    options.classList.add('active')
    options.querySelector('.fontStyle.active')?.classList.remove('active');
    options.querySelector(`.fontStyle[data-option="${element}"]`)?.classList.add('active');
}

function updateBorderRadius(borderElement) {
    boxWidth.value = borderElement.style.width.replace('px', '');
    boxHeight.value = borderElement.style.height.replace('px', '');
    if (borderElement.dataset.element === 'image') {
        borderElement = borderElement.querySelector('.control-image');
    }
    topRadius.value = borderElement.style.borderTopLeftRadius.replace('%', '') ? borderElement.style.borderTopLeftRadius.replace('%', '') : '0';
    leftRadius.value = borderElement.style.borderBottomRightRadius.replace('%', '') ? borderElement.style.borderBottomRightRadius.replace('%', '') : '0';
    rightRadius.value = borderElement.style.borderTopRightRadius.replace('%', '') ? borderElement.style.borderTopRightRadius.replace('%', '') : '0';
    bottomRadius.value = borderElement.style.borderBottomLeftRadius.replace('%', '') ? borderElement.style.borderBottomLeftRadius.replace('%', '') : '0';
}
// Open left side box 
options.addEventListener('click', function (Event) {
    if (Event.target.classList.contains('updateElement')) {
        selectedElement = document.querySelector('.control-box.active');

        document.querySelector('.icon--box.active')?.classList.remove('active');
        positionElement.classList.add('active')
        positionElement.dataset.element = selectedElement.dataset.element;
        positionElement.dataset.shape = selectedElement.dataset.shape ? selectedElement.dataset.shape : '';

        updateBorderRadius(fetchElement.selectShape)
    }
    if (Event.target.classList.contains('layers--box')) {
        document.querySelector('.icon--box.active')?.classList.remove('active');
        layersElement.classList.add('active')
    }
})

// Update element border radius 
let backBorderTop, backBorderBottom, backBorderLeft, backBorderRight;
function borderRadiusUpdate(Event) {

    if (selectedElement.dataset.element === 'image') {
        selectedElement = selectedElement.querySelector('.control-image');
    }
    backBorderTop = fetchElement.borderTopLeftRadius;
    backBorderBottom = fetchElement.borderBottomLeftRadius;
    backBorderLeft = fetchElement.borderBottomRightRadius;
    backBorderRight = fetchElement.borderTopRightRadius;

    if (Event.target.dataset.position === 'top') {
        selectedElement.style.borderTopLeftRadius = `${Event.target.value}%`;
        fetchElement.borderTopLeftRadius = Number(Event.target.value);
    }
    if (Event.target.dataset.position === 'right') {
        selectedElement.style.borderTopRightRadius = `${Event.target.value}%`;
        fetchElement.borderTopRightRadius = Number(Event.target.value);
    }
    if (Event.target.dataset.position === 'left') {
        selectedElement.style.borderBottomRightRadius = `${Event.target.value}%`;
        fetchElement.borderBottomRightRadius = Number(Event.target.value);
    }
    if (Event.target.dataset.position === 'bottom') {
        selectedElement.style.borderBottomLeftRadius = `${Event.target.value}%`;
        fetchElement.borderBottomLeftRadius = Number(Event.target.value);
    }
    addHistory({
        action: 'borderradius',
        backBorderTop, backBorderLeft, backBorderRight, backBorderBottom,
        forwordBorderTop: fetchElement.borderTopLeftRadius, forwordBorderLeft: fetchElement.borderBottomRightRadius, forwordBorderRight: fetchElement.borderTopRightRadius, forwordBorderBottom: fetchElement.borderBottomLeftRadius,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element, shape: fetchElement.shape,
    })
}
document.querySelector('.border-radius').addEventListener('input', function (Event) {
    if (Event.target.classList.contains('form-control')) {
        borderRadiusUpdate(Event);
    }
})
// Update the Element width and hight by input box value
function updateSize(Event) {
    let boxWidth = fetchElement.width;
    let boxHeight = fetchElement.height;
    if (Event.target.dataset.size === 'width') {
        selectedElement.style.width = `${Event.target.value}px`;
        fetchElement.width = Number(Event.target.value);
    }
    if (Event.target.dataset.size === 'height') {
        selectedElement.style.height = `${Event.target.value}px`;
        fetchElement.height = Number(Event.target.value);
    }
    addHistory({
        action: 'shapeResizeFunction',
        backTop: fetchElement.top, backLeft: fetchElement.left, backWidth: boxWidth, backHeight: boxHeight,
        forwordTop: fetchElement.top, forwordLeft: fetchElement.left, forwordWidth: fetchElement.width, forwordHeight: fetchElement.height,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element, shape: fetchElement.shape,
    })
}
document.querySelector('.set-size').addEventListener('change', function (Event) {
    updateSize(Event);
})


// Select the element and canvas to open there options(Top side option)
sectionContainer.addEventListener("click", function (Event) {
    if (fetchElement?.layerloaked) return
    if (Event.target.classList.contains('control-layer')) {
        options.classList.add('active')
        updateOptions(Event.target.closest('.control-box').dataset.element)
        selectedElement = document.querySelector('.control-box.active');
        updateFetchElement(elements['page' + onPage]['element' + (selectedElement?.dataset.shadesid)])
        // updateBorderRadius(fetchElement.selectShape)

        let boxFill = fetchElement.selectShape ? fetchElement.selectShape : selectedElement;
        if (fetchElement.element === "text") {
            document.querySelector('.options .active .fillBox').style.backgroundColor = boxFill.querySelector('.control-text').style.color;
            document.querySelector('.options .active .changecolorinput').style.backgroundColor = boxFill.querySelector('.control-text').style.color;

            styleFontFamliy.value = fetchElement.font;
            styleFontWeight.value = fetchElement.weight;
            styleFontSize.value = fetchElement.size;

            letterSpacing.value = fetchElement.letterSpacing ? fetchElement.letterSpacing : 0;
            inputLineHeight.value = fetchElement.lineHeight;
            fetchElement.textDecoration === 'none' ? fontCutActive.classList.remove('active') : fontCutActive.classList.add('active');
            fetchElement.fontStyle === 'unset' ? fontItalicActive.classList.remove('active') : fontItalicActive.classList.add('active');
            fetchElement.textTransform === 'unset' ? fontUppercaseActive.classList.remove('active') : fontUppercaseActive.classList.add('active');

        } else {
            document.querySelector('.options .active .fillBox') ? document.querySelector('.options .active .fillBox').style.backgroundColor = boxFill.style.backgroundColor : '';
            document.querySelector('.options .active .changecolorinput') ? document.querySelector('.options .active .changecolorinput').style.backgroundColor = boxFill.style.backgroundColor : "";
        }

    } else {
        options.classList.remove('active')
        positionElement.classList.remove('active')
        // shapeBox.classList.add('active')
    }
    if (Event.target.classList.contains('section--container__content')) {
        sectionContainer.querySelector('.section__active') ? sectionContainer.querySelector('.section__active').classList.remove('section__active') : '';
        Event.target.classList.add('section__active');
        updateOptions('canvaback');
    } else {
        Event.target.closest('.section--container__content')?.classList.remove('section__active');
    }
})

export {
    updateOptions, options,
    topRadius, leftRadius, rightRadius, bottomRadius, boxWidth, boxHeight,
    sectionContainer,
}