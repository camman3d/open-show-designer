const { app, BrowserWindow, crashReporter } = require('electron');

//crashReporter.start({
//    productName: 'Open Show Designer',
//    companyName: 'Josh Monson'
//});

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1360, height: 800});

    mainWindow.loadURL('file://' + __dirname + '/src/view/app.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});