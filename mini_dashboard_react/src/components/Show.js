import React, {Component} from 'react';
import {render} from 'react-dom';
import Card from './Card';
import moment from 'moment';

let workers = [{
name: "Александр",
surname:"Волков",
patronym: "Юрьевич",
position:"Менеджер",
moment:"Nov 26th 17"
},
{
name: "Денис",
surname:"Роков",
patronym: "Альбертович",
position:"Курьер",
moment:"Nov 26th 17"
},
{
name: "Валентина",
surname:"Большова",
patronym: "Геннадьевна",
position:"Секретарь",
moment:"Nov 26th 17"
}
];

class Show extends Component {
	constructor(props) {
        super(props);
        this.state = {workers:workers};
    }
	add() {
		let name = this.refs.name.value;
		let surname = this.refs.surname.value;
		let patronym = this.refs.patronym.value;
		let position = this.refs.position.value;
		let momento = moment().format("MMM Do YY");
		if(name !== '' && surname !== '' && patronym !== '' && position !== '') {
			let obj = {name:name,surname: surname, patronym: patronym, position: position, moment: momento};
			workers.push(obj);
			this.setState({workers: workers});
		}
	}
	render() {
	return (
	<div>
		<section>
			<h3> Добавить сотрудника </h3>
			<br />
			<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <input type="text" placeholder="Имя" ref="name" /></div>
			<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <input type="text" placeholder="Фамилия" ref="surname" /></div>
			<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <input type="text" placeholder="Отчество" ref="patronym"  /></div>
			<div className="col-xs-12 col-sm-6 col-md-2 col-lg-2"> <input type="text" placeholder="Должность" ref="position"  /></div>
			<div className="col-xs-12 col-sm-6 col-md-4 col-lg-4"> <button className="btn btn-primary" onClick={this.add.bind(this)}>Добавить</button></div>
		</section>	
	{this.state.workers.map((work)=> {
		return (
		<Card name={work.name} surname={work.surname} patronym={work.patronym} position={work.position} moment={work.moment} />
	);	
	}
	)}</div>
	);
}
}

export default Show