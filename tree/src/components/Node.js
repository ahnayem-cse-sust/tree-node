import React, { Component } from 'react';
import Form from './Form.js';

class Node extends Component {
  constructor(props) {
    super(props);
    this.addNewItem = this.addNewItem.bind(this);
    this.state = {
      showInput: false
    }
  }
  getInput() {
    this.setState({ showInput: true });
  }
  addNewItem(newName) {
    // console.log(showName);
    this.setState({ showInput: false });
    this.props.addNode(this.props.item.name, newName);
  }
  render() {
    let form = null;
    if (this.state.showInput) {
      form = <Form addItem={this.addNewItem} />;
    } else {
      form = null;
    }
    return (
      <div className="node">
        <div>
          <div>
            <span className="text-item">
              {this.props.item.name}{this.props.item.childs.length > 0 ? ' (' + this.props.item.childs.length + ')' : ''}
            </span>
            <i onClick={() => this.getInput()} className="fa fa-plus"></i>
            <i onClick={() => this.props.removeNode(this.props.item.name)} className="fa fa-times"></i>
            {form}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Node;
