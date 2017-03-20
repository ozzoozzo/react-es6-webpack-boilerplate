require('./Input.less');
import React, { Component } from 'react';

class Input extends Component {

	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
	}

	handleChange = (event) => {
		console.log('>>> Input.handleChange >>> event =', event);
		this.setState({ value: event.target.value });
	};

	render() {
		const style = {
			borderColor: 'green',
		};
		return (
			<span className="uwr-input-container uwr-input-blur">
				<span className="uwr-input-content">
					<input className="uwr-input" style={style} type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" />
					<span className={this.state.value ? 'uwr-input-label-top' : 'uwr-input-label-bottom'}>Vertragsnummer</span>
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
