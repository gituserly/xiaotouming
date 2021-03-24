import React, { useEffect, useState, useRef } from 'react'
import cns from '../../utils/classnames'
import './index.scss'

const Failed = ({ text, defaultVisible }) => {
  const [visible, setVisible] = useState(false)
  const timer = useRef()

  useEffect(() => {
    if (defaultVisible) {
      clearTimeout(timer.current)
      setVisible(true)
      timer.current = setTimeout(() => {
        setVisible(false)
      }, 3000)
    }
  }, [defaultVisible])

  return (
    <div
      className={cns('failed', {
        visible: visible,
      })}
    >
      {text}
    </div>
  )
}
export default Failed
