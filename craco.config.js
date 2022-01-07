/* craco.config.js */
const CracoLessPlugin = require('craco-less')
const webpack = require('webpack')
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
	webpack: {
		alias: {
			'@': resolve('src')
		}
	},
	babel: {
		plugin: [
			'import', {
				libraryName: 'antd',
				libraryDirectory: 'es',
				// style按需加载
				// true => less
				// 'css' => css
				style: true
			}			
		]
	},
	plugins: [{
		plugin: CracoLessPlugin,
		options: {
			// less-loader配置
			lessLoaderOptions: {
				// 自定义主题
				lessOptions: {
					modifyVars: {
						// 主题颜色
						// '@primary-color': '#1DA57A'
					},
					javascriptEnabled: true
				}
			}
		}
	}]
}