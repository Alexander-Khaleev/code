const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,"./dist"),   // папка, в том числе, для HtmlWebpackPlugin
        filename: 'app.bundle.js'
    },
	module: {
	rules: [	
		{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
		},
		{
		test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })	
		}	
		]
	},
	 devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9001,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project demo',          // кастомизируем шаблон
            // minify: { collapseWhitespace: true },
            template: 'src/index.html'      // каркас для выходного 'шаблона'
        }),
		new ExtractTextPlugin("styles.css"),
    ]
}