import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.nameEl = React.createRef();
    }
    submitHandler = (event) => {
        event.preventDefault();
        const name = this.nameEl.current.value;
        this.props.addItem(name);
    }
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" ref={this.nameEl} />
                <button type="submit" className="btn btn-primary btn-sm">Add</button>
            </form>
        );
    }
}

export default Form;