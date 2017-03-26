require('./Code2.less');
import React, { PureComponent } from 'react';

class Code2 extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
	}

	handleChange = (event) => {
		if (this.props.consoleLog) console.log('>>> Code2.handleChange >>> name =', event.target.name, '>>> value =', event.target.value);
		let value = event.target.value;
		value = value.replace(/[^A-Za-z0-9]/g, '');
		this.setState({ value });
//		this.props.onChange(event.target.name, event.target.value); // callback to parent component
	};

	render() {
		if (this.props.consoleLog) console.log('>>> Code2.render');
		return (
			<span class="code2">
				<input
					type="text"
					name={this.props.name}
					value={this.state.value}
					onKeyDown={this.handleKeyDown}
					onKeyUp={this.handleKeyUp}
					onChange={this.handleChange}
					maxLength={6}
					autoComplete="off"
				/>
				<u />
				<i>
					<b /><b /><b /><b /><b />
				</i>
			</span>
		);
	}

}

export default Code2;
