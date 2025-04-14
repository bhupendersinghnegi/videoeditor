import { elements, fetchElement, sectionContainer, updateFetchElement, onPage, movementHistory } from "./main.js";
import { addHistory } from "./MovmentHistory.js";
const options = document.querySelector('.options');
// Move element from one place to other place
function elementUpdate() {
    const flowContainer = document.querySelector('.flow_container');
    const positionElement = document.querySelector('.position-element')

    let getElement, selectElement;
    let is_moveing = false;
    let startX = 0, startY = 0;
    let dx = 0, dy = 0;
    let boxLeft, boxTop;
    sectionContainer.addEventListener('mousedown', function (Event) {
        updateFetchElement(elements['page' + onPage]['element' + (Event.target.closest('.control-box')?.dataset.shadesid)]);

        if (fetchElement?.layerloaked) return options.classList.remove('active')

        if (Event.target.classList.contains('control-layer')) {
            Event.target.closest('.section--container__content')?.querySelector('.active')?.classList.remove('active')
            getElement = Event.target.closest('.control-box');
            getElement.classList.add('active')
            document.querySelector('.layers--element.active')?.classList.remove('active');
            document.querySelector(`.layers--element[data-layer="${getElement.dataset.shadesid}"]`)?.classList.add('active');

            selectElement = elements['page' + onPage]['element' + (Event.target.closest('.control-box')?.dataset.shadesid)];

            startX = Event.clientX;
            startY = Event.clientY;
            is_moveing = true;
            boxLeft = Number(getElement.style.left.replace('px', ''));
            boxTop = Number(getElement.style.top.replace('px', ''));

            positionElement.dataset.element = getElement.dataset.element;
            positionElement.dataset.shape = getElement.dataset.shape ? getElement.dataset.shape : '';

        }
    })
    sectionContainer.addEventListener('mousemove', function (Event) {
        // if (fetchElement?.layerloaked) return 
        if (!Event.target.closest('.section--container__content')) {
            is_moveing = false;
        }
        if (!is_moveing) return
        if (Event.target.classList.contains('control-layer')) {
            Event.target.closest('.section--container__content').classList.add('center-line')
            dx = Event.x - startX;
            dy = Event.y - startY;

            getElement.classList.add('acive-moving');
            getElement.style.left = dx < 0 ? `${boxLeft - Math.abs(dx)}px` : `${boxLeft + Math.abs(dx)}px`;
            getElement.style.top = dy < 0 ? `${boxTop - Math.abs(dy)}px` : `${boxTop + Math.abs(dy)}px`;
        }
    })


    sectionContainer.addEventListener('mouseup', function (Event) {
        // if (fetchElement?.layerloaked) return
        if (!is_moveing) return
        Event.target.closest('.section--container__content').classList.remove('center-line')
        getElement.classList.remove('acive-moving');

        is_moveing = false;
        selectElement.top = Number(getElement.style.top.replace('px', ''));
        selectElement.left = Number(getElement.style.left.replace('px', ''));

        if (boxTop === selectElement.top && boxLeft === selectElement.left) return

        addHistory({
            action: 'moveFunction',
            backTop: boxTop, backLeft: boxLeft, forwordTop: selectElement.top, forwordLeft: selectElement.left,
            selectShape: selectElement.selectShape, shadesID: selectElement.shadesID,
            element: selectElement.element, shape: selectElement.shape,
        })
    })


}

// Set position of a element right left etc...
function setPositionElement(Event) {
    const getElement = document.querySelector('.control-box.active');
    const canvasSize = document.querySelector('.section--container__content');
    const canvasWidth = canvasSize.clientWidth
    const canvasHeight = canvasSize.clientHeight
    const elementWidth = getElement.clientWidth;
    const elementHeight = getElement.clientHeight;
    const checkElement = Event.target.closest('.align-element').dataset.align;
    const selectElement = elements['page' + onPage]['element' + (getElement.dataset.shadesid)];;
    let boxLeft = Number(getElement.style.left.replace('px', ''));
    let boxTop = Number(getElement.style.top.replace('px', ''));
    if (checkElement === 'top') {
        getElement.style.top = "0px"
    }
    if (checkElement === 'left') {
        getElement.style.left = "0px"
    }

    if (checkElement === 'bottom') {
        getElement.style.top = `${canvasHeight - elementHeight}px`
    }
    if (checkElement === 'right') {
        getElement.style.left = `${canvasWidth - elementWidth}px`
    }
    if (checkElement === 'xcenter') {
        getElement.style.left = `${canvasWidth / 2 - elementWidth / 2}px`
    }
    if (checkElement === 'ycenter') {
        getElement.style.top = `${canvasHeight / 2 - elementHeight / 2}px`
    }
    if (checkElement === 'xycenter') {
        getElement.style.left = `${canvasWidth / 2 - elementWidth / 2}px`
        getElement.style.top = `${canvasHeight / 2 - elementHeight / 2}px`
    }
    selectElement.top = Number(getElement.style.top.replace('px', ''));
    selectElement.left = Number(getElement.style.left.replace('px', ''));

    if (boxTop === selectElement.top && boxLeft === selectElement.left) return;
    addHistory({
        action: 'moveFunction',
        backTop: boxTop, backLeft: boxLeft, forwordTop: selectElement.top, forwordLeft: selectElement.left,
        selectShape: selectElement.selectShape, shadesID: selectElement.shadesID,
        element: selectElement.element, shape: selectElement.shape,
    })
}
document.querySelector('.position-element').addEventListener('click', function (Event) {
    if (!Event.target.closest('.align-element')) return
    setPositionElement(Event)
})



// Select a element for edit 
window.addEventListener('click', function (Event) {
    // console.log(movementHistory);
    document.querySelector('.control-box.active')?.querySelector('.control-text .textBox')?.classList.remove('editOpen');

    if (!Event.target.closest('.layers--name')) {
        document.querySelector('.layers--name.editnow')?.classList.remove('editnow');
        document.querySelector('.layers--name')?.blur();
    }

    if (Event.target.closest('.section--container__mid')?.querySelectorAll('.control-box.active')) {
        Array.from(Event.target.closest('.section--container__mid')?.querySelectorAll('.control-box.active')).map(box => {
            box.classList.remove('active')
        })
    }
    if (Event.target.closest('.control-box')) {
        Event.target.closest('.control-box').classList.add('active')
    }
    if (!Event.target.closest('.layer-options')) {
        document.querySelector('.layer-options.active')?.classList.remove('active')
    }
})

export { setPositionElement, elementUpdate }