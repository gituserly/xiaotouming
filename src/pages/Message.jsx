import React from "react";
import "./Message.scss";

export default class Message extends React.Component {
  render() {
    return (
      <div className="message-main">
        <div className="message-header">
          <div className="message-header-img1"></div>
          <div className="message-header-title"> 评论与通知</div>
        </div>
        <div>
          <ul>
            <li className="message-middles">
              <div className="message-middle">
                <div className="message-middle-avatar">tx</div>
                <div className="message-middle-comment">
                  <div className="message-middle-comment-reply">
                    白鹭上西天 评论了你:非常非常感谢大哥做我网管的引路人让我ss无法…
                  </div>

                  <div className="message-middle-comment-dayago">1天前</div>
                </div>
                <div className="message-middle-text">
                  我把我整个灵魂都给你 …
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
