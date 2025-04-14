import { elements, fetchElement } from "./main.js";
import { addHistory } from "./MovmentHistory.js";

let selected = false;
let getElement;
let textSelected;
const letterSpacing = document.querySelector('#letterspacing')
const inputLineHeight = document.querySelector('#lineheight');
function checkFont() {
    getElement = document.querySelector('.control-box.active')
    if (getElement) {
        textSelected = getElement.querySelector('.control-text');
        return textSelected;
    }
    return false;
}
function fontFamily(getElements, shadesID, fontFamily) {
    let checkedElement = checkFont();
    let lastFontUpdate = fetchElement.font;
    if (!checkedElement) return
    checkedElement.style.fontFamily = `${fontFamily ? fontFamily : checkedElement.style.fontFamily}`
    fetchElement.font = fontFamily;
    if (lastFontUpdate === fetchElement.font) return

    addHistory({
        action: 'fontFamliyFunction',
        backfontstyle: lastFontUpdate, forwordfontstyle: fetchElement.font,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}
function fontWeight(getElements, shadesID, fontWeight) {
    let checkedElement = checkFont();
    let lastFontUpdate = fetchElement.weight;

    if (!checkedElement) return
    checkedElement.style.fontWeight = `${fontWeight ? fontWeight : checkedElement.style.fontWeight}`
    fetchElement.weight = Number(fontWeight);

    if (lastFontUpdate === fetchElement.weight) return

    addHistory({
        action: 'fontWeightFunction',
        backfontstyle: lastFontUpdate, forwordfontstyle: fetchElement.weight,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}
function textColor(getElements, shadesID, fontColor) {
    let checkedElement = checkFont();
    let lastFontUpdate = fetchElement.color;
    if (!checkedElement) return
    checkedElement.style.color = `${fontColor ? fontColor : checkedElement.style.color}`
    fetchElement.color = fontColor;
    if (lastFontUpdate === fetchElement.color) return
    addHistory({
        action: 'fontColorFunction',
        backfontstyle: lastFontUpdate, forwordfontstyle: fetchElement.color,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}
function fontSize(getElements, shadesID, fontSize) {
    let checkedElement = checkFont();
    let lastFontUpdate = fetchElement.size;
    if (!checkedElement) return
    checkedElement.style.fontSize = `${fontSize ? `${fontSize}px` : `${checkedElement.style.fontSize}px`}`
    fetchElement.size = Number(fontSize);

    if (lastFontUpdate === fetchElement.size) return
    addHistory({
        action: 'fontSizeFunction',
        backfontstyle: lastFontUpdate, forwordfontstyle: fetchElement.size,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}
function fontAlign(getElements, shadesID, Align) {
    let checkedElement = checkFont();
    let lastFontUpdate = fetchElement.textalign;

    if (!checkedElement) return
    checkedElement.style.textAlign = `${Align ? Align : checkedElement.style.textAlign}`
    fetchElement.textalign = Align;

    if (lastFontUpdate === fetchElement.textalign) return
    addHistory({
        action: 'fontalign',
        backfontstyle: lastFontUpdate, forwordfontstyle: fetchElement.textalign,
        selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}


// fontCut fontItalic fontuppercase
function updateFont(clickEvent, doProperty) {
    const clickTarget = document.querySelector(clickEvent);
    clickTarget.addEventListener('click', function (Event) {
        getElement = document.querySelector('.control-box.active')

        let checkedElement = checkFont();
        const selectedElement = elements[getElement.dataset.shadesid];
        if (!checkedElement) return
        if (doProperty === 'italic') {
            let lastFontUpdate = selectedElement.fontStyle;
            checkedElement.style.fontStyle = `${checkedElement.style.fontStyle === 'italic' ? 'unset' : 'italic'}`
            selectedElement.fontStyle = checkedElement.style.fontStyle;
            fetchElement.fontStyle = selectedElement.fontStyle;
            if (lastFontUpdate === selectedElement.fontStyle) return
            addHistory({
                action: 'italic',
                backfontstyle: lastFontUpdate, forwordfontstyle: selectedElement.fontStyle,
                selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }
        if (doProperty === 'fontCut') {
            let lastFontUpdate = selectedElement.textDecoration;
            checkedElement.style.textDecoration = `${checkedElement.style.textDecoration === 'line-through' ? 'none' : 'line-through'}`
            selectedElement.textDecoration = checkedElement.style.textDecoration;
            fetchElement.textDecoration = selectedElement.textDecoration;
            if (lastFontUpdate === selectedElement.textDecoration) return

            addHistory({
                action: 'fontCut',
                backfontstyle: lastFontUpdate, forwordfontstyle: selectedElement.textDecoration,
                selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }
        if (doProperty === 'uppercase') {
            let lastFontUpdate = selectedElement.textTransform;
            checkedElement.style.textTransform = `${checkedElement.style.textTransform === 'uppercase' ? 'unset' : 'uppercase'}`
            selectedElement.textTransform = checkedElement.style.textTransform;
            fetchElement.textTransform = selectedElement.textTransform;
            if (lastFontUpdate === selectedElement.textTransform) return
            addHistory({
                action: 'uppercase',
                backfontstyle: lastFontUpdate, forwordfontstyle: selectedElement.textTransform,
                selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }
        if (Event.target.closest('.update-text')) {
            const classContains = Event.target.closest('.update-text').classList;
            classContains.contains('active') ? classContains.remove('active') : classContains.add('active')
        }
    })
}
updateFont('.fontItalic', 'italic')
updateFont('.fontCut', 'fontCut')
updateFont('.fontUppercase', 'uppercase')


document.querySelector('.fontSpacing').addEventListener('click', function (Event) {
    let checkedElement = checkFont();
    if (!checkedElement) return
    if (Event.target.closest('.fontSpacing--icon')) {
        const classContains = document.querySelector('.fontSpacing').classList;
        classContains.contains('active') ? classContains.remove('active') : classContains.add('active')

        letterSpacing.value = checkedElement.style.letterSpacing.replace('px', '');
        inputLineHeight.value = checkedElement.style.lineHeight;
    }
})

function textStyleChange(changeEvent, changeContdition) {
    changeEvent.addEventListener('change', function (Event) {
        getElement = document.querySelector('.control-box.active')
        const selectedElement = elements[getElement.dataset.shadesid];


        if (changeContdition === 'letter') {
            let lastFontUpdate = selectedElement.letterSpacing;
            textSelected.style.letterSpacing = `${Event.target.value}px`;
            selectedElement.letterSpacing = Number(Event.target.value)
            if (lastFontUpdate === selectedElement.letterSpacing) return
            addHistory({
                action: 'letter',
                backfontstyle: lastFontUpdate, forwordfontstyle: selectedElement.letterSpacing,
                selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }
        if (changeContdition === 'line') {
            let lastFontUpdate = selectedElement.lineHeight;

            textSelected.style.lineHeight = Event.target.value;
            selectedElement.lineHeight = Number(Event.target.value);
            if (lastFontUpdate === selectedElement.lineHeight) return
            addHistory({
                action: 'line',
                backfontstyle: lastFontUpdate, forwordfontstyle: selectedElement.lineHeight,
                selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }
    })
}
textStyleChange(letterSpacing, 'letter');
textStyleChange(inputLineHeight, 'line');

// update text element
let lastTextContent;
function textOnChange(changeElement, action, actionText) {
    // function 
    let updateText;
    changeElement.addEventListener('keyup', function (Event) {
        clearTimeout(updateText)
        updateText = setTimeout(() => {
            if (!Event.target.closest(actionText) || !fetchElement) return
            fetchElement?.value ? fetchElement.value = Event.target?.closest(actionText).innerHTML : '';
            fetchElement?.layername ? fetchElement.layername = Event.target?.closest(actionText).innerHTML : '';
            addHistory({
                action,
                backstate: lastTextContent, forwordstate: action === '.control-text' ? fetchElement?.value : fetchElement?.layername,
                selectShape: fetchElement.selectShape, slelectLayer: fetchElement.slelectLayer, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
            lastTextContent = Event.target.closest(actionText).innerHTML
            return
        }, 1000);
    })
}
// Funcation is used to set first text of layer
function startTextUpdate(Text) {
    lastTextContent = Text;
}
// DB Click on text layer so we can edit
document.querySelector('.section--container__mid').addEventListener('dblclick', function (Event) {
    if (fetchElement?.layerloaked) return
    if (Event.target.closest('.control-box')?.dataset.element === 'text') {
        Event.target.closest('.control-box').querySelector('.control-text .textBox').classList.add('editOpen');
        Event.target.closest('.control-box').querySelector('.control-text .textBox').focus();
        startTextUpdate(Event.target.closest('.control-box').querySelector('.control-text').innerHTML);
        textOnChange(Event.target.closest('.control-box').querySelector('.textBox'), 'textContentFunction', '.control-text')
    }
})


function loadFontFamily(TextClick, select) {
    const allFont = ['Acme', 'Archivo Narrow', 'Barlow', 'Bree Serif', 'Bungee Inline', 'Catamaran', 'Crete Round', 'Courgette', 'Dancing Script', 'Exo 2', 'Graduate', 'Inconsolata', 'Indie Flower', 'Kanit', 'Kreon', 'Lato', 'Libre Franklin', 'Lobster', 'Martel', 'Merienda', 'Overpass', 'PT Sans Narrow', 'Playball', 'Patrick Hand', 'Roboto', 'Sacramento', 'Source Sans Pro', 'Bebas Neue', 'Sriracha', 'Unna', 'Anton', 'Inter', 'Poppins', 'Michroma', 'Open Sans', 'Montserrat', 'Mulish', 'Epilogue', 'Fira Sans']

    if (select === 'select') {
        document.querySelector(TextClick).insertAdjacentHTML('afterbegin',
            allFont.map(fonts => `<option value="${fonts}">${fonts}</option>`).join(''))

    } else {
        document.querySelector(TextClick).insertAdjacentHTML('afterbegin',
            allFont.map(fonts => `<div class="fontAdd" data-family="${fonts}" style="font-family:${fonts};">${fonts}</div>`).join(''))
    }
}

loadFontFamily('.text-option');
loadFontFamily('.fontStyle-famliy', 'select');
export {
    fontSize, fontWeight, textColor, fontFamily, fontAlign,
    letterSpacing, inputLineHeight, textOnChange, startTextUpdate
}