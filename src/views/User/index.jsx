import React, {useEffect, useState} from 'react'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {Button, Card, message, Space, Table} from 'antd'
import TypingCard from '@/components/TypingCard'

import {useRequest} from '@/utils/request'
import {userApi} from '@/config/api'

const { Column } = Table

const User = () => {
    const [datasource, setDatasource] = useState([])
    useEffect(() => {
        fetchData()
        return () => {
            // 卸载前执行的方法
        }
    }, [])

    const {request:getListRequest} = useRequest(userApi.getList())
    const fetchData = async() => {
        const {data = {}, error} = await getListRequest()
        if(error) return
        setDatasource(data.data)
    }

    const {request:deleteRequest} = useRequest(userApi.delete())
    const handleDelete = async (row) => {
        const { id } = row
        if (id === 'admin') {
            message.error('不能删除管理员用户！')
            return
        }
        const {error} = await deleteRequest({id:row.id})
        if(error) return
        message.success('删除成功')
        fetchData()
    }

    const handleAdd = () => {
        message.warn('参考表格菜单中的实现方法！')
    }

    const handleEdit = (row) => {
        message.warn('参考表格菜单中的实现方法！')
    }

    const cardContent = '在这里，你可以对系统中的用户进行管理，例如添加一个新用户，或者修改系统中已经存在的用户。'
    return (
        <div className='app-container'>
            <TypingCard title='用户管理' source={cardContent} />
            <br/>
            <Card title={
                <span>
                    <Button type='primary' onClick={handleAdd}>添加用户</Button>
                </span>
            }>
                <Table bordered rowKey='id' dataSource={datasource} pagination={false}>
                    <Column title='用户ID' dataIndex='id' key='id' align='center'/>
                    <Column title='用户名称' dataIndex='name' key='name' align='center'/>
                    <Column title='用户角色' dataIndex='role' key='role' align='center'/>
                    <Column title='用户描述' dataIndex='description' key='description' align='center' />
                    <Column title='操作' key='action' align='center' render={(text, row, index) => {
                        return(
                            <Space>
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(row)}>
                                    Edit
                                </Button>
                                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(row)}>
                                    Delete
                                </Button>
                            </Space>
                        )
                    }}/>
                </Table>
            </Card>
        </div>
    )
}

export default User
