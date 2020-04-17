import React, {Component} from 'react';
import './App.css';

import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';


class App extends Component{

    constructor(props){// create constructor để chứa các cái products, sau này thêm xóa sửa sẽ thao tác trên products
        super(props);
        this.state = {
            products: [], // có id, name, status
            isDisplayForm: false, // hiện thị form 
            productEdit: null
        }
    }

    // khi lưu lại cần phải lưu vào productsState thì ta dùng lifecycle componentwillmount
    componentWillMount(){
        if (localStorage && localStorage.getItem('products')) {
            var products = JSON.parse(localStorage.getItem('products'));
            this.setState({
                products : products
            });
        }
    }

   s4(){// viết random string
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
   }
   GenerateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-'+ this.s4() + '-'+ this.s4() + '-'+ this.s4() + '-'+ this.s4() + '-'
    + this.s4() + '-'+ this.s4();
   }

   onToggleForm = () => { // sự kiện đóng mở form add và thêm task trong trường hợp edit và muốn add
        if(this.state.isDisplayForm && this.state.productEdit !==null){
                this.setState ({
                isDisplayForm : true,
                productEdit: null, // trở về trạng thái sau khi sửa xong add rồi sửa lại add
                filter:{
                    name: '',
                    brand: ''
                }
        });
        }else{
            this.setState ({
            isDisplayForm : !this.state.isDisplayForm,// trường hợp ngược lại state
            productEdit: null // trở về trạng thái sau khi sửa xong add rồi sửa lại add
        });
        }
        
   }

   onCloseForm = () => {
        this.setState ({
            isDisplayForm : false
        });
   }

   onShowForm =() => {
        this.setState ({
            isDisplayForm : true
        });
   }

   onSubmit =(data) =>{
    var {products} = this.state;
    if (data.id ==='' ) {
        data.id = this.GenerateID();// chính là 1 cái product
        products.push(data);
    }else {
        // Editting
         var index = this.findIndex(data.id);
         products[index] = data;
        
    }
        
        this.setState({
            products: products, 
            productEdit : null
        });

        localStorage.setItem('products', JSON.stringify(products));

   }



   onDelete = (id) =>{
        var { products } = this.state;
        var index = this.findIndex(id);
        if (index !==-1) {
            products.splice(index,1);// 1 là số lượng phần tử muốn xóa
            this.setState({
                products: products
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
        this.onCloseForm();
   }
   onUpdate = (id) =>{
        var { products } = this.state;
        var index = this.findIndex(id);
        var productEdit = products[index];
        this.setState({
            productEdit : productEdit
        });
        this.onShowForm();
   }
   onFilter = (filterName, filterBrand) => {
    this.setState({
        filter : {
            name : filterName.toLowerCase(),
            brand : filterBrand.toLowerCase(),
           
        }
    });
    
       
   }

    findIndex = (id) => {
        var { products } = this.state;
        var result = -1;
        products.forEach((product, index) => {
            if(product.id === id){
                result = index;
            }
        });
        return result;
   }
    render(){
        var { products, isDisplayForm, productEdit, filter } = this.state;// var products = this.state.products
        if(filter){
            if (filter.name) {
               products = products.filter((product) =>{
                    return product.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            if (filter.brand) {
               products = products.filter((product) =>{
                    return product.brand.toLowerCase().indexOf(filter.brand) !== -1;
                });
            }
        }    
        var element = isDisplayForm === true ? <Form onCloseForm = {this.onCloseForm} 
                                                    onSubmit ={this.onSubmit}
                                                    task = {productEdit}
                                                /> : '';
    return (
            <div className="container">
        <div className="text-center">
            <h1>Products Management</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm === true ? 'col-xs-3 col-sm-3 col-md-3 col-lg-3' : ''}>
                {/*FORM*/}
                { element }
            </div>
            <div className={isDisplayForm === true ? 'col-xs-9 col-sm-9 col-md-9 col-lg-9' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary" onClick = {this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Add Product
                </button>

                
                {/*SEARCH-SORT*/}
                    <Control />

                
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <List products = { products } 
                            onDelete ={this.onDelete}
                            onUpdate ={this.onUpdate}
                            onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    }
}

export default App;
