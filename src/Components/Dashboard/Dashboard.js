import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import UserDashboard from "./userDashboard"

import { connect } from "react-redux"
import "./dashboard.css"


class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
    }
  }

  handleClick = (e) => {
    if (e.target.name === "logout") {
      this.props.logout()
      this.setState({ token: localStorage.getItem("userToken") })
    }
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} token={this.state.token} />
          <button id="Add-a-Complaint" name="complaintform" onClick={this.handleClick}>Add a Complaint</button>

        </div>
      )
    }
    else
      return <Redirect to="/" ></Redirect>
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: "USER_LOGOUT" })
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)