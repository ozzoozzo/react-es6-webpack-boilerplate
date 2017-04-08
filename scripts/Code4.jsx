require('./Code4.less');
import React, { PureComponent } from 'react';

const maxLength = 11;

class Code4 extends PureComponent {

/*
	current development state:
	- keys 'Home', 'End' -> work correctly -> no special handling needed!
	- keys 'PageUp', 'PageDown' -> work correctly -> no special handling needed!
	- keys 'Backspace', 'Delete' -> work correctly -> handling implemented in handleChange
	- cursor keys left/right/up/down -> work correctly

	TODO:
	- focus and click -> position of caret needs to be adjusted
	- copy/paste with keys (Ctrl C, Ctrl X, Ctrl V) -> needs to be handled
	- copy/paste with mouse (right click -> copy/cut/paste) -> needs to be handled
	- Enter key -> check/handle?
	- handle selection of text with mouse -> this needs to be prevented!
	- focus with tab (coming from previous form field) -> all text is selected -> this needs to be prevented!
*/

/*
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowLeft':
			case 'Home':
			case 'End':
			case 'PageUp':
			case 'PageDown':
			case 'Enter':
			case 'Insert':
			case 'Backspace':
			case 'Delete':
			default:
				if (event.key.match(/\d/) === null) {
					event.preventDefault();
					event.stopPropagation();
					return;
				}
		}
*/

	constructor(props) {
		super(props);
		const value = this.formatValue(props.value || '');
		this.state = { value };
		this.key = undefined;
		this.pos = -1;
		this.log('constructor');
	}

	log(text, param) {
		if (param !== undefined) {
			console.log('pos =', this.pos, ' | key =', this.key, ' | value =', this.state.value, ' |', text, ' |', param);
		} else {
			console.log('pos =', this.pos, ' | key =', this.key, ' | value =', this.state.value, ' |', text);
		}
	}

	formatValue(value) {
		value = value.replace(/\D/g, '').replace(/(\d)/g, '$1 ');
		if (value.length > maxLength) value = value.trim();
		return value;
	}

	updatePos(pos) {
		//if (pos == this.pos) return; // don't use this check: text selections will be possible when this check is active!
		console.log('setSelectionRange >>> pos =', pos);
		this.refs.input.setSelectionRange(pos, pos);
		this.pos = pos;
	}

	handleFocus = (event) => {
		this.log('handleFocus');
		let pos = this.refs.input.selectionEnd;
		if (pos < maxLength && pos % 2 == 1) pos--;
		this.updatePos(pos);
	};

//	handleClick = (event) => this.handleFocus(event);
	handleClick = (event) => {
		this.log('handleClick');
		this.handleFocus(event);
	};

	handleKeyDown = (event) => {
		this.key = event.key;
		this.pos = this.refs.input.selectionEnd;
		this.log('handleKeyDown');
	};

	handleKeyPress = (event) => {
		// not needed -> FIXME: remove this function!
		this.log('handleKeyPress');
	};

	handleKeyUp = (event) => {
		this.log('handleKeyUp');
		if (!event.key.match(/\d|ArrowLeft|ArrowRight|Delete/)) {
			return;
		}
		console.log('HANDLE KEY UP >>> key =', event.key);
		let pos = this.pos;
		if (event.key === 'ArrowLeft') {
			if (pos == maxLength) {
				pos -= 1;
			} else {
				pos -= 2;
			}
		} else if (event.key === 'Delete') {
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
	};

	handleChange = (event) => {
		let value = event.target.value;

		this.log('handleChange', value);

		if (this.key === 'Backspace') {
			if (this.pos == value.length + 1) {
				console.log('Backspace: end of value')
				value = value.replace(/\d$/, '');
			} else {
				console.log('Backspace: middle')
				value = value.replace(/\d(\d)/, '$1');
			}
		} else if (this.key === 'Delete') {
			console.log('Delete');
			value = value.replace(/(\d)\d/, '$1');
		}
		value = this.formatValue(value);
		this.setState({ value });
		this.key = undefined;
        //this.pos = -1;
	};

	handleBlur = (event) => {
		this.log('handleBlur');
		this.props.onChange(event.target.name, event.target.value.replace(/\D/g, '')); // callback to parent component
	};

	render() {
		this.log('render');
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

export default Code4;
