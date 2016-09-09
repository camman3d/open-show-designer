const { dialog } = require('electron');
const fs = require('fs');
const mime = require('mime');

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

exports.openMedia = function (callback) {
    dialog.showOpenDialog({
        title: 'Open show',
        filters: [
            {name: 'Mpeg Media File', extensions: ['mp4', 'mp3']}
        ],
        properties: ['openFile']
    }, filename => {
        if (!filename) {
            return;
        }
        console.log('opening media', filename);
        let data = fs.readFileSync(filename[0]);
        let mimeType = mime.lookup(filename[0]);
        let url = 'data:' + mimeType + ';base64,' + data.toString('base64');
        callback({
            src: filename[0],
            mimeType,
            url
        });
    });
};