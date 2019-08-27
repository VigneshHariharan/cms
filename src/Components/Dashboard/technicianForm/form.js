import React, { Component } from 'react';
import { connect } from 'react-redux';
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

class Form extends Component {
    constructor(){
        super()
        this.state={
            firstName:'',
            lastName:'',
            password:'',
            cPassword:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSumbit=this.handleSumbit.bind(this)
    }
    handleSumbit(e){
        e.preventDefault()
    }
    handleChange(e){
        this.setState( {[e.target.name]:e.target.value})
    }
    handleClick=()=>{
        const {firstName,lastName,password,cPassword}=this.state;
        const username=`${firstName} ${lastName}`
        if(username.length>8 && passwordRegex.test(password) && password===cPassword){
           
            this.props.setTechnician(username,password)

        }
       

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSumbit}>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                {/* <input type="text" name="userName" value={`${this.state.firstName} ${this.state.lastName}`} onChange={this.handleChange}/> */}
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <input type="password" name="cPassword" value={this.state.cpassword} onChange={this.handleChange}/>
                <button type="submit" onClick={this.handleClick}>submit</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setTechnician:(username,password)=>dispatch({
            type:'TECHNICIAN_LOGIN',
            payload:{username,password}
        })

    }
}
export default connect(null,mapDispatchToProps)(Form)