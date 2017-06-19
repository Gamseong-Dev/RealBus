import React, { Component } from 'react';
import './App.css';

class SelectBox extends Component {
  constructor(props){
    super(props)
    this.state={
      selectStyle: 'select',
      placeholder: '범위 설정하기'
    }
    this.handleSelected = this.handleSelected.bind(this)
  }
  handleSelected(range){
    this.setState({ selectStyle: 'select', placeholder: range })
    this.props.handleSetRange(range)
  }
  render() {
    const options = [ '1km', '3km', '5km' ];
    let selectStyle = this.state.selectStyle
    return (
        <div className={selectStyle}>
          <span className="placeholder" onClick={() => this.setState({ selectStyle: 'select is-open'})}>{this.state.placeholder}</span>
          <ul className="select-ul">
            {options.map((range,i) =>
                 <li
                    key={i}
                    className="select-li"
                    onClick={() => this.handleSelected(range)}>
                    {range}
                 </li>)}
          </ul>
        </div>
    );
  }
}

export default SelectBox;
