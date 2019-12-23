import React, { Component } from 'react';
import Node from './Node.js';
import getTree from '../algorithms/tree.js';

class Tree extends Component {
    totalNode = 5;
    constructor(props) {
        super(props);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.state = {
            dataArray: [],
            tree: {},
        }
    }
    componentDidMount() {
        let self = this;
        let dataArray = JSON.parse(localStorage.getItem("dataArray") || "[]");
        if (dataArray) {
            self.setState({ dataArray: dataArray });
        }
    }
    addNode(parent) {
        let randomName = Math.random().toString(36).substring(7);
        let self = this;
        let node = {
            parent: parent,
            name: randomName + this.totalNode
        }
        this.totalNode++;
        let dataArray = this.state.dataArray;
        dataArray.push(node);
        self.setState({ dataArray: dataArray });
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
    }
    removeNode(name){
        console.log(name);
    }
    render() {
        let self = this;
        let structuredTree = getTree(this.state.dataArray);
        console.log(structuredTree);

        let getChildNodes = (item) => {
            // console.log(item.childs);
            let childNodes = "";
            if (item.childs.length > 0) {
                // console.log('gg');
                let childs = item.childs;
                childNodes = childs.map((v,k) => {
                    // console.log(v);
                    return (
                        <div key={k}>
                            {getChildNodes(v)}
                        </div>
                    );
                })
            }
            return (
                <div>
                    <Node addNode={self.addNode} removeNode={self.removeNode} item={item} key={item.name}>
                        {childNodes}
                    </Node>

                </div>
            );
        }

        let nodeList = Object.keys(structuredTree).map(function (key) {
            // console.log(structuredTree[key]);
            let nodes = getChildNodes(structuredTree[key]);
            // let nodes = null;
            return (
                <div key={key}>
                    {nodes}
                </div>
            );
        });
        return (
            <div className="tree">
                <div className="icon main-icon">
                    <i onClick={() => this.addNode('root')} className="fa fa-plus"></i>
                    {nodeList}
                </div>
            </div>
        );
    }
}

export default Tree;