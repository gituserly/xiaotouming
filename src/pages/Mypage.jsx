import React from "react";
import "./Mypage.scss";
import ajax from "../utils/ajax";
import history from "../utils/history";
import conversionTime from "../utils/conversionTime";
// console.log(localStorage.getItem("userId"));

export default class Mypage extends React.Component {
  state = {
    currentType: 1,
    instantlist: [],
    fcouslist: [],
    moveInfo: {
      useable: false,
      start: 0,
      end: 0,
    },
  };
  componentDidMount() {
    this.fetchData(1);
  }

  fetchData = (type, page = 1) => {
    console.log("fetchData", type);
    this.setState({ currentType: type });
    ajax(
      `forum?list_type=${type}&page=${page}&user_id=${localStorage.getItem(
        "userId"
      )}`,
      "GET"
    ).then(
      (rs) => {
        console.log("get  message success", rs);
        if (type === 1) {
          this.setState({ instantlist: rs.list });
        }
        if (type === 2) {
          this.setState({ fcouslist: rs.list });
        }
      },
      (rej) => {
        console.log("get  message fail", rej);
      }
    );
  };

  enterInstansdetails = (id) => {
    history.push(`/mypage/instantdetails?id=${id}`);
  };
  releaseInstant = () => {
    history.push("/mypage/releaseinstant");
  };
  onTouchStart = (e) => {
    console.log("e",e)
    console.log("this.scrollBox",this.scrollBox)
    if (this.scrollBox.scrollTop > 0) {
      //如果有滑动 this.scrollBox.scrollTop > 0
      console.log('USEABLE', false);
      this.setState({
        moveInfo: {
          useable: false
        },
      });
      return
    };
    
    console.log('stART', this.scrollBox.scrollTop);
    this.setState({
      moveInfo: {
        useable: true,
        start: e.touches[0].clientY,
      },
    });
  };
  onTouchMove = (e) => {
    // console.log("e",e)
    if (!this.state.moveInfo.useable) return;
    this.setState({
      moveInfo: {
        ...this.state.moveInfo,
        end: e.touches[0].clientY,
      },
    });
  };
  onTouchEnd = () => {
    const { start, end, useable } = this.state.moveInfo;
    if (!useable) return;
    console.log('useable', useable);
    if (start - end < -50) {
      console.log("下滑");
    }
  };
  render() {
    const showList =
      this.state.currentType === 1
        ? this.state.instantlist
        : this.state.fcouslist;
    // console.log("this.state.instantlist", this.state.instantlist);
    return (
      <div className="mypage-main">
        <div className="mypage-place">
          <div className="s">
            <span className="place-position"></span>
            <span className="place-name">上海</span>
          </div>
          <div className="place-tab"></div>
        </div>
        <div className="mypage-date">10月28日</div>
        <div className="mypage-knowtime">我们相识的第一千零一天</div>
        <div>
          <button className="mypage-button">
            <span className="mypage-button-text" onClick={this.releaseInstant}>
              写点什么
            </span>
          </button>
        </div>
        <div className="mypage-text">
          {[
            { name: "瞬间", key: 1 },
            { name: "关注", key: 2 },
          ].map((item) => (
            <div
              key={item.key}
              className={`instant ${
                item.key === this.state.currentType ? "active" : ""
              }`}
              onClick={() => this.fetchData(item.key)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div
          className="scroll-box"
          ref={(ref) => (this.scrollBox = ref)}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          <ul>
            {showList.map((item) => {
              const tm = conversionTime(item.create_time, "Y/M/D H:m");
              return (
                <li
                  className="li-mypage"
                  key={item.id}
                  onClick={() => this.enterInstansdetails(item.id)}
                >
                  <p>{item.forum_content}</p>
                  <div className="li-div">
                    <div>{tm}</div>
                    {item.privacy_type === "3" ? (
                      <div>私密</div>
                    ) : (
                      <div>
                        {item.agree_count}认同.{item.comment_count}想法
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
