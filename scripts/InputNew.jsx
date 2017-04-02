require('./InputNew.less');
import React, { PureComponent, PropTypes } from 'react';

class InputNew extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};
	}

	handleChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	};

	handleBlur = (event) => {
		this.props.onChange(event.target.name, event.target.value);
	};

	renderWarningMsg(warning, width) {
		if (!warning) return null;
		const warnings = (warning instanceof Array) ? warning : [warning];
		const warningWidthStyle = width ? { width: width + 'px' } : {};
		return (
			<ul style={warningWidthStyle}>
				{warnings.map((warningMsg, index) => <li key={index}>{warningMsg}</li>)}
			</ul>
		);
	}

	render() {
		const { name, placeholder, label, required, readOnly, disabled, maxLength, width, warning } = this.props;
		const { value } = this.state;
		const containerClassName = `container ${readOnly || disabled ? 'disabled' : ''} ${warning ? 'warning' : ''}`;
		const labelClassName = `${value || placeholder ? 'top' : ''} ${required ? 'required' : ''}`;
		const inputWidthStyle = width ? { width: width + 'px' } : {};
		const labelWidthStyle = width ? { width: (width - 18 - (warning && !(value || placeholder) ? 25 : 0)) + 'px' } : {};
		return (
			<span class={containerClassName}>
				<input
					type="text"
					name={name}
					placeholder={placeholder}
					value={value}
					readOnly={readOnly}
					disabled={readOnly || disabled}
					maxLength={maxLength}
					style={inputWidthStyle}
					onChange={this.handleChange}
					onBlur={this.handleBlur} />
				<label class={labelClassName} style={labelWidthStyle}>{label}</label>
				{this.renderWarningMsg(warning, width)}
			</span>
		);
	}

}

InputNew.propTypes = {
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
};

InputNew.defaultProps = {};

export default InputNew;
