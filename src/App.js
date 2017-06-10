import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'
import SelectBox from './SelectBox'
import './App.css';

// const currentPage = 1;
// const countPerPage = 200;
// const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0';
// const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';



class App extends Component {
  constructor(props){
    super(props)

    this.state={
      latitude: '',
      longitude: '',
      geoError: ''
    }
    this.handleGetGeo = this.handleGetGeo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    window.onload = this.fullSize;
    window.onresize = this.fullSize;
  }

  fullSize() {
    document.getElementById("App").style.width = window.innerWidth + "px";
    document.getElementById("App").style.height = window.innerHeight + "px";
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log("eveeee")
  }
  handleGetGeo() {
    let _this = this;
    console.log("시작")
      if (!navigator.geolocation){
        console.log("지원 노노")
        this.setState({geoError: '브라우저가 지원하지 않습니다.'})
        return;
      }

      function success(position) {
        console.log("성공")
        _this.setState({
          latitude  : position.coords.latitude,
          longitude : position.coords.longitude
        })
        console.log(_this.state)
        _this.props.getUserGeo(position.coords.longitude, position.coords.latitude)
      };

      function error() {
        console.log("에러")
        _this.setState({geoError:"사용자의 위치를 찾을 수 없습니다."});
      };
      navigator.geolocation.getCurrentPosition(success, error);
  }
  render() {
    return (
      <div id="App">
        <div className="main-wrap">
          <div className="header">
            <h1>버스, <br />어딨니?!</h1>
            <p>실시간으로 버스 이동을 확인하는 <br />버스 서비스</p>
          </div>
          <div className="setting-box">
            <Tabs>
              <div className="location" name="장소 설정">
                <form onSubmit={this.handleSubmit}>
                  <input type="search" name="locationsearch" placeholder="주소 API 써야하는거 아닌가?" />
                  <div className="my-location">
                    <img src={require('./images/mylocation_white.png')} alt="현재위치로 설정하기" />
                    <span onClick={this.handleGetGeo}>현재위치로 설정하기</span>
                  </div>
                  <SelectBox />
                  <input type="submit" value="설정 완료하기" />
                </form>
              </div>
              <div className="bus" name="버스 설정">
                <form action="" method="">
                  <input type="search" name="bussearch" placeholder="버스 노선번호 입력" />
                  <input type="submit" value="설정 완료하기" />
                </form>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}



class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this.handleTabs = this.handleTabs.bind(this)
  }

  handleTabs(i){
    this.setState({ selected: i})
  }

  render() {
    return (
      <div className="tabs">
        <ul>
          {this.props.children.map((child, i) => {
            return <li
                      key={i}
                      onClick={() => this.handleTabs(i)}
                      className={this.state.selected === i ? "active" : ""}
                    >
                      {child.props.name}
                   </li>
          })}
        </ul>
        <div>
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App)
