import React from 'react'
import history from '../utils/history'
import ajax from '../utils/ajax'
import Failed from '../components/failed'
import './Login.css'

export default class Login extends React.Component {
  state = { telphone: '', error: null }
  changeTelphone = (e) => {
    const val = e.target.value

    const reg = /^1([0-9]*)?$/
    if ((reg.test(val) && val.length < 12) || val === '') {
      this.setState({
        telphone: val,
      })
    } else {
      console.log("don't correct number")
    }
  }

  sendCode = () => {
    ajax(
      `authentication/code?phone=${this.state.telphone}&sign=53ee50718b01b71c03fa47d352e0b667`,
      'get'
    ).then(
      (rs) => {
        console.log(' login success', rs)
        history.push(`/entervalidation?phone=${this.state.telphone}`)
      },
      (rej) => {
        this.setState({ error: rej })
        console.log('login reject', rej)
      }
    )
  }

  render() {
    return (
      <div className="content">
        <div className="main">
          <div className="img1"></div>
          <div className="login-xtm">登陆小透明的世界</div>
          <div className="login-input">
            <div className="shuzi">+86</div>
            <div>
              <input
                className="input-text"
                type="number"
                placeholder="请输入手机号"
                value={this.state.telphone}
                onChange={this.changeTelphone}
              />
            </div>
          </div>
          <div className="y-t">
            <button className="yanzheng-button" onClick={this.sendCode}>
              <span className="getyanzhengma">获取验证码</span>
            </button>
          </div>
          <div className="tishi">新手机号码验证后自动注册</div>
        </div>
        <Failed
          defaultVisible={this.state.error}
          text={this.state.error?.msg}
        />
      </div>
    )
  }
}
