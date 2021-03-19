import React from "react";
import "./Message.scss";
import ajax from "../utils/ajax";
import history from "../utils/history";

export default class Message extends React.Component {
  state = {
    msglist: [],
  };

  componentDidMount() {
    this.getMessage();
  }
  getMessage = () => {
    ajax(
      `message?user_id=${localStorage.getItem("userId")}&page=1`,
      "GET"
    ).then(
      (res) => {
        console.log("getmessage user success ", res);
        this.setState({ msglist: res.list });
      },
      (rej) => {
        console.log("getmessage user fail ", rej);
      }
    );
  };
  backMypage = () => {
    history.push("/");
  };

  renderContent = (item) => {
    switch (item.msg_type) {
      case "8":
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}
              评论了你:{item.comment.comment_content}
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        );

      case "1":
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}
              关注了你瞬间
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        );
      case "3":
        return (
          <div className="message-middle-comment">
            <div className="message-middle-comment-reply">
              {item.action_user.forum_nike_name}
              认同了你想法
            </div>

            <div className="message-middle-comment-dayago">{item.msg_date}</div>
          </div>
        );
    }
  };
  render() {
    return (
      <div className="message-main">
        <div className="message-header">
          <div className="message-header-img1" onClick={this.backMypage}></div>
          <div className="message-header-title"> 评论与通知</div>
        </div>
        <div>
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
      </div>
    );
  }
}
