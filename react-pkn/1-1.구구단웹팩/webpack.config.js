const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval', // hidden-source-map
    resolve : {
        extensions : ['.js', '.jsx']
    },

    entry : {
        //app : ['./client.jsx', './WordRelay.jsx'],
        app : ['./client'], // 이미 client에서 불러왔기에 삭제
    },

    module : {
        rules : [{
            test :  /\.jsx?$/,
            loader : 'babel-loader',
            options : {
                presets : ['@babel/preset-env', '@babel/preset-react'],
             
            },
        }],
    },

    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
    },

}