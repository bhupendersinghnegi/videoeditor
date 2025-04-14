function easeInSine(inputValue) {
    return 1 - Math.cos((inputValue * Math.PI) / 2);
}
function easeOutSine(inputValue) {
    return Math.sin((inputValue * Math.PI) / 2);
}
function easeInOutSine(inputValue) {
    return -(Math.cos(Math.PI * inputValue) - 1) / 2;
}
export { easeInSine, easeOutSine, easeInOutSine }