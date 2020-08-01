const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDEV = false;
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};
	if (!isDEV) {
		config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
	}
};
require('babel-polyfill');
const buildName = 'game_one';

module.exports = {
	watch: true,
	mode: 'development',
	entry: {
		[buildName]: __dirname + `/src/${buildName}/js/index.js`,
	},
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
	output: {
		publicPath: '/',
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		host: '0.0.0.0',
		contentBase: path.join(__dirname, `dist`),
		compress: true,
		port: 3001,
		hot: true,
		overlay: true,
		disableHostCheck: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `./src/${buildName}/index.html`,
			filename: `index.html`,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `styles/index.css`,
		}),
		new VueLoaderPlugin(),
		new CopyPlugin({
			patterns: [{ from: 'locales', to: 'locales' }],
		}),
		// new OptimizeCssAssetsPlugin(),
		// new TerserPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js',
							},
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2|mp3)$/,
				loader: 'file-loader',
				options: {
					name: (file) => {
						let dirNameInsideAssets = path.relative(
							path.join(__dirname, 'src', 'assets'),
							path.dirname(file)
						);
						return `${dirNameInsideAssets}/[name].[ext]`;
					},
				},
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					'eslint-loader',
				],
			},
		],
	},
};
