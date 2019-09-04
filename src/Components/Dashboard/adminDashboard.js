import React, { Component } from 'react'
import Form from './technicianForm/form'
import UserDashboard from "./userDashboard"
import { Redirect } from "react-router-dom"
import "./dashboard.css"
import { connect } from "react-redux"
import Table from "./Tables/adminTable/Table"


class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("adminToken"),
      visible: false,
    }
  }

  handleClick = (e) => {
    if (e.target.name === "form") {
      this.setState({ visible: !this.state.visible })
    }
    else if (e.target.name === "logout") {
      this.props.logout()
      this.setState({ token: localStorage.getItem("adminToken") })
    }
  }

  render() {
    console.log(localStorage.getItem("adminToken"))
    if (localStorage.getItem("adminToken"))
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} token={this.state.token} />
          <Form className="technicianform" />
          <button id="Add-a-Technican" name="form" onClick={this.props.handleClick}>Add a Technician</button>
          <button id="Add-a-Complaint" name="complaintform" onClick={this.handleClick}>Add a Complaint</button>
          <Table ></Table>
        </div>
      )
    else
      return <Redirect to="/"></Redirect>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: "ADMIN_LOGOUT" })
  }
}


export default connect(null, mapDispatchToProps)(AdminDashboard)