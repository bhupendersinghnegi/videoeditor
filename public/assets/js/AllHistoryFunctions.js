import { addColor } from "./ChangeColor.js";
import { removeTemplate } from "./Template.js";
import { createCanvas } from "./main.js";

// Function for movment history
window.moveFunction = function moveFunction(objectGetter) {
    const { key, elementThere, selectedobject } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    elementThere.style.left = `${selectedobject[`${stateName}Left`]}px`;
    elementThere.style.top = `${selectedobject[`${stateName}Top`]}px`;
}
// Function for change canvas background color
window.backgroundFunction = function backgroundFunction(objectGetter) {
    const { key, selectCanvasContent, backBackgoundValue, backBackgound, selectedobject } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    selectCanvasContent.style.backgroundColor = selectedobject[`${stateName}State`];
    backBackgound.style.backgroundColor = selectedobject[`${stateName}State`];
    backBackgoundValue.value = selectedobject[`${stateName}State`].replace('#', '');
}
window.shapeBgFunction = function shapeBgFunction(objectGetter) {
    const { key, selectedobject, bgBackgoundValue, bgBackgound } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    addColor(selectedobject[`${stateName}State`], selectedobject, true);
    bgBackgound.style.backgroundColor = selectedobject[`${stateName}State`];
    bgBackgoundValue.value = selectedobject[`${stateName}State`].replace('#', '');

}

window.shapeResizeFunction = function shapeResizeFunction(objectGetter) {
    const { key, selectedobject, elementThere, boxWidth, boxHeight } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    elementThere.style.left = `${selectedobject[`${stateName}Left`]}px`;
    elementThere.style.top = `${selectedobject[`${stateName}Top`]}px`;
    elementThere.style.width = `${selectedobject[`${stateName}Width`]}px`;
    elementThere.style.height = `${selectedobject[`${stateName}Height`]}px`;
    elementThere.style.rotate = `${selectedobject[`${stateName}Rotate`]}deg`;
    boxWidth.value = selectedobject[`${stateName}Width`];
    boxHeight.value = selectedobject[`${stateName}Height`];
}
window.bgCreateFunction = function bgCreateFunction(objectGetter) {
    const { key, selectedobject } = objectGetter;
    key ? removeTemplate(selectedobject) : createCanvas();
}
window.bgDeleteFunction = function bgDeleteFunction(objectGetter) {
    const { key, selectedobject } = objectGetter;
    key ? createCanvas() : removeTemplate(selectedobject);
}

window.shiftZIndexFunction = function shiftZIndexFunction(objectGetter) {
    const { key, selectedobject } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    selectedobject.selectShape.style.zIndex = selectedobject[`${stateName}state`];
    selectedobject.slelectLayer.style.order = -selectedobject[`${stateName}state`];
}

window.hideLayerFunction = function hideLayerFunction(objectGetter) {
    const { key, selectedobject, options } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    const layerSelect = document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`)
    if (selectedobject[`${stateName}state`]) {
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
}
window.fontFamliyFunction = function fontFamliyFunction(objectGetter) {
    const { key, selectedobject, fontSelect, styleFontFamliy } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    fontSelect.style.fontFamily = selectedobject[`${stateName}fontstyle`];
    styleFontFamliy.value = selectedobject[`${stateName}fontstyle`];
}
window.layerNameFunction = function layerNameFunction(objectGetter) {
    const { key, selectedobject, } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name__edit').remove();
    document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`).querySelector('.layers--name-space').innerHTML = selectedobject[`${stateName}state`];

}
window.layerNameFunction = function layerNameFunction(objectGetter) {
    const { key, selectedobject, fontSelect } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';

    fontSelect.querySelector('.textBox');
    fontSelect.innerHTML = selectedobject[`${stateName}state`];
}
window.fontWeightFunction = function fontWeightFunction(objectGetter) {
    const { key, selectedobject, fontSelect, styleFontWeight } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';
    fontSelect.style.fontWeight = selectedobject[`${stateName}fontstyle`];
    styleFontWeight.value = selectedobject[`${stateName}fontstyle`];
}
window.fontColorFunction = function fontColorFunction(objectGetter) {
    const { key, selectedobject, fontSelect, textBackgound, textBackgoundValue } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';

    fontSelect.style.color = selectedobject[`${stateName}fontstyle`];
    textBackgound.color = selectedobject[`${stateName}fontstyle`];
    textBackgoundValue.value = selectedobject[`${stateName}fontstyle`].replace('#', '');
}
window.fontSizeFunction = function fontSizeFunction(objectGetter) {
    const { key, selectedobject, fontSelect, styleFontSize } = objectGetter;
    // key ture == Ctrl + Z, false == Ctrl + y
    let stateName = key ? 'back' : 'forword';

    fontSelect.style.fontSize = `${selectedobject[`${stateName}fontstyle`]}px`;
    styleFontSize.value = selectedobject[`${stateName}fontstyle`];
}