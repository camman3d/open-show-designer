export default function getGlobalOffset(element, state = {left: 0, right: 0}) {
    if (element.tagName === 'BODY') {
        return state;
    }
    state.left += element.offsetLeft;
    state.top += element.offsetTop;
    return getGlobalOffset(element.parentElement, state);
}