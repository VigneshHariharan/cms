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
      show: false,
    }
  }


  handleClick = (e) => {
    if (e.target.name === "form") {
      this.setState({ visible: !this.state.visible,show:false })
    }
    else if (e.target.name === "complaintform") {
      this.setState({ show: !this.state.show,visible:false })
    }

  }


  render() {
    const token = this.props.token
    if (token === "loggedIn") {
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} show={this.state.show} />
        </div>
      )
    }
    else if (localStorage.getItem("token") === "adminLoggedIn")
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} show={this.state.show}/>
          {this.state.visible ? <Form className="technicianform" /> : ''}
        </div>
      )
    else if (localStorage.getItem("token") === 'technicianLoggedIn')
      return (<div>
        <UserDashboard handleClick={this.handleClick} show={this.state.show}/>
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