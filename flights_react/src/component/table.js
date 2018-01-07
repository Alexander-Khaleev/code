import React, {Component} from 'react';
import {render} from 'react-dom';
import Field from './field';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {data:this.props.data};
    }
    search() {
        // Поиск
        setTimeout(Changed, 300);
        setTimeout(State, 1000);
        let ts = this;
        let val = this.refs.search.value;
        let container =[];
        let metka = 0;
        if (val.indexOf('^') == 0) {
            metka = 1;
            val = val.substr(1);
        }  
        function Changed() {
           ts.props.data.filter(function(item) { 
                for (let key in item) {
                    if (item[key] !== null) {
                        let newString = item[key].toString();
                        // Если используется ^
                        if (metka == 1) {
                            if (newString.indexOf(val) === 0 && newString.indexOf(val) !== -1 && val.length !== 0)  {
                                //console.log(item);
                                console.log(newString.indexOf(val));
                                container.push(item);
                            }
                            else if (newString.indexOf(val) !== 0 && val.length !== 0)) {
                                console.log('Puk');
                                ts.setState({data: ''});
                            }
                        }
                        // В остальных случаях                     
                        if (newString.indexOf(val) !== -1 && metka == 0) {
                            container.push(item);
                        }
                    }
                }
            });        
        }
        function State() {
            if (container.length !== 0 && val.length !== 0) {
                ts.setState({data: container});
            }
            else {
                ts.setState({data: ts.props.data});
            }
        }
    }
    render() {
        return (
			<div>
            <p> Используйте символ "^" для поиска значений в начале строки </p>    
            <input type="text" class="form-control" ref="search" placeholder="Поиск"  onChange={this.search.bind(this)}/>
            <table class="table table-bordered">
            <tbody>
			{this.state.data.map((data)=> {
                return (
                    <Field item={data} />
                 );
            })}
            </tbody>
            </table>
			</div>
        );
    }
}

export default Table;