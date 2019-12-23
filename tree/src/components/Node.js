import React, { Component } from 'react';


class Node extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="node">
        <div>
          <p>
            {this.props.item.name}
            <i onClick={() => this.props.addNode(this.props.item.name)} className="fa fa-plus"></i>
          </p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Node;