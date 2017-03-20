require('./Form.less');
import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {

	renderInputs = () => {
		var inputs = [];
		for (var i = 0; i < 10; i++) inputs.push(<div key={i} className="gap"><Input value="" /></div>);
		return inputs;
	};

	render() {
		return (
			<div>
				<h2>Form</h2>
				{this.renderInputs()}
			</div>
		);
	}

}

export default Form;
