import React, { Component } from 'react'
import Icon from '../icon'
import ajax from '../../utils/ajax'
import './index.scss'

export default class MoreModal extends Component {
  state = {
    isreply: false,
    isfcous: false,
    isdianzan: false,
    col_flag:this.props.flag,
    un_flag:this.props.unflag
  }

  fcousUser = () => {
    console.log("this.props.flage",this.props.flag)
   
    if(this.state.col_flag==2)
    {
      ajax(
        `forum/collection/${localStorage.getItem('userId')}_${this.props.id}`,
        'POST'
      ).then(
        (res) => {
          console.log('fcous user success ', res)
          this.setState({ col_flag: 1 })
        },
        (rej) => {
          console.log('fcous user fail ', rej)
        }
      )

    }
    if(this.state.col_flag===1)
    {
      ajax(
        `forum/collection/${localStorage.getItem('userId')}_${this.props.id}`,
        'DELETE'
      ).then(
        (res) => {
          console.log('quxiao fcous user success ', res)
          this.setState({ col_flag: 2})
        },
        (rej) => {
          console.log('quxiao fcous user fail ', rej)
        }
      )

    }
  
  }

  notLike = () => {
    console.log("this.props.flage",this.props.flag)
   
    if(this.state.un_flag==2)
    {
      ajax(
        `forum/unfavor/${localStorage.getItem('userId')}_${this.props.id}`,
        'POST'
      ).then(
        (res) => {
          console.log('unfavor success ', res)
          this.setState({ un_flag: 1 })
        },
        (rej) => {
          console.log('unfavor fail ', rej)
        }
      )

    }
    if(this.state.un_flag===1)
    {
      ajax(
        `forum/unfavor/${localStorage.getItem('userId')}_${this.props.id}`,
        'DELETE'
      ).then(
        (res) => {
          console.log('quxiao unfavor success ', res)
          this.setState({ un_flag: 2})
        },
        (rej) => {
          console.log('quxiao unfavor fail ', rej)
        }
      )

    }
  
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
                  this.state.col_flag===1? 'fcousing' : ''
                }`}
              ></div>
              <div className="instantsquare-display-header-word">关注</div>
            </div>
            <div
              className="instantsquare-display-header-unlike"
              onClick={this.notLike}
            >
              <div
                className={`instantsquare-display-header-imgunlike ${
                  this.state.un_flag === 1 ? 'unlikeing' : ''
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
