import { sectionContainer } from './ActiveBox.js'
import { addHistory } from './MovmentHistory.js';
import { options } from './ActiveBox.js';
import { setPositionElement } from './MoveElement.js';
import { deleteElement, elements, fetchElement, onPage, updateFetchElement } from './main.js';
import { createElementByJson } from './CreateElementByJson.js';
import { startTextUpdate, textOnChange } from './UpdateFont.js';

const layersGroup = document.querySelector('.layers--group__pages');
const bodySecion = document.querySelector('body');
let layerNumber;
// Click Events for layers
let activeLayer;
layersGroup.addEventListener('dblclick', function (Event) {
    if (Event.target.closest('.layers--name')) {
        const editText = Event.target.closest('.layers--name').querySelector('.layers--name__edit');
        Event.target.closest('.layers--name').classList.add('editnow');
        editText.focus();
        startTextUpdate(Event.target.closest('.layers--name').querySelector('.layers--name-space').innerHTML)
        textOnChange(editText, 'layerNameFunction', '.layers--name-space')
    }
    if (Event.target.classList.contains('layer-locker')) {
        layerLoaked(layerNumber, false)
    }
});
// Ceate layer container so all pages layer can be in there page layer
function layerBoxContainer() {
    const layerContainer = document.querySelector('.layers--group__pages');
    layerContainer.insertAdjacentHTML('beforeend', ` <div class="layers--group layer--active" data-layer="${onPage}"></div>`);
}


// All click are working from here
layersGroup.addEventListener('click', function (Event) {
    layerNumber = Event.target.closest('.layers--element');
    let shapeElement;
    // debugger
    if (layerNumber) {
        Event.target.closest('.layers--group')?.querySelector('.layers--element.active')?.classList.remove('active');
        sectionContainer?.querySelector('.control-box.active')?.classList.remove('active');
        shapeElement = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${layerNumber.dataset.layer}"]`);
        shapeElement?.classList.add('active');
        Event.target.closest('.layers--element').classList.toggle('active');
        options.querySelector(`.fontStyle.active`).classList.remove('active');
        options.querySelector(`.fontStyle[data-option="${fetchElement.element}"]`).classList.add('active');


        layerNumber.classList.contains('hideElement') ||
            layerNumber.classList.contains('layer-locked')
            ? options.classList.remove('active') : options.classList.add('active');
    }
    if (Event.target.classList.contains('layer-view')) {
        if (fetchElement?.layerloaked) return

        if (Event.target.src.indexOf('/show-layer.png') !== -1) {
            Event.target.src = 'assets/images/hide-layer.png';
            shapeElement.classList.add('d-none');

            layerNumber.classList.add('hideElement');
            options.classList.remove('active');
            fetchElement.display = true;
            addHistory({
                action: 'hideLayerFunction',
                backstate: true, forwordstate: false,
                targetLayer: layerNumber, actionElement: shapeElement, targetImage: Event.target,
                slelectLayer: fetchElement.slelectLayer, selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        } else {
            Event.target.src = 'assets/images/show-layer.png';
            shapeElement.classList.remove('d-none');

            layerNumber.classList.remove('hideElement');
            options.classList.add('active')
            fetchElement.display = false;
            addHistory({
                action: 'hideLayerFunction',
                backstate: false, forwordstate: true,
                targetLayer: layerNumber, actionElement: shapeElement, targetImage: Event.target,
                slelectLayer: fetchElement.slelectLayer, selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
                element: fetchElement.element,
            })
        }

    }
    if (Event.target.classList.contains('layer-option')) {
        Event.target.closest('.layers--group')?.querySelector('.layer-options.active')?.classList.remove('active');
        Event.target.closest('.layer-options').classList.toggle('active');
        activeLayer = document.querySelector('.control-box.active');
    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="delete"]')) {
        deleteElement(activeLayer, fetchElement.shadesID, true);
        Event.target.closest('.layer-options').classList.toggle('active');
    }

    if (Event.target.closest('.layer-dropbox_option[data-funcation="forword"]')) {
        reversIndex(true, shapeElement, fetchElement)
        Event.target.closest('.layer-options').classList.toggle('active');

    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="back"]')) {
        reversIndex(false, shapeElement, fetchElement)
        Event.target.closest('.layer-options').classList.toggle('active');

    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="allforword"]')) {
        reversIndex(true, shapeElement, fetchElement, true)
        Event.target.closest('.layer-options').classList.toggle('active');

    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="lock"]')) {
        layerLoaked(layerNumber, true)
        Event.target.closest('.layer-options').classList.toggle('active');

    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="allback"]')) {
        reversIndex(false, shapeElement, fetchElement, true)
        Event.target.closest('.layer-options').classList.toggle('active');

    }
    if (Event.target.closest('.layer-dropbox_option[data-funcation="duplicate"]')) {
        createElementByJson(fetchElement, false)
        Event.target.closest('.layer-options').classList.toggle('active');

    }

    if (!Event.target.closest('.align-element')) return
    Event.target.closest('.layer-options').classList.toggle('active');
    setPositionElement(Event)


})

// Drag to move layer position(Z-Index)
function layerDrag() {
    let is_moveing = false;
    let startY, selectedLayer, boxTop;
    let dropCount, dropPosition = undefined, startIndex;
    layersGroup.addEventListener('mousedown', function (Event) {
        if (!Event.target.closest('.layers--element')) return;

        is_moveing = true;
        selectedLayer = Event.target.closest('.layers--element');
        startY = Event.clientY;
        boxTop = Number(selectedLayer.style.top.replace('px', ''));


        updateFetchElement(elements['page' + onPage]['element' + (selectedLayer?.dataset.layer)]);
        startIndex = fetchElement.index;
    })
    layersGroup.addEventListener('mousemove', function (Event) {
        if (!is_moveing || !Event.target.closest('.layers--element')) return
        selectedLayer.style.zIndex = 1000;
        selectedLayer.querySelector('.layers--element__container').style.top = `${boxTop + (Event.y - startY)}px`;
        dropCount = boxTop + (Event.y - startY);
    })
    layersGroup.addEventListener('mouseup', function (Event) {
        if (!is_moveing) return
        selectedLayer.style.zIndex = 0;
        selectedLayer.querySelector('.layers--element__container').style.top = 0;
        const findPosition = Number(startIndex) - (Math.floor(dropCount / 45) * 2);

        Object.keys(elements['page' + onPage]).filter((element, index) => {
            const elementSelected = elements['page' + onPage][element].index;
            if (Number(elementSelected) === findPosition) {
                return dropPosition = elements['page' + onPage][element];
            }
        })[0];

        is_moveing = false
        if (!dropPosition) return
        let backlayer = dropPosition.index
        fetchElement.selectShape.style.zIndex = `${dropPosition.index}`;
        dropPosition.selectShape.style.zIndex = `${startIndex}`;

        fetchElement.slelectLayer.style.order = `-${dropPosition.index}`;
        dropPosition.slelectLayer.style.order = `-${startIndex}`;


        fetchElement.index = dropPosition.index
        dropPosition.index = startIndex

        if (fetchElement.index === startIndex) return
        addHistory({
            action: 'zindexFunction',
            backstate: startIndex, forwordstate: fetchElement.index, updateLayer: dropPosition,
            forwordlayer: dropPosition.index, backlayer,
            slelectLayer: fetchElement.slelectLayer, selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
            element: fetchElement.element,
        })
    })
}
layerDrag();
// loak the layer from any action
function layerLoaked(loackLayer, status) {

    loackLayer.classList.toggle('layer-locked');
    fetchElement.selectShape.classList.toggle('layer-locked');
    fetchElement.layerloaked = status;
    options.classList.toggle('active');

    addHistory({
        action: 'layerloak', loakStatus: status, unloakedLayer: fetchElement,
        slelectLayer: fetchElement.slelectLayer, selectShape: fetchElement.selectShape, shadesID: fetchElement.shadesID,
        element: fetchElement.element,
    })
}
// Show active when hover on layer(Element)
function aciveHoverElement(Event) {
    if (Event.target.closest('.layers--element')) {
        document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${Event.target.closest('.layers--element').dataset.layer}"]`).classList.add('hover')
    } else {
        document.querySelector(`.control-box.hover`)?.classList.remove('hover')
    }
}
document.querySelector('.layers').addEventListener('mouseover', (Event) => aciveHoverElement(Event))
// Show active when hover on Element(layer) 
function aciveHoverLayer(Event) {
    if (Event.target.closest('.control-box')) {
        document.querySelector(`.layers--element[data-layer="${Event.target.closest('.control-box').dataset.shadesid}"]`).classList.add('hover')
    } else {
        document.querySelector(`.layers--element.hover`)?.classList.remove('hover')
    }
}
window.addEventListener('mouseover', (Event) => aciveHoverLayer(Event))

// Search for the last or first layer to change zindex with
function layerRecursion(layerIndex, option, shiftkey) {
    let layerUpContent = [];
    let layerDownContent = [];

    elements['page' + onPage].filter(item => {
        if (option) {
            layerIndex < item.index ? layerUpContent.push(Number(item.index)) : '';
        } else {
            layerIndex > item.index ? layerDownContent.push(Number(item.index)) : '';
        }
    })
    if (option) {
        let maxLayer = Math.max(...layerUpContent);
        if (shiftkey) {
            if (Math.abs(maxLayer) === Infinity) return null
            return maxLayer + 2
        }
        const minContent = Math.min(...layerUpContent);
        if (minContent !== Infinity) {
            return elements.findIndex(item => Number(item.index) === minContent);
        } else { return null }
    } else {
        let minLayer = Math.min(...layerDownContent);
        if (shiftkey) {
            if (Math.abs(minLayer) === Infinity) return null
            return minLayer - 2
        }
        const maxContent = Math.max(...layerDownContent);
        if (maxContent !== -Infinity) {
            return elements.findIndex(item => Number(item.index) === maxContent);
        } else { return null }
    }
}
// Revers the element z-index
function reversIndex(option, selectElement, object, shiftkey) {
    let lastIndex = Number(object.index);
    let findId
    if (option) {
        findId = layerRecursion(Number(object.index), option, shiftkey);
    } else {
        findId = layerRecursion(Number(object.index), option, shiftkey);
    }
    if (findId === null) return

    if (shiftkey) {
        selectElement.style.zIndex = findId;
        fetchElement.slelectLayer.style.order = -findId;
        fetchElement.index = findId;

        addHistory({
            action: 'shiftZIndexFunction',
            backstate: lastIndex, forwordstate: fetchElement.index,
            slelectLayer: object.slelectLayer, selectShape: object.selectShape, shadesID: object.shadesID,
            element: object.element,
        })

    } else {
        let backlayer = elements[findId].index;

        object.index = Number(elements[findId].index);
        elements[findId].index = lastIndex;

        selectElement.style.zIndex = object.index;
        elements[findId].selectShape.style.zIndex = lastIndex;

        fetchElement.slelectLayer.style.order = -object.index;
        elements[findId].slelectLayer.style.order = -lastIndex

        addHistory({
            action: 'zindexFunction',
            backstate: lastIndex, forwordstate: object.index, updateLayer: elements[findId],
            forwordlayer: elements[findId].index, backlayer,
            slelectLayer: object.slelectLayer, selectShape: object.selectShape, shadesID: object.shadesID,
            element: object.element,
        })
    }

}
export { layersGroup, reversIndex, layerLoaked, layerBoxContainer }
