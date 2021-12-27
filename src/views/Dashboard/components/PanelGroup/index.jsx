import React from 'react'
import { Row, Col } from 'antd'
import {
  UserOutlined,
  MessageOutlined,
  TransactionOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import CountUp from 'react-countup'

import './index.less'

const chartList = [
  {
    type: 'New Visits',
    icon: <UserOutlined className='New Visits' style={{ fontSize: 55, color: '#40c9c6' }} />,
    num: 102400,
  },
  {
    type: 'Messages',
    icon: <MessageOutlined className='Messages' style={{ fontSize: 55, color: '#36a3f7' }} />,
    num: 81212,
  },
  {
    type: 'Purchases',
    icon: <TransactionOutlined className='Purchases' style={{ fontSize: 55, color: '#f4516c' }} />,
    num: 9280,
  },
  {
    type: 'Shoppings',
    icon: <ShoppingCartOutlined  className='Shoppings' style={{ fontSize: 55, color: '#f6ab40' }} />,
    num: 13600,
  },
]

const PanelGroup = (props) => {
  const { handleSetLineChartData } = props
  return (
    <div className='panel-group-container'>
      <Row gutter={40} className='panel-group'>
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            onClick={handleSetLineChartData.bind(this, chart.type)}
            className='card-panel-col'
          >
            <div className='card-panel'>
              <div className='card-panel-icon-wrapper'>
                {chart.icon}
              </div>
              <div className='card-panel-description'>
                <p className='card-panel-text'>{chart.type}</p>
                <CountUp duration={1} end={chart.num} start={0} className='card-panel-num' />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PanelGroup
