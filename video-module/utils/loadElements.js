import { Image, registerFont } from "canvas";
import { timer as timerElement } from "../index.js";
function imageLoder(context, timer, item) {
    const { X, Y, width, height, startrotate, url, animationName, opacityfrom, resizing, opacity, } = timer[item];
    if (resizing) return

    context.save();
    const img = new Image()
    img.onload = () => {
        context.translate(X + width / 2, Y + height / 2);
        startrotate ? context.rotate(startrotate * Math.PI / 180) : '';
        if (typeof opacity == 'number') {
            context.globalAlpha = animationName === "fadeBox" ? opacityfrom : opacity;
        } else {
            context.globalAlpha = animationName === "fadeBox" ? timerElement[opacity].opacityfrom : opacity;
        }

        animationName == 'flipbox' ? context.scale(timer[item].flipX, timer[item].flipY) : '';
        // console.log(timer[item].flip);

        context.drawImage(img, -width / 2, -height / 2, width, height)
    };
    img.onerror = err => { throw err }
    img.src = url;
    context.restore();
}
function shapesLoder(context, timer, item) {
    const { X, Y, width, height, bg, rotate, animationName, resizing, opacityfrom, opacity } = timer[item];
    if (resizing) return
    context.save();
    context.fillStyle = bg;
    context.translate(X + width / 2, Y + height / 2);
    rotate ? context.rotate(rotate * Math.PI / 180) : '';


    if (typeof opacity == 'number') {
        context.globalAlpha = animationName === "fadeBox" ? opacityfrom : opacity;
    } else {
        context.globalAlpha = timerElement[opacity].opacityfrom;
    }

    context.fillRect(-width / 2, -height / 2, width, height);
    context.restore();
}
function fontLoader(context, timer, item) {
    const {
        X, Y, width, height, rotate, resizing,
        color, fontfamily, textvalue, animationName, opacityfrom, opacity
    } = timer[item];
    if (resizing) return

    context.save();

    registerFont(fontfamily, { family: 'thisfont' });
    context.font = `${(width / textvalue.length) * 1.5}px 'thisfont'`;
    context.fillStyle = color;
    context.translate(X + width / 2, Y + height / 2);
    rotate ? context.rotate(rotate * Math.PI / 180) : '';
    if (typeof opacity == 'number') {
        context.globalAlpha = animationName === "fadeBox" ? opacityfrom : opacity;
    } else {
        context.globalAlpha = timerElement[opacity].opacityfrom;
    }
    context.fillText(textvalue, -width / 2, -height / 2, width, height);
    context.restore();

}
export { imageLoder, shapesLoder, fontLoader }