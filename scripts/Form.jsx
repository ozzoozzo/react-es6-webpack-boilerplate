require('./Form.less');
import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			colorChange: false,
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

	toggleColorChange = (event) => {
		this.setState({
			colorChange: event.target.checked
		});
	};

	doubleInputFields = () => {
		const fields = Object.assign({}, this.state.fields);
		const now = new Date().getTime();
		Object.keys(fields).map((field, i) => { fields[`${field}-${now}`] = fields[field]; });
		console.log('>>> Form.doubleInputFields >>> numberOfInputFields =', Object.keys(fields).length);
		this.setState({ fields });
	};

	handleInputFieldChange = (name, value) => {
		console.log('>>> Form.handleInputFieldChange >>> name =', name, '>>> value =', value);
        const fields = Object.assign({}, this.state.fields, { [name]: value });
		this.setState({ fields });
	};

	renderInputs = () => {
		const { colorChange, fields } = this.state;
		const inputs = [];
		Object.keys(fields).map((field, i) =>
			inputs.push(<div key={i} className="gap"><Input name={field} value={fields[field]} onChange={this.handleInputFieldChange} colorChange={colorChange} /></div>)
        );
		return inputs;
	};

	render() {
		return (
			<div>
				<h2>Form</h2>
				<p>
					<button onClick={this.simulateHandleInput}>simulate handleInput</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<input id="toggle-color-change" type="checkbox" checked={this.state.colorChange} onChange={this.toggleColorChange} />
					<label htmlFor="toggle-color-change">change border color when re-rendering is triggered</label>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<button onClick={this.doubleInputFields}>double number of input fields (inputFieldCount = {Object.keys(this.state.fields).length})</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					IE11 lagging effect already starts with 72 input fields and definitely fails with 144 or more input fields.
					Chrome: same sad story... -&gt; lagging starts with 72 input fields!
				</p>
				{this.renderInputs()}
			</div>
		);
	}

}

export default Form;
