const path = require('path');

module.exports = {
	// entry: ['@babel/polyfill', './src/main.js'],
	entry: ['@babel/polyfill', './src/main.js'],
	output: {
		path: path.resolve(__dirname, 'www/js'),
		filename: 'bundle.js',
		publicPath: "/"
	},
	devServer: {
		historyApiFallback: true,
		// contentBase: path.join(__dirname, 'dist'),
	},
	mode: "development",
	watch: true,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env',
							'@babel/react',{
								'plugins': ['@babel/plugin-proposal-class-properties']}]
					}
				}

			}
		]
	}
};
