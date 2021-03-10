import React from "react";
import "./Instantsquare.css";
import ajax from "../utils/ajax";
import conversionTime from "../utils/conversionTime";
import history from "../utils/history"
export default class Instantsquare extends React.Component {
  state = {
    squarelist: null,
    isdisplay:false
  };

  componentDidMount() {
    this.getInstantSquareList(10);
  }
  getInstantSquareList = (page) => {
    ajax(
      `forum?list_type=3&page=${page}&user_id=${localStorage.getItem(
        "userId"
      )}`,
      "GET"
    ).then(
      (rs) => {
        console.log("get instantsquare message success", rs);
        this.setState({ squarelist: rs.list }, () => console.log("rs", rs));
      },
      (rej) => {
        console.log("get instantsquare message fail", rej);
      }
    );
  };
  entersquareInstantdetails = (id) => {
    history.push(`/mypage/instantdetails?id=${id}`);
  };
  render() {
    if (!this.state.squarelist) return null;

    return (
      <div className="instantsquare-content">
        <div className="instantsquare-main">
          <div className="instantsquare-header">
            <div className="instantsquare-img1"></div>
            <div className="instantsquare-img2"></div>
          </div>
          <div className="instantsquare-keyword">瞬间</div>
          <div>
            <ul>
              {this.state.squarelist.map((item) => (
                
                <li key={item.id} onClick={()=>this.entersquareInstantdetails(item.id)}> 
                {console.log("item.user_id",item.user_id)}
                  <div className="instantsquare-li">
                    <div className="instantsquare-li-header">
                      <div className="instantsquare-li-userpic" >
                      <img className="instantsquare-li-userpicture" src={item.user_pic}/>
                      </div>
                      <div className="instantsquare-li-box1">
                        <div className="instantsquare-li-username">
                          {item.forum_nike_name}
                        </div>
                        <div className="instantsquare-li-dayago">
                          多少天来过
                        </div>
                      </div>
                    </div>
                    <div className="instantsquare-li-shenlue">...</div>
                  </div>
                  <p className="instantsquare-li-middle">
                    {item.forum_content}
                  </p>
                  <div className="instantsquare-li-footer">
                    <div className="instantsquare-li-time">
                      {" "}
                      {conversionTime(item.create_time, "Y/M/D H:m")}
                    </div>
                    <div className="instantsquare-li-lik-mes">
                      <div className="instantsquare-li-like">
                        ❤{item.agree_count}
                      </div>
                      <div className="instantsquare-li-message">message 24</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    );
  }
}
