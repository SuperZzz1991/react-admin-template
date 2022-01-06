import React, { useState, useEffect } from 'react'
import { Table, Tag, Form, Button, Input, message, Collapse } from 'antd'
import { FileOutlined, FileZipOutlined } from '@ant-design/icons'

import {useRequest} from '@/utils/request'
import {excelApi} from '@/config/api'

const { Panel } = Collapse
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: 200,
        align: 'center'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        align: 'center'
    },
    {
        title: 'Author',
        key: 'author',
        dataIndex: 'author',
        width: 100,
        align: 'center',
        render: (author) => <Tag key={author}>{author}</Tag>
    },
    {
        title: 'Readings',
        dataIndex: 'readings',
        key: 'readings',
        width: 195,
        align: 'center'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 195,
        align: 'center'
    }
]

const Zip = () => {
    const [datasource, setDatasource] = useState([])
    const [filename, setFilename] = useState('file')
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(() => {
        fetchData()
        return () => {
          // 卸载前执行的方法
        }
    }, [])

    const {request} = useRequest(excelApi.getList())
    const fetchData = async() => {
        const {data = {}, error} = await request()
        if(error) return
        setDatasource(data.data)
    }

    const handleFilenameChange = e => {
        setFilename(e.target.value)
    }

    const handleOnSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows)
        setSelectedRowKeys(selectedRowKeys)
    }

    const handleDownload = type => {
        if (type === 'selected' && selectedRowKeys.length === 0) {
            message.error('至少选择一项进行导出')
            return
        }
        setDownloadLoading(true)
        import('@/lib/Export2Zip').then(zip => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = ['id', 'title', 'author', 'readings', 'date']
            const list = type === 'all' ? datasource : selectedRows
            const data = formatJson(filterVal, list)
            zip.export_txt_to_zip(
                tHeader,
                data,
                filename,
                filename
            )
            // 导出完成后将多选框清空
            setSelectedRowKeys([])
            setDownloadLoading(false)
        })
    }

    const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
    }

    return(
        <div className='app-container'>
            <Collapse defaultActiveKey={['1']}>
                <Panel header='导出选项' key='1'>
                    <Form layout='inline'>
                        <Form.Item label='文件名:'>
                            <Input
                                style={{ width: '250px' }}
                                prefix={
                                    <FileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                placeholder='请输入文件名(默认file)'
                                onChange={handleFilenameChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                icon={<FileZipOutlined />}
                                onClick={() => handleDownload('all')}
                            >
                                全部导出
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                icon={<FileZipOutlined />}
                                onClick={() => handleDownload('selected')}
                            >
                                导出已选择项
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
            <br />
            <Table
                bordered
                columns={columns}
                rowKey={record => record.id}
                dataSource={datasource}
                pagination={false}
                rowSelection={{
                    selectedRowKeys,
                    onChange: handleOnSelectChange
                }}
                loading={downloadLoading}
            />
        </div>
    )
}

export default Zip
