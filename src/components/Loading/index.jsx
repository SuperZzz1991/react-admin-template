import React, { useEffect } from 'react'
import { Spin } from 'antd'
// progress bar
import NProgress from 'nprogress'
// progress bar style
import 'nprogress/nprogress.css'
// NProgress Configuration
NProgress.configure({ showSpinner: false })

const Loading = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <div className='app-container'>
      <Spin />
    </div>
  )
}

export default Loading
