import React, {useState} from 'react'
import {Form, Input, DatePicker, Select, Rate, Modal, message} from 'antd'

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const EditForm = (props)=> {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const {
    visible,
    changeVisiable,
    currentRowData
  } = props

  const [form] = Form.useForm()
  const { id, author, date, readings, star, status, title } = currentRowData
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 16 },
    }
  }

  const handleOk = () => {
    setConfirmLoading(true)
    form.validateFields().then(values => {
      const formValues = {
        ...values,
        date: values['date-picker']?values['date-picker'].format(dateFormat):date
      }
      console.log(formValues)
      message.success('编辑成功!')
    }).catch(e => {
      console.error('参数错误', e)
    })
    setTimeout(() => {
      setConfirmLoading(false)
      changeVisiable()
    },1000)
  }

  return (
      <Modal
          title='编辑'
          visible={visible}
          onCancel={changeVisiable}
          onOk={handleOk}
          confirmLoading={confirmLoading}
      >
        <Form form={form} {...formItemLayout} initialValues={{id,title,author,readings,star:star.length,status}}>
          <Form.Item label='序号:' name='id' >
            <Input disabled/>
          </Form.Item>
          <Form.Item label='标题:' name='title' rules={[{required: true, message: '请输入标题!'}]}>
            <Input/>
          </Form.Item>
          <Form.Item label='作者:' name='author'>
            <Input disabled/>
          </Form.Item>
          <Form.Item label='阅读量:' name='readings'>
            <Input disabled/>
          </Form.Item>
          <Form.Item label='推荐指数:' name='star'>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label='状态:' name='status'>
            <Select style={{ width: 120 }}>
              <Select.Option value='published'>published</Select.Option>
              <Select.Option value='draft'>draft</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='时间:' name='date-picker'>
            <DatePicker format={dateFormat} defaultValue={moment(date, dateFormat)} />
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default EditForm
