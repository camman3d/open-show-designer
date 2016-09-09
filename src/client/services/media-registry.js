
let mediaMap = {};



export function registerMedia(media) {
    mediaMap[media.src] = media;
}

export function getMedia(src) {
    return mediaMap[src];
}

export function unregister(src) {
    delete mediaMap[src];
}