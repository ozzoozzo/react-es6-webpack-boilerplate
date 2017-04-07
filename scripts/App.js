require('./App.less');
import React, { Component } from 'react';
import Code from './Code';
import Code2 from './Code2';
import Code3 from './Code3';
import Code4 from './Code4';
import InputFields from './InputFields';
import InputNew from './InputNew';
import InputDropdown from './InputDropdown';

class App extends Component {

	componentDidMount(){
		//this.nameInput.focus();
	}

	handleFormSubmit = (event) => {
		alert('Form Submit');
		event.preventDefault();
	};

	render() {
		const dummy = () => {};
		const dump = (name, value) => { console.log(name, '=', value); };
		const options = [
			'hansi@domain.com',
			'greti.das.geht.immer.weiter@bla.ohne.ende.ch',
			'hugo@bli.at',
			'berta@blu.fr',
		];

		return (
			// Add your component markup and other subcomponent references here.
			<div class="app">

				<input type="text" placeholder="Focus is initially here!" ref={(input) => { this.nameInput = input; }} />
				&nbsp;
				<input type="text" value="Value" onChange={dummy} />
				&nbsp;
				<input type="text" value="Input readonly" readOnly />
				&nbsp;
				<input type="text" value="Input disabled" disabled/>
				&nbsp;
				<select name="dropdown-1" defaultValue="hugo" style={{ width: '150px' }}>
					<option value="hansi">hansi@domain.com</option>
					<option value="greti">greti.das.geht.immer.weiter@bla.ohne.ende.ch</option>
					<option value="hugo">hugo@bli.at</option>
					<option value="berta">berta@blu.fr</option>
				</select>

				<h1>Hello React</h1>

				<h2>InputDropdown</h2>
				<InputDropdown
					label="E-mail address"
					name="idd-1"
					onChange={dummy}
					options={options}
				/>
				<br /><br />
				<InputDropdown
					label="E-mail address"
					name="idd-1"
					onChange={dummy}
					options={options}
					value="hugo@bli.at"
				/>
				<br /><br />
				label
				<br />
				very long label with ... ellipsis
				<br />
				placeholder
				<br />
				very long placeholder with ... ellipsis
				<br />
				value (pre-selection)
				<br />
				very long value with ... ellipsis
				<br />
				required
				<br />
				readonly
				<br />
				disabled
				<br />
				width &lt; 250px
				<br />
				width &gt; 250px
				<br />
				warning
				<br />
				model mit 0 options (dann kein arrow-icon)
				<br />
				model mit genau 1 option, model mit n options
				<br />
				option with long text ... ellipsis
				<br /><br />

				<h2>InputNew readonly (CSS cf. e-b Login)</h2>
				<InputNew label="First name" name="firstName" value="Peter (required, readonly)" required readOnly onChange={dummy} />
				<br /><br />
				<InputNew label="Last name" name="lastName" value="Muster (required, disabled)" required disabled onChange={dummy} />
				<br /><br />
				<InputNew label="E-mail address" name="email" value="" required onChange={dummy} />
				<br /><br /><br />

				<h2>Code Input v4 (with word-spacing)</h2>
				<form onSubmit={this.handleFormSubmit}>
					<Code4 label="Label" name="code-input-v4-1" value="000000" consoleLog onChange={dump} />
					<br /><br />
					<Code4 label="Activation code" name="code-input-v4-2" value="123456" required consoleLog onChange={dump} />
					<br /><br />
					<div style={{ padding: '20px', backgroundColor: '#FFDCC0' }}>
						<Code4 label="Label - Lorem ipsum dolor sit amet, consetetur sadipscing elitr." name="code-input-v4-3" consoleLog onChange={dump} />
					</div>
					<br /><br />
					<input type="submit" value="Submit" />
				</form>
				<br /><br /><br />

				<h2>Code Input v3 (with letter-spacing)</h2>
				<form onSubmit={this.handleFormSubmit}>
					<Code3 label="Label" name="code-input-v3-1" value="000000" consoleLog />
					<br /><br />
					<Code3 label="Activation code" name="code-input-v3-2" value="123456" required consoleLog />
					<br /><br />
					<div style={{ padding: '20px', backgroundColor: '#FFDCC0' }}>
						<Code3 name="code-input-v3-3" containerBg="#FFDCC0" consoleLog />
					</div>
					<br /><br />
					<input type="submit" value="Submit" />
				</form>
				<br /><br /><br />

				<h2>InputNew</h2>
				<InputNew label="Label" name="input-a" value="123456" required onChange={(name, value) => console.log('>>> InputNew >>> name =', name, '>>> value =', value)} />
				<br /><br />
				<InputNew label="Label" name="input-b" required warning="Nix gut" onChange={(name, value) => console.log('>>> InputNew >>> name =', name, '>>> value =', value)} />
				<br /><br /><br />

				<h2>Code Input v2 (only use letter-spacing and hide cursor at right border)</h2>
				<Code2 name="code-input-v2-1" consoleLog />
				<br /><br />
				<Code2 name="code-input-v2-2" value="123" consoleLog />
				<br /><br />
				<div style={{ padding: '20px', backgroundColor: '#FFDCC0' }}>
					<Code2 name="code-input-v2-3" containerBg="#FFDCC0" consoleLog />
				</div>
				<br /><br /><br />

				<h2>Code Input v1 (switch from letter-spacing to word-spacing and insert spaces)</h2>
				<Code name="code-input-v1-1" consoleLog />
				<br /><br />
				<Code name="code-input-v1-2" value="123" consoleLog />
				<br /><br /><br />

				<InputFields />

			</div>
		);
	}

}

export default App;
