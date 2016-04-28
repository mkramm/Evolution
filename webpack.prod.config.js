var webpack = require('webpack'); // Requiring the webpack lib

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index.jsx'
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel'
			}, {
				test: /\.css$/,
				loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};