import { addHistory } from "./MovmentHistory.js";
import { addElementCanvas } from "./Shaps.js";
import { canvasContent, elements, onPage, shadesID, updateElements } from "./main.js";

function createElementByJson(objects, jsonData) {
    if (jsonData) {
        JSON.parse(objects).map(setObject => {
            elements.push({ ...setObject });
            addElementCanvas(canvasContent, setObject.shadesID, setObject);
            elements.at(-1).selectShape = document.querySelector(`.canvas--sheet-${onPage}  .control-box[data-shadesid="${setObject.shadesID}"]`)
            elements.at(-1).slelectLayer = document.querySelector(`.layers--element[data-layer="${setObject.shadesID}"]`)
            addHistory({ ...setObject, action: 'create', backState: 'create', forwordState: 'delete' });
        })
    }
    else {
        let indexValue = shadesID === 1 ? 10 : (shadesID - 1) * 2 + 10;
        const selectedobject = {
            ...objects, layername: `Layer ${shadesID}`,
            top: objects.top + 10, left: objects.left + 10, selectShape: '', slelectLayer: '', shadesID: shadesID, index: indexValue
        } 
        updateElements({
            ...elements,
            ['page' + onPage]: {
                ...elements['page' + onPage],
                ['element' + selectedobject.shadesID]: { ...selectedobject },
            }
        })
        elements['page' + onPage].elementinpage++;
        const selectedElement = elements['page' + onPage]['element' + selectedobject.shadesID];
        addElementCanvas(canvasContent, selectedobject.shadesID, selectedobject);
        selectedElement.selectShape = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectedobject.shadesID}"]`)
        selectedElement.slelectLayer = document.querySelector(`.layers--group[data-layer="${selectedobject.pageNumber}"] .layers--element[data-layer="${selectedobject.shadesID}"]`)
        addHistory({ ...selectedobject, action: 'create', backState: 'create', forwordState: 'delete' });
    }
}
export { createElementByJson }