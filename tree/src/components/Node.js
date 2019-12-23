import React, { Component } from 'react';


class Node extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="node">
        <div>
          <div>
            <span className="text-item">
              {this.props.item.name}{this.props.item.childs.length > 0 ? '(' + this.props.item.childs.length + ')' : ''}
            </span>
            <i onClick={() => this.props.addNode(this.props.item.name)} className="fa fa-plus"></i>
            <i onClick={() => this.props.removeNode(this.props.item.name)} className="fa fa-times"></i>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Node;