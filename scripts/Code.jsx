require('./Code.less');
import React, { PureComponent } from 'react';

class Code extends PureComponent {

	constructor(props) {
		super(props);
		const value = props.value || '';
		this.state = { value };
		return;

		const formattedValue = this.formatValue(value);
		this.state = { value, formattedValue };
	}

	formatValue = (value, keyCode) => {
		return;

		if (this.props.consoleLog) console.log('>>> Code.formatValue >>> value =', value, '>>> keyCode =', keyCode);
		value = value.replace(/([0-9])/g, '$1 ').replace(/(.{0,11}).*/, '$1')
		return keyCode === 8 ? value.trim() : value;
	};

	adjustValue = (value, keyCode) => {
		return;

		if (this.props.consoleLog) console.log('>>> Code.adjustValue >>> value =', value, '>>> keyCode =', keyCode);
		const char = String.fromCharCode(keyCode).replace(/[^0-9A-Za-z]/g, '');
		return keyCode === 8 ? value.slice(0, -1) : value + char;
	};

	handleKeyDown = (event) => {
		if (this.props.consoleLog) console.log('>>> Code.handleKeyDown >>> name =', event.target.name, '>>> value =', event.target.value, '>>> keyCode =', event.keyCode);
		return;

		if (event.keyCode === 8) { // backspace
			console.log('stopPropagation, preventDefault');
			event.stopPropagation();
			event.preventDefault();
		}
		return;

		const keyCode = event.keyCode;
		const value = this.adjustValue(this.state.value, keyCode);
		const formattedValue = this.formatValue(value, keyCode);
		this.setState({ value, formattedValue });
	};

	handleKeyUp = (event) => {
		return;

		if (this.props.consoleLog) console.log('>>> Code.handleKeyUp >>> name =', event.target.name, '>>> value =', event.target.value, '>>> keyCode =', event.keyCode);
	};

	handleChange = (event) => {
		if (this.props.consoleLog) console.log('>>> Code.handleChange >>> name =', event.target.name, '>>> value =', event.target.value);
		this.setState({ value: event.target.value.replace(/\s|[^A-Za-z0-9]/g, '') });
		return;

		let value = event.target.value;
		value = value.replace(/\s|[^0-9]/g, '').replace(/([0-9])/g, '$1 ').replace(/(.{0,11}).*/, '$1');
		this.setState({ value });
//		this.props.onChange(event.target.name, event.target.value); // callback to parent component
	};

	render() {
		if (this.props.consoleLog) console.log('>>> Code.render');
		const { value } = this.state;
		const maxLength = 6
		const inputClassName = value.length >= maxLength ? 'full' : null;
		const inputValue = value.length >= maxLength ? value.replace(/(.)/g, '$1 ').trim() : value;
		return (
			<span class="code">
				<input
					type="text"
					className={inputClassName}
					name={this.props.name}
					value={inputValue}
					onKeyDown={this.handleKeyDown}
					onKeyUp={this.handleKeyUp}
					onChange={this.handleChange}
					maxLength={maxLength}
					autoComplete="off"
				/>
			</span>
		);
	}

}

export default Code;


/*

Source:
https://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html


if (window.addEventListener) window.addEventListener("load", keycodes, false);
else if (window.attachEvent) window.attachEvent("onload", keycodes);

function keycodes() {
	var tb = document.getElementById('theKey');
	var respText = document.getElementById('response');
	respText.innerHTML = '';

	function getKeyCode(event) {
		event = event || window.event;
		return event.keyCode;
	}

	function resetInput() {
		tb.onkeypress = function() {
			return false;
		}
	}
	tb.onkeydown = function(event) {
		var charCode = getKeyCode(event);
		respText.innerHTML = charCode;
		tb.value = String.fromCharCode(charCode);
		switch (charCode) {
			case 6:
				tb.value = "Ups, ein Mac";
				break;
			case 8:
				tb.value = "Backspace";
				break;
			case 9:
				tb.value = "Tab";
				break;
			case 13:
				tb.value = "Enter";
				break;
			case 16:
				tb.value = "Shift";
				break;
			case 17:
				tb.value = "CTRL";
				break;
			case 18:
				tb.value = "ALT";
				break;
			case 19:
				tb.value = "Pause/Break";
				break;
			case 20:
				tb.value = "Caps Lock";
				break;
			case 27:
				tb.value = "ESC";
				break;
			case 32:
				tb.value = "Leerzeichen";
				break;
			case 33:
				tb.value = "Seite nach oben";
				break;
			case 34:
				tb.value = "Seite nach unten";
				break;
			case 35:
				tb.value = "Ende";
				break;
			case 36:
				tb.value = "Home";
				break;
			case 37:
				tb.value = "Linker Pfeil";
				break;
			case 38:
				tb.value = "Pfeil nach oben";
				break;
			case 39:
				tb.value = "Rechter Pfeil";
				break;
			case 40:
				tb.value = "Pfeil nach unten";
				break;
			case 43:
				tb.value = "Plus auf der numerischen Tastatur";
				break;
			case 45:
				tb.value = "Einfügen";
				break;
			case 46:
				tb.value = "Löschen";
				break;
			case 91:
				tb.value = "Linkes Fenster";
				break;
			case 92:
				tb.value = "Rechtes Fenster";
				break;
			case 93:
				tb.value = "Auswählen";
				break;
			case 96:
				tb.value = "Numpad 0";
				break;
			case 97:
				tb.value = "Numpad 1";
				break;
			case 98:
				tb.value = "Numpad 2";
				break;
			case 99:
				tb.value = "Numpad 3";
				break;
			case 100:
				tb.value = "Numpad 4";
				break;
			case 101:
				tb.value = "Numpad 5";
				break;
			case 102:
				tb.value = "Numpad 6";
				break;
			case 103:
				tb.value = "Numpad 7";
				break;
			case 104:
				tb.value = "Numpad 8";
				break;
			case 105:
				tb.value = "Numpad 9";
				break;
			case 106:
				tb.value = "Multiplizieren";
				break;
			case 107:
				tb.value = "Addieren";
				break;
			case 109:
				tb.value = "Subtrahieren";
				break;
			case 110:
				tb.value = "Dezimalpunkt";
				break;
			case 111:
				tb.value = "Teilen";
				break;
			case 112:
				tb.value = "F1";
				break;
			case 113:
				tb.value = "F2";
				break;
			case 114:
				tb.value = "F3";
				break;
			case 115:
				tb.value = "F4";
				break;
			case 116:
				tb.value = "F5";
				break;
			case 117:
				tb.value = "F6";
				break;
			case 118:
				tb.value = "F7";
				break;
			case 119:
				tb.value = "F8";
				break;
			case 120:
				tb.value = "F9";
				break;
			case 121:
				tb.value = "F10";
				break;
			case 122:
				tb.value = "F11";
				break;
			case 123:
				tb.value = "F12";
				break;
			case 144:
				tb.value = "Num Lock";
				break;
			case 145:
				tb.value = "Scroll Lock";
				break;
			case 186:
				tb.value = ";";
				break;
			case 187:
				tb.value = "=";
				break;
			case 188:
				tb.value = ",";
				break;
			case 189:
				tb.value = "-";
				break;
			case 190:
				tb.value = ".";
				break;
			case 191:
				tb.value = "/";
				break;
			case 192:
				tb.value = "`";
				break;
			case 219:
				tb.value = "[";
				break;
			case 220:
				tb.value = "\\";
				break;
			case 221:
				tb.value = "]";
				break;
			case 222:
				tb.value = "'";
				break;
		}
		return false;
	}
}

*/
