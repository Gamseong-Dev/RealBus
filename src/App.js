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
      geoError: '',
      daum: {
        address: ''
      },
      range: ''
    }
    this.handleGetGeo = this.handleGetGeo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handelDaumApi = this.handelDaumApi.bind(this)
    this.handleSetRange = this.handleSetRange.bind(this)
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
  handelDaumApi(){
    let _this = this;
    window.openDaumPostcode(function(data) {
      _this.setState({daum: {...data}})
    });
  }
  handleSetRange(range){
    this.setState({range})
  }
  render() {
    return (
      <div id="App">
        <div className="main-wrap">
          <div className="header">
            <h1><span>버스, </span><span>어딨니?!</span></h1>
            <p><span>실시간으로 버스 위치를 확인하는 </span><span>버스 서비스</span></p>
          </div>
          <div className="setting-box">
            <Tabs>
              <div className="location" name="장소 설정">
                <form onSubmit={this.handleSubmit}>
                  <div className="search-box">
                    <input type="search" id="search" name="locationsearch" onClick={this.handelDaumApi} placeholder="예) 강남대로94길 13, 역삼동 818-12" value={this.state.daum.address} readOnly />
                    <div className="search-btn" onClick={this.handelDaumApi}><img src={require("./images/search_white.png")} alt="search" /></div>
                  </div>
                  <div id="juso"></div>
                  <div className="my-location">
                    <img src={require('./images/mylocation_white.png')} alt="현재위치로 설정하기" />
                    <span onClick={this.handleGetGeo}>현재위치로 설정하기</span>
                  </div>
                  <SelectBox handleSetRange={this.handleSetRange}/>
                  <input type="submit" value="설정 완료하기" />
                </form>
                <p className="desc">※ 현재 위치 또는 사용자가 지정한 위치를 중심으로 반경 1 ~ 5km 내에 있는 실시간 버스 위치를 보여줍니다.</p>
              </div>
              <div className="bus" name="버스 설정">
                <form action="" method="">
                  <div className="search-box">
                    <input type="search" name="bussearch" placeholder="버스 노선번호 입력" value="" readOnly />
                    <div className="search-btn"><img src={require("./images/search_white.png")} alt="search" /></div>
                  </div>
                  <input type="submit" value="설정 완료하기" />
                </form>
                <p className="desc">※ 조회한 버스 노선 번호의 실시간 버스 위치를 보여줍니다.</p>
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
        <ul className="tabs-ul">
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
