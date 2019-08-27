import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
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
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick = () => {
    // Username and Password submit
    const {  admin, adminLogin } = this.props
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
      this.setState({ wrongFormat: "password should have 8 chars,1 upp case,1 low case,1 num" })
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
        return this.setState({ error: "Username or password is wrong" })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  componentWillUnmount() {
    localStorage.setItem("complaints", [])
  }

  render() {
    if (!localStorage.getItem("token")) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username : </label>
            <input name="username" type="text" onChange={this.handleChange}></input>
            <br></br>&nbsp;
        <label>Password : </label>
            <input name="password" type="password" onChange={this.handleChange}></input>
            <p>{this.state.error}</p><p>{this.state.wrongFormat}</p>
            <button type="submit" onClick={this.handleClick}>Login</button>
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