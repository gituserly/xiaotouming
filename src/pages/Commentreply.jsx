import React from "react";
import "./Commentreply.scss";
import ajax from "../utils/ajax";
import queryString from "query-string";
import history from "../utils/history";

export default class Commentreply extends React.Component {
  state = {
    commentdata: "",
    replyword: "",
    status: null,
    replylist: [],
  };
  getCommentdetalis = () => {
    const par = queryString.parse(window.location.search);
    ajax(
      `comment/${par.id}?user_id=${localStorage.getItem("userId")}`,
      "GET"
    ).then((res) => {
      console.log("get commment details success");
      this.setState({ commentdata: res }, () => console.log(res));
     this.getReplyCommentList()

    });
  };
getReplyCommentList=()=>{
    ajax(
        `comment?forum_id=${this.state.commentdata.forum_id}&comment_id=${
          this.state.commentdata.id
        }&list_type=2&page=1&user_id=${localStorage.getItem("userId")}`,
        "GET"
      ).then(
          (res) => {
              console.log("get reply comment success");
              this.setState({ replylist: res.list }, () => console.log(res.list));
            },
            (rej) => {
              console.log("get reply comment fail", rej);
            }
          );
}
  componentDidMount() {
    this.getCommentdetalis();
    
  }
  backInstantdetalis = () => {
    history.push(
      `/mypage/instantdetails?id=${this.state.commentdata.forum_id}`
    );
  };
  replyIdea = () => {
    this.setState({ status: null });

    ajax(`comment`, "POST", {
      user_id: localStorage.getItem("userId"),
      comment_content: this.state.replyword,
      forum_id: this.state.commentdata.forum_id,
      at_comment_id: this.state.commentdata.id,
      privacy_type: 1,
    }).then(
      (res) => {
        console.log("reply idea success");
      this.getReplyCommentList()
      },
      (rej) => {
        console.log("reply idea fail", rej);
      }
    );
  };
  render() {
    const { commentdata, replyword } = this.state;
    return (
      <div className="commentreply-main">
        <div
          className="commentreply-back"
          onClick={this.backInstantdetalis}
        ></div>
        <div className="commentreply-comment">
          <div className="commentreply-comment-header">
            <img
              className="commentreply-comment-header-userpic"
              src={commentdata.user_pic}
            />
            <div className="commentreply-comment-header-username">
              {commentdata.forum_nike_name}
            </div>
            <div className="commentreply-comment-header-more"></div>
          </div>
          <div className="commentreply-comment-middle">
            {commentdata.comment_content}
          </div>
          <div className="commentreply-comment-footer">
            <div className="commentreply-comment-footer-time">
              {commentdata.date_time}
            </div>
            <div className="commentreply-comment-footer-agree">
              <div className="commentreply-comment-footer-agree-img"></div>
              <div className="commentreply-comment-footer-agree-count">
                {commentdata.agree_count}
              </div>
            </div>
            <div className="commentreply-comment-footer-msg">
              <div className="commentreply-comment-footer-msg-img"></div>
              <div className="commentreply-comment-footer-msg-count">
                {commentdata.reply_count}
              </div>
            </div>
          </div>
        </div>
        <div className="commentreply-reply">
          <div>{commentdata.reply_count}条回复</div>
          <div
            onClick={() => {
              this.setState({ status: "replymessage" });
            }}
          >
            回复
          </div>
        </div>
        {this.state.status && (
          <div
            className="commentreply-status"
            onClick={() => {
              this.setState({ status: null });
            }}
          >
            <div
              className="commentreply-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              <textarea
                className="commentreply-bottom-textarea"
                value={replyword}
                placeholder="评论千万条，真诚最重要"
                onChange={(e) => {
                  this.setState({ replyword: e.target.value });
                }}
              ></textarea>
              <div
                className="commentreply-bottom-word"
                onClick={this.replyIdea}
              >
                发送
              </div>
            </div>
          </div>
        )}



        <ul>
            {this.state.replylist.map((item)=><li key={item.comment.id}>
            <div className="commentreply-comment-header">
              <img className="commentreply-comment-header-userpic-reply" src={item.comment.user_pic}/>
              <div className="commentreply-comment-header-username">{item.comment.forum_nike_name}</div>
              <div className="commentreply-comment-header-time">{item.comment.date_time}</div>
            </div>
            <div className="commentreply-comment-middle">
              {item.comment.comment_content}
            </div>
          </li>)}
          
        </ul>
      </div>
    );
  }
}
