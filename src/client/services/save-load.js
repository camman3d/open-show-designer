import { load } from './actions';

let saveLoad = {
    save(document) {
        console.log('save (copy and paste):');
        console.log(JSON.stringify(document));
    },
    open() {
        let input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.addEventListener('change', () => {
            let file = input.files[0];
            var reader = new FileReader();
            reader.onloadend = () => {
                load(JSON.parse(reader.result));
                document.body.removeChild(input);
            };
            reader.readAsText(file);
        });
        document.body.appendChild(input);
        input.click();
    },
    openMedia(callback) {
        let input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.addEventListener('change', () => {
            let file = input.files[0];
            var reader = new FileReader();
            reader.onloadend = () => {
                callback({
                    src: file.name,
                    mimeType: file.type,
                    url: reader.result
                });
                document.body.removeChild(input);
            };
            reader.readAsDataURL(file);
        });
        document.body.appendChild(input);
        input.click();
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

export function openMedia() {
    return new Promise(resolve => {
        saveLoad.openMedia(d => resolve(d));
    });
}