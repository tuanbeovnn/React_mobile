import React, {Component} from 'react';
import Search from './Search.js';
import Sort from './Sort.js';


class Control extends Component{

    render(){
        return (
            <div className="row mt-15">
               <Search />
                <Sort />    
                   
            </div>
            
        );
    }
}

export default Control;