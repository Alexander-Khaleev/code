import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Table from './component/table';

let fields;

$.ajax({
    type: "GET",
    async: false,
    url: "test_data.json",
  }).done(function(data) {
    fields = data;
  });

class App extends Component {
    render() {
        return (
			<div>
				<Table data={fields} />
			</div>
        );
    }
}

render(<App />, document.getElementById('root'));