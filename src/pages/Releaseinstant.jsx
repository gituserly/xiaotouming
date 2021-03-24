import React from 'react'
import './Releaseinstant.scss'
import Icon from '../components/icon'
import history from '../utils/history'
import ajax from '../utils/ajax'
import todaytime from '../utils/todaytime'
import cns from '../utils/classnames'
import Navbar from '../components/navbar'

const PUBLISH_TYPE_LIST = [
  {
    id: 1,
    title: '完全公开',
    subtitle: '允许其他小透明认同或评论你',
    icon: 'pop',
  },
  {
    id: 2,
    title: '公开只读',
    subtitle: '允许其他小透明认同你',
    icon: 'look',
  },
  {
    id: 3,
    title: '完全私密',
    subtitle: '仅自己可见',
    icon: 'lock',
  },
]

export default class Releaseinstant extends React.Component {
  state = {
    shuru: '',
    choosestatus: false,
    statusword: '完全公开',
    time: null,
    privacytype: 1,
    modalVisible: false,
  }
  componentDidMount() {
    this.getTime()
  }
  getTime = () => {
    this.setState({ time: todaytime() })
    this.timer = setTimeout(() => {
      this.getTime()
    }, 1000)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  changeShuru = (e) => {
    this.setState({ shuru: e.target.value })
  }
  chooseStatus = () => {
    this.setState({ choosestatus: !this.state.choosestatus })
  }
  changStatus = (data, type) => {
    this.setState({ statusword: data, choosestatus: false, privacytype: type })
  }
  releaseMessage = () => {
    ajax(`forum`, 'POST', {
      user_id: localStorage.getItem('userId'),
      forum_content: this.state.shuru,
      privacy_type: this.state.privacytype,
    }).then(
      (rs) => {
        console.log('release message success', rs)
        history.push('/mypage')
      },
      (rej) => {
        console.log('release message fail', rej)
      }
    )
  }
  backMypage = () => {
    history.push('/')
  }

  renderPublishModal() {
    if (!this.state.modalVisible) return null
    return (
      <div
        className="publish-modal-layer"
        onClick={() => {
          this.setState({ modalVisible: false })
        }}
      >
        <ul className="publish-modal" onClick={(e) => e.stopPropagation()}>
          {PUBLISH_TYPE_LIST.map((item) => (
            <li
              key={item.id}
              className={cns('publish-modal-item', {
                active: this.state.privacytype === item.id,
              })}
              onClick={() => {
                this.setState({ privacytype: item.id, modalVisible: false })
              }}
            >
              <div className="publish-modal-icon">
                <Icon type={item.icon} />
              </div>
              <div className="publish-modal-content">
                <p className="title">{item.title}</p>
                <p className="subtitle">{item.subtitle}</p>
              </div>
              <div className="publish-modal-check">
                <Icon type="check" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <Navbar
        renderRight={() => (
          <div
            className={cns('instant-release', {
              active: this.state.shuru.length > 0,
            })}
            onClick={this.releaseMessage}
          >
            发布
          </div>
        )}
      >
        <div className="instant-content">
          <div className="instant-main">
            <div className="instant-release-time">{this.state.time}</div>
            <div>
              <textarea
                placeholder="你可以写任何想写的..."
                className="instant-input"
                value={this.state.shuru}
                onChange={this.changeShuru}
              ></textarea>
            </div>
            <div className="instant-footer">
              <div
                className="instant-status"
                onClick={() => {
                  this.setState({ modalVisible: true })
                }}
              >
                {
                  PUBLISH_TYPE_LIST.find(
                    (item) => item.id === this.state.privacytype
                  ).title
                }
              </div>
            </div>
            {/*this.state.choosestatus === false ? null : (
            <div className="instant-choosestatus">
              <div className="instant-choosestatus-main">
                <div
                  className={
                    this.state.statusword === '完全公开'
                      ? 'instant-choosestatus-list-yellow'
                      : 'instant-choosestatus-list'
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img1"></div>
                    <div>
                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus('完全公开', 1)}
                      >
                        完全公开
                      </div>
                      <div className="instant-choosestatus-text2">
                        允许其他小透明认同或评论你
                      </div>
                    </div>
                  </div>
                  {this.state.statusword === '完全公开' ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
                <div
                  className={
                    this.state.statusword === '公开只读'
                      ? 'instant-choosestatus-list-yellow'
                      : 'instant-choosestatus-list'
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img2"></div>
                    <div>
                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus('公开只读', 2)}
                      >
                        公开只读
                      </div>
                      <div className="instant-choosestatus-text2">
                        允许其他小透明认同你
                      </div>
                    </div>
                  </div>

                  {this.state.statusword === '公开只读' ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
                <div
                  className={
                    this.state.statusword === '完全私密'
                      ? 'instant-choosestatus-list-yellow'
                      : 'instant-choosestatus-list'
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img3"></div>
                    <div>
                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus('完全私密', 3)}
                      >
                        完全私密
                      </div>
                      <div className="instant-choosestatus-text2">
                        仅自己可见
                      </div>
                    </div>
                  </div>
                  {this.state.statusword === '完全私密' ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
              </div>
            </div>
                  )*/}
            {this.renderPublishModal()}
          </div>
        </div>
      </Navbar>
    )
  }
}
