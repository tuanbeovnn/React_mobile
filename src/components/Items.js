import React, {Component} from 'react';


class Items extends Component{


onDelete = () =>{
    this.props.onDelete(this.props.product.id);
}

onUpdate = () =>{
    this.props.onUpdate(this.props.product.id);
}
    render(){
        

        var { product, index } = this.props; // nhận lại props và hiển thị ra ngoài

        return (
            <tr>
                    <td>{ index + 1 } </td>
                    <td>{ product.brand }</td>
                    <td>{ product.name } </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning" onClick ={this.onUpdate}>
                            <span className="fa fa-pencil mr-5"></span>Edit
                        </button>
                                        &nbsp;
                        <button type="button" className="btn btn-danger" onClick = {this.onDelete}>
                            <span className="fa fa-trash mr-5" 

                            ></span>Remove
                        </button>
                    </td>
            </tr>
            
        );
    }
}

export default Items;