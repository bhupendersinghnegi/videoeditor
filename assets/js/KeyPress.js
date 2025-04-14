import { createElementByJson } from "./CreateElementByJson.js";
import { reversIndex, layerLoaked } from "./Layers.js";
import { elements, updateElements, deleteElement, fetchElement } from "./main.js";
import { backHistory, forwordHistory, addHistory } from "./MovmentHistory.js";

function keyPressed(Event) {
    // Ctrl+Z
    if (Event.ctrlKey && event.keyCode == 90 && !Event.shiftKey) {
        Event.preventDefault()
        backHistory()
    }
    // Ctrl+Y
    if (Event.ctrlKey && event.keyCode == 89) {
        // if (Event.ctrlKey && Event.shiftKey && event.keyCode == 90) {
        Event.preventDefault()
        forwordHistory()
    }
    // Ctrl+/ Loak layer by this commond
    if (Event.ctrlKey && event.keyCode == 191) {
        if (!fetchElement) return
        let layerLoakStatus;
        fetchElement.slelectLayer.classList.contains('layer-locked') ? layerLoakStatus = false : layerLoakStatus = true;
        layerLoaked(fetchElement.slelectLayer, layerLoakStatus)
    }
    const selectElement = document.querySelector('.control-box.active');
    if (!selectElement || fetchElement?.layerloaked) return
    // Ctrl+Shift+V  
    // Duplicate the layer
    if (Event.ctrlKey && Event.shiftKey && event.keyCode == 86) {
        createElementByJson(fetchElement, false)
    }
    // Ctrl+[
    if (Event.ctrlKey && event.keyCode == 219) {
        reversIndex(false, selectElement, fetchElement, true)
        // up or down, active element, fetchElement, commond by ctrl or shift
    }
    // Ctrl+]
    if (Event.ctrlKey && event.keyCode == 221) {
        reversIndex(true, selectElement, fetchElement, true)
    }
    // Shift+[
    if (Event.shiftKey && event.keyCode == 219) {
        reversIndex(false, selectElement, fetchElement)
    }
    // Shift+]
    if (Event.shiftKey && event.keyCode == 221) {
        reversIndex(true, selectElement, fetchElement)
    }
    // Delete
    if (event.keyCode == 46) {
        deleteElement(selectElement, fetchElement.shadesID, true)
    }
}


export { keyPressed }