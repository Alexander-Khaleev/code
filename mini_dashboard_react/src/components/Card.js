import React, {Component} from 'react';
import {render} from 'react-dom';
import "./css/show.css";

class Card extends Component {
	close() {
		let row = this.refs.rows;
		row.remove();
	}
    render() {
        return (
			<div className="row" ref="rows">
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <p> {this.props.name} </p> </div>
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <p> {this.props.surname} </p> </div>
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <p> {this.props.patronym} </p> </div>
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <p> {this.props.position} </p> </div>
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> Добавлено: {this.props.moment} </div>
				<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <div className="exit" onClick={this.close.bind(this)}> X </div> </div>
			</div>	
		);
	}
}

export default Card	