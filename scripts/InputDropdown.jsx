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
		this.state.highlight = this.getHighlightIndex();
		this.consoleState();
	}

	consoleState() {
		console.log('state =', this.state, 'closeOnArrowClick =', this.closeOnArrowClick, 'mouseDownOnOption =', this.mouseDownOnOption);
	}

	getHighlightIndex = (value = this.state.value, options = this.props.options) => {
		return !options ? -1 : options.indexOf(value);
	};

	increaseHighlightIndex = () => {
		const { options } = this.props;
		if (this.state.highlight === options.length - 1) return;
		const highlight = this.state.highlight + 1;
		this.setState({
			highlight,
		}, this.consoleState);
	};

	decreaseHighlightIndex = () => {
		const { options } = this.props;
		if (this.state.highlight === 0) return;
		const highlight = this.state.highlight === -1 ? options.length - 1 : this.state.highlight - 1;
		this.setState({
			highlight,
		}, this.consoleState);
	};

	selectHighlightedOption = () => {
		const { options } = this.props;
		const { highlight } = this.state;
		if (highlight === -1) return;
		this.setState({
			value: options[highlight],
		}, () => this.refs.input.blur());
	};

	handleChange = (event) => {
		console.log('>>> handleChange >>> value =', event.target.value);
		this.setState({
			value: event.target.value,
			highlight: this.getHighlightIndex(event.target.value),
		}, this.consoleState);
	};

	handleFocus = () => {
		console.log('>>> handleFocus');
		/*
		// see -> https://facebook.github.io/react/docs/events.html
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.preventDefault();
		event.nativeEvent.stopPropagation();
		*/
		this.setState({
			open: true,
		}, this.consoleState);
	};

	handleBlur = (event) => {
		console.log('>>> handleBlur');
		const { onChange } = this.props;
		if (!this.closeOnArrowClick && !this.mouseDownOnOption) {
			this.setState({
				open: false,
				highlight: this.getHighlightIndex(),
			}, this.consoleState);
			onChange(event.target.name, event.target.value);
		}
	};

	handleKey = (event) => {
		console.log('>>> handleKey >>> event.key =', event.key);
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				event.stopPropagation();
				this.refs.input.blur();
				break;
			case 'ArrowDown':
				event.preventDefault();
				event.stopPropagation();
				this.increaseHighlightIndex();
				break;
			case 'ArrowUp':
				event.preventDefault();
				event.stopPropagation();
				this.decreaseHighlightIndex();
				break;
			case 'Enter':
				event.preventDefault();
				event.stopPropagation();
				this.selectHighlightedOption();
				break;
		}
	};

	handleArrowMouseDown = () => {
		console.log('>>> handleArrowMouseDown');
		this.closeOnArrowClick = this.state.open;
		this.consoleState();
	};

	handleArrowClick = () => {
		console.log('>>> handleArrowClick');
		if (this.closeOnArrowClick) {
			this.closeOnArrowClick = false;
			this.setState({
				open: false,
			}, this.consoleState);
		} else {
			this.refs.input.focus();
		}
	};

	handleOptionMouseDown = () => {
		console.log('>>> handleOptionMouseDown');
		this.mouseDownOnOption = true;
		this.consoleState();
	};

	handleOptionClick = (value) => {
		console.log('>>> handleOptionClick >>> value = ', value);
		this.mouseDownOnOption = false;
		this.setState({
			value,
			open: false,
			highlight: this.getHighlightIndex(value),
		}, this.consoleState);
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
			<ul class="options" style={optionsWidthStyle} onMouseDown={this.handleOptionMouseDown} onMouseOut={() => this.setState({ highlight: this.getHighlightIndex() })}>
				{options.map((value, index) => <li key={index} class={index === this.state.highlight ? 'highlight' : null} onMouseMove={() => this.setState({ highlight: index })} onClick={() => this.handleOptionClick(value)}>{value}</li>)}
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
