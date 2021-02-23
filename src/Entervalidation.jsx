import React from "react";
import "./Entervalidation.css";
import history from "./utils/history";
import ajax from "./utils/ajax";
import querystring from "query-string";
import { Route, Router } from "react-router-dom";
const queryString = require("query-string");

console.log("query-string",window.location.search);

const parsed = queryString.parse(window.location.search);
console.log(parsed);
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
          if (value.length === 4) {
           
            // this.input.blur()
            setTimeout(() => {
              this.input.scrollLeft = 0
            }, 0);
            // console.log('input', this.input);
          

            ajax(`authentication/openLogin`, "POST", {
              type: 1,
              phone: parsed.phone,
              code: this.state.validation,
            }).then(
              (rs) => {
                console.log("validation success", rs);
                localStorage.setItem("token", rs.token);
                localStorage.setItem("userId", rs.open_id);
                history.push("/");
              },
              (rej) => {
                console.log("reject", rej);
              }
            );
          }
        }
      );
    } else {
      console.log("don't number");
      <div>fail</div>
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
              
          ref={ref => this.input = ref}
            />
            <div className="input-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
          </div>
          <div className="footer-va">重新获取</div>
        </div>
        <div className ="fail-va">
             <span className="fail-text">您输入的验证码有误</span>
          </div>
      </div>
    );
  }
}
