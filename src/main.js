const { app, BrowserWindow, crashReporter } = require('electron');
let dataTransmitter = require('./data-transmitter');
let osc = require('node-osc');
let server = new osc.Server(12345, '127.0.0.1');

//crashReporter.start({
//    productName: 'Open Show Designer',
//    companyName: 'Josh Monson'
//});

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1360, height: 800});

    mainWindow.loadURL('file://' + __dirname + '/view/app.html');

    server.on('message', msg => {
        console.log(msg);
        let show = msg[0].split('/')[2];
        mainWindow.webContents.executeJavaScript(`startShow('${show}')`);
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
        dataTransmitter.closeClients();
    });
});