import React, { Component } from 'react';
import './App.css';
import SelectBox from './SelectBox'

class App extends Component {
  constructor(props){
    super(props)

    this.state={
      selectStyle: 'select'
    }
  }
  componentDidMount() {
    window.onload = this.fullSize;
    window.onresize = this.fullSize;
  }

  fullSize() {
    document.getElementById("App").style.width = window.innerWidth + "px";
    document.getElementById("App").style.height = window.innerHeight + "px";
  }

  render() {

    // const defaultOption = null;

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
                <form action="" method="">
                  <input type="search" name="locationsearch" placeholder="주소 API 써야하는거 아닌가?" />
                  <div className="my-location">
                    <img src={require('./images/mylocation_white.png')} alt="현재위치로 설정하기" />
                    <span>현재위치로 설정하기</span>
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

export default App;
