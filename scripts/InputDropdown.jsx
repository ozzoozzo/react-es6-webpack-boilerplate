require('./InputDropdown.less');
import React, { PureComponent, PropTypes } from 'react';

class InputDropdown extends PureComponent {

	constructor(props) {
		super(props);
		console.log('>>> constructor');
		this.closeOnArrowClick = false;
		this.mouseDownOnOption = false;
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
		if (!this.closeOnArrowClick && !this.mouseDownOnOption) {
			this.setState({
				open: false,
			});
			this.props.onChange(event.target.name, event.target.value);
		}
	};

	handleKey = (event) => {
		console.log('>>> handleKey >>> event.key =', event.key);
		switch (event.key) {
			case 'Enter':
				console.log('ENTER');
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'ArrowUp':
				console.log('ARROW UP');
				event.preventDefault();
				event.stopPropagation();
				this.setState({
					value: 'up@up.com',
				});
				break;
			case 'ArrowDown':
				console.log('ARROW DOWN');
				event.preventDefault();
				event.stopPropagation();
				this.setState({
					value: 'down@down.com',
				});
				break;
		}
	};

	handleArrowMouseDown = () => {
		console.log('>>> handleArrowMouseDown');
		this.closeOnArrowClick = this.state.open;
	};

	handleArrowClick = () => {
		console.log('>>> handleArrowClick');
		if (this.closeOnArrowClick) {
			this.closeOnArrowClick = false;
			this.setState({
				open: false,
			});
		} else {
			this.refs.input.focus();
		}
	};

	handleOptionMouseDown = () => {
		console.log('>>> handleOptionMouseDown');
		this.mouseDownOnOption = true;
	};

	handleOptionClick = (value) => {
		console.log('>>> handleOptionClick >>> value = ', value);
		this.mouseDownOnOption = false;
		this.setState({
			value,
			open: false,
		});
	};

	renderArrow(options) {
		if (!options || !options.length) return null;
		return (
			<span class="arrow" onMouseDown={this.handleArrowMouseDown} onClick={this.handleArrowClick} />
		);
	}

	renderOptions(options, width) {
		if (!options || !options.length) return null;
		const optionsWidthStyle = width ? { width: width + 'px' } : {};
		return (
			<ul class="options" style={optionsWidthStyle} onMouseDown={this.handleOptionMouseDown}>
				{options.map((value, index) => <li key={index} onClick={() => { this.handleOptionClick(value); }}>{value}</li>)}
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
		const containerClassName = `idd-container ${open ? 'open' : ''} ${readOnly || disabled ? 'disabled' : ''} ${warning ? 'warning' : ''}`;
		const labelClassName = `${value || placeholder ? 'top' : ''} ${required ? 'required' : ''}`;
		const inputWidthStyle = width ? { width: width + 'px' } : {};
		const labelWidthStyle = width ? { width: (width - 18 - (!(value || placeholder) ? 25 : 0)) + 'px' } : {};
		return (
			<span class={containerClassName}>
				<input
					ref="input"
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
					onBlur={this.handleBlur}
					onKeyDown={this.handleKey} />
				<label class={labelClassName} style={labelWidthStyle}>{label}</label>
				{this.renderArrow(options)}
				{this.renderOptions(options, width)}
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
