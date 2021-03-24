import React, { Component } from 'react'
import history from '../../utils/history'
import Icon from '../icon'
import './index.scss'

export default class Navbar extends Component {
  goBack = () => {
    if (this.props.onBack) {
      this.props.onBack()
    } else {
      history.goBack()
    }
  }
  render() {
    const { title, children, renderRight } = this.props

    return (
      <div className="xtm-container">
        <div className="navbar">
          <div className="navbar-left" onClick={this.goBack}>
            <Icon type="back" />
          </div>
          <div className="navbar-title">{title}</div>
          <div className="navbar-right">{renderRight && renderRight()}</div>
        </div>
        <div className="xtm-body">{children}</div>
      </div>
    )
  }
}
