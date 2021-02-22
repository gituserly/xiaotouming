import React from "react";
import history from "./utils/history";
import ajax from "./utils/ajax";
import "./Login.css";

export default class Login extends React.Component {
  state = { shuru: "" };
  changeShuru = (e) => {
    const vl= e.target.value
    
    const reg = /^1([0-9]*)?$/;
    if ((reg.test(vl) && vl.length < 12) || vl === '') {
      this.setState({
        shuru: vl
      },()=> {console.log("shuru",this.state.shuru)})
     
    }
    else{
      console.log("don't correct number")
    }
    
  };
  render() {
    const loginnumber=this.state.shuru
    console.log("login number",loginnumber)
    return (
      <div className="content">
        <div className ="main"> 
        <div className="img1"></div>
        <div className ="login-xtm">登陆小透明的世界</div>
        <div className="login-input">
        <div className="shuzi">
          +86
          </div>
          <div>
          <input className="input-text"
            type="text"
            placeholder="请输入手机号"
          
            value={this.state.shuru}
            onChange={this.changeShuru}
          />
          </div>
        </div>
        <div>
          <button className="yanzheng-button"
            onClick={() => {
              
          ajax(`authentication/code?phone=${this.state.shuru}&sign=53ee50718b01b71c03fa47d352e0b667`,"get")
          .then((rs)=>{
            console.log(" login success",rs);
            history.push('/entervalidation')  
          },(rej)=>{console.log('reject',rej)})
           
            }
          }
          >
           <span className ="getyanzhengma">获取验证码</span> 
          </button>
        </div>
        <div className ="tishi"> 新手机号码验证后自动注册</div>
        <div className="img2"></div>
        <div className ="wechat-login">微信登录</div>
        </div>
      </div>
    );
  }
}
