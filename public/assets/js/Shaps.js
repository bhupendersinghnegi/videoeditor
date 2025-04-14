import { updateOptions } from "./ActiveBox.js";
import {
    textBackgoundValue, bgBackgoundValue, shadesidUpdate,
    styleFontFamliy, styleFontWeight, styleFontSize, updateFetchElement, onPage,
} from "./main.js";
import { bgBackgound, textBackgound,
    fontCutActive, fontItalicActive, fontUppercaseActive,
} from "./MovmentHistory.js";
import { letterSpacing, inputLineHeight } from './UpdateFont.js'




function addElementCanvas(canvasContent, shadesID, addedElement, historyPage) {
    const { layername, rotate, slelectLayer, selectShape, shape = 'react', element, width, height, top, left, translate, bg, index, url = '',
        lineHeight = 1.4, letterSpace = 0, textDecoration = 'none', fontStyle = 'unset', textTransform = 'unset',
        value = 'add new text', size = 16, font = 'roboto', weight = 400, textalign = 'center', color = '#ddd', borderr = 100 } = addedElement;

    const setHistoryPage = historyPage ? historyPage : onPage;

    const selectSide = `<img src="assets/images/plus-center.png" alt="" width="20" height="20" class="img-fluid control-centerimages"/>
    <div class="control-layer control-item"></div>
    <div class="off-layer"></div>
    <div class="lines line-top" data-side="top"><div class="controls "></div></div>
    <div class="lines line-bottom" data-side="bottom"><div class="controls "></div></div>
    <div class="lines line-left" data-side="left"><div class="controls "></div></div>
    <div class="lines line-right" data-side="right"><div class="controls "></div></div>
    <div class="dots top" data-side="top"></div>
    <div class="dots right" data-side="right"></div>
    <div class="dots left" data-side="left"></div>
    <div class="dots bottom" data-side="bottom"></div>
    <div class="rotate">
        <div class="rotate-pick">
        <svg  viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M15.25 18.48V15a.75.75 0 1 0-1.5 0v4c0 .97.78 1.75 1.75 1.75h4a.75.75 0 1 0 0-1.5h-2.6a8.75 8.75 0 0 0-2.07-15.53.75.75 0 1 0-.49 1.42 7.25 7.25 0 0 1 .91 13.34zM8.75 5.52V9a.75.75 0 0 0 1.5 0V5c0-.97-.78-1.75-1.75-1.75h-4a.75.75 0 0 0 0 1.5h2.6a8.75 8.75 0 0 0 2.18 15.57.75.75 0 0 0 .47-1.43 7.25 7.25 0 0 1-1-13.37z"></path>
        </svg>
        </div>
    <div>`;


    if (document.querySelector('.control-box.active')) {
        document.querySelector('.control-box.active')?.classList.remove('active')
    }
    if (element === 'shape') {
        if (shape === 'react') {
            canvasContent.insertAdjacentHTML('beforeend', `<div data-shadesid="${shadesID}" data-element="${element}" data-shape="${shape}" class="control-box active" style="rotate:0deg;z-index:${index};width: ${width}px;height:  ${height}px;top:  ${top}px;left:  ${left}px;translate:  ${translate};rotate:${rotate}deg;background-color: ${bg};">
                                    <div class="control-size d-none"><span>W:<span class="text-width">${width}</span>px</span> | <span>H:<span class="text-height">${height}</span>px</span></div>
                                    <div class="control-item control-shapes"></div>
                                   ${selectSide}
                                    
                                </div>`)

        }

        if (shape === 'round') {
            canvasContent.insertAdjacentHTML('beforeend', `<div data-shadesid="${shadesID}" data-element="${element}" data-shape="${shape}" class="control-box active" style="z-index:${index};width: ${width}px;height:  ${height}px;top:  ${top}px;left:  ${left}px;border-radius:${borderr}%;translate:  ${translate};rotate:${rotate}deg;background-color: ${bg};">
                                    <div class="control-size d-none"><span>W:<span class="text-width">${width}</span>px</span> | <span>H:<span class="text-height">${height}</span>px</span></div>
                                    <div class="control-item control-shapes"></div>
                                    ${selectSide}
                                   `)
        }
        if (shape === 'line') {
            canvasContent.insertAdjacentHTML('beforeend', `<div data-shadesid="${shadesID}" data-element="${element}" data-shape="${shape}" class="control-box active" style="z-index:${index};width: ${width}px;height:  ${height}px;top:  ${top}px;left:  ${left}px;translate:  ${translate};rotate:${rotate}deg;background-color: ${bg};">
                                    <div class="control-size d-none"><span>W:<span class="text-width">${width}</span>px</span> | <span>H:<span class="text-height">${height}</span>px</span></div>
                                    <div class="control-item control-shapes"></div>
                                    ${selectSide}
                                   `)
        }

        bgBackgound.style.backgroundColor = '#ddd';
        bgBackgoundValue.value = '#ddd';

    }
    if (element === 'image') {
        canvasContent.insertAdjacentHTML('beforeend', `<div data-shadesid="${shadesID}" data-element="${element}" class="control-box active" style="z-index:${index};width: ${width}px;height:  ${height}px;top:  ${top}px;left:  ${left}px;rotate:${rotate}deg;">
        <div class="control-size d-none"><span>W:<span class="text-width">${width}</span>px</span> | <span>H:<span class="text-height">${height}</span>px</span></div>

        <img src="${url}" class="img-fluid control-item control-image"/>
        ${selectSide}
    </div>`)
    }
    if (element === 'text') {
        canvasContent.insertAdjacentHTML('beforeend', `<div data-shadesid="${shadesID}" data-element="${element}" class="control-box active" 
        style="z-index:${index};width: ${width}px;min-height:  ${height}px;top:  ${top}px;left:  ${left}px;rotate:${rotate}deg;">
        <div class="control-item control-text "  style="text-decoration:${textDecoration};font-style:${fontStyle};text-transform:${textTransform};letter-spacing:${letterSpace};line-height:${lineHeight};font-size:${size};font-family:${font};text-align:${textalign};font-weight:${weight};color:${color};">${value}</div>
        ${selectSide}
    </div>`)

        styleFontFamliy.value = font;
        styleFontWeight.value = weight;
        styleFontSize.value = size;
        textBackgoundValue.value = "#000";
        textBackgound.style.backgroundColor = "#000";
        fontCutActive.classList.remove('active');
        fontItalicActive.classList.remove('active');
        fontUppercaseActive.classList.remove('active');
        letterSpacing.value = letterSpace;
        inputLineHeight.value = lineHeight;
    }

    updateOptions(element);
    document.querySelector('.section--container__content.section__active')?.classList.remove('section__active');
    shadesidUpdate();
    addLayer(shadesID, element, Number(index), addedElement, layername, setHistoryPage);
}


function addLayer(shadesID, element, zIndex, addedElement, layername, setHistoryPage) {
    document.querySelector('.layers--element.active')?.classList.remove('active');
    
    const onLayersGroup = document.querySelector(`.layers--group[data-layer="${setHistoryPage}"]`);
    const HTML = ` <div class="layers--element active" style="order:${-zIndex};" data-element="${element}" data-layer="${shadesID}">
    <div class="layers--element__shadow"></div>
    <div class="layers--element__container">
    <div class="layers--name position-relative">
        <div class="layers--name-space">${layername}</div>
        <div class="layers-overname"></div>
    </div>

    <img src="assets/images/show-layer.png" class="layerimg layer-view ml-auto"
        alt="show and hide image" width="20">
    <img src="assets/images/lock-layer.png" class="layerimg layer-locker" alt="show and hide image"
        width="16" height="16">

    <div class="layer-options position-relative">

        <img src="assets/images/layer-option.png" class="layerimg layer-option" alt="show and hide image"
            width="16" height="16">
        <div class="layer-dropbox position-absolute">
            <div>
                <div class="layer-dropbox_option" data-funcation="duplicate">
                    Duplicate 
                    <span>Ctrl+Shift+V</span>
                </div>
                <div class="layer-dropbox_option" data-funcation="delete">
                    Delete
                    <span>Delete</span>
                </div>
                <div class="layer-dropbox_option border-top">
                    Layer
                    <div class="layer-option ml-auto">
                        <img src="assets/images/right-arrow.png" alt="right arrow" width="10" >
                        <div class="layer-dropbox position-absolute">
                            <div>
                                <div class="layer-dropbox_option" data-funcation="forword">
                                    Bring Forword
                                    <span>Shift+]</span>
                                </div>
                                <div class="layer-dropbox_option" data-funcation="back">
                                    Bring back
                                    <span>Shift+[</span>
                                </div>
                                <div class="layer-dropbox_option" data-funcation="allforword">
                                    Send to Forword
                                    <span>Ctrl+]</span>
                                </div>
                                <div class="layer-dropbox_option" data-funcation="allback">
                                    Send to back
                                    <span>Ctrl+[</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="layer-dropbox_option  border-bottom">
                    Align to page
                    <div class="layer-option ml-auto">
                        <img src="assets/images/right-arrow.png" alt="right arrow" width="10" >
                        <div class="layer-dropbox position-absolute">
                            <div>
                                <div class="layer-dropbox_option align-element" data-align="top">
                                    Top
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="right">
                                  Right
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="bottom">
                                  Bottom
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="left">
                                  Left
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="center">
                                  Center
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="ycenter">
                                  Y Center
                                </div>
                                <div class="layer-dropbox_option align-element" data-align="xcenter">
                                  X Center
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="layer-dropbox_option" data-funcation="lock">
                    Lock
                    <span>Ctrl+/</span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;
    onLayersGroup.insertAdjacentHTML('afterbegin', HTML);

  
    updateFetchElement(addedElement);
}

export { addElementCanvas }