require('./Form.less');
import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hintChange: false,
			colorChange: false,
			consoleLog: false,
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
		if (this.state.consoleLog) console.log('>>> Form.simulateHandleInput');
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

	toggleHintChange = (event) => {
		this.setState({
			hintChange: event.target.checked
		});
	};

	toggleColorChange = (event) => {
		this.setState({
			colorChange: event.target.checked
		});
	};

	toggleConsoleLog = (event) => {
		this.setState({
			consoleLog: event.target.checked
		});
	};

	doubleInputFields = () => {
		const fields = Object.assign({}, this.state.fields);
		const now = new Date().getTime();
		Object.keys(fields).map((field, i) => { fields[`${field}-${now}`] = fields[field]; });
		if (this.state.consoleLog) console.log('>>> Form.doubleInputFields >>> numberOfInputFields =', Object.keys(fields).length);
		this.setState({ fields });
	};

	handleInputFieldChange = (name, value) => {
		if (this.state.consoleLog) console.log('>>> Form.handleInputFieldChange >>> name =', name, '>>> value =', value);
        const fields = Object.assign({}, this.state.fields, { [name]: value });
		this.setState({ fields });
	};

	renderInputs = () => {
		const { hintChange, colorChange, consoleLog, fields } = this.state;
		const inputs = [];
		Object.keys(fields).map((field, i) =>
			inputs.push(<div key={i} class="gap"><Input name={field} value={fields[field]} onChange={this.handleInputFieldChange} hintChange={hintChange} colorChange={colorChange} consoleLog={consoleLog} /></div>)
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
					<button onClick={this.doubleInputFields}>double number of input fields (inputFieldCount = {Object.keys(this.state.fields).length})</button>
					<br />
					<input id="toggle-hint-change" type="checkbox" checked={this.state.hintChange} onChange={this.toggleHintChange} />
					<label for="toggle-hint-change">change hint when re-rendering is triggered</label>
					<br />
					<input id="toggle-color-change" type="checkbox" checked={this.state.colorChange} onChange={this.toggleColorChange} />
					<label for="toggle-color-change">change border color when re-rendering is triggered</label>
					<br />
					<input id="toggle-console-log" type="checkbox" checked={this.state.consoleLog} onChange={this.toggleConsoleLog} />
					<label for="toggle-console-log">write infos to console.log</label>
					<br />
					Test Setup: <strong>no</strong> hintChange, <strong>no</strong> colorChange, <strong>no</strong> consoleLog.
					<br />
					IE/11.953.14393.0IC lagging effect already starts with 72 input fields and definitely fails with 144 or more input fields.
					<br />
					Edge/14.14393 has similar lagging effects as IE11: problems start with 144 or more input fields.
					<br />
					Even Chrome/56.0.2924.87 and Firefox/50.0 have some lagging effects if there are many components on the GUI (288 or more)!
				</p>
				{this.renderInputs()}
			</div>
		);
	}

}

export default Form;
