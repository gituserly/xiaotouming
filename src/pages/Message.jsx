import React from 'react'
import Navbar from '../components/navbar'
import './Message.scss'
import ajax from '../utils/ajax'
import history from '../utils/history'

export default class Message extends React.Component {
  state = {
    msglist: [],
    page: 1,
    loading: false,
    megcount: 0,
    hasEnd: false,
  }

  componentDidMount() {
    this.getMessage(1)
    //-----------
  }
  getMessage = (page = 1) => {
    this.setState({ loading: true })
    ajax(
      `message?user_id=${localStorage.getItem('userId')}&page=${page}`,
      'GET'
    ).then(
      (res) => {
        console.log('getmessage user success ', res)
        if (!res) {
          return this.setState({ hasEnd: true })
        }
        this.setState({
          msglist: [...this.state.msglist, ...res.list],
          loading: false,
          page,
        })
      },
      (rej) => {
        console.log('getmessage user fail ', rej)
        this.setState({ loading: false })
      }
    )
  }
  backMypage = () => {
    history.push('/')
  }
  onScroll = (e) => {
    if (this.state.hasEnd) return
   

    const offsetHeight = e.target.offsetHeight

    const scrollHeight = e.target.scrollHeight

    const scrollTop = e.target.scrollTop

    const distance = scrollHeight - offsetHeight

    if (distance - scrollTop < 5) {
      this.getMessage(this.state.page + 1)
    }
  }

  renderContent = (item) => {
    switch (item.msg_type) {
      case '8':
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}&nbsp; 评论了你:{' '}
              <span>{item.comment.comment_content}</span>
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        )

      case '9':
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}&nbsp; 回复了你:{' '}
              <span>{item.comment.comment_content}</span>
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        )

      case '1':
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}&nbsp; 关注了你瞬间
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        )
      case '3':
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}&nbsp; 认同了你想法
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        )
      case '5':
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}&nbsp; 赞同了你的评论
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        )
    }
  }
  render() {
    return (
      <Navbar title="评论与通知">
        <div className="mymessage-content" onScroll={this.onScroll}>
          <ul>
            {this.state.msglist.map((item) => (
              <li className="message-middles" key={item.msg_time}>
                <div className="message-middle">
                  <div className="">
                    <img
                      className="message-middle-avatar"
                      src={item.action_user.user_pic}
                    />
                  </div>
                  {this.renderContent(item)}
                  <div className="message-middle-text">
                    {item.forum.forum_content}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Navbar>
    )
  }
}
