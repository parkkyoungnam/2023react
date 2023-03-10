const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

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

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {browsers: ['last 2 chrome versions']},
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: ['react-refresh/babel'],
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },

    plugins: [
        new RefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
    },
    
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    }

}