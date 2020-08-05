const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
					parse: {
						// we want terser to parse ecma 8 code. However, we don't want it
						// to apply any minfication steps that turns valid ecma 5 code
						// into invalid ecma 5 code. This is why the 'compress' and 'output'
						// sections only apply transformations that are ecma 5 safe
						// https://github.com/facebook/create-react-app/pull/4234
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						// Disabled because of an issue with Uglify breaking seemingly valid code:
						// https://github.com/facebook/create-react-app/issues/2376
						// Pending further investigation:
						// https://github.com/mishoo/UglifyJS2/issues/2011
						comparisons: false,
						// Disabled because of an issue with Terser breaking valid code:
						// https://github.com/facebook/create-react-app/issues/5250
						// Pending futher investigation:
						// https://github.com/terser-js/terser/issues/120
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						// Turned on because emoji and regex is not minified properly using default
						// https://github.com/facebook/create-react-app/issues/2488
						ascii_only: true,
					},
				},
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
			}),
		],
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
				test: /\.(ttf|eot|woff|woff2|mp3|gif|png|jpe?g|svg)$/,
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
