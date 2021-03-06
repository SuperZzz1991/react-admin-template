import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import menuList from '@/config/menuConfig'
import './index.less'

const BreadCrumb = props => {
    const { location } = props
    const { pathname } = location

    const [path, setPath] = useState([])

    useEffect(() => {
        getPath()
    },[pathname])

    const getPath = () => {
        let currentPath =[]
        try {
            menuList.map(menuNode => getNodePath(menuNode, currentPath))
        } catch (e) {
            const first = currentPath && currentPath[0]
            if (first && first.title.trim() !== '首页') {
              currentPath = [{ title: '首页', path: '/dashboard' }].concat(currentPath)
            }
            setPath(currentPath)
        }
    }

    /**
     * 根据当前浏览器地址栏的路由地址，在menuConfig中查找路由跳转的路径
     * 如路由地址为/charts/keyboard,则查找到的路径为[{title: '图表',...},{title: '键盘图表',...}]
     */
    const getNodePath = (node, temppath) => {
        temppath.push(node)
        //找到符合条件的节点，通过throw终止掉递归
        if (node.path === pathname) {
            throw new Error('GOT IT!')
        }
        if (node.children && node.children.length > 0) {
            node.children.map(childNode => getNodePath(childNode, temppath))
            //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
            temppath.pop()
        } else {
            //找到叶子节点时，删除路径当中的该叶子节点
            temppath.pop()
        }
    }

    return (
        <div className='Breadcrumb-container'>
            <Breadcrumb>
                {path &&
                    path.map((item) =>
                        item.title === '首页' ? (
                            <Breadcrumb.Item key={item.path}>
                                <a href={`#${item.path}`}>{item.title}</a>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
                        )
                  )}
            </Breadcrumb>
        </div>
    )
}

export default withRouter(BreadCrumb)
