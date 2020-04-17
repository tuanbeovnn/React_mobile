import React, {Component} from 'react';
import Items from './Items.js'


class List extends Component {
    constructor(props){
        super(props);
        this.state ={
            filterName: '', // all : -1, active :1, deactive : 0
            filterBrand: ''
        }
    }

    onChange = (event) => {// lấy giá trị
        var target = event.target;
        var name = target.name;
        var brand = target.brand;
        var value = target.value;
        var value1 = target.value1;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterBrand' ? value : this.state.filterBrand,
        )

        this.setState({
            [name] : value
        });
        this.setState({
            [brand] : value1
        });
    }


    render(){
         var products = this.props.products;
         var {filterName} = this.state;
         var {filterBrand} = this.state;
         
         var elmPros = products.map(( product, index ) => {
             return <Items key = { index.toString() } index = { index } product = { product } 
             onDelete ={this.props.onDelete} onUpdate ={this.props.onUpdate}
             />
         }); 
        
        return (
            <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Brand of Product</th>
                                    <th className="text-center">Name of Product</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        name ="filterBrand"
                                        value ={filterBrand}
                                        onChange = {this.onChange}
                                        
                                       
                                        />
                                    </td>
                                    <td>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        value ={filterName}
                                        onChange = {this.onChange}
                                      
                                         />
                                        
                                    </td>
                            
                                    <td></td>
                                </tr>
                                {elmPros}

                            </tbody>
                </table>
            
        );
    }
}

export default List;