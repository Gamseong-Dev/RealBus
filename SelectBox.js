import React, { Component } from 'react';
import './App.css';

class SelectBox extends Component {
  constructor(props){
    super(props)
    this.state={
      selectStyle: 'select',
      placeholder: '범위 설정하기',
      toggle: false
    }
    this.handleSelected = this.handleSelected.bind(this)
  }
  handleSelected(range){
    this.setState({ selectStyle: 'select', placeholder: range, toggle: !this.state.toggle})
    this.props.handleSetRange(range)
  }
  handleIsOpen = () => {
    this.setState({ selectStyle: 'select is-open', toggle: !this.state.toggle})
    !this.state.toggle === true ? this.setState({ selectStyle: 'select is-open'}) : this.setState({ selectStyle: 'select'})
  }
  render() {
    const options = [ '1km', '3km', '5km' ];
    let selectStyle = this.state.selectStyle
    return (
        <div className={selectStyle}>
          <span className="placeholder" onClick={this.handleIsOpen}>{this.state.placeholder}</span>
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
