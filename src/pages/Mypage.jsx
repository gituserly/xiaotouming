import React from 'react'
import './Mypage.scss'
import ajax from '../utils/ajax'
import history from '../utils/history'
import conversionTime from '../utils/conversionTime'
import today from '../utils/today'
// console.log(localStorage.getItem("userId"));

export default class Mypage extends React.Component {
  state = {
    currentType: 1,
    instantlist: [],
    fcouslist: [],
    moveInfo: {
      useable: false,
      start: 0,
      end: 0,
    },
    ismessage: false,
    today: null,
    knowtime: [],
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.fetchData(1)
    } else {
      history.push('/login')
    }
    this.getToday()
    this.knowEachOther()
  }
  getToday = () => {
    this.setState({ today: today() })
    this.todaysss = setTimeout(() => {
      this.getToday()
    }, 1000)
  }
  componentWillUnmount() {
    clearTimeout(this.todaysss)
  }
  fetchData = (type, page = 1) => {
    console.log('fetchData', type)
    this.setState({ currentType: type })
    ajax(
      `forum?list_type=${type}&page=${page}&user_id=${localStorage.getItem(
        'userId'
      )}`,
      'GET'
    ).then(
      (rs) => {
        console.log('get  message success', rs)
        if (type === 1) {
          this.setState({ instantlist: rs.list })
        }
        if (type === 2) {
          this.setState({ fcouslist: rs.list })
        }
      },
      (rej) => {
        console.log('get  message fail', rej)
      }
    )
  }
  knowEachOther = () => {
    ajax(`service/${localStorage.getItem('userId')}`, 'GET').then(
      (rs) => {
        console.log('get  know time success', rs)
        this.setState({ knowtime: rs })
      },
      (rej) => {
        console.log('get  know time fail', rej)
      }
    )
  }
  enterInstansdetails = (id) => {
    history.push(`/mypage/instantdetails?id=${id}`)
  }
  releaseInstant = () => {
    history.push('/mypage/releaseinstant')
  }
  onTouchStart = (e) => {
    console.log('e', e)
    console.log('this.scrollBox', this.scrollBox)
    if (this.scrollBox.scrollTop > 0) {
      //如果有滑动 this.scrollBox.scrollTop > 0
      console.log('USEABLE', false)
      this.setState({
        moveInfo: {
          useable: false,
        },
      })
      return
    }

    console.log('stART', this.scrollBox.scrollTop)
    this.setState({
      moveInfo: {
        useable: true,
        start: e.touches[0].clientY,
      },
    })
  }
  onTouchMove = (e) => {
    // console.log("e",e)
    if (!this.state.moveInfo.useable) return
    this.setState({
      moveInfo: {
        ...this.state.moveInfo,
        end: e.touches[0].clientY,
      },
    })
  }
  onTouchEnd = () => {
    const { start, end, useable } = this.state.moveInfo
    if (!useable) return
    console.log('useable', useable)
    if (start - end < -50) {
      console.log('下滑')
      history.push('/mypage/instantsquare')
    }
  }
  render() {
    const showList =
      this.state.currentType === 1
        ? this.state.instantlist
        : this.state.fcouslist

    return (
      <div className="mypage-main">
        <div className="mypagr-header">
          <div className="mypage-date">{this.state.today}</div>
          <div className="mypage-msg"></div>
        </div>
        <div className="mypage-knowtime">{this.state.knowtime.home_text}</div>
        <div>
          <button className="mypage-button">
            <span className="mypage-button-text" onClick={this.releaseInstant}>
              写点什么
            </span>
          </button>
        </div>
        <div className="mypage-text">
          {[
            { name: '瞬间', key: 1 },
            { name: '关注', key: 2 },
          ].map((item) => (
            <div
              key={item.key}
              className={`instant ${
                item.key === this.state.currentType ? 'active' : ''
              }`}
              onClick={() => this.fetchData(item.key)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div
          className="scroll-box"
          ref={(ref) => (this.scrollBox = ref)}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          {showList.length === 0 && (
            <div className="scroll-box-tip">
              <p>悄悄告诉你</p>
              <p>下拉页面就能看到别人的瞬间哦</p>
            </div>
          )}
          <ul>
            {showList.map((item) => {
              const tm = conversionTime(item.create_time, 'Y/M/D H:m')
              return (
                <li
                  className="li-mypage"
                  key={item.id}
                  onClick={() => this.enterInstansdetails(item.id)}
                >
                  <p>{item.forum_content}</p>
                  <div className="li-div">
                    <div>{tm}</div>
                    {item.privacy_type === '3' ? (
                      <div>私密</div>
                    ) : (
                      <div>
                        {item.agree_count}认同.{item.comment_count}想法
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        {this.state.ismessage && (
          <div className="mypage-message">
            <div className="mypage-message-text"> 3条新消息</div>
          </div>
        )}
      </div>
    )
  }
}
