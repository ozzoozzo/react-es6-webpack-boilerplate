require('./App.less');
import React, { Component } from 'react';
import Code from './Code';
import Code2 from './Code2';
import Code3 from './Code3';
import InputFields from './InputFields';
import InputNew from './InputNew';

class App extends Component {

	componentDidMount(){
		this.nameInput.focus();
	}

	render() {
		return (
			// Add your component markup and other subcomponent references here.
			<div class="app">

				<input
					type="text"
					placeholder="Focus is initially here!"
					ref={(input) => { this.nameInput = input; }}
				/>

				<h1>Hello React</h1>

				<h2>Code Input v3</h2>
				<Code3 label="Label" name="code-input-v3-1" value="000000" consoleLog />
				<br /><br />
				<Code3 label="Activation code" name="code-input-v3-2" value="123456" required consoleLog />
				<br /><br />
				<div style={{ padding: '20px', backgroundColor: '#FFDCC0' }}>
					<Code3 name="code-input-v3-3" containerBg="#FFDCC0" consoleLog />
				</div>
				<br /><br />

				<h2>InputNew</h2>
				<InputNew label="Label" name="input-a" value="123456" required onChange={(name, value) => console.log('>>> InputNew >>> name =', name, '>>> value =', value)} />
				<br /><br />
				<InputNew label="Label" name="input-b" required warning="Nix gut" onChange={(name, value) => console.log('>>> InputNew >>> name =', name, '>>> value =', value)} />
				<br /><br />

				<h2>Code Input v2 (only use letter-spacing and hide cursor at right border)</h2>
				<Code2 name="code-input-v2-1" consoleLog />
				<br /><br />
				<Code2 name="code-input-v2-2" value="123" consoleLog />
				<br /><br />
				<div style={{ padding: '20px', backgroundColor: '#FFDCC0' }}>
					<Code2 name="code-input-v2-3" containerBg="#FFDCC0" consoleLog />
				</div>
				<br /><br />

				<h2>Code Input v1 (switch from letter-spacing to word-spacing and insert spaces)</h2>
				<Code name="code-input-v1-1" consoleLog />
				<br /><br />
				<Code name="code-input-v1-2" value="123" consoleLog />
				<br /><br />

				<InputFields />

			</div>
		);
	}

}

export default App;
