require('./Input.less');
import React, { Component } from 'react';

class Input extends Component {

	constructor(props) {
		super(props);
		this.renderCount = 0;
		this.borderColors = ['black', 'orange', 'indigo', 'gold', 'crimson', 'lime'];
		//this.state = { value: props.value || '' };
	}

	handleChange = (event) => {
		console.log('>>> Input.handleChange >>> name =', event.target.name, '>>> value =', event.target.value);
		//this.setState({ value: event.target.value });
		this.props.onChange(event.target.name, event.target.value); // callback to parent component
	};

	render() {
		const style = {
			borderColor: this.borderColors[this.renderCount % this.borderColors.length],
		};
		this.renderCount++;
		console.log('>>> Input.render >>> renderCount =', this.renderCount, '>>> borderColor =', style.borderColor);
		return (
			<span className="uwr-input-container uwr-input-blur" style={style}>
				<span className="uwr-input-content">
				{/*
					<input className="uwr-input" type="text" name={this.props.name} value={this.state.value} onChange={this.handleChange} autoComplete="off" />
					<span className={this.state.value ? 'uwr-input-label-top' : 'uwr-input-label-bottom'}>{`renderCount = ${this.renderCount}`}</span>
				*/}
					<input className="uwr-input" type="text" name={this.props.name} value={this.props.value} onChange={this.handleChange} autoComplete="off" />
					<span className={this.props.value ? 'uwr-input-label-top' : 'uwr-input-label-bottom'}>{`renderCount = ${this.renderCount}`}</span>
				</span>
				<span className="uwr-input-message uwr-input-no-message"></span>
				<div className="uwr-message-box uwr-message-box-hidden uwr-arrow-top-right uwr-message-box-type-no-message uwr-message-box-icon-none uwr-input-message-box-arrow" data-icon-type="none">
					<div className="uwr-message-box-content"></div>
				</div>
			</span>
		);
	}

}

export default Input;
