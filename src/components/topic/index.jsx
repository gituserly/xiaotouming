import React, { Component } from "react";
import Icon from "../icon";
import ajax from "../../utils/ajax";
import conversionTime from "../../utils/conversionTime";
import "./index.scss";

export default class Topic extends Component {
  state = {
    agree_flag: null,
    agree_count: null,
  };

  componentDidMount() {
    const { agree_flag, agree_count } = this.props.data;
    this.setState({ agree_flag, agree_count: +agree_count });
  }

  agreeIdea = async () => {
    const { id, forum_id } = this.props.data;
    const { agree_flag, agree_count } = this.state;
    if (forum_id) {
      try {
        if (agree_flag === 2) {
          await ajax(
            `forum/agree/${localStorage.getItem("userId")}_${forum_id}_${id}`,
            "POST",
            { agree_type: 3 }
          );
          this.setState({
            agree_flag: 1,
            agree_count: agree_count + 1,
          });
        }
        if (agree_flag === 1) {
          const res = await ajax(
            `forum/agree/${localStorage.getItem(
              "userId"
            )}_${forum_id}_${id}?agree_type=3`,
            "DELETE"
          );
          this.setState({
            agree_flag: 2,
            agree_count: agree_count - 1,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!forum_id) {
      try {
        if (agree_flag === 2) {
          await ajax(
            `forum/agree/${localStorage.getItem("userId")}_${id}`,
            "POST",
            { agree_type: 2 }
          );
          this.setState({
            agree_flag: 1,
            agree_count: agree_count + 1,
          });
        }
        if (agree_flag === 1) {
          const res = await ajax(
            `forum/agree/${localStorage.getItem("userId")}_${id}?agree_type=2`,
            "DELETE"
          );
          this.setState({
            agree_flag: 2,
            agree_count: agree_count - 1,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { data, onClick, content, showMore, onMoreClick } = this.props;
    return (
      <div className="ins-li">
        <div className="instantsquare-li">
          <div className="instantsquare-li-header">
            <div className="instantsquare-li-userpic">
              <img
                className="instantsquare-li-userpicture"
                src={data.user_pic}
              />
            </div>
            <div className="instantsquare-li-box1">
              <p className="instantsquare-li-username">
                {data.forum_nike_name}
              </p>
              <p className="instantsquare-li-dayago">{data.last_login_time}</p>
            </div>
          </div>
          <div className="instantsquare-li-shenlue" onClick={onMoreClick}>
            {showMore && <Icon type="more" />}
          </div>
        </div>
        <p
          className="instantsquare-li-middle"
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          {content || data.forum_content}
        </p>
        <div className="instantsquare-li-footer">
          <div className="instantsquare-li-time">
            {conversionTime(data.create_time, "Y/M/D H:m")}
          </div>
          <div className="instantsquare-li-lik-mes">
            <div className="instantsquare-li-like" onClick={this.agreeIdea}>
              <Icon
                type={
                  this.state.agree_flag === 1 ? "collect-active" : "collect"
                }
              />
              {this.state.agree_count}
            </div>
            {showMore && (
              <div className="instantsquare-li-message">
                <Icon type="chat" /> {data.comment_count}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
