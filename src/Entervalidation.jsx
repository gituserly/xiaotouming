import React from "react";
import "./Entervalidation.css";
import history from "./utils/history";
import ajax from "./utils/ajax";
import { Route, Router } from "react-router-dom";
export default class Entervalidation extends React.Component {
  state = { validation: "" };
  shuruValidation = (e) => {
    const value = e.target.value;
    const reg = /^\d*?$/;
    if ((reg.test(value) && value.length < 5) || value === "") {
      this.setState(
        {
          validation: value,
        },
        () => {
          console.log("shuru", this.state.validation);
        }
      );
      if (value === 4) {
        this.props.history.push({
          pathname: "./login",
          query: { loginphone: loginnumber},
        });
        // Router.push({
        //     pathname:'/login',
        //     state:{loginphone: 15520817315}
        //     })
        const lphone = this.props.location.query.loginphone;
        ajax(`authentication/openLogin`, "get", {
          type: 1,
          phone: loginnumber,
          code: this.state.validation,
          debug:1,
          key:"value"
        }).then(
          (rs) => {
            console.log("validation success", rs);
            history.push("/next");
          },
          (rej) => {
            console.log("reject", rej);
          }
        );
      }
    } else {
      console.log("don't number");
    }
  };

  render() {
    return (
      <div className="content-va">
        <div className="header-va">
          <div className="img-va"></div>
          <div className="middle-va">输入验证码</div>
          <div className="input-va">
            <input
              type="text"
              className="input-value"
              value={this.state.validation}
              onChange={this.shuruValidation}
            />
            {/* <ul className ="box">
                        <li><span>2</span></li>
                        <li><span>3</span></li>
                        <li><span>4</span></li>
                        <li><span>5</span></li>
                        
                    </ul> */}
          </div>
          <div className="footer-va">重新获取</div>
        </div>
      </div>
    );
  }
}
