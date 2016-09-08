const { dialog } = require('electron');
const fs = require('fs');

exports.save = function (document) {
    dialog.showSaveDialog({
        title: 'Save show',
        defaultPath: document.name,
        filters: [
            {name: 'JSON', extensions: ['json']}
        ]
    }, filename => {
        if (!filename) {
            return;
        }
        console.log('saving', filename);
        fs.writeFileSync(filename, JSON.stringify(document));
    });
};

exports.open = function (callback) {
    dialog.showOpenDialog({
        title: 'Open show',
        filters: [
            {name: 'JSON', extensions: ['json']}
        ],
        properties: ['openFile']
    }, filename => {
        if (!filename) {
            return;
        }
        console.log('opening', filename);
        let document = JSON.parse(fs.readFileSync(filename[0]));
        callback(document);
    });
};