import React from 'react'
import './Entervalidation.css'
import history from '../utils/history'
import ajax from '../utils/ajax'
import Failed from '../components/failed'
import queryString from 'query-string'

export default class Entervalidation extends React.Component {
  state = {
    validation: '',
    isfail: null,
    countdown: 0,
  }

  componentDidMount() {
    this.setState({ countdown: 60 })
    this.doCountDown()
  }
  doCountDown = () => {
    setTimeout(() => {
      this.setState({ countdown: this.state.countdown - 1 }, () => {
        console.log('state', this.state.countdown)
        if (this.state.countdown > 0) {
          this.doCountDown()
        }
      })
    }, 1000)
  }

  shuruValidation = (e) => {
    const value = e.target.value
    const reg = /^\d*?$/
    const isCorrect = (reg.test(value) && value.length < 5) || value === ''
    if (!isCorrect) {
      console.log("don't number")
      return
    }

    this.setState(
      {
        validation: value,
      },
      () => {
        if (value.length === 4) {
          setTimeout(() => {
            this.input.scrollLeft = 0
          }, 0)

          const parsed = queryString.parse(window.location.search)

          ajax(`authentication/openLogin`, 'POST', {
            type: 1,
            phone: parsed.phone,
            code: this.state.validation,
          }).then(
            (rs) => {
              console.log('validation success', rs)
              localStorage.setItem('token', rs.token)
              localStorage.setItem('userId', rs.open_id)

              history.push(rs.first_type ? `/page?phone=${parsed.phone}` : '/')
            },
            (rej) => {
              console.log(' validation reject', rej)
              this.setState({ isfail: rej })
            }
          )
        }
      }
    )
  }
  againGet = () => {
    const parsed = queryString.parse(window.location.search)
    ajax(
      `authentication/code?phone=${parsed.phone}&sign=53ee50718b01b71c03fa47d352e0b667`,
      'get'
    ).then(
      (rs) => {
        console.log('lagainGet success', rs)
        this.setState({ countdown: 60 })
        this.doCountDown()
      },
      (rej) => {
        console.log('againGet reject', rej)
        this.setState({ isfail: rej })
      }
    )
  }
  backLogin = () => {
    history.push('/login')
  }
  render() {
    return (
      <div className="content-va">
        <div className="header-va">
          <div className="img-va" onClick={this.backLogin}></div>
          <div className="middle-va">输入验证码</div>
          <div className="input-va">
            <input
              type="text"
              className="input-value"
              value={this.state.validation}
              onChange={this.shuruValidation}
              ref={(ref) => (this.input = ref)}
            />
            <div className="input-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
          </div>
          {this.state.countdown > 0 ? (
            <div className="footer-disabled-va">
              {this.state.countdown}s 重新获取
            </div>
          ) : (
            <div className="footer-va" onClick={this.againGet}>
              重新获取
            </div>
          )}
        </div>

        <Failed
          defaultVisible={this.state.isfail}
          text={this.state.isfail?.msg}
        />
      </div>
    )
  }
}
