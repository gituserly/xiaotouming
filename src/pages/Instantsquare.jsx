import React from "react";
import "./Instantsquare.css";
import Icon from "../components/icon";
import ajax from "../utils/ajax";
import conversionTime from "../utils/conversionTime";
import history from "../utils/history";
import Topic from "../components/topic";
import MoreModal from "../components/more-modal";
import Navbar from "../components/navbar";

export default class Instantsquare extends React.Component {
  state = {
    squarelist: [],
    loading: false,
    page: 1,

    isDisplay: false,
    currentId: null,
  };

  componentDidMount() {
    this.getInstantSquareList(1);
  }
  getInstantSquareList = (page) => {
    this.setState({ loading: true });
    ajax(
      `forum?list_type=3&page=${page}&user_id=${localStorage.getItem(
        "userId"
      )}`,
      "GET"
    ).then(
      (rs) => {
        console.log("get instantsquare message success", rs);
        this.setState({
          squarelist: [...this.state.squarelist, ...rs.list],
          loading: false,
          page,
        });
      },
      (rej) => {
        console.log("get instantsquare message fail", rej);
        this.setState({ loading: false });
      }
    );
  };
  entersquareInstantdetails = (id) => {
    history.push(`/mypage/instantdetails?id=${id}`);
  };
  backMypage = () => {
    history.push("/");
  };

  onScroll = (e) => {
    const dom = e.target;
    const distance = dom.scrollHeight - dom.offsetHeight;
    console.log("distance", distance, dom.scrollTop);
    if (distance - dom.scrollTop < 10) {
      console.log("bottom");
      this.getInstantSquareList(this.state.page + 1);
    }
  };
  render() {
    if (!this.state.squarelist) return null;

    return (
      <Navbar
        renderRight={() => (
          <div
            className="instantsquare-img2"
            onClick={() => {
              history.push("/mypage/message");
            }}
          ></div>
        )}
      >
        <div className="instantsquare-content" onScroll={this.onScroll}>
          <div className="instantsquare-main">
            <div className="instantsquare-keyword">瞬间</div>
            <div>
              <ul>
                {this.state.squarelist.map((item) => (
                  <Topic
                    showMore
                    onMoreClick={() =>
                      this.setState({ isDisplay: true, currentId: item.id })
                    }
                    key={item.id}
                    data={item}
                    onClick={() => this.entersquareInstantdetails(item.id)}
                  />
                ))}
              </ul>
            </div>
          </div>
          {this.state.isDisplay && (
            <MoreModal
              id={this.state.currentId}
              onClose={() => this.setState({ isDisplay: false })}
            />
          )}
        </div>
      </Navbar>
    );
  }
}
