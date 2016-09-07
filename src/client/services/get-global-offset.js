export default function getGlobalOffset(element, state = {left: 0, right: 0}) {
    if (element.tagName === 'BODY') {
        return state;
    }
    let rect = element.getBoundingClientRect();
    state.left += rect.left;
    state.right += rect.right;
    return getGlobalOffset(element.parentElement, state);
}