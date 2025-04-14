import {
    movementHistory, canvasContent, elements,
    textBackgoundValue, bgBackgoundValue, backBackgoundValue, deleteElement, fetchElement,
    styleFontFamliy, styleFontWeight, styleFontSize, updateElements, onPage, shadesID, updateMovementHistory,
} from '../main.js'
import { addColor } from '../ChangeColor.js'
import { addElementCanvas } from '../Shaps.js'
import { letterSpacing, inputLineHeight } from '../UpdateFont.js'
// Elements for change
import { topRadius, leftRadius, rightRadius, bottomRadius, boxWidth, boxHeight, options } from '../ActiveBox.js'

// Elements
const bgBackgound = document.querySelector('.colorBox');
const backBackgound = document.querySelector('.colorBox--canvas');
const textBackgound = document.querySelector('.colorBox--text');
const fontCutActive = document.querySelector('.fontCut');
const fontItalicActive = document.querySelector('.fontItalic');
const fontUppercaseActive = document.querySelector('.fontUppercase');

// Add history to movementHistory Array
let historyMovIndex = 0;
function addHistory(object, getDelete) {
    if (historyMovIndex < movementHistory.length && getDelete) {
        movementHistory.length = historyMovIndex;
        historyMovIndex = movementHistory.length;
    }
    if (movementHistory[historyMovIndex - 1]?.backState === 'create' && historyMovIndex === 0) return
    // movementHistory.push({ ...object })
    updateMovementHistory({
        ...movementHistory,
        ['page' + onPage]: {
            ...movementHistory['page' + onPage],
            ['element' + object.shadesID]: { ...object },
        }
    });
    console.log(object, movementHistory);
    historyMovIndex++;
}
// Ctrl + Z 
function backHistory() {
    if (historyMovIndex === 0) return
    debugger 
    
    const elementKeys = Object.keys(movementHistory['page' + onPage]).length - 1; 
    let selectedobject = movementHistory['page' + onPage]['element' + (elementKeys + 1)];

    let elementThere = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectedobject.shadesID}"]`);
    selectedobject.selectShape = elementThere;
    let fontSelect = elementThere?.querySelector('.control-text');

    if (selectedobject.action === 'layerloak') {
        const layerSelect = document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`)
        const findElemnt = elements.findIndex(item => item.shadesID === selectedobject.shadesID);
        if (selectedobject.loakStatus) {
            layerSelect.classList.remove('layer-locked');
            selectedobject.selectShape.classList.remove('layer-locked');
            elements[findElemnt].layerloaked = false;
            options.classList.remove('active');
        } else {
            layerSelect.classList.add('layer-locked');
            selectedobject.selectShape.classList.add('layer-locked');
            elements[findElemnt].layerloaked = true;
            options.classList.add('active');
        }
        historyMovIndex--;
        return 'layerloak'
    }
    if (selectedobject.action === 'shiftzindex') {
        selectedobject.selectShape.style.zIndex = selectedobject.backstate;
        selectedobject.slelectLayer.style.order = -selectedobject.backstate;
        historyMovIndex--;
        return 'zindex'
    }
    if (selectedobject.action === 'zindex') {
        elementThere.style.zIndex = selectedobject.backstate;
        selectedobject.updateLayer.selectShape.style.zIndex = selectedobject.backlayer;

        selectedobject.slelectLayer.style.order = -selectedobject.backstate;
        selectedobject.updateLayer.slelectLayer.style.order = -selectedobject.backlayer;
        historyMovIndex--;
        return 'zindex'
    }
    if (selectedobject.action === 'hideLayer') {
        const layerSelect = document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`)
        if (selectedobject.backstate) {
            selectedobject.selectShape.classList.remove('d-none');
            layerSelect.querySelector('.layer-view').src = 'assets/images/show-layer.png';
            layerSelect.classList.remove('hideElement');
            options.classList.add('active');
            selectedobject.display = false;

        } else {
            selectedobject.selectShape.classList.add('d-none');
            layerSelect.querySelector('.layer-view').src = 'assets/images/hide-layer.png';
            layerSelect.classList.add('hideElement');
            options.classList.remove('active');
            selectedobject.display = true;
        }
        historyMovIndex--;
        return 'hideLayer'
    }
    if (selectedobject.action === 'fontfamliy') {
        fontSelect.style.fontFamily = selectedobject.backfontstyle;
        styleFontFamliy.value = selectedobject.backfontstyle;
        historyMovIndex--;
        return 'fontfamliy'
    }
    if (selectedobject.action === 'layerName') {
        document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name__edit').remove();
        document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name-space').innerHTML = selectedobject.backstate;
        historyMovIndex--;
        return 'layerName'
    }
    if (selectedobject.action === 'textcontent') {
        fontSelect.querySelector('.textBox');
        fontSelect.innerHTML = selectedobject.backstate;

        historyMovIndex--;
        return 'textcontent'
    }
    if (selectedobject.action === 'fontweight') {
        fontSelect.style.fontWeight = selectedobject.backfontstyle;
        styleFontWeight.value = selectedobject.backfontstyle;
        historyMovIndex--;
        return 'fontweight'
    }
    if (selectedobject.action === 'fontcolor') {
        fontSelect.style.color = selectedobject.backfontstyle;
        textBackgound.color = selectedobject.backfontstyle;
        textBackgoundValue.value = selectedobject.backfontstyle.replace('#', '');

        historyMovIndex--;
        return 'fontcolor'
    }
    if (selectedobject.action === 'fontsize') {
        fontSelect.style.fontSize = selectedobject.backfontstyle;
        styleFontSize.value = selectedobject.backfontstyle;
        historyMovIndex--;
        return 'fontsize'
    }
    if (selectedobject.action === 'fontalign') {
        fontSelect.style.textAlign = selectedobject.backfontstyle;
        historyMovIndex--;
        return 'fontalign'
    }
    if (selectedobject.action === 'italic') {
        fontSelect.style.fontStyle = selectedobject.backfontstyle;
        fontItalicActive.classList.remove('active');
        historyMovIndex--;
        return 'italic'
    }
    if (selectedobject.action === 'fontCut') {
        fontSelect.style.textDecoration = selectedobject.backfontstyle;
        fontCutActive.classList.remove('active');
        historyMovIndex--;
        return 'fontCut'
    }
    if (selectedobject.action === 'uppercase') {
        fontSelect.style.textTransform = selectedobject.backfontstyle;
        fontUppercaseActive.classList.remove('active');
        historyMovIndex--;
        return 'uppercase'
    }
    if (selectedobject.action === 'letter') {
        fontSelect.style.letterSpacing = selectedobject.backfontstyle ? selectedobject.backfontstyle : 0;
        letterSpacing.value = selectedobject.backfontstyle ? selectedobject.backfontstyle : 0;
        historyMovIndex--;
        return 'letter'
    }
    if (selectedobject.action === 'line') {
        fontSelect.style.lineHeight = selectedobject.backfontstyle;
        inputLineHeight.value = selectedobject.backfontstyle
        historyMovIndex--;
        return 'line'
    }
    if (selectedobject.action === 'borderradius') {
        let selectedBorderElement = elementThere;
        if (fetchElement.element === 'image') {
            selectedBorderElement = selectedBorderElement.querySelector('.control-image')
        }


        topRadius.value = selectedobject.backBorderTop;
        leftRadius.value = selectedobject.backBorderLeft;
        rightRadius.value = selectedobject.backBorderRight;
        bottomRadius.value = selectedobject.backBorderBottom;
        selectedBorderElement.style.borderTopLeftRadius = `${selectedobject.backBorderTop}%`;
        selectedBorderElement.style.borderTopRightRadius = `${selectedobject.backBorderRight}%`;
        selectedBorderElement.style.borderBottomRightRadius = `${selectedobject.backBorderLeft}%`;
        selectedBorderElement.style.borderBottomLeftRadius = `${selectedobject.backBorderBottom}%`;
        historyMovIndex--;
        return 'borderradius'
    }
    if (selectedobject.action === 'resize') {
        elementThere.style.left = selectedobject.backLeft;
        elementThere.style.top = selectedobject.backTop;
        elementThere.style.width = selectedobject.backWidth;
        elementThere.style.height = selectedobject.backHeight;
        elementThere.style.rotate = `${selectedobject.backRotate}deg`;

        boxWidth.value = selectedobject.backWidth;
        boxHeight.value = selectedobject.backHeight;
        historyMovIndex--;
        return 'Resize'
    }
    if (selectedobject.action === 'move') {
        elementThere.style.left = selectedobject.backLeft;
        elementThere.style.top = selectedobject.backTop;
        historyMovIndex--;
        return 'Move'
    }
    if (selectedobject.action === 'background') {
        canvasContent.style.backgroundColor = selectedobject.backState;
        backBackgound.style.backgroundColor = selectedobject.backState;
        backBackgoundValue.value = selectedobject.backState.replace('#', '');
        historyMovIndex--;
        return 'background'
    }
    if (selectedobject.action === 'bg') {
        addColor(selectedobject.backState, selectedobject, true);
        bgBackgound.style.backgroundColor = selectedobject.backState;
        bgBackgoundValue.value = selectedobject.backState.replace('#', '');
        historyMovIndex--;
        return 'bg'
    }
    if (selectedobject.action === 'create' || selectedobject.action === 'delete') {
        if (elementThere) {
            deleteElement(selectedobject.selectShape, selectedobject.shadesID)
            historyMovIndex--;
        } else {
            addElementCanvas(canvasContent, selectedobject.shadesID, selectedobject);
            updateElements({
                ...elements,
                ['page' + onPage]: {
                    ...elements['page' + onPage],
                    ['element' + selectedobject.shadesID]: { ...selectedobject },
                }
            })
            historyMovIndex--;
        }
    }
}
// Ctrl + Y
function forwordHistory() {
    const elementKeys = Object.keys(movementHistory['page' + onPage]).length - 1; 
    if (historyMovIndex === elementKeys.length) return
    let selectedobject = movementHistory['page' + onPage]['element' + (elementKeys + 1)];

    let elementThere = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectedobject.shadesID}"]`);
    let slelectLayerY = document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`);
    selectedobject.selectShape = elementThere;
    selectedobject.slelectLayer = slelectLayerY;
    let fontSelect = elementThere?.querySelector('.control-text');

    if (selectedobject.action === 'layerloak') {
        const layerSelect = document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`)
        const findElemnt = elements.findIndex(item => item.shadesID === selectedobject.shadesID);
        if (selectedobject.loakStatus) {
            layerSelect.classList.add('layer-locked');
            selectedobject.selectShape.classList.add('layer-locked');
            elements[findElemnt].layerloaked = true;
            options.classList.remove('active');
        } else {
            layerSelect.classList.remove('layer-locked');
            selectedobject.selectShape.classList.remove('layer-locked');
            elements[findElemnt].layerloaked = false;
            options.classList.add('active');
        }
        historyMovIndex++;
        return 'layerloak'
    }
    if (selectedobject.action === 'shiftzindex') {
        selectedobject.selectShape.style.zIndex = selectedobject.forwordstate;
        selectedobject.slelectLayer.style.order = -selectedobject.forwordstate;
        historyMovIndex++;
        return 'zindex'
    }
    if (selectedobject.action === 'zindex') {
        elementThere.style.zIndex = selectedobject.forwordstate;
        selectedobject.updateLayer.selectShape.style.zIndex = selectedobject.forwordlayer;
        selectedobject.slelectLayer.style.order = -selectedobject.forwordstate;
        selectedobject.updateLayer.slelectLayer.style.order = -selectedobject.forwordlayer;
        historyMovIndex++;
        return 'zindex'
    }
    if (selectedobject.action === 'hideLayer') {
        const layerSelect = document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`)
        if (selectedobject.forwordstate) {
            selectedobject.selectShape.classList.remove('d-none');
            layerSelect.querySelector('.layer-view').src = 'assets/images/show-layer.png';
            layerSelect.classList.remove('hideElement');
            options.classList.add('active');
            selectedobject.display = false;
        } else {
            selectedobject.selectShape.classList.add('d-none');
            layerSelect.querySelector('.layer-view').src = 'assets/images/hide-layer.png';
            layerSelect.classList.add('hideElement');
            options.classList.remove('active');
            selectedobject.display = true;
        }
        historyMovIndex++;
        return 'hideLayer'
    }
    if (selectedobject.action === 'fontfamliy') {
        fontSelect.style.fontFamily = selectedobject.forwordfontstyle;
        styleFontFamliy.value = selectedobject.forwordfontstyle;
        historyMovIndex++;
        return 'fontfamliy'
    }
    if (selectedobject.action === 'layerName') {
        document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name__edit').remove();
        document.querySelector(`.layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name-space').innerHTML = selectedobject.forwordstate;

        historyMovIndex++;
        return 'layerName'
    }
    if (selectedobject.action === 'textcontent') {
        fontSelect.querySelector('.textBox');
        fontSelect.innerHTML = selectedobject.forwordstate;
        historyMovIndex++;
        return 'textcontent'
    }
    if (selectedobject.action === 'fontweight') {
        fontSelect.style.fontWeight = selectedobject.forwordfontstyle;
        styleFontWeight.value = selectedobject.forwordfontstyle;
        historyMovIndex++;
        return 'fontweight'
    }
    if (selectedobject.action === 'fontcolor') {
        fontSelect.style.color = selectedobject.forwordfontstyle;
        textBackgound.color = selectedobject.forwordfontstyle;
        textBackgoundValue.value = selectedobject.forwordfontstyle.replace('#', '');
        historyMovIndex++;
        return 'fontcolor'
    }
    if (selectedobject.action === 'fontsize') {
        fontSelect.style.fontSize = selectedobject.forwordfontstyle;
        styleFontSize.value = selectedobject.forwordfontstyle;
        historyMovIndex++;
        return 'fontsize'
    }
    if (selectedobject.action === 'fontalign') {
        fontSelect.style.textAlign = selectedobject.forwordfontstyle;
        historyMovIndex++;
        return 'fontalign'
    }
    if (selectedobject.action === 'italic') {
        fontSelect.style.fontStyle = selectedobject.forwordfontstyle;
        fontItalicActive.classList.add('active');
        historyMovIndex++;
        return 'italic'
    }
    if (selectedobject.action === 'fontCut') {
        fontSelect.style.textDecoration = selectedobject.forwordfontstyle;
        fontCutActive.classList.add('active');
        historyMovIndex++;
        return 'fontCut'
    }
    if (selectedobject.action === 'uppercase') {
        fontSelect.style.textTransform = selectedobject.forwordfontstyle;
        fontUppercaseActive.classList.add('active');
        historyMovIndex++;
        return 'uppercase'
    }
    if (selectedobject.action === 'letter') {
        fontSelect.style.letterSpacing = selectedobject.forwordfontstyle;
        letterSpacing.value = selectedobject.forwordfontstyle
        historyMovIndex++;
        return 'letter'
    }
    if (selectedobject.action === 'line') {
        fontSelect.style.lineHeight = selectedobject.forwordfontstyle;
        inputLineHeight.value = selectedobject.forwordfontstyle
        historyMovIndex++;
        return 'line'
    }
    if (selectedobject.action === 'borderradius') {
        let selectedBorderElement = elementThere;
        if (fetchElement.element === 'image') {
            selectedBorderElement = selectedBorderElement.querySelector('.control-image')
        }
        topRadius.value = selectedobject.forwordBorderTop;
        leftRadius.value = selectedobject.forwordBorderLeft;
        rightRadius.value = selectedobject.forwordBorderRight;
        bottomRadius.value = selectedobject.forwordBorderBottom;
        selectedBorderElement.style.borderTopLeftRadius = `${selectedobject.forwordBorderTop}%`;
        selectedBorderElement.style.borderTopRightRadius = `${selectedobject.forwordBorderRight}%`;
        selectedBorderElement.style.borderBottomRightRadius = `${selectedobject.forwordBorderLeft}%`;
        selectedBorderElement.style.borderBottomLeftRadius = `${selectedobject.forwordBorderBottom}%`;
        historyMovIndex++;
        return 'borderradius'
    }
    if (selectedobject.action === 'resize') {
        elementThere.style.left = selectedobject.forwordLeft;
        elementThere.style.top = selectedobject.forwordTop;
        elementThere.style.width = selectedobject.forwordWidth;
        elementThere.style.height = selectedobject.forwordHeight;
        elementThere.style.rotate = selectedobject.forwordRotate;
        elementThere.style.rotate = `${selectedobject.forwordRotate}deg`;


        boxWidth.value = selectedobject.forwordWidth;
        boxHeight.value = selectedobject.forwordHeight;
        historyMovIndex++;
        return 'Resize'
    }
    if (selectedobject.action === 'move') {
        elementThere.style.left = selectedobject.forwordLeft;
        elementThere.style.top = selectedobject.forwordTop;
        historyMovIndex++;
        return 'Move'
    }
    if (selectedobject.action === 'background') {
        canvasContent.style.backgroundColor = selectedobject.forwordState;
        backBackgound.style.backgroundColor = selectedobject.forwordState;
        backBackgoundValue.value = selectedobject.forwordState.replace('#', '');
        historyMovIndex++;
        return 'background'
    }
    if (selectedobject.action === 'bg') {
        addColor(selectedobject.forwordState, selectedobject, true);
        bgBackgound.style.backgroundColor = selectedobject.forwordState;
        bgBackgoundValue.value = selectedobject.forwordState.replace('#', '');
        historyMovIndex++;
        return 'bg'
    }
    if (selectedobject.action === 'create' || selectedobject.action === 'delete') {

        if (elementThere) {
            deleteElement(selectedobject.selectShape, selectedobject.shadesID)
            historyMovIndex++;
        } else {
            addElementCanvas(canvasContent, selectedobject.shadesID, selectedobject);
            updateElements({
                ...elements,
                ['page' + onPage]: {
                    ...elements['page' + onPage],
                    ['element' + selectedobject.shadesID]: { ...selectedobject },
                }
            })
            historyMovIndex++;
        }
    }
}
export {
    addHistory, backHistory, forwordHistory, bgBackgound, backBackgound, textBackgound,
    fontCutActive, fontItalicActive, fontUppercaseActive,
}