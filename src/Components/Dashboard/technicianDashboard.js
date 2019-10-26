import React, { Component } from 'react'
import UserDashboard from "./userDashboard"
import { Redirect } from "react-router-dom"
import "./dashboard.css"
import { connect } from "react-redux"
import Table from "./Tables/technicianTable/Table"



class TechnicianDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("technicianToken") ? localStorage.getItem("technicianToken") : ""
    }
  }

  handleLogout = (e) => {
      this.props.logout()
      this.setState({ token: localStorage.getItem("technicianToken") })
    }

  render() {
    if (this.state.token)
      return (<div>
        <UserDashboard handleClick={this.handleLogout} token={this.state.token} />
        <br/>
        <Table></Table>
      </div>
      )
    else
      return <Redirect to="/"></Redirect>
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: "TECHNICIAN_LOGOUT" })
  }
}


export default connect(null, mapDispatchToProps)(TechnicianDashboard)