
const margin = 20;

export default function computeWidth(duration, zoom) {
    return {width: (duration / 1000) * zoom + 2 * margin};
}