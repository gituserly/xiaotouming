import React from "react";
import "./Releaseinstant.css";
import history from "../utils/history";
import ajax from "../utils/ajax";
import todaytime from "../utils/todaytime"
// let year=new Date().getFullYear()-2000;
// let month=new Date().getMonth()+1;
// let date=new Date().getDate();
// let today= year+"/"+month+"/"+date;
// let hour=new Date().getHours();
// let min=new Date().getMinutes();
// if(min<10){ min ="0"+min}
// let time=hour+":"+min;
//  let times = "";
//    time = year +"/"+ month +"/"+ date + " " + hour + ":" + min;



export default class Releaseinstant extends React.Component {
  state = {
    shuru: "",
    choosestatus: false,
    statusword: "完全公开",
    privacytype: 1,
    time:null
  };
  componentDidMount(){
    this.getTime()
  }
  getTime=()=>{
    this.setState({time:todaytime()})
    this.timer=setTimeout(()=>{this.getTime()},1000)
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  changeShuru = (e) => {
    this.setState({ shuru: e.target.value });
  };
  chooseStatus = () => {
    this.setState({ choosestatus: !this.state.choosestatus });
  };
  changStatus = (data, type) => {
    this.setState({ statusword: data, choosestatus: false, privacytype: type });
  };
  releaseMessage = () => {
    ajax(`forum`, "POST", {
      user_id: localStorage.getItem("userId"),
      forum_content: this.state.shuru,
      privacy_type: this.state.privacytype,

      //   forum_content_json: JSON.stringify([
      //     { content_type: "text", content_detail: "666" },
      //     {
      //       content_type: "img",
      //       content_detail:
      //         "http://meiui.oss-cn-shanghai.aliyuncs.com/xtm/portrait_icon_boy%403x.png",
      //     },
      //     { content_type: "text", content_detail: "666" },
      //   ]),
    }).then(
      (rs) => {
        console.log("release message success", rs);
        history.push("/mypage");
      },
      (rej) => {
        console.log("release message fail", rej);
      }
    );
  };

  render() {
    console.log("type", this.state.privacytype);

    return (
      <div className="instant-content">
        <div className="instant-main">
          <div className="instant-header">
            <div className="instant-img"></div>
            <div className="instant-release" onClick={this.releaseMessage}>
              发布
            </div>
          </div>
          <div className="instant-release-time">{this.state.time}</div>
          <div>
            {/* <input
              className="instant-input"
              type="text"
              value={this.state.shuru}
              onChange={this.changeShuru}
            /> */}
            <textarea
              className="instant-input"
              id=""
              cols="2100"
              rows=""
              value={this.state.shuru}
              onChange={this.changeShuru}


              
            ></textarea>
          </div>
          <div className="instant-footer">
            <div className=""></div>
            <div className="instant-status" onClick={this.chooseStatus}>
              {this.state.statusword}
            </div>
            <div className=""></div>
          </div>
          {this.state.choosestatus === false ? null : (
            <div className="instant-choosestatus">
              <div className="instant-choosestatus-main">
                <div
                  className={
                    this.state.statusword === "完全公开"
                      ? "instant-choosestatus-list-yellow"
                      : "instant-choosestatus-list"
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img1"></div>
                    <div>


                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus("完全公开", 1)}
                      >
                        完全公开
                      </div>
                      <div className="instant-choosestatus-text2">
                        允许其他小透明认同或评论你
                      </div>
                    </div>
                  </div>
                  {this.state.statusword === "完全公开" ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
                <div
                  className={
                    this.state.statusword === "公开只读"
                      ? "instant-choosestatus-list-yellow"
                      : "instant-choosestatus-list"
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img2"></div>
                    <div>
                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus("公开只读", 2)}
                      >
                        公开只读
                      </div>
                      <div className="instant-choosestatus-text2">
                        允许其他小透明认同你
                      </div>
                    </div>
                  </div>

                  {this.state.statusword === "公开只读" ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
                <div
                  className={
                    this.state.statusword === "完全私密"
                      ? "instant-choosestatus-list-yellow"
                      : "instant-choosestatus-list"
                  }
                >
                  <div className="instant-choosestatus-left">
                    <div className="instant-choosestatus-img3"></div>
                    <div>
                      <div
                        className="instant-choosestatus-text1"
                        onClick={() => this.changStatus("完全私密", 3)}
                      >
                        完全私密
                      </div>
                      <div className="instant-choosestatus-text2">
                        仅自己可见
                      </div>
                    </div>
                  </div>
                  {this.state.statusword === "完全私密" ? (
                    <div className="instant-choosestatus-gou">√</div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
