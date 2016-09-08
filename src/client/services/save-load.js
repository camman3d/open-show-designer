import { load } from './actions';

let saveLoad = {
    save(document) {
        console.log('save', document);
    },
    open() {
        console.log('open');
    }
};

if (process.env.TARGET === 'electron') {
    saveLoad = require('electron').remote.require('./save-load');
}

export function save(document) {
    saveLoad.save(document);
}

export function open() {
    saveLoad.open(document => load(document));
}