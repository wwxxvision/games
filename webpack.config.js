const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const isDEV = process.env.NODE_ENV === 'development';
const optimization = () => {
	let config = [];
	if (!isDEV) {
		config = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin({
				sourceMap: true,
			}),
		];
	}

	return config;
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
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
		},
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
		new CompressionPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.mp3$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
		...optimization(),
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
