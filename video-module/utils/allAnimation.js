// Filp the animation
function flipAnimation(timer, item, frameRate, onFrame) {
    const { flipstatusY, fliptoY, flipstatusX, fliptoX, timing, flipbox, frametiming } = timer[item];
    // Calculate the value of rotation
    function flipRotate(flipto, flipstatus, flipping) {

        const flipBox = (flipto - flipstatus) / (timing * frameRate);
        flipBox < 0 ?
            timer[item][flipping] -= Math.abs(flipBox) :
            timer[item][flipping] += Math.abs(flipBox);
    }

    if ((frametiming * frameRate) <= onFrame) {
        flipbox === 'Y' ? timer[item].flipY = fliptoY : timer[item].flipX = fliptoX;
    } else {
        flipbox === 'Y' ? flipRotate(fliptoY, flipstatusY, 'flipY') : flipRotate(fliptoX, flipstatusX, 'flipX');
    }
}
// Resize the element
function resizeingElement(timer, item, frameRate, animationName) {
    const { setX, toX, setY, toY, timing, resizeflow } = timer[item];

    const leftCount = (setX - toX) / (timing * frameRate);
    const topCount = (setY - toY) / (timing * frameRate);

    let X, Y;
    if (animationName === 'moveBox') {
        X = 'X';
        Y = 'Y';
    }
    if (animationName === 'resizeBox') {
        X = 'width';
        Y = 'height';
    }
    const leftLastCheck = setX - toX < 0 ? timer[item][X] + leftCount <= setX : timer[item][X] + leftCount >= setX;

    const topLastCheck = setY - toY < 0 ? timer[item][Y] + topCount <= setY : timer[item][Y] + topCount >= setY;


    leftLastCheck ? timer[item][X] = setX : timer[item][X] += leftCount;
    topLastCheck ? timer[item][Y] = setY : timer[item][Y] += topCount;

    // Other resize animations  
    const resizeAll = resizeflow === 'textUpdate' ? 4 : 2;
    if (resizeflow === 'all' || resizeflow === 'textUpdate') {
        leftLastCheck ? '' : timer[item]['X'] += -leftCount / resizeAll;
        topLastCheck ? '' : timer[item]['Y'] += -topCount / resizeAll;
    }
    if (resizeflow === 'right') {
        leftLastCheck ? '' : timer[item]['X'] += -leftCount;
    }
    if (resizeflow === 'bottom') {
        topLastCheck ? '' : timer[item]['Y'] += -topCount;
    }
}
// function for fade in and fade out
function fadeBox(timer, item, frameRate, onFrame) {
    const { opacitylast, opacity, timing, frametiming } = timer[item];
    const movement = Number((((opacitylast * 100 - opacity * 100) / (timing * frameRate)) / 100).toFixed(6));
    if ((frametiming * frameRate) <= onFrame) {
        timer[item].opacityfrom = opacitylast;
    } else {
        timer[item].opacityfrom += movement;
    }
}
// Ratates all the elements on canvas
function rotateBox(timer, item, frameRate, offAnimationbyFrame) {
    const { loop, position, rotate, startrotate, endrotate, timing } = timer[item];
    let rotationRate = rotate;
    if (loop === 'infinity') {
        return timer[item].startrotate += position === 'clockwise' ? 1 : -1;
    }
    if (offAnimationbyFrame) return
    if (loop) {
        const loopValue = loop * 360;
        rotationRate = (loopValue - rotate) / (timing * frameRate);
    } else {
        rotationRate = (endrotate - rotate) / (timing * frameRate);
    }
    timer[item].startrotate += position === 'clockwise' ? rotationRate : -rotationRate;
}
export { fadeBox, resizeingElement, rotateBox, flipAnimation }