import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import UserDashboard from "./userDashboard"
import Form from './technicianForm/form'
import { connect } from "react-redux"
import "./dashboard.css"


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }


  handleClick = (e) => {
    if (e.target.name === "form") {
      this.setState({ visible: !this.state.visible })
    }

  }


  render() {
    const token = this.props.token
    console.log(token, "userlogin")
    if (token === "loggedIn") {
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} />
        </div>
      )
    }
    else if (localStorage.getItem("token") === "adminLoggedIn")
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} />
          {this.state.visible ? <Form className="technicianform" /> : ''}
        </div>
      )
    else if (localStorage.getItem("token") === 'technicianLoggedIn')
      return (<div>
        <UserDashboard handleClick={this.handleClick} />
      </div>
      )
    else
      return <Redirect to="/" ></Redirect>
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token
  }
}

export default connect(mapStateToProps)(Dashboard)