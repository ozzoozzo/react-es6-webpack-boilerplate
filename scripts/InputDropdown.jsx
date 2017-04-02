require('./InputDropdown.less');
import React, { PureComponent, PropTypes } from 'react';

class InputDropdown extends PureComponent {

/*
http://furqanzafar.github.io/react-selectize/#/?category=simple&example=custom-option-and-value-rendering
https://react.rocks/tag/Dropdown
http://jedwatson.github.io/react-select/
*/

	constructor(props) {
		super(props);
		console.log('>>> constructor');
		this.mouseDown = false;
		this.state = {
			value: props.value || '',
			open: false,
		};
	}

	handleChange = (event) => {
		console.log('>>> handleChange >>> value =', event.target.value);
		this.setState({
			value: event.target.value,
		});
	};

	handleFocus = () => {
		console.log('>>> handleFocus');
		this.setState({
			open: true,
		});
	};

	handleBlur = (event) => {
		console.log('>>> handleBlur');
		if (!this.mouseDown) {
			this.setState({
				open: false,
			});
		}
		this.props.onChange(event.target.name, event.target.value);
	};

	handleMouseDown = () => {
		console.log('>>> handleMouseDown');
		this.mouseDown = true;
	};

	handleClick = (option) => {
		console.log('>>> handleClick >>> option = ', option);
		//this.input.blur();
		this.mouseDown = false;
		this.setState({
			value: option,
			open: false,
		});
	};

	renderOptions(options, open, width) {
		if (!options) return null;
		const optionsClassName = `options ${open ? 'open' : ''}`;
		const optionsWidthStyle = width ? { width: width + 'px' } : {};
		return (
			<ul class={optionsClassName} style={optionsWidthStyle} onMouseDown={this.handleMouseDown}>
				{options.map((option, index) => <li key={index} onClick={() => { this.handleClick(option); }}>{option}</li>)}
			</ul>
		);
	}

	renderWarningMsg(warning, width) {
		if (!warning) return null;
		const warnings = (warning instanceof Array) ? warning : [warning];
		const warningWidthStyle = width ? { width: width + 'px' } : {};
		return (
			<ul class="warning" style={warningWidthStyle}>
				{warnings.map((warningMsg, index) => <li key={index}>{warningMsg}</li>)}
			</ul>
		);
	}

	render() {
		console.log('>>> render');
		const { name, placeholder, label, required, readOnly, disabled, maxLength, width, warning, options } = this.props;
		const { value, open } = this.state;
		const containerClassName = `idd-container ${readOnly || disabled ? 'disabled' : ''} ${warning ? 'warning' : ''}`;
		const labelClassName = `${value || placeholder ? 'top' : ''} ${required ? 'required' : ''}`;
		const inputWidthStyle = width ? { width: width + 'px' } : {};
		const labelWidthStyle = width ? { width: (width - 18 - (!(value || placeholder) ? 25 : 0)) + 'px' } : {};
		return (
			<span class={containerClassName}>
				<input
					ref={(input) => { this.input = input; }}
					type="text"
					name={name}
					placeholder={placeholder}
					value={value}
					readOnly={readOnly}
					disabled={readOnly || disabled}
					maxLength={maxLength}
					style={inputWidthStyle}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur} />
				<label class={labelClassName} style={labelWidthStyle}>{label}</label>
				{this.renderOptions(options, open, width)}
				{this.renderWarningMsg(warning, width)}
			</span>
		);
	}
}

InputDropdown.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	readonly: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	width: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	warning: PropTypes.any,
	options: PropTypes.arrayOf(PropTypes.string),
};

InputDropdown.defaultProps = {};

export default InputDropdown;
