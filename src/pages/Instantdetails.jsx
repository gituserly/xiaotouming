import React from "react";
import "./Instantdetails.css";
import ajax from "../utils/ajax";
import conversionTime from "../utils/conversionTime";
import history from "../utils/history"

export default class Instantdetails extends React.Component {
  thoughtid = 0;
  state = {
    list: null,
    iswiritethought: false,
    thoughtlist: [],
    thought: "",
    thoughtcount: 0,
    commentLoading: false,
    commentPage: 0,
    isdispaly: false,
    islike: false,
    // comment: {
    //   list: [],
    //   total: 0,
    //   page: 1,
    //   loading: false
    // }
  };
  componentDidMount() {
    this.getInstansdetails();
    this.getCommentList();
  }

  getCommentList = async (page = 1) => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    try {
      this.setState({ commentLoading: true });
      const res = await ajax(
        `comment?forum_id=${
          parsed.id
        }&comment_id=441&list_type=1&page=${page}&user_id=${localStorage.getItem(
          "userId"
        )}`,
        "GET"
      );
      console.log("get thoughtlist success ", res);
      this.setState(
        {
          thoughtlist: [...this.state.thoughtlist, ...res.list],
          thoughtcount: res.total,
          commentPage: page,
        },
        () => console.log("thoughtlist", this.state.thoughtlist)
      );
    } catch (error) {
      console.log("get thoughtlist fail ", error);
    } finally {
      this.setState({ commentLoading: false });
    }
  };
  getInstansdetails = () => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    ajax(
      `forum/${parsed.id}?user_id=${localStorage.getItem("userId")}`,
      "GET"
    ).then(
      (rs) => {
        console.log("enter instant details success", rs);
        this.setState({ list: rs }, () => console.log("rs", rs));
      },
      (rej) => {
        console.log("enter instant details fail", rej);
      }
    );
  };
  writeThought = () => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);

    const { thought } = this.state;

    ajax(`comment`, "POST", {
      user_id: localStorage.getItem("userId"),
      comment_content: thought,
      forum_id: parsed.id,
      privacy_type: 1,
    }).then(
      (res) => {
        console.log("release thought success ", res);
        this.setState({ iswiritethought: false });
        ajax(
          `comment?forum_id=${
            parsed.id
          }&comment_id=441&list_type=1&page=1&user_id=${localStorage.getItem(
            "userId"
          )}`,
          "GET"
        ).then(
          (resolve) => {
            console.log("get thoughtlist success ", res);
            this.setState(
              { thoughtlist: resolve.list, thoughtcount: resolve.total },
              () => console.log("thoughtlist", this.state.thoughtlist)
            );
          },
          (rej) => {
            console.log("get thoughtlist fail ", rej);
          }
        );
      },
      (rej) => {
        console.log("release thought fail ", rej);
      }
    );
  };
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
                  this.setState({ iswiritethought: true });
                }}
              >
                写想法
              </span>
            </button>
          </div>
        </div>
        <div className="instantdetails-thought-instruction1">{text}</div>
      </div>
    );
  };
  renderOnlyReadAndPrivate = (text) => (
    <div className="instantdetails-thoughtcontent">
      <div className="instantdetails-thought-instruction2">{text}</div>
    </div>
  );

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
                  this.setState({ iswiritethought: true });
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
                  <div className="instantdetails-username">
                    msg {item.comment.reply_count}
                  </div>
                </div>
                <p className="thought-p">{item.comment.comment_content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="instantdatails-thoughtcount">
          查看全部{this.state.thoughtcount}条想法
        </div>
      </div>
    );
  };
  renderDisplay = () => (
    <div className="instantsquare-display">
      <div className="instantsquare-display-header">
        <div className="instantsquare-display-header-wechat">
          <div className="instantsquare-display-header-imgwechat"></div>
          <div className="instantsquare-display-header-word">微信好友</div>
        </div>
        <div className="instantsquare-display-header-friends">
          <div className="instantsquare-display-header-imgfriends"></div>
          <div className="instantsquare-display-header-word">朋友圈</div>
        </div>
      </div>
      <div className="instantsquare-display-middle">
        <div
          className="instantsquare-display-header-fcous"
          onClick={this.fcousUser}
        >
          <div className="instantsquare-display-header-imgfcous"></div>
          <div className="instantsquare-display-header-word">关注</div>
        </div>
        <div className="instantsquare-display-header-unlike">
          <div className="instantsquare-display-header-imgunlike"></div>
          <div className="instantsquare-display-header-word">不喜欢</div>
        </div>
        <div className="instantsquare-display-header-jubao">
          <div className="instantsquare-display-header-imgjubao"></div>
          <div className="instantsquare-display-header-word">举报</div>
        </div>
      </div>
      <div className="instantsquare-display-footer">取消</div>
    </div>
  );
  onScroll = (e) => {
    // console.log("e.target",e.target)
    // 在Chrome中可以用$0表示选中的div，默认为body
    const offsetHeight = e.target.offsetHeight;
    //offsetHeight 页面高度
    const scrollHeight = e.target.scrollHeight;
    console.log("scrollHeight ", scrollHeight);
    //scrollHeight 滑动高度
    const scrollTop = e.target.scrollTop;
    console.log("scrollTop ", scrollTop);
    // scrollTop  滑动位置距离顶部的距离
    const distance = scrollHeight - offsetHeight;
    const maxPage = Math.ceil(this.state.thoughtcount / 10);
    // cell进一，floor 退一 取整数
    if (
      distance - scrollTop < 5 &&
      !this.state.commentLoading &&
      this.state.commentPage + 1 <= maxPage
    ) {
      this.getCommentList(this.state.commentPage + 1);
    }
  };
  fcousUser = () => {
    ajax(
      `forum/collection/${localStorage.getItem("userId")}_${
        this.state.list.id
      }`,
      "POST"
    ).then(
      (res) => {
        console.log("fcous user success ", res);
      },
      (rej) => {
        console.log("fcous user fail ", rej);
      }
    );
  };
  identification = async () => {
    try {
      const res = await ajax(
        `forum/agree/${localStorage.getItem("userId")}_${
          this.state.list.id
        }_519141`,
        "POST"
      );
      console.log("identification success", res);
      this.setState({
        islike: true,
        list: {
          ...this.state.list,
          agree_count: this.state.list.agree_count + 1,
        },
      });
    } catch (error) {
      console.log("identification fail", error);
    }
  };
  backMypage=()=>{
    history.push("/")
  }
  render() {
    if (!this.state.list) return null;
    if (!this.state.thoughtlist) return null;
    // const renderOnlyRead = (
    //   <div className="instantdetails-thoughtcontent">
    //     <div className="instantdetails-thought-instruction2">
    //       作者想静静，想法已关闭
    //     </div>
    //   </div>
    // );
    const publicread = "第一个写想法的人最可爱";
    const onlyread = "作者想静静，想法已关闭";
    const privates = " 私密瞬间，仅自己可见";
    const time = conversionTime(this.state.list.create_time, "Y/M/D H:m");
    // const like_count=this.state.list.agree_count
    // console.log("like-cunt",like_count)

    return (
      <div className="instantdetails-content" onScroll={this.onScroll}>
        <div className="instantdetails-main">
          <div className="instantdetails-header">
            <div className="instantdetails-datails">
              <div className="instantdetails-img1" onClick={this.backMypage}></div>
              <div className="instantdetails-datails-word">详情</div>
            </div>
            <div
              className="instantdetails-img2"
              onClick={() => {
                this.setState({ isdispaly: !this.state.isdispaly });
              }}
            ></div>
          </div>

          <div className="instantdetails-username">
            {this.state.list.forum_nike_name}
          </div>
          <div className="instantdetails-text">
            {this.state.list.forum_content}
          </div>
          <div className="instantdetails-footer">
            <div className="instantdetails-time">{time}</div>
            <div
              className={`instantdetails-like${
                this.state.islike === true ? "likeing" : ""
              }`}
              onClick={this.identification}
            >
              ❤{this.state.list.agree_count}
            </div>
          </div>

          {this.state.list.privacy_type === "2" &&
            this.renderOnlyReadAndPrivate(onlyread)}

          {this.state.list.privacy_type === "3" &&
            this.renderOnlyReadAndPrivate(privates)}
          {this.state.list.privacy_type === "1" &&
            (this.state.thoughtlist.length === 0
              ? this.renderPublicReadNothought(publicread)
              : this.renderPublicReadThought())}

          {this.state.iswiritethought && (
            <div className="instantdetails-thought-release">
              <textarea
                className="instantdetails-textarea"
                value={this.state.thought}
                onChange={(e) => {
                  this.setState({ thought: e.target.value });
                }}
              ></textarea>
              <div className="thought-release" onClick={this.writeThought}>
                发布
              </div>
            </div>
          )}
          {this.state.isdispaly && this.renderDisplay()}
        </div>
      </div>
    );
  }
}
