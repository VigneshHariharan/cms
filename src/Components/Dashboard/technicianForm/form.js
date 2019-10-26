import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Form.css'
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

class Form extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            cPassword: '',
            submitFeedback:'Enter the above details to sumbit the form!'
        }
        this.firstnameRef = React.createRef()
        this.lastnameRef = React.createRef()
        this.passwordRef = React.createRef()
        this.cpasswordRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }
    componentDidMount() {
        this.firstnameRef.current.focus()
    }
    handleSumbit(e) {
        e.preventDefault()
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            if (e.target.name === 'firstName') {
                this.lastnameRef.current.focus()
            }
            else if (e.target.name === 'lastName') {
                this.passwordRef.current.focus()
            }
            else if (e.target.name === 'password') {
                console.log("passssss")
                this.cpasswordRef.current.focus()
            }
        }

    }
    handleClick = () => {
        const { firstName, lastName, password, cPassword } = this.state;
        const username = `${firstName} ${lastName}`
        if (username.length > 8 && passwordRegex.test(password) && password === cPassword) {
            this.props.setTechnician(username, password)
            this.setState({
                firstName: '',
                lastName: '',
                password: '',
                cPassword: '',
                submitFeedback:'Successfully submitted'
            })
        }
    }

    render() {

        return (<div className="technician" style={{ width: '30%', display: 'inline' }}>
            <button className="closeButton" name="form" onClick={this.props.show}>&times;</button>

               <form className="form" onSubmit={this.handleSumbit}>
                <h1 className="heading">Technician Details</h1>
                
                <div className="container">
                    <label className="label">First Name<span className="asterick">*</span></label>
                    <input className="technician-form" ref={this.firstnameRef} type="text" name="firstName" required value={this.state.firstName} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                    <br />
                    <label className="label"> Last Name<span className="asterick">*</span></label>
                    <input className="technician-form" ref={this.lastnameRef} type="text" name="lastName" required value={this.state.lastName} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                    <br />
                    <label className="label"> Password<span className="asterick">*</span></label>
                    <input className="technician-form" ref={this.passwordRef} type="password" name="password" required value={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                    <br />
                    <label className="label"> Confirm Password <span className="asterick">*</span></label>
                    <input className="technician-form" ref={this.cpasswordRef} type="password" name="cPassword" required value={this.state.cPassword} onChange={this.handleChange} />
                    <br />
                   {this.state.submitFeedback!=='Successfully submitted'?<label className="label" style={{display:'inline'}}>Enter the above details to sumbit the form!</label >:<label  style={{color:"green"}}>Succesfully submitted!</label>}
                    <button className="submit" type="submit" onClick={this.handleClick}>submit</button>
                    
                </div>
                
              </form>
        </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTechnician: (username, password) => dispatch({
            type: 'ADD_TECHNICIAN',
            payload: { username, password }
        })

    }
}
export default connect(null, mapDispatchToProps)(Form)
