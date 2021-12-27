import React from 'react'
import { connect } from 'react-redux'
import { Modal, Layout, Button } from 'antd'

import FullScreen from '@/components/FullScreen'
import Settings from '@/components/Settings'
import Hamburger from '@/components/Hamburger'
import BreadCrumb from '@/components/BreadCrumb'

import { logout, getUserInfo } from '@/store/actions'

import './index.less'

const { Header } = Layout

const LayoutHeader = (props) => {
  const {
    token,
    name,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props
  token && getUserInfo(token)

  const handleLogout = () => {
    Modal.confirm({
      title: '注销',
      content: '确定要退出系统吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
          logout(name)
      }
    })
  }

  const computedStyle = () => {
    let styles
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: 'calc(100% - 80px)',
        }
      } else {
        styles = {
          width: 'calc(100% - 200px)',
        }
      }
    } else {
      styles = {
        width: '100%',
      }
    }
    return styles
  }
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? 'fix-header' : ''}
      >
        <Hamburger />
        <BreadCrumb />
        <div className='right-menu'>
          <FullScreen />
          <span>欢迎登录，{name}！</span>
          <Button type='link' size='small' onClick={handleLogout}>注销</Button>
          {showSettings ? <Settings /> : null}
        </div>
      </Header>
    </>
  )
}

const mapStateToProps = state => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  }
}
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader)
