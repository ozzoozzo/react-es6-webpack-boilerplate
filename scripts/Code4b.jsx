require('./Code4.less');
import React, { PureComponent } from 'react';

const maxLength = 11;

class Code4b extends PureComponent {

	constructor(props) {
		super(props);
		const value = this.formatValue(props.value || '');
		this.state = { value };
		this.reset();
	}

	formatValue(value) {
		value = value.replace(/\D/g, '').replace(/(\d)/g, '$1 ');
		if (value.length > maxLength) value = value.trim();
		return value;
	}

	reset() {
		this.key = undefined;
		this.pos = -1;
	}

	adjustPosAndReset() {
		this.adjustPos();
		this.reset();
	}

	adjustPos() {
		if (this.key === undefined || !this.key.match(/\d|ArrowLeft|ArrowRight|Backspace|Delete/)) {
			return;
		}
		let pos = this.pos;
		if (this.key === 'ArrowLeft' || this.key === 'Backspace') {
			if (pos === maxLength) {
				pos -= 1;
			} else {
				pos -= 2;
			}
		} else if (this.key === 'Delete') {
			// noop
		} else {
			// ArrowRight, Digit [0-9]
			pos += 2;
		}
		if (pos < 0) {
			pos = 0;
		} else if (pos > maxLength) {
			pos = maxLength;
		}
		this.updatePos(pos);
	}

	updatePos(pos) {
		this.refs.input.setSelectionRange(pos, pos);
		this.pos = pos;
	}

	handleFocus = () => {
		let pos = this.refs.input.selectionEnd;
		if (pos < maxLength && pos % 2 === 1) pos--;
		this.updatePos(pos);
	};

	handleClick = () => {
		this.handleFocus();
	};

	handleKeyDown = (event) => {
		this.key = event.key;
		this.pos = this.refs.input.selectionEnd;
	};

	handleKeyPress = () => {
		if (this.key === 'Enter') {
			this.refs.input.blur();
		}
	};

	handleKeyUp = () => {
		if (this.key !== undefined && this.key.match(/ArrowLeft|ArrowRight/)) {
			this.adjustPos();
		}
		this.reset();
	};

	handleChange = (event) => {
		let value = event.target.value;
		if (this.key === 'Backspace') {
			if (this.pos === value.length + 1) {
				value = value.replace(/\d$/, '');
			} else {
				value = value.replace(/\d(\d)/, '$1');
			}
		} else if (this.key === 'Delete') {
			value = value.replace(/(\d)\d/, '$1');
		}
		value = this.formatValue(value);
		this.setState({ value }, this.adjustPosAndReset);
	};

	handleBlur = (event) => {
		this.props.onChange(event.target.name, event.target.value.replace(/\D/g, '')); // callback to parent component
	};

	render() {
		const { name, label, required } = this.props;
		const { value } = this.state;
		const labelClassName = required ? 'required' : null;
		return (
			<span class="code4">
				<input
					ref="input"
					type="text"
					name={name}
					value={value}
					onFocus={this.handleFocus}
					onClick={this.handleClick}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					onKeyUp={this.handleKeyUp}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					maxLength={maxLength}
					autoComplete="off"
				/>
				<i>
					<b /><b /><b /><b /><b />
				</i>
				<label class={labelClassName}>{label}</label>
			</span>
		);
	}

}

export default Code4b;
