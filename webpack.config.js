let webpack = require('webpack');

module.exports = {
    target: process.env.TARGET,
    entry: [
        'babel-polyfill',
        './src/client/main.jsx'
    ],
    output: {
        path: __dirname + '/src/view',
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'},
            {test: /\.(jsx|js)?$/, loaders: ['babel'], exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.TARGET': '\'' + process.env.TARGET + '\''})
    ]
};