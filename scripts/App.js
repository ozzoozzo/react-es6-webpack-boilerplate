require('./App.less');
import React, { Component } from 'react';
import Code from './Code';
import Code2 from './Code2';
import Form from './Form';

class App extends Component {

	render() {
		return (
			// Add your component markup and other subcomponent references here.
			<div className="app">
				<h1>Hello React</h1>
				<h2>Code Input v2</h2>
				<Code2 name="code-input-v2-1" consoleLog />
				<br /><br />
				<Code2 name="code-input-v2-2" value="123" consoleLog />
				<br />
				<h2>Code Input v1</h2>
				<Code name="code-input-v1-1" consoleLog />
				<br /><br />
				<Code name="code-input-v1-2" value="123" consoleLog />
				<Form />
			</div>
		);
	}

}

export default App;
