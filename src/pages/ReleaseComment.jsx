import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Icon from '../components/icon'
import Topic from '../components/topic'
import ajax from '../utils/ajax'
import './ReleaseComment.scss'

const queryString = require('query-string')

export default class ReleaseComment extends Component {
  state = {
    replayThought: {},
    commentValue: '',
    currentIndex: 0,
  }
  componentDidMount() {
    const index = this.props.thoughtlist.findIndex(
      (item) => item.comment.id === this.props.choosedComment
    )
    this.setState({ currentIndex: index })
    this.getReplyCommentList(this.props.choosedComment)
  }

  getReplyCommentList = (commentId) => {
    const { id } = queryString.parse(window.location.search)
    ajax(
      `comment?forum_id=${id}&comment_id=${commentId}&list_type=2&page=1&user_id=${localStorage.getItem(
        'userId'
      )}`,
      'GET'
    ).then(
      (res) => {
        console.log('get reply comment success', res)
        this.setState(
          {
            replayThought: {
              ...this.state.replayThought,
              [commentId]: res,
            },
          },
          () => {
            console.log(this.state.replayThought)
          }
        )
      },
      (rej) => {
        console.log('get reply comment fail', rej)
      }
    )
  }

  onChangeIndex = (index) => {
    this.setState({ currentIndex: index })
    const currentThought = this.props.thoughtlist[index]
    if (!currentThought) return

    const commentId = currentThought.comment.id
    const replayList = this.state.replayThought[commentId]
    if (replayList) return

    this.getReplyCommentList(commentId)
  }

  addReply = () => {
    const { id } = queryString.parse(window.location.search)
    const currentComment = this.props.thoughtlist[this.state.currentIndex]
    ajax(`comment`, 'POST', {
      user_id: localStorage.getItem('userId'),
      comment_content: this.state.commentValue,
      forum_id: id,
      at_comment_id: currentComment.comment.id,
      privacy_type: 1,
    }).then(
      (res) => {
        console.log('reply idea success', res)
        this.setState({ commentValue: '' })
        this.getReplyCommentList(currentComment.comment.id)
      },
      (rej) => {
        console.log('reply idea fail', rej)
      }
    )
  }

  render() {
    return (
      <div className="release-comment">
        <div className="release-comment-modal">
          <div
            className="release-comment-close"
            onClick={() => {
              this.props.closeModal()
            }}
          >
            <Icon type="cancel" />
          </div>
          <SwipeableViews
            onChangeIndex={this.onChangeIndex}
            index={this.state.currentIndex}
          >
            {this.props.thoughtlist.map(({ comment }) => {
              const replayList = this.state.replayThought[comment.id] || {
                list: [],
                total: 0,
              }
              return (
                <div className="comment-item">
                  <div className="comment-item-body">
                    <Topic data={comment} content={comment.comment_content} />

                    <div className="replay-number">
                      {replayList.total}条评论
                    </div>

                    <ul>
                      {replayList.list.map(({ comment }) => (
                        <li className="reply-item">
                          <div className="reply-item-header">
                            <div>
                              <img src={comment.user_pic} />
                              <span>{comment.forum_nike_name}</span>
                            </div>
                            <span>{comment.last_login_time}</span>
                          </div>
                          <p className="reply-item-content">
                            {comment.comment_content}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="send-comment-box">
                    <input
                      type="text"
                      placeholder="评论千万条，真诚最重要"
                      value={this.state.commentValue}
                      onChange={(e) => {
                        this.setState({
                          commentValue: e.target.value,
                        })
                      }}
                    />
                    <div className="send-btn" onClick={this.addReply}>
                      <Icon type="send" />
                    </div>
                  </div>
                </div>
              )
            })}
          </SwipeableViews>
        </div>
      </div>
    )
  }
}
