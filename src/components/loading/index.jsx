import React from 'react'
import './index.scss'

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-content">
        <div class="loading-icon"></div>
        <span className="loading-text">Loading...</span>
      </div>
    </div>
  )
}
