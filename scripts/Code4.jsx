require('./Code4.less');
import React, { PureComponent } from 'react';

class Code4 extends PureComponent {

	constructor(props) {
		super(props);
		let value = props.value || '';
		value = value.replace(/\D/g, '').replace(/(\d)/g, '$1 ').trim();
		this.state = {
			value,
		};
	}

	handleFocus = (event) => {
		//let pos = Math.max(this.refs.input.selectionStart, this.refs.input.selectionEnd);
		let pos = this.refs.input.selectionEnd;
		if (this.props.consoleLog) console.log('>>> Code4.handleFocus >>> pos(A) =', pos);
		if (pos % 2 == 0 && pos > 0) pos--;
		if (this.props.consoleLog) console.log('>>> Code4.handleFocus >>> pos(B) =', pos);
return;
		this.refs.input.setSelectionRange(pos, pos);
	};

//	handleClick = (event) => this.handleFocus(event);
	handleClick = (event) => {
return;
		if (this.props.consoleLog) console.log('>>> Code4.handleClck >>> value ="' + event.target.value + '"');
		this.handleFocus(event);
	};

	handleKeyDown = (event) => {
		// not needed -> FIXME: remove this function!
		if (this.props.consoleLog) console.log('>>> Code4.handleKeyDown >>> value ="' + event.target.value + '" >>> key =', event.key);
	};

	handleKeyPress = (event) => {
		// not needed -> FIXME: remove this function!
		if (this.props.consoleLog) console.log('>>> Code4.handleKeyPress >>> value ="' + event.target.value + '" >>> key =', event.key);
	};

	handleKeyUp = (event) => {
		//let pos = Math.max(this.refs.input.selectionStart, this.refs.input.selectionEnd);
		let pos = this.refs.input.selectionStart;
		if (this.props.consoleLog) console.log('>>> Code4.handleKeyUp >>> value ="' + event.target.value + '" >>> key =', event.key, '>>> pos =', pos);
return;
		switch (event.key) {
			case 'ArrowRight':
				pos++;
				break;
			case 'ArrowLeft': // fall through
			case 'Home': // fall through
			case 'End': // fall through
			case 'PageUp': // fall through
			case 'PageDown': // fall through
			case 'Enter': // fall through
			case 'Insert': // fall through
			case 'Backspace': // fall through
			case 'Del':
				break;
			default:
				if (event.key.match(/\d/) === null) {
					event.preventDefault();
					event.stopPropagation();
					return;
				}
		}
		if (pos % 2 == 0 && pos > 0) pos--;
		this.refs.input.setSelectionRange(pos, pos);
	};

	handleChange = (event) => {
		if (this.props.consoleLog) console.log('>>> Code4.handleChange >>> user value ="' + event.target.value + '"');
		let value = event.target.value;
		value = value.replace(/\D/g, '').replace(/(\d)/g, '$1 ');
		if (value.length > 11 || event.key === 'Backspace') value = value.trim();
		if (this.props.consoleLog) console.log('>>> Code4.handleChange >>> modified value ="' + value + '"');
		this.setState({ value });
	};

	handleBlur = (event) => {
return;
		this.props.onChange(event.target.name, event.target.value.replace(/\D/g, '')); // callback to parent component
	};

	render() {
		if (this.props.consoleLog) console.log('>>> Code4.render');
		const { name, label, required, containerBg } = this.props;
		const { value } = this.state;
		const containerBgStyle = containerBg ? { backgroundColor: containerBg } : null;
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
					maxLength={11}
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

export default Code4;
