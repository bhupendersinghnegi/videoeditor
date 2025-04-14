import { elements, sectionContainer, fetchElement, offsetFromLeft, offsetFromTop, onPage, } from "./main.js";
import { addHistory } from "./MovmentHistory.js";
// Reset 
function rotateMoving(rotate) {

    // let elementOffsetLeft = offsetFromLeft + fetchElement.selectShape.offsetLeft;
    // let elementOffsetTop = offsetFromTop + fetchElement.selectShape.offsetTop;
    // console.log(elementOffsetLeft);
    // document.querySelector('.flow_container').style.width=`${elementOffsetLeft}px`;
    // document.querySelector('.flow_container').style.height=`${elementOffsetTop}px`;
    // fetchElement.selectShape.querySelector('.line-bottom').dataset.side = 'top';
    // fetchElement.selectShape.querySelector('.line-top').dataset.side = 'bottom';
    // fetchElement.selectShape.querySelector('.line-right').dataset.side = 'left';
    // fetchElement.selectShape.querySelector('.line-left').dataset.side = 'right';
}
// Resize the Selected Element
function ResizeElement() {
    const flowContainer = document.querySelector('.flow_container');
    let is_moveing = false, selected = false, sameSide = false;
    let controlsSide, controlsMove, rotateMove;
    let startX = 0, startY = 0;
    let selectElement, getElement, selectSide, containsText = false;
    let boxWidth, boxLeft, boxHeight, boxTop, boxRotate;

    const checkBody = document.querySelector('body');

    checkBody.addEventListener('mousedown', function (Event) {
        if (Event.target.closest('.controls') || Event.target.classList.contains('dots') || Event.target.closest('.rotate-pick')) {
            if (Event.target.closest('.control-box').dataset.element === 'text') {
                containsText = true
            }
            if (Event.target.closest('.lines')) {
                controlsSide = Event.target.closest('.lines').dataset.side;
            } else {
                controlsSide = null
            } if (Event.target.classList.contains('dots')) {
                controlsMove = Event.target;
                selectSide = Event.target;
            } else {
                controlsMove = null, selectSide = null;
            }
            if (Event.target.closest('.rotate-pick')) {
                rotateMove = Event.target.closest('.rotate-pick');
            } else {
                rotateMove = null;
            }
            is_moveing = true;
            selected = true
            
            selectElement = elements['page' + onPage]['element' + Event.target.closest('.control-box').dataset.shadesid];
            getElement = Event.target.closest('.control-box');
            startX = Event.clientX;
            startY = Event.clientY;

            boxWidth = Number(getElement.style.width.replace('px', ''));
            boxLeft = Number(getElement.style.left.replace('px', ''));
            boxHeight = Number(getElement.style.height.replace('px', ''));
            boxTop = Number(getElement.style.top.replace('px', ''));
            boxRotate = Number(getElement.style.rotate.replace('deg', ''));
        }
    })

    checkBody.addEventListener('mousemove', function (Event) {
        if (!is_moveing) return
        if (Event.target.closest('.controls') || selected) {
            let option = document.querySelector(`.canvas--sheet-${onPage} .control-box[data-shadesid="${selectElement.shadesID}"]`);
            if (rotateMove) {
                let elementOffsetLeft = offsetFromLeft + fetchElement.selectShape.offsetLeft;
                let elementOffsetTop = offsetFromTop + fetchElement.selectShape.offsetTop;

                let center_x = (elementOffsetLeft) + (fetchElement.width / 2);
                let center_y = (elementOffsetTop) + (fetchElement.height / 2);
                let mouse_x = Event.pageX;
                let mouse_y = Event.pageY;
                let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
                getElement.style.rotate = `${radians * (180 / Math.PI) * -1}deg`


            }
            if (controlsMove) {
                let xMoving = startX - Event.clientX;
                let number = xMoving > 0 ? xMoving : Math.abs(xMoving);
                let Movingsides = selectSide.dataset.side === 'top' || selectSide.dataset.side === 'left' ? xMoving > 0 : xMoving < 0;

                let poTop = controlsMove.dataset.side === 'top';
                let poRight = controlsMove.dataset.side === 'right';
                let poLeft = controlsMove.dataset.side === 'left';
                let elementRotate = getElement.style.rotate.replace('deg', '');



                if (controlsMove) {
                    if (Movingsides) {
                        option.style.width = `${boxWidth + number}px`;
                        option.style.height = `${boxHeight + number}px`;
                        poTop || poLeft ? option.style.left = `${boxLeft - number}px` : '';
                        poRight || poTop ? option.style.top = `${boxTop - number}px` : '';

                    } else {
                        option.style.width = `${boxWidth - number}px`;
                        option.style.height = `${boxHeight - number}px`;
                        poTop || poLeft ? option.style.left = `${boxLeft + number}px` : '';
                        poRight || poTop ? option.style.top = `${boxTop + number}px` : '';
                    }
                }
            }
            if (controlsSide === 'right') {
                if (Event.shiftKey) {
                    sameSide = true
                    let xMoving = startX - Event.clientX;
                    let number = xMoving > 0 ? xMoving : Math.abs(xMoving);
                    if (xMoving < 0) {
                        option.style.width = `${boxWidth + Number([number * 2])}px`;
                        option.style.left = `${boxLeft - number}`
                    } else {
                        option.style.width = `${boxWidth - [number * 2]}`;
                        option.style.left = `${boxLeft + number}`;
                    }
                } else {
                    sameSide = false
                }
                if (!sameSide) {

                    option.style.width = `${boxWidth + Event.clientX - startX}`;
                }
            }
            if (controlsSide === 'left') {
                if (Event.shiftKey) {
                    sameSide = true
                    let xMoving = startX - Event.clientX;
                    let number = xMoving > 0 ? xMoving : Math.abs(xMoving);
                    if (xMoving > 0) {
                        option.style.width = `${boxWidth + Number([number * 2])}px`;
                        option.style.left = `${boxLeft - number}px`
                    } else {
                        option.style.width = `${boxWidth - [number * 2]}px`;
                        option.style.left = `${boxLeft + number}px`;
                    }
                } else {
                    sameSide = false
                }
                if (!sameSide) {
                    let xMoving = startX - Event.clientX;
                    let number = xMoving > 0 ? xMoving : Math.abs(xMoving);
                    if (xMoving > 0) {
                        option.style.width = `${boxWidth + number}px`;
                        option.style.left = `${boxLeft - number}px`;
                    } else {
                        option.style.width = `${boxWidth - number}px`;
                        option.style.left = `${boxLeft + number}px`;
                    }
                }

            }
            if (controlsSide === 'top') {

                if (Event.shiftKey) {
                    sameSide = true
                    let yMoving = startY - Event.clientY;
                    let number = yMoving > 0 ? yMoving : Math.abs(yMoving);
                    if (yMoving > 0) {
                        option.style.height = `${boxHeight + Number([number * 2])}px`;
                        option.style.top = `${boxTop - number}px`;

                    } else {
                        option.style.top = `${boxTop + number}px`;
                        option.style.height = `${boxHeight - Number([number * 2])}px`;
                    }
                } else {
                    sameSide = false
                }
                if (!sameSide) {
                    let yMoving = startY - Event.clientY;
                    let number = yMoving > 0 ? yMoving : Math.abs(yMoving);
                    if (yMoving > 0) {
                        option.style.height = `${boxHeight + number}px`;
                        option.style.top = `${boxTop - number}px`;
                    } else {
                        option.style.top = `${boxTop + number}px`;
                        option.style.height = `${boxHeight - number}px`;
                    }
                }
            }
            if (controlsSide === 'bottom') {
                if (Event.shiftKey) {
                    sameSide = true
                    let yMoving = startY - Event.clientY;
                    let number = yMoving > 0 ? yMoving : Math.abs(yMoving);
                    if (yMoving < 0) {
                        option.style.height = `${boxHeight + Number([number * 2])}px`;
                        option.style.top = `${boxTop - number}px`;

                    } else {
                        option.style.top = `${boxTop + number}px`;
                        option.style.height = `${boxHeight - Number([number * 2])}px`;
                    }
                } else {
                    sameSide = false
                }
                if (!sameSide) {
                    let yMoving = startY - Event.clientY;
                    let number = yMoving > 0 ? yMoving : Math.abs(yMoving);

                    option.style.height = `${boxHeight + number}px`;
                    if (yMoving > 0) {
                        option.style.height = `${boxHeight - number}px`;
                    } else {
                        option.style.height = `${boxHeight + number}px`;
                    }
                }
            }
            if (containsText) {
                option.querySelector('.control-text').style.fontSize = (boxWidth + Math.abs(Event.clientX - startX)) / 8.5;
            }

            if (option.querySelector('.text-width')) {
                option.querySelector('.text-width').innerText = option.style.width.replace('px', '');
                option.querySelector('.text-height').innerText = option.style.height.replace('px', '');
            }
        }
    })

    checkBody.addEventListener('mouseup', function (Event) {
        if (!is_moveing) return
        is_moveing = false;
        selected = false;
        rotateMove = false;
        containsText = false
        selectElement.width = Number(getElement.style.width.replace('px', ''))
        selectElement.left = Number(getElement.style.left.replace('px', ''))
        selectElement.height = Number(getElement.style.height.replace('px', ''))
        selectElement.top = Number(getElement.style.top.replace('px', ''))
        selectElement.rotate = Number(getElement.style.rotate.replace('deg', ''))


        boxRotate !== selectElement.rotate ? rotateMoving(selectElement.rotate) : '';
        if (boxTop === selectElement.top && boxLeft === selectElement.left && boxRotate === selectElement.rotate &&
            boxWidth === selectElement.width && boxHeight === selectElement.height) return

        addHistory({
            action: 'shapeResizeFunction',
            backTop: boxTop, backLeft: boxLeft, backWidth: boxWidth, backHeight: boxHeight,
            backRotate: boxRotate, forwordRotate: selectElement.rotate,
            forwordTop: selectElement.top, forwordLeft: selectElement.left, forwordWidth: selectElement.width, forwordHeight: selectElement.height,
            selectShape: selectElement.selectShape, shadesID: selectElement.shadesID,
            element: selectElement.element, shape: selectElement.shape,
        })
    })
}

export { ResizeElement }
