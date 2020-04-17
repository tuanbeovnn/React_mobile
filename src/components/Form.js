import React, {Component} from 'react';


class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: null,
            name:  '',
            brand: ''
        }

    }

    componentWillMount() {
        console.log(this.props.task);
        if(this.props.task){

            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                brand: this.props.task.brand

            });

          
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                brand: nextProps.task.brand
            });
        }else if(nextProps && nextProps.task === null){
             this.state = {
                id: '',
                name:  '',
                brand: ''
            }
        }
    }


onClose =()=>{
    this.props.onCloseForm();
}

onChange=(event) =>{
    var target = event.target;
    var name = target.name;
    var brand = target.brand;
    var value = target.value;
    var value1 = target.value1;
    

    this.setState({
        [name] : value 
    });
    this.setState({
        [brand] : value1 
    });

}

onSubmit =(event) =>{
    event.preventDefault();
    this.props.onSubmit(this.state);

    // cancel % close form
    this.onClear();
    this.onClose();
}

onClear = () => {
  document.getElementById("myForm").reset(); 
  this.setState({
    name: '',
    brand:''
  })
}


    render(){
        var {id }= this.state;
        return (
            
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title"> {id !== ''? 'Update Product' : 'Add Product' }
                        <span className="far fa-times-circle text-right"
                                onClick = {this.onClose}
                        ></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit = { this.onSubmit } id="myForm">
                            <div className="form-group">
                                <label>Brand of Product:</label>
                                <input type="text" className="form-control" required
                                    name = "brand" // trùng vs state
                                   
                                    onChange = {this.onChange}
                                />
                            </div>
                           <div className="form-group">
                                <label>Name of Product :</label>
                                <input type="text" className="form-control" required
                                    name = "name" // trùng vs state
                                    
                                    onChange = {this.onChange}
                                />
                            </div>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Save</button>&nbsp;


                                <button
                                type="button"
                                className="btn btn-danger"
                                onClick ={this.onClear}
                                >
                                    <span className="fa fa-close mr-5"></span>Reset
                                </button>


                            </div>
                        </form>
                    </div>
                </div>
            
            
        );
    }
}

export default Form;