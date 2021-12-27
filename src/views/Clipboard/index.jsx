import React from 'react'
import { Button, Row, Col } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

import clip from '@/utils/clipboard'

const Clipboard = () => {
    const text = 'Hello, React Admin Template'
    const handleCopy = (text, event) => {
        clip(text, event)
    }
    return(
        <div className='app-container'>
            <h1>点击下方的Copy按钮，可将以下文字复制到剪贴板</h1>
            <br />
            <Row>
                <Col span={12}>{text}</Col>
            </Row>
            <br />
            <Row>
                <Col span={2}>
                    <Button
                        type='primary'
                        icon={<CopyOutlined />}
                        onClick={e => handleCopy(text, e)}
                    >
                        Copy
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Clipboard
