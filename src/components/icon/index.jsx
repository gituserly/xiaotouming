import React from 'react'
import './index.scss'

const Icon = ({ type, className }) => {
  return <span className={`${className || ''} iconfont icon-${type}`}></span>
}
export default Icon
