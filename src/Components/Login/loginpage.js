import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import './style.css'
import 'font-awesome/css/font-awesome.min.css';


const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: '',
      wrongFormat: '',
    }
    this.userRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  componentDidMount(){
    if(!localStorage.getItem('userToken')){
    this.userRef.current.focus();
    }
    // console.log(this.myRef)
  }
 
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(e.target.value)
    // if(e.key==='Enter'){
    //   this.passwordRef.current.focus()
    // }
  }
  handleKeyPress = (e) => {
    // console.log(this.state.error)
    if (e.key === 'Enter') {
      this.passwordRef.current.focus();
      console.log(this.state.error, 'enter')
    }

  }

  handleClick = () => {
    // Username and Password submit
    const { admin, adminLogin } = this.props
    const { username, password } = this.state
    // admin map
    if (username.length > 8 && passwordRegex.test(password)) {
      //password check
      ////password must contain one lowercase character,
      //one uppercase character,one number,length above 8

      admin.map((admin) => {
        if (username === admin.username && password === admin.password) {
          return adminLogin(username, password)
        }
        else {
          return this.usersLogin(username, password)
        }
      })
    }
    else {
      this.setState({ wrongFormat: "Password should have 8 chars,1 upp case,1 low case,1 num", error: '' })
    }
  }

  usersLogin = (username, password) => {
    const { users, shouldLogin } = this.props
    return users.map((users) => {
      // to check if username and password are in users list
      if (username === users.username
        && password === users.password) {
        return shouldLogin(username, password)
      }
      else {
        return this.technicianLogin(username, password)
      }
    })
  }

  technicianLogin = (username, password) => {
    const { technicians, shouldTechnicianLogin } = this.props
    return technicians.map((technicians) => {
      if (username === technicians.username
        && password === technicians.password) {
        return shouldTechnicianLogin(username, password)
      }
      else {
        return this.setState({ error: "Username or password is wrong", wrongFormat: '' })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const token = localStorage.getItem("userToken")
    if (!token) {
      return (
        <div className="formDiv">
          <form className="form" onSubmit={this.handleSubmit}>
            <p className="login">LOG IN</p>
            <div className="textboxDiv">
              <i className="fa fa-user icon" aria-hidden="true"></i>
              <input ref={this.userRef} placeholder="Username" className="textbox" name="username" type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange}></input>
            </div>
            <div className="textboxDiv textboxDiv1">
              <i className="fa fa-lock icon"></i>
              <input ref={this.passwordRef} placeholder="Password" className="textbox" name="password" type="password" onChange={this.handleChange}></input>
            </div> <br />

            {
              this.state.error ? <i className="fa fa-exclamation-triangle warning-icon" aria-hidden="true"><p className="errorMsg">{this.state.error}</p></i> : ''
            }
            {
              this.state.wrongFormat ? <i className="fa fa-exclamation-triangle warning-icon" aria-hidden="true"><p className="errorMsg">{this.state.wrongFormat}</p></i> : ''
            }
            <div className="textboxDiv1"><button className="button" onClick={this.handleClick} type="submit">Login</button></div>
          </form>
        </div>
      )
    }
    else {
      return <Redirect to="/dashboard"></Redirect>
    }


  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    users: state.login.users,
    admin: state.login.admin,
    technicians: state.login.technicians
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shouldLogin: (username, password) => dispatch({
      type: "LOGIN", payload: {
        username, password
      }
    }),
    adminLogin: (username, password) => dispatch({
      type: "ADMIN_LOGIN", payload: {
        username, password
      }
    }),
    shouldTechnicianLogin: (username, password) => dispatch({
      type: "TECHNICIAN_LOGIN", payload: {
        username, password
      }
    })

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


