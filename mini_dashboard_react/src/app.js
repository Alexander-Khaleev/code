import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './components/Header';
import Show from './components/Show';


class App extends Component {
    render() {
        return (
			<div>
				<Header />
				<Show />
			</div>
        );
    }
}

render(<App />, document.getElementById('root'));