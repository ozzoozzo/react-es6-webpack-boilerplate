require('./Code4.less');
import React, { PureComponent } from 'react';

const maxLength = 11;

class Code4 extends PureComponent {

/*
	keys and their effects within an input field
		general (Chrome, Firefox, Internet Explorer, Edge)
			ArrowLeft    move the caret 1 to the left
			ArrowRight   move the caret 1 to the right
			Home         move the caret to the rist pos in the input
			End          move the caret to the last pos in the input
			Backspace    remove the char behind the caret
			Delete       remove the char before the caret
			Enter        submit the form
		Chrome v57
			ArrowUp      -> same effect as Home
			ArrowDown    -> same effect as End
			PageUp       -> scroll up the webpage
			PageDown     -> scroll down the webpage
		Firefox v50
			ArrowUp      -> same effect as Home
			ArrowDown    -> same effect as End
			PageUp       -> no effect
			PageDown     -> no effect
		Internet Explorer v11
			ArrowUp      -> no effect
			ArrowDown    -> no effect
			PageUp       -> same effect as Home
			PageDown     -> same effect as End
		Edge v14
			ArrowUp      -> no effect
			ArrowDown    -> no effect
			PageUp       -> same effect as Home
			PageDown     -> same effect as End
*/

/*
	current development state -> the following things work correctly:
	- keys 'Home', 'End' -> no special handling needed -> move caret to start (Home) or end (End)
	- keys 'PageUp', 'PageDown' -> no special handling needed -> these keys alter the scroll position of the whole page
	- keys 'Backspace', 'Delete' -> handling implemented in handleChange, adjust position of caret
	- cursor keys 'ArrowLeft'/'ArrowRight' -> adjust position of caret
	- cursor keys 'ArrowUp'/'ArrowDown' -> -> no special handling needed -> move caret to start (ArrowUp) or end (ArrowDown)
	- focus and click -> position of caret
	- handle selection of text with mouse -> this needs to be prevented -> position of caret
	- focus with tab (coming from previous form field) -> all text is selected -> un-select text and set caret to end of input field (end of value)
	- copy/paste with keys (Ctrl C, Ctrl X, Ctrl V) -> no special handling implemented!
	- copy/paste with mouse (right click -> copy/cut/paste) -> no special handling implemented!
	- 'Enter' key -> check/handle -> this handling is needed for a form submit -> pressing the 'Enter' key will fire the parent's callback function
*/

/*
	event.preventDefault();
	event.stopPropagation();
*/

	constructor(props) {
		super(props);
		const value = this.formatValue(props.value || '');
		this.state = { value };
		this.log('constructor');
	}

	reset() {
		this.key = undefined;
		this.pos = -1;
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

	adjustPos() {
		this.log('adjustPos');
		if (this.key === undefined || !this.key.match(/\d|ArrowLeft|ArrowRight|Backspace|Delete/)) {
			return;
		}
		console.log('ADJUST POS >>> key =', this.key);
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
		//if (pos === this.pos) return; // don't use this check: text selections will be possible when this check is active!
		console.log('updatePos >>> pos =', pos);
		this.refs.input.setSelectionRange(pos, pos);
		this.pos = pos;
	}

	fireCallback() {
		// callback to parent component
		this.props.onChange(this.props.name, this.state.value.replace(/\D/g, ''));
	}

	handleFocus = () => {
		this.log('handleFocus >>> selectionEnd = ' + this.refs.input.selectionEnd);
		this.reset();
		let pos = this.refs.input.selectionEnd;
		if (pos < maxLength && pos % 2 === 1) pos--;
		this.updatePos(pos);
	};

	handleClick = () => {
		this.log('handleClick');
		this.handleFocus();
	};

	handleKeyDown = (event) => {
		this.key = event.key;
		this.pos = this.refs.input.selectionEnd;
		this.log('handleKeyDown');
	};

	handleKeyPress = () => {
		this.log('handleKeyPress');
		if (this.key === 'Enter') {
			this.fireCallback();
		}
	};

	handleKeyUp = () => {
		this.log('handleKeyUp');
		if (this.key !== undefined && this.key.match(/ArrowLeft|ArrowRight/)) {
			this.adjustPos();
		}
	};

	handleChange = (event) => {
		let value = event.target.value;
		this.log('handleChange', value);
		if (this.key === 'Backspace') {
			if (this.pos === value.length + 1) {
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
		this.setState({ value }, this.adjustPos);
	};

	handleBlur = () => {
		this.log('handleBlur');
		this.fireCallback();
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
