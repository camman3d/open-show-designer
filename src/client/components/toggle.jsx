import React, { Component } from 'react';

export default class Toggle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.value || false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            checked: newProps.value
        });
    }

    handleClick() {
        let checked = !this.state.checked;
        this.props.onClick && this.props.onClick(checked);
        this.setState({checked});
    }

    render() {

        let classNames = 'toggle ' + (this.props.className || '');
        if (this.state.checked) {
            classNames += ' checked';
        }
        console.log(this.props.children);
        return <button className={classNames} onClick={this.handleClick}>{this.props.children}</button>;
    }
}