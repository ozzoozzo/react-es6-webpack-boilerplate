require('./App.less');
import React, { Component } from 'react';
import Form from './Form';

class App extends Component {

	render() {
		return (
			// Add your component markup and other subcomponent references here.
			<div className="app">
				<h1>Hello, World!</h1>
				<Form />
			</div>
		);
	}

}

export default App;
