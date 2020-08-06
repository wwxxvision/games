const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDEV = process.env.NODE_ENV === 'development';
const optimization = () => {
	let config = [];
	if (!isDEV) {
		config = [new OptimizeCssAssetsPlugin()];
	}

	return config;
};
require('babel-polyfill');
const buildName = 'game_four';

module.exports = {
	watch: true,
	mode: 'development',
	entry: {
		[buildName]: __dirname + `/src/${buildName}/js/index.js`,
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
				cache: true,
				parallel: true,
				sourceMap: !isDEV,
			}),
		],
	},
	output: {
		publicPath: './',
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
				test: /\.(ttf|eot|woff|woff2|mp3)$/,
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
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {
								let dirNameInsideAssets = path.relative(
									path.join(__dirname, 'src', 'assets'),
									path.dirname(file)
								);
								return `${dirNameInsideAssets}/[name].[ext]`;
							},
							// publicPath: './src/assets', // use relative path
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							disable: !isDEV,
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
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
