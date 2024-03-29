import React, { Component } from 'react';
import Node from './Node.js';
import getTree from '../algorithms/tree.js';
import Form from './Form.js';

class Tree extends Component {
    totalNode = 0;
    constructor(props) {
        super(props);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.state = {
            dataArray: [],
            tree: {},
            showInput: false
        }
    }
    componentDidMount() {
        let self = this;
        let dataArray = JSON.parse(localStorage.getItem("dataArray") || "[]");
        if (dataArray) {
            self.setState({ dataArray: dataArray });
        }
    }
    getInput() {
        this.setState({ showInput: true });
    }
    addNewItem(newName) {
        // console.log(newName);
        this.setState({ showInput: false });
        this.addNode('root', newName);
    }
    addNode(parent, newName) {
        // let randomName = Math.random().toString(36).substring(7);
        if(newName === null || newName === undefined || newName === ''){
            return;
        }
        let dataArray = this.state.dataArray;
        let duplicateFlag = false;
        dataArray.map((v) => {
            if (v.name === newName) {
                duplicateFlag = true;
            }
        });
        if (duplicateFlag) {
            return;
        }
        let self = this;
        let node = {
            parent: parent,
            name: newName
        }
        this.totalNode++;
        // let dataArray = this.state.dataArray;
        dataArray.push(node);
        self.setState({ dataArray: dataArray });
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
    }
    removeNode(name) {
        // console.log(name);
        this.totalNode--;
        let dataArray = this.state.dataArray;
        let newDataArray = dataArray.filter((v) => {
            if (v.name !== name && v.parent !== name) {
                return v;
            }
        })
        // console.log(newDataArray);
        this.setState({ dataArray: newDataArray });
        localStorage.setItem('dataArray', JSON.stringify(newDataArray));
    }
    render() {
        this.totalNode = 0;
        let self = this;
        let structuredTree = getTree(this.state.dataArray);
        // console.log(structuredTree);

        let getChildNodes = (item) => {
            this.totalNode++;
            // console.log(item.childs);
            let childNodes = "";
            if (item.childs.length > 0) {
                // console.log('gg');
                let childs = item.childs;
                childNodes = childs.map((v, k) => {
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

        let form = null;
        if (this.state.showInput) {
            form = <Form addItem={this.addNewItem} />;
        } else {
            form = null;
        }

        return (
            <div className="tree">
                <div className="icon">
                    {/* <i onClick={() => this.addNode('root')} onClick={() => this.getInput(this.props.item.name)} className="fa fa-plus main-icon"></i> */}
                    <i onClick={() => this.getInput()} className="fa fa-plus main-icon"></i>
                    {form}
                    {nodeList}
                </div>
            </div>
        );
    }
}

export default Tree;