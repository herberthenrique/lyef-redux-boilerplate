import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootPath = path.join(__dirname, '../', 'src');

const config = {
    entry: [
        path.join(__dirname, '../', 'src', 'app'),
    ],

    output: {
        path: path.join(__dirname, '../', 'dist'),
        filename: 'js/[name]_[hash].js',
        publicPath: '/',
    },

    resolve: {
        alias: {
            components: `${rootPath}/components`,
            containers: `${rootPath}/containers`,
            actions: `${rootPath}/actions`,
            reducers: `${rootPath}/reducers`,
            services: `${rootPath}/services`,
            views: `${rootPath}/views`,
        },
        extensions: ['', '.js', '.jsx', '.styl', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    ['css-loader', 'postcss-loader', 'stylus-loader']
                ),
            },

            {
                test: /\.(eot|woff2?|ttf)$/,
                loader: 'file-loader?limit=1024&name=/fonts/[name].[ext]',
            },

            {
                test: /\.(jpg|svg)$/,
                loader: 'file-loader?name=/images/[name].[ext]',
            },

            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /src\/styles\/vendor/],
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                },
            },
        ],
    },

    postcss: () => {
        return [
            require('autoprefixer'),
            require('postcss-discard-duplicates'),
            require('postcss-discard-unused')(),
        ];
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new ExtractTextPlugin('css/[name]_[contenthash].css'),
    ],
};

export default { ...config };
