import {
    movementHistory, canvasContent, elements,
    textBackgoundValue, bgBackgoundValue, backBackgoundValue, deleteElement, fetchElement,
    styleFontFamliy, styleFontWeight, styleFontSize, updateElements, onPage, shadesID, updateMovementHistory, createCanvas,
} from './main.js'
import { addColor } from './ChangeColor.js'
import { addElementCanvas } from './Shaps.js'
import { letterSpacing, inputLineHeight } from './UpdateFont.js'
// Elements for change
import { topRadius, leftRadius, rightRadius, bottomRadius, boxWidth, boxHeight, options } from './ActiveBox.js'
import { removeTemplate } from './Template.js'

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
    movementHistory.push({ ...object, pageNumber: onPage })
    historyMovIndex++;
}
// Ctrl + Z 
function backHistory() {
    if (historyMovIndex === 0) return
    let selectedobject = movementHistory[historyMovIndex - 1];
    let elementThere = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectedobject.shadesID}"]`);
    selectedobject.selectShape = elementThere;
    let fontSelect = elementThere?.querySelector('.control-text');
    const selectCanvasContent = document.querySelector(`.canvas--sheet-${onPage} .section--container__content`);

    if (selectedobject.action === 'layerloak') {
        const layerSelect = document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`)
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
    if (selectedobject.action === 'shiftZIndexFunction' ||
        selectedobject.action === 'hideLayerFunction' ||
        selectedobject.action === 'fontFamliyFunction' ||
        selectedobject.action === 'layerNameFunction' || selectedobject.action === 'textContentFunction' ||
        selectedobject.action === 'fontColorFunction' ||
        selectedobject.action === 'fontSizeFunction' ||
        selectedobject.action === 'fontWeightFunction') {
        window[selectedobject.action]({
            key: true, selectedobject, options,
            fontSelect, styleFontFamliy,
            styleFontWeight,
            textBackgound, textBackgoundValue,
            styleFontSize
        });
        historyMovIndex--;
        return 'zindex || hideLayerFunction || hideLayer || fontfamliy || layerName || textcontent || fontweight || fontcolor || fontsize'

    }
    if (selectedobject.action === 'zindexFunction') {
        elementThere.style.zIndex = selectedobject.backstate;
        selectedobject.updateLayer.selectShape.style.zIndex = selectedobject.backlayer;

        selectedobject.slelectLayer.style.order = -selectedobject.backstate;
        selectedobject.updateLayer.slelectLayer.style.order = -selectedobject.backlayer;
        historyMovIndex--;
        return 'zindex'
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
    if (selectedobject.action === 'shapeResizeFunction' ||
        selectedobject.action === 'moveFunction' ||
        selectedobject.action === 'backgroundFunction' ||
        selectedobject.action === 'shapeBgFunction' ||
        selectedobject.action === 'bgCreateFunction' ||
        selectedobject.action === 'bgDeleteFunction') {
        window[selectedobject.action]({
            key: true, selectedobject, elementThere, boxWidth, boxHeight,
            selectCanvasContent, backBackgoundValue, backBackgound,
            bgBackgoundValue, bgBackgound
        });
        historyMovIndex--;
        return 'shapeResizeFunction || moveFunction || backgroundFunction || shapeBgFunction || bgCreateFunction || bgDeleteFunction';
    }
    if (selectedobject.action === 'create' || selectedobject.action === 'delete') {
        if (elementThere) {
            deleteElement(selectedobject.selectShape, selectedobject.shadesID, false, selectedobject.pageNumber)
            historyMovIndex--;
        } else {
            addElementCanvas(selectCanvasContent, selectedobject.shadesID, selectedobject, selectedobject.pageNumber);
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
    if (historyMovIndex === movementHistory.length) return
    let selectedobject = movementHistory[historyMovIndex];
    let elementThere = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectedobject.shadesID}"]`);
    let slelectLayerY = document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`);
    const selectCanvasContent = document.querySelector(`.canvas--sheet-${onPage} .section--container__content`);

    selectedobject.selectShape = elementThere;
    selectedobject.slelectLayer = slelectLayerY;
    let fontSelect = elementThere?.querySelector('.control-text');

    if (selectedobject.action === 'layerloak') {
        const layerSelect = document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`)
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
    if (selectedobject.action === 'shiftZIndexFunction' ||
        selectedobject.action === 'hideLayerFunction' ||
        selectedobject.action === 'fontFamliyFunction' ||
        selectedobject.action === 'layerNameFunction' || selectedobject.action === 'textContentFunction' ||
        selectedobject.action === 'fontColorFunction' ||
        selectedobject.action === 'fontSizeFunction' ||
        selectedobject.action === 'fontWeightFunction') {

        window[selectedobject.action]({
            key: false, selectedobject, options,
            fontSelect, styleFontFamliy,
            styleFontWeight,
            textBackgound, textBackgoundValue,
            styleFontSize
        });
        historyMovIndex++;
        return 'zindex || hideLayerFunction || hideLayer || fontfamliy || layerName || textcontent || fontweight || fontcolor || fontsize'
    }
    if (selectedobject.action === 'zindexFunction') {
        elementThere.style.zIndex = selectedobject.forwordstate;
        selectedobject.updateLayer.selectShape.style.zIndex = selectedobject.forwordlayer;
        selectedobject.slelectLayer.style.order = -selectedobject.forwordstate;
        selectedobject.updateLayer.slelectLayer.style.order = -selectedobject.forwordlayer;
        historyMovIndex++;
        return 'zindex'
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
    if (selectedobject.action === 'shapeResizeFunction' ||
        selectedobject.action === 'moveFunction' ||
        selectedobject.action === 'backgroundFunction' ||
        selectedobject.action === 'shapeBgFunction' ||
        selectedobject.action === 'bgCreateFunction' ||
        selectedobject.action === 'bgDeleteFunction') {
        window[selectedobject.action]({
            key: false, selectedobject, elementThere, boxWidth, boxHeight,
            selectCanvasContent, backBackgoundValue, backBackgound,
            bgBackgoundValue, bgBackgound
        });
        historyMovIndex++;
        return 'shapeResizeFunction || moveFunction || backgroundFunction || shapeBgFunction || bgCreateFunction || bgDeleteFunction';
    }
    if (selectedobject.action === 'create' || selectedobject.action === 'delete') {
        if (elementThere) {
            deleteElement(selectedobject.selectShape, selectedobject.shadesID)
            historyMovIndex++;
        } else {
            addElementCanvas(selectCanvasContent, selectedobject.shadesID, selectedobject, selectedobject.pageNumber);
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