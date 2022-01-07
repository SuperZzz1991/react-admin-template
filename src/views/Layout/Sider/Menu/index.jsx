import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { addTag } from '@/store/actions'
import { getMenuItemInMenuListByProperty } from '@/utils'
import menuList from '@/config/menuConfig'

import './index.less'

const SubMenu = Menu.SubMenu

const MenuMain = props => {
    const { location, role, addTag } = props
    // 当前请求的路由路径
    const path = location.pathname

    const [menuTreeNode, setMenuTreeNode] = useState([])
    const [openKey, setOpenKey] = useState([])

    // filterMenuItem用来根据配置信息筛选可以显示的菜单项
    const filterMenuItem = item => {
        const { roles } = item
        if (role === 'admin' || !roles || roles.includes(role)) {
            return true
        } else if (item.children) {
            // 如果当前用户有此item的某个子item的权限
            return !!item.children.find((child) => roles.includes(child.role))
        }
        return false
    }

    // 菜单渲染
    const getMenuNodes = menuList => {
        return menuList.reduce((pre, item) => {
            if (filterMenuItem(item)) {
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                                {item.icon ? item.icon : null}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        setOpenKey([...openKey, item.path])
                    }

                    // 向pre添加<SubMenu>
                    pre.push(
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                    {item.icon ? item.icon : null}
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
            return pre
          }, [])
    }

    // 重新记录数组顺序
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const onDragEnd = result => {
        if (!result.destination) {
            return
        }
        const _items = reorder(
            menuTreeNode,
            result.source.index,
            result.destination.index
        )
        setMenuTreeNode(_items)
    }

    const handleMenuSelect = ({ key = '/dashboard' }) => {
        let menuItem = getMenuItemInMenuListByProperty(menuList, 'path', key)
        addTag(menuItem)
    }

    useEffect(() => {
        const _menuTreeNode = getMenuNodes(menuList)
        setMenuTreeNode(_menuTreeNode)
        handleMenuSelect(openKey)
    },[])



    return(
        <div className='sidebar-menu-container'>
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {/*占位：开发环境提示缺少，生成环境无影响*/}
                                {/*{provided.placeholder}*/}
                                {menuTreeNode.map((item, index) => (
                                    <Draggable
                                        key={item.key}
                                        draggableId={item.key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Menu
                                                    mode='inline'
                                                    theme='dark'
                                                    onSelect={handleMenuSelect}
                                                    selectedKeys={[path]}
                                                    defaultOpenKeys={openKey}
                                                >
                                                    {item}
                                                </Menu>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Scrollbars>
        </div>
    )
}

export default connect((state) => state.user, { addTag })(withRouter(MenuMain))
