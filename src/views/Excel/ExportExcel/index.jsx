import React, { useState, useEffect } from 'react'
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Radio,
  Select,
  message,
  Collapse
} from 'antd'
import { FileOutlined, FileExcelOutlined } from '@ant-design/icons'

import {useRequest} from '@/utils/useRequest'
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
        render: author => <Tag key={author}>{author}</Tag>
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

const Excel = () => {
    const [autoWidth, setAutoWidth] = useState(false)
    const [datasource, setDatasource] = useState([])
    const [filename, setFilename] = useState('excel-file')
    const [bookType, setBookType] = useState('xlsx')
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

    const handleAutoWidthChange = e => {
        setAutoWidth(e.target.value)
    }

    const handleBookTypeChange = value => {
        setBookType(value)
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

        import('@/lib/Export2Excel').then(excel => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = ['id', 'title', 'author', 'readings', 'date']
            const list = type === 'all' ? datasource : selectedRows
            const data = formatJson(filterVal, list)
            excel.export_json_to_excel({
                header: tHeader,
                data,
                filename,
                autoWidth,
                bookType
            })
            // 导出完成后将多选框清空
            setSelectedRowKeys([])
            setDownloadLoading(false)
        })
    }

    const formatJson = (filterVal, jsonData) => {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
                              <FileOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>
                            }
                            placeholder='请输入文件名(默认excel-file)'
                            onChange={handleFilenameChange}
                        />
                    </Form.Item>
                    <Form.Item label='自适应宽度:'>
                        <Radio.Group onChange={handleAutoWidthChange} value={autoWidth} >
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='文件类型:'>
                        <Select
                            defaultValue='xlsx'
                            style={{ width: 120 }}
                            onChange={handleBookTypeChange}
                        >
                            <Select.Option value='xlsx'>xlsx</Select.Option>
                            <Select.Option value='csv'>csv</Select.Option>
                            <Select.Option value='txt'>txt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            icon={<FileExcelOutlined />}
                            onClick={() => handleDownload('all')}
                        >
                            全部导出
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            icon={<FileExcelOutlined />}
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

export default Excel
