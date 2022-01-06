import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Button, message, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import DocumentTitle from 'react-document-title'

import { userLogin, userInfo } from '@/store/actions'

import './index.less'

const Login = (props) => {
  const { token, userLogin, userInfo } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true)
    userLogin(username, password).then(data => {
      message.success('登录成功')
      handleUserInfo(data)
    }).catch(error => {
      setLoading(false)
      message.error(error)
    })
  }

  // 获取用户信息
  const handleUserInfo = (token) => {
    userInfo(token).catch(error => {
      message.error(error)
    })
  }

  const handleFinish = () => {
    form.validateFields().then(values => {
      const { username, password } = values
      handleLogin(username, password)
    }).catch(e => {
      console.error('参数错误', e)
    })
  }

  if (token) {
    return <Redirect to='/dashboard' />
  }

  return (
    <DocumentTitle title={'用户登录'}>
      <div className='login-container'>
        <Form form={form} onFinish={handleFinish} className='content' initialValues={{ username: 'admin',password: '123456' }}>
          <div className='title'>
            <h2>用户登录</h2>
          </div>
          <Spin spinning={loading} tip='登录中...'>
            <Form.Item name='username' rules={[{required: true, whitespace: true, message: '请输入用户名'}]}>
              <Input
                prefix={<UserOutlined />}
                placeholder='username'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{required: true, whitespace: true, message: '请输入密码'}]}>
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <span>账号：admin/editor/guest</span>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  )
}

// const WrapLogin = Form.create()(Login)

export default connect((state) => state.user, { userLogin, userInfo })(
    Login
)
