import React, { useState, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
    Table,
    Tag,
    Form,
    Button,
    Input,
    Collapse,
    Pagination,
    Space,
    message,
    Select
} from 'antd'
import EditForm from './Forms/editForm'

import {tableApi} from '@/config/api'
import {useRequest} from '@/utils/useRequest'

const { Column } = Table
const { Panel } = Collapse

const TableComponent = () => {
    const [datasource, setDatasource] = useState([])
    const [total, setTotal] = useState(0)
    const [pageParams, setPageParams] = useState({
        pageNum: 1,
        pageSize: 10
    })
    const [modalVisible, setModalVisible] = useState(false)
    const [currentRowData, setCurrentRowData] = useState({
        id: 1,
        author: '',
        date: '',
        readings: 0,
        star: '★',
        status: 'published',
        title: ''
    })

    useEffect(() => {
        fetchData()
        return () => {
            // 卸载前执行的方法
        }
    },[pageParams])

    const {loading, request:pageInfoRequest} = useRequest(tableApi.pageInfo())
    const fetchData = async() => {
        const {data = {}, error} = await pageInfoRequest({...pageParams})
        if(error) return
        setDatasource(data.data.items)
        setTotal(data.data.total)
    }

    const handlePaginationChange = (pageNum, pageSize) => {
        setPageParams({
            pageNum,
            pageSize
        })
    }

    const {request:deleteRequest} = useRequest(tableApi.delete())
    const handleDelete = async (row) => {
        const {error} = await deleteRequest({id:row.id})
        if(error) return
        message.success('删除成功')
        fetchData()
    }

    const handleEdit = (row) => {
        setCurrentRowData(Object.assign({}, row))
        changeModalVisiable()
    }

    const changeModalVisiable = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <div className='app-container'>
            <Collapse defaultActiveKey={['1']}>
                <Panel header='筛选' key='1'>
                    <Form layout='inline'>
                        <Form.Item label='标题:'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='类型:'>
                            <Select style={{ width: 120 }}>
                                <Select.Option value='published'>published</Select.Option>
                                <Select.Option value='draft'>draft</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='推荐指数:'>
                            <Select style={{ width: 120 }}>
                                <Select.Option value={1}>★</Select.Option>
                                <Select.Option value={2}>★★</Select.Option>
                                <Select.Option value={3}>★★★</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' icon={<SearchOutlined />} onClick={fetchData}>
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
            <br />
            <Table
                bordered
                rowKey={record => record.id}
                dataSource={datasource}
                loading={loading}
                pagination={false}
            >
                <Column title='序号' dataIndex='id' key='id' width={200} align='center' sorter={(a, b) => a.id - b.id}/>
                <Column title='标题' dataIndex='title' key='title' width={200} align='center'/>
                <Column title='作者' dataIndex='author' key='author' width={100} align='center'/>
                <Column title='阅读量' dataIndex='readings' key='readings' width={195} align='center'/>
                <Column title='推荐指数' dataIndex='star' key='star' width={195} align='center'/>
                <Column title='状态' dataIndex='status' key='status' width={195} align='center' render={status => {
                    let color = status === 'published' ? 'green' : status === 'deleted' ? 'red' : ''
                    return (
                        <Tag color={color} key={status}>
                            {status}
                        </Tag>
                    )
                }}/>
                <Column title='时间' dataIndex='date' key='date' width={195} align='center'/>
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
            <br />
            <Pagination
                total={total}
                pageSizeOptions={['10', '20', '50']}
                showTotal={total => `共${total}条数据`}
                current={pageParams.pageNum}
                pageSize={pageParams.pageSize}
                onChange={handlePaginationChange}
                showSizeChanger
                showQuickJumper
                hideOnSinglePage={true}
            />
            <EditForm
                currentRowData={currentRowData}
                visible={modalVisible}
                changeVisiable={changeModalVisiable}
            />
        </div>
    )
}

export default TableComponent
