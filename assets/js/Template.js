import { templateContainer, sectionContainer,  deleteTotalPage } from './main.js'

function addTemplate(onPage) {

    sectionContainer.insertAdjacentHTML('beforeend', ` <div class="section--container__canvas center canvas--sheet-${onPage}" data-canvas="${onPage}">
    <div class="section--info">
    <p class="section--info__number">Page - <span>${onPage}</span></p>
    </div>
    <div class="section--container__content">
    
    </div>
    </div>`)
    document.querySelector('.template-view.active')?.classList.remove('active');
    templateContainer.insertAdjacentHTML('beforeend', `<div class="template-view active" style="order:${onPage};" data-template="${onPage}">
            <div class="template-number">${onPage}</div>
    </div>`)
}

function removeTemplate(onpage) {
    onpage.canvasContent.remove(); 
    document.querySelector(`.template-view[data-template="${onpage.activePage}"]`).remove();
    deleteTotalPage();
}
export { addTemplate, removeTemplate }