require('./Code3.less');
import React, { PureComponent } from 'react';

class Code3 extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
	}

	handleChange = (event) => {
		if (this.props.consoleLog) console.log('>>> Code3.handleChange >>> name =', event.target.name, '>>> value =', event.target.value);
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, '');
		this.setState({ value });
//		this.props.onChange(event.target.name, event.target.value); // callback to parent component
	};

	render() {
		if (this.props.consoleLog) console.log('>>> Code3.render');
		const { name, label, required, containerBg } = this.props;
		const { value } = this.state;
		const containerBgStyle = containerBg ? { backgroundColor: containerBg } : null;
		const labelClassName = required ? 'required' : null;
		return (
			<span class="code3">
				<input
					type="text"
					name={name}
					value={value}
					onKeyDown={this.handleKeyDown}
					onKeyUp={this.handleKeyUp}
					onChange={this.handleChange}
					maxLength={6}
					autoComplete="off"
				/>
				<u style={containerBgStyle} />
				<i>
					<b /><b /><b /><b /><b />
				</i>
				<label class={labelClassName}>{label}</label>
			</span>
		);
	}

}

export default Code3;
