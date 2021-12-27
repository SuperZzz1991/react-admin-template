import React from 'react'
import TypingCard from '@/components/TypingCard'
const Doc = () => {
  const cardContent = `
    开发文档请戳这里
    <a href='https://github.com/SuperZzz1991/react-admin-template' target='_blank'>
        react-antd-admin-template开发文档
    </a>。
  `
  return (
    <div className='app-container'>
      <TypingCard title='开发文档' source={cardContent}/>
    </div>
  )
}

export default Doc