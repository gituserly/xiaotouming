import React, { Component } from 'react'
import Icon from '../icon'
import ajax from '../../utils/ajax'
import './index.scss'

export default class MoreModal extends Component {
  state = {
    isreply: false,
    isfcous: false,
    isdianzan: false,
  }

  fcousUser = () => {
    ajax(
      `forum/collection/${localStorage.getItem('userId')}_${this.props.id}`,
      'POST'
    ).then(
      (res) => {
        console.log('fcous user success ', res)
        this.setState({ isfcous: true })
      },
      (rej) => {
        console.log('fcous user fail ', rej)
      }
    )
  }

  render() {
    return (
      <div className="instantsquare-display-show" onClick={this.props.onClose}>
        <div
          className="instantsquare-display"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="instantsquare-display-middle">
            <div
              className="instantsquare-display-header-fcous"
              onClick={this.fcousUser}
            >
              <div
                className={`instantsquare-display-header-imgfcous ${
                  this.state.isfcous === true ? 'fcousing' : ''
                }`}
              ></div>
              <div className="instantsquare-display-header-word">关注</div>
            </div>
            <div
              className="instantsquare-display-header-unlike"
              onClick={() => {
                this.setState({ isdianzan: true })
              }}
            >
              <div
                className={`instantsquare-display-header-imgunlike ${
                  this.state.isdianzan === true ? 'unlikeing' : ''
                }`}
              ></div>
              <div className="instantsquare-display-header-word">不喜欢</div>
            </div>
            <div className="instantsquare-display-header-jubao">
              <div className="instantsquare-display-header-imgjubao"></div>
              <div className="instantsquare-display-header-word">举报</div>
            </div>
          </div>
          <div
            className="instantsquare-display-footer"
            onClick={this.props.onClose}
          >
            取消
          </div>
        </div>
      </div>
    )
  }
}
