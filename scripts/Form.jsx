require('./Form.less');
import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {

	renderInputs = () => {
		const inputs = [];
		[...Array(10)].map((el, i) =>
			inputs.push(<div key={i} className="gap"><Input value="" /></div>)
        );
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
