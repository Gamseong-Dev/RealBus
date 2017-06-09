import React, { Component } from 'react';
import './App.css';

class SelectBox extends Component {
  constructor(props){
    super(props)
    this.state={
      selectStyle: 'select',
      placeholder: '범위 설정하기'
    }
  }
  render() {
    const options = [ '1km', '5km', '10km' ];
    let selectStyle = this.state.selectStyle
    return (
        <div className={selectStyle}>
          <span className="placeholder" onClick={() => this.setState({ selectStyle: 'select is-open'})}>{this.state.placeholder}</span>
          <ul className="select-ul">
            {options.map((opt,i) =>
                 <li
                    key={i}
                    className="select-li"
                    onClick={() => this.setState({ selectStyle: 'select', placeholder: opt })}>
                    {opt}
                 </li>)}
          </ul>
        </div>
    );
  }
}

export default SelectBox;
