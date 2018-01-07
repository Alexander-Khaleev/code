import React, {Component} from 'react';
import {render} from 'react-dom';

class Field extends Component {
    marker() {
        // Делаем подсветку строки при клике
        let tr = document.getElementsByTagName('tr');      
        for (let i=0; i < tr.length; i++) {
            if (tr[i].hasAttribute('class','active') == true) {
                tr[i].removeAttribute('class','active');
            }
        }
        this.refs.trka.setAttribute('class','active');
    }
    render() {
        return (
                <tr ref="trka" onClick={this.marker.bind(this)}>
                {Object.keys(this.props.item).map((key, index) => {
                    if (index > 0) {
                        return (
                            <td> {this.props.item[key]}</td>
                       );
                    }
                })}                  
                </tr>
        );
    }
}

export default Field;