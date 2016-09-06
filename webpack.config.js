let webpack = require('webpack');

module.exports = {
    target: 'web',
    entry: [
        'babel-polyfill',
        './src/client/main.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'},
            {test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/}
        ]
    }
};