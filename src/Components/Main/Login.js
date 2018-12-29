import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fields : {
                email:'',
                password:''
            },
            errors : {

            }
        }        
    }

    componentDidMount() {
        if(this.props.auth) {
            this.props.history.push('/');
        }
    }

    handleValidation (callback) {

        let {fields} = this.state;
        let errors = {} ; 
        let formIsValide = true ;

        if(validator.isEmpty(fields.email)) {
            formIsValide = false;
            errors['email'] = 'ایمیل نمی تواند خالی باشد ';
        }
        else if(!validator.isEmail(fields.email)) {
            formIsValide = false;
            errors['email'] = 'فرمت ایمیل اشتباه است ';
        }

        if(validator.isEmpty(fields.password)) {
            formIsValide = false;
            errors['password'] = 'پسورد نمی تواند خالی باشد ';
        }
        else if(!validator.isLength(fields.password, {min:6})) {
            formIsValide = false;
            errors['password'] = 'فرمت پسورد اشتباه است ';
        }

        this.setState({errors},()=>{
             callback(formIsValide)
        })
    }

    handleChange (e) {

        let fields = this.state.fields;
        let target = e.target;
        fields[target.name] = target.value;
        this.setState({fields});
    }

    handleSubmit (e) {

        e.preventDefault();

        this.handleValidation((valid)=>{
            if(valid)  this.handleRequest()
        })
    }

    handleRequest () {
        const {email , password} = this.state.fields;
        let data = new FormData();
        data.append('email',email);
        data.append('password',password);
        axios.post('http://roocket.org/api/login', data)
        .then((response)=>{
            localStorage.setItem('api_token',response.data.data.api_token);
            console.log(response);
            this.props.login();
            this.props.history.push('/')
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        const {email , password} = this.state.fields;
        const {errors} = this.state;
        return (
        <div className="col-lg-6 col-offset-lg-3">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label>email</label>
                    <input type="text" value={email} 
                        name="email" 
                        onChange={this.handleChange.bind(this)}  
                        className={["form-control", errors['email'] ? "is-invalid" : ''].join(' ')}     
                        placeholder="please enter email" />
                        <span className="invalid-feedback" style={{display : errors['email'] ? 'block' : 'none' }}>{errors['email']}</span>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" 
                        value={password} name="password" 
                        onChange={this.handleChange.bind(this)}  
                        className={["form-control", errors['password'] ? "is-invalid" : ''].join(' ')}     
                        placeholder="please enter password" />
                         <span className="invalid-feedback" style={{display : errors['password'] ? 'block' : 'none' }}>{errors['password']}</span>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-danger">ورود به سایت </button>
                </div>
            </form>
        </div>
        )
    }
}
