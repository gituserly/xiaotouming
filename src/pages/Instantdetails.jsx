import React from "react";
import "./Instantdetails.css";
import ajax from "../utils/ajax";
import conversionTime from "../utils/conversionTime";

export default class Instantdetails extends React.Component {
  thoughtid = 0;
  state = {
    list: null,
    iswiritethought: false,
    thoughtlist: [],
    thought: "",
    thoughtcount:null
  };
  componentDidMount() {
    this.getInstansdetails(1);
  }

  getInstansdetails = (page) => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    ajax(
      `forum/${parsed.userid}?user_id=${localStorage.getItem("userId")}`,
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
    ajax(
      `comment?forum_id=${
        parsed.userid
      }&comment_id=441&list_type=1&page=${page}&user_id=${localStorage.getItem(
        "userId"
      )}`,
      "GET"
    ).then(
      (res) => {
        console.log("get thoughtlist success ", res);
        this.setState({ thoughtlist: res.list ,thoughtcount:res.total}, () =>
          console.log("thoughtlist", this.state.thoughtlist)
        );
      },
      (rej) => {
        console.log("get thoughtlist fail ", rej);
      }
    );
  };
  writeThought = () => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    console.log(parsed);
    const { thought } = this.state;
    
    ajax(`comment`, "POST", {
      user_id: localStorage.getItem("userId"),
      comment_content: thought,
      forum_id: parsed.userid,
      privacy_type: 1,
    }).then(
      (res) => {
        console.log("release thought success ", res);
         this.setState({ iswiritethought: false }  
        );
        ajax(
          `comment?forum_id=${
            parsed.userid
          }&comment_id=441&list_type=1&page=3&user_id=${localStorage.getItem(
            "userId"
          )}`,
          "GET"
        ).then(
          (resolve) => {
            console.log("get thoughtlist success ", res);
            this.setState({ thoughtlist: resolve.list,thoughtcount:resolve.total }, () =>
              console.log("thoughtlist", this.state.thoughtlist)
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
  renderPublicReadNothought = () => {
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
                  <div className="instantdetails-username">msg {item.comment.reply_count}</div>
                </div>
                <p className="thought-p">{item.comment.comment_content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="instantdatails-thoughtcount">查看全部{this.state.thoughtcount}条想法</div>
      </div>
    );
  };
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
    const onlyread = "作者想静静，想法已关闭";
    const privates = " 私密瞬间，仅自己可见";
    const time = conversionTime(this.state.list.create_time, "Y/M/D H:m");

    return (
      <div className="instantdetails-content">
        <div className="instantdetails-main">
          <div className="instantdetails-header">
            <div className="instantdetails-datails">
              <div className="instantdetails-img1"></div>
              <div className="instantdetails-datails-word">详情</div>
            </div>
            <div className="instantdetails-img2"></div>
          </div>

          <div className="instantdetails-username">
            {this.state.list.forum_nike_name}
          </div>
          <div className="instantdetails-text">
            {this.state.list.forum_content}
          </div>
          <div className="instantdetails-footer">
            <div className="instantdetails-time">{time}</div>
            <div className="instantdetails-like">
              ❤{this.state.list.agree_count}
            </div>
          </div>

          {this.state.list.privacy_type === "2" &&
            this.renderOnlyReadAndPrivate(onlyread)}

          {this.state.list.privacy_type === "3" &&
            this.renderOnlyReadAndPrivate(privates)}
          {this.state.list.privacy_type === "1" &&
            (this.state.thoughtlist.length === 0
              ? this.renderPublicReadNothought()
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
        </div>
      </div>
    );
  }
}
