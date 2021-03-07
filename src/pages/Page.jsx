import React from "react";
import "./Page.css";
import ajax from "../utils/ajax";
import history from "../utils/history";
const queryString = require("query-string");

const SEX_LIST = [
  {
    name: "保密",
    key: 0,
  },
  {
    name: "男",
    key: 1,
  },
  {
    name: "女",
    key: 2,
  },
];
export default class Page extends React.Component {
  state = {
    name: "",
    choosesex: false,
    chooseposition: false,
    positionallow: false,
    sexkey: null,
  };

  changName = (e) => {
    this.setState({ name: e.target.value });
  };
  chooseSex = () => {
    this.setState({ choosesex: true });
  };

  choosePosition = () => {
    this.setState({ chooseposition: true });
  };
  incomingUserinformation = () => {
    const parsed = queryString.parse(window.location.search);
    ajax(`user/${localStorage.getItem("userId")}`, "PUT", {
      edit_type: 1,
      phone: parsed.phone,

      nike_name: this.state.name,

      sex: this.state.sexkey,
      location_type: 2,
      nike_name_type: 2,
      location: {
        city: "上海市",
        province: "",
        x: "121.35086816210703",
        y: "31.097496933844706",
      },
    }).then(
      (rs) => {
        console.log("incoming user information success", rs);
        history.push("/mypage");
      },
      (rej) => {
        console.log("incoming user information fail", rej);
      }
    );
  };

  get sexName() {
    if (this.state.sexkey === 1) return "男";
    if (this.state.sexkey === 2) return "女";
    return "请选择性别";
  }

  updateSex = (sexkey) => {
    this.setState({ sexkey, choosesex: false }, () =>
      console.log(this.state.sexkey)
    );
  };

  renderLocaltionModal = () => {
    return (
      <div className="position-content">
        <div className="position-main">
          <div className="position-header">允许“小透明”访问您的位置？</div>
          <div className="s1">
            <div className="position-middle">
              一段系统的默认文案，具体是什么我也记不清,大概占位
            </div>
          </div>
          <div className="s2">
            <div className="position-footer">
              <div
                onClick={() => {
                  this.setState({ chooseposition: false });
                }}
              >
                拒绝
              </div>
              <div
                onClick={() => {
                  this.setState({
                    positionallow: true,
                    chooseposition: false,
                  });
                }}
              >
                允许
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSexModal = () => (
    <div className="sex-content">
      <div className="sex1">
        <ul>
          {SEX_LIST.map((sex) => (
            <li
              key={sex.key}
              className="li-page"
              onClick={() => this.updateSex(sex.key)}
            >
              {sex.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sex2" onClick={() => this.updateSex(this.state.sexkey)}>
        <span className="sex2-font">取消</span>
      </div>
    </div>
  );
  renderPositionModel=()=>(
    <div className="sex-content">
      <div className="sex1">
        <ul>
          <li className="li-page">定位中</li>
          <li className="li-page">隐藏所在地</li>
        </ul>
      </div>
      <div
        className="sex2"
        onClick={() => this.setState({ positionallow: false })}
      >
        <span className="sex2-font">取消</span>
      </div>
    </div>
  )

  render() {
    return (
      <div className="page-main">
        <div className="page-img"></div>
        <div className="page-header">让我们更了解你一些</div>
        <div className="page-sex">
          <div className="sex">性别</div>
          <div className="choose-sex" onClick={this.chooseSex}>
            {this.sexName}
          </div>
        </div>
        <div className="page-name">
          <div className="name">昵称</div>
          <div>
            <input
              type="text"
              placeholder="输入您的昵称"
              value={this.state.name}
              className="page-input-name"
              onChange={this.changName}
            />
          </div>
        </div>
        <div className="page-position">
          <div className="position">位置</div>
          <div className="choose-position" onClick={this.choosePosition}>
            点击获取地理位置
          </div>
        </div>
        <div className="page-button">
          <button className="button" onClick={this.incomingUserinformation}>
            一切就绪，开始漂流
          </button>
        </div>


      
        {this.state.choosesex && this.renderSexModal()}
        {this.state.chooseposition&& this.renderLocaltionModal() }

        
        {this.state.positionallow && this.renderPositionModel }
      </div>
    );
  }
}
