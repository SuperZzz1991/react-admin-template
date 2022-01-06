import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'

import {useRequest} from '@/utils/request'
import {dashboardApi} from '@/config/api'

const columns = [
    {
        title: 'Order_No',
        dataIndex: 'order_no',
        key: 'order_no',
        width: 200
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 195,
        render: text => (`$${text}`)
    },
    {
        title: 'Status',
        key: 'tag',
        dataIndex: 'tag',
        width: 100,
        render: tag => (
            <Tag color={tag === 'pending' ? 'magenta' : 'green'} key={tag}>
                {tag}
            </Tag>
        )
    }
]

const TransactionTable = () => {
    const [datasource, setDatasource] = useState([])
    useEffect(() => {
        fetchData()
        return () => {
        // 卸载前执行的方法
        }
    }, [])

    const {request} = useRequest(dashboardApi.query)
    const fetchData = async() => {
        const {data = {}, error} = await request()
        if(error) return
        setDatasource(data.data)
    }

    return(
        <Table
            columns={columns}
            dataSource={datasource}
            pagination={false}
        />
    )
}

export default TransactionTable
