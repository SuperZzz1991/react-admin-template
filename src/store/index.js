/**
 *	该文件专门用于暴露store对象，整个应用仅需一个
 */

// 引入createStore，专门用于创建redux中最为核心的对象
import { createStore, applyMiddleware } from 'redux'
// 引入redux-thunk用于支持异步action
import reduxThunk from 'redux-thunk'
// 引入汇总之后的reducer
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(reduxThunk))

export default store