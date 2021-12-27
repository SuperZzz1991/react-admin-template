import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'

import Content from './Content'
import Header from './Header'
import RightPanel from './RightPanel'
import Sider from './Sider'
import TagsView from './TagsView'

const Main = (props) => {
  const { tagsView } = props
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider />
        <Layout>
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <Header />
                {tagsView ? <TagsView /> : null}
                <Content />
                <RightPanel />
            </Scrollbars>
        </Layout>
    </Layout>
  )
}
export default connect(state => state.settings)(Main)
