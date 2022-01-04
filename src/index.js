import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import store from './store'

import App from './App'
import './App.less'
import '@/styles/index.less'
import './mock'
import '@/lib/monitor'

ReactDOM.render(
  <React.StrictMode>
  	{/*ConfigProvider:antd全局化配置*/}
  	<ConfigProvider locale={zhCN}>
  		{/*Provier:让App的所有的后代容器组件都能接受到store*/}
		<Provider store={store}>
  			<App />
  		</Provider>
  	</ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)