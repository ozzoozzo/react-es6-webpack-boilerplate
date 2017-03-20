require('./Form.less');
import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fields: {
				one: 'the',
				two: 'quick',
				three: 'brown',
				four: 'fox',
				five: 'jumps',
				six: 'over',
				seven: 'the',
				eight: 'lazy',
				nine: 'dog'
			}
		};
	}

	simulateHandleInput = () => {
		console.log('>>> Form.simulateHandleInput');
		this.setState({
			fields: {
				one: 'the',
				two: 'quick',
				three: 'brown',
				four: 'fox',
				five: 'jumps',
				six: 'over',
				seven: 'the',
				eight: 'lazy',
				nine: 'dog'
			}
		});
	};

	handleInputFieldChange = (name, value) => {
		console.log('>>> Form.handleInputFieldChange >>> name =', name, '>>> value =', value);
        const fields = Object.assign({}, this.state.fields, { [name]: value });
		this.setState({ fields });
	};

	renderInputs = () => {
		const { fields } = this.state;
		const inputs = [];
		Object.keys(fields).map((field, i) =>
			inputs.push(<div key={i} className="gap"><Input name={field} value={fields[field]} onChange={this.handleInputFieldChange} /></div>)
        );
		return inputs;
	};

	render() {
		return (
			<div>
				<h2>Form</h2>
				<p>
					<button onClick={this.simulateHandleInput}>simulate handleInput</button>
				</p>
				{this.renderInputs()}
			</div>
		);
	}

}

export default Form;
