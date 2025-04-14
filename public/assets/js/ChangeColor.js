import { elements, onPage } from "./main.js";

function addColor(fill, getElementJson, notUpdate) {
    if (notUpdate) { 
        elements['page' + onPage]['element' + getElementJson.shadesID].bg = fill; 
    } else {
        getElementJson.bg = fill;
    }

    getElementJson.selectShape = document.querySelector(`.canvas--sheet-${onPage}  .control-box[data-shadesid="${getElementJson.shadesID}"]`)
    getElementJson.selectShape.style.backgroundColor = fill;

}
export { addColor }