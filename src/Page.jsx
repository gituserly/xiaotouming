import React from "react";
import "./Page.css";
export default class Page extends React.Component {
  render() {
    return (
      <div className="page-main">
        <div className="page-img"></div>
        <div className="page-header">让我们更了解你一些</div>
        <div className="page-sex">
          <div className="sex">性别</div>
          <div>
            <select name="" id="">
              <option selected hidden disabled value="">
                点击选择性别
              </option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>
        <div className="page-name">
          <div className="name">昵称</div>
          <div>
            <input
              type="text"
              placeholder="输入您的昵称"
              value=""
              className="page-input-name"
            />
          </div>
        </div>
        <div className="page-position">
          <div className="position">位置</div>
          <div>
            <input
              type="text"
              placeholder="点击获取地理位置"
              value=""
              className="page-input-position"
              
            />
          </div>
        </div>
        <button className="page-button">一切就绪，开始漂流</button>
      </div>
    );
  }
}
