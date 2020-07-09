const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const isDEV = process.env.NODE_ENV === 'development' ? true : false;
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
const buildName = process.argv[2] ? process.argv[2] : 'game_one';

module.exports = {
	watch: true,
	mode: process.env.NODE_ENV,
	entry: {
		[buildName]: `./src/${buildName}/js/index.js`,
	},
	output: {
		filename: '[name]/index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, `src/${buildName}`),
		compress: true,
		port: 3000,
		overlay: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	optimization: optimization(),
	plugins: [
		new HtmlWebpackPlugin({
			template: `./src/${buildName}/index.html`,
			filename: `${buildName}/index.html`,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `${buildName}/index.css`,
		}),
	],
	module: {
		rules: [
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
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
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
