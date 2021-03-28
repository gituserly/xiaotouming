import React from 'react'
import './Instantdetails.scss'
import ajax from '../utils/ajax'
import conversionTime from '../utils/conversionTime'
import history from '../utils/history'
import ReleaseComment from './ReleaseComment'
import Topic from '../components/topic'
import MoreModal from '../components/more-modal'
import Navbar from '../components/navbar'

export default class Instantdetails extends React.Component {
  thoughtid = 0
  state = {
    list: null,
    iswiritethought: false,
    thoughtlist: [],
    thought: '',
    thoughtcount: 0,
    commentLoading: false,
    commentPage: 0,
    isdispaly: false,
    // islike: false,
    agreetype: 0,
    replycom: '',
    isreply: false,
    isfcous: false,
    isdianzan: false,

    currentAnswer: null,
    choosedComment: null,

    // comment: {
    //   list: [],
    //   total: 0,
    //   page: 1,
    //   loading: false
    // }
  }
  componentDidMount() {
    this.getInstansdetails()
    this.getCommentList()
  }

  getCommentList = async (page = 1) => {
    const queryString = require('query-string')
    const parsed = queryString.parse(window.location.search)
    try {
      this.setState({ commentLoading: true })
      const res = await ajax(
        `comment?forum_id=${
          parsed.id
        }&comment_id=441&list_type=1&page=${page}&user_id=${localStorage.getItem(
          'userId'
        )}`,
        'GET'
      )
      console.log('get thoughtlist success ', res)
      this.setState(
        {
          thoughtlist: [...this.state.thoughtlist, ...res.list],
          thoughtcount: res.total,
          commentPage: page,
        },
        () => console.log('thoughtlist', this.state.thoughtlist)
      )
    } catch (error) {
      console.log('get thoughtlist fail ', error)
    } finally {
      this.setState({ commentLoading: false })
    }
  }
  getInstansdetails = () => {
    const queryString = require('query-string')
    const parsed = queryString.parse(window.location.search)
    ajax(
      `forum/${parsed.id}?user_id=${localStorage.getItem('userId')}`,
      'GET'
    ).then(
      (rs) => {
        console.log('enter instant details success', rs)
        this.setState({ list: rs }, () => console.log('rs', rs))
        this.setState({ agreetype: rs.agree_flag }, () =>
          console.log('rs.agree_type', rs.agree_flag)
        )
      },
      (rej) => {
        console.log('enter instant details fail', rej)
      }
    )
  }
  writeThought = () => {
    const queryString = require('query-string')
    const parsed = queryString.parse(window.location.search)

    const { thought } = this.state

    ajax(`comment`, 'POST', {
      user_id: localStorage.getItem('userId'),
      comment_content: thought,
      forum_id: parsed.id,
      privacy_type: 1,
    }).then(
      (res) => {
        console.log('release thought success ', res)
        this.setState({ iswiritethought: false })
        ajax(
          `comment?forum_id=${
            parsed.id
          }&comment_id=441&list_type=1&page=1&user_id=${localStorage.getItem(
            'userId'
          )}`,
          'GET'
        ).then(
          (resolve) => {
            console.log('get thoughtlist success ', res)
            this.setState(
              { thoughtlist: resolve.list, thoughtcount: resolve.total },
              () => console.log('thoughtlist', this.state.thoughtlist)
            )
          },
          (rej) => {
            console.log('get thoughtlist fail ', rej)
          }
        )
      },
      (rej) => {
        console.log('release thought fail ', rej)
      }
    )
  }
  replyComment = (id) => {
    history.push(`/mypage/instantdetails/commentreply?id=${id}`)

    // this.setState({currentAnswer:item});
  }
  renderPublicReadNothought = (text) => {
    return (
      <div className="instantdetails-thoughtcontent">
        <div className="instantdetails-thought">
          <div className="instantdetails-thought-word">想法</div>
          <div>
            <button className="instantdetails-thought-button">
              <span
                className="instantdetails-thought-button-word"
                onClick={() => {
                  this.setState({ iswiritethought: true })
                }}
              >
                写想法
              </span>
            </button>
          </div>
        </div>
        <div className="instantdetails-thought-instruction1">{text}</div>
      </div>
    )
  }
  renderOnlyReadAndPrivate = (text) => (
    <div className="instantdetails-thoughtcontent">
      <div className="instantdetails-thought-instruction2">{text}</div>
    </div>
  )

  renderPublicReadThought = () => {
    return (
      <div className="instantdetails-thoughtcontent">
        <div className="instantdetails-thought">
          <div className="instantdetails-thought-word">想法</div>
          <div>
            <button className="instantdetails-thought-button">
              <span
                className="instantdetails-thought-button-word"
                onClick={() => {
                  this.setState({ iswiritethought: true })
                }}
              >
                写想法
              </span>
            </button>
          </div>
        </div>
        <div>
          <ul>
            {this.state.thoughtlist.map((item) => (
              <li className="li-instantdatails" key={item.comment.id}>
                <div className="thought-u">
                  <div className="instantdetails-username">
                    {item.comment.forum_nike_name}
                  </div>
                  <div className="instantdetails-u">
                    <div className="ins-msg"></div>
                    <div className="instantdetails-like-count">
                      {item.comment.reply_count}
                    </div>
                  </div>
                </div>
                <p
                  className="thought-p"
                  // onClick={() => this.replyComment(item.comment.id)}
                  onClick={() => {
                    console.log('item.comment.id', item.comment.id)
                    this.setState({ choosedComment: item.comment.id })
                  }}
                >
                  {item.comment.comment_content}
                </p>
              </li>
            ))}
          </ul>

          {this.state.currentAnswer &&
            this.renderReply(this.state.currentAnswer)}
        </div>
        <div className="instantdatails-thoughtcount">
          查看全部{this.state.thoughtcount}条想法
        </div>
      </div>
    )
  }
  onScroll = (e) => {
    // console.log("e.target",e.target)
    // 在Chrome中可以用$0表示选中的div，默认为body
    const offsetHeight = e.target.offsetHeight
    //offsetHeight 页面高度
    const scrollHeight = e.target.scrollHeight
    // console.log("scrollHeight ", scrollHeight);
    //scrollHeight 滑动高度
    const scrollTop = e.target.scrollTop
    // console.log("scrollTop ", scrollTop);
    // scrollTop  滑动位置距离顶部的距离
    const distance = scrollHeight - offsetHeight
    const maxPage = Math.ceil(this.state.thoughtcount / 10)
    // cell进一，floor 退一 取整数
    if (
      distance - scrollTop < 5 &&
      !this.state.commentLoading &&
      this.state.commentPage + 1 <= maxPage
    ) {
      this.getCommentList(this.state.commentPage + 1)
    }
  }

  agreeIdea = async () => {
    try {
      if (this.state.list.agree_flag === 2) {
        await ajax(
          `forum/agree/${localStorage.getItem('userId')}_${this.state.list.id}`,
          'POST',
          { agree_type: 2 }
        )
        console.log('agreeIdea success')
        this.getInstansdetails()
        this.setState({
          agreetype: 1,

          // list: {
          //   ...this.state.list,
          //   agree_count: +this.state.list.agree_count + 1,
          // },
        })
      }
      if (this.state.list.agree_flag === 1) {
        const res = await ajax(
          `forum/agree/${localStorage.getItem('userId')}_${
            this.state.list.id
          }?agree_type=2`,
          'DELETE'
        )
        console.log(' detele agreeIdea success', res)
        this.getInstansdetails()
        this.setState({
          agreetype: 2,
          // list:{
          //   ...this.state.list,
          //   agree_count:+this.state.list.agree_count - 1,
          // }
        })
      }
    } catch (error) {
      console.log('agreeIdea fail', error)
    }
  }
  backMypage = () => {
    history.push('/')
  }
  cancelShow = () => {
    this.setState({ isreply: false })
  }
  render() {
    console.log('chooseComment', this.state.chooseComment)
    if (!this.state.list) return null
    if (!this.state.thoughtlist) return null
    // const renderOnlyRead = (
    //   <div className="instantdetails-thoughtcontent">
    //     <div className="instantdetails-thought-instruction2">
    //       作者想静静，想法已关闭
    //     </div>
    //   </div>
    // );
    const publicread = '第一个写想法的人最可爱'
    const onlyread = '作者想静静，想法已关闭'
    const privates = ' 私密瞬间，仅自己可见'
    const time = conversionTime(this.state.list.create_time, 'Y/M/D H:m')
    // const like_count=this.state.list.agree_count
    // console.log("like-cunt",like_count)

    return (
      <Navbar
        title="详情"
        renderRight={() => (
          <div
            className="instantdetails-img2"
            onClick={() => {
              this.setState({ isdispaly: !this.state.isdispaly })
            }}
          ></div>
        )}
      >
        <div className="instantdetails-content" onScroll={this.onScroll}>
          <div className="instantdetails-main">
            <Topic data={this.state.list} />

            {this.state.list.privacy_type === '2' &&
              this.renderOnlyReadAndPrivate(onlyread)}

            {this.state.list.privacy_type === '3' &&
              this.renderOnlyReadAndPrivate(privates)}
            {this.state.list.privacy_type === '1' &&
              (this.state.thoughtlist.length === 0
                ? this.renderPublicReadNothought(publicread)
                : this.renderPublicReadThought())}

            {this.state.iswiritethought && (
              <div
                className="instantdetails-thought-show"
                onClick={() => {
                  this.setState({ iswiritethought: false })
                }}
              >
                <div
                  className="instantdetails-thought-release"
                  onClick={(e) => e.stopPropagation()}
                >
                  <textarea
                    placeholder="添加回复"
                    className="instantdetails-textarea"
                    value={this.state.thought}
                    onChange={(e) => {
                      this.setState({ thought: e.target.value })
                    }}
                  ></textarea>
                  <div
                    className="thought-release"
                    onClick={this.writeThought}
                    style={{
                      color:
                        this.state.thought.length > 0 ? '#bc9a7a' : '#ced2d4',
                    }}
                  >
                    发布
                  </div>
                </div>
              </div>
            )}
            {this.state.isdispaly && (
              <MoreModal
                id={this.state.list.id}
                flag={this.state.list.collection_flag}
                onClose={() => this.setState({ isdispaly: false })}
              />
            )}
            {this.state.choosedComment && (
              <ReleaseComment
                thoughtlist={this.state.thoughtlist}
                choosedComment={this.state.choosedComment}
                closeModal={() => {
                  this.setState({ choosedComment: null })
                }}
              />
            )}
          </div>
        </div>
      </Navbar>
    )
  }
}
