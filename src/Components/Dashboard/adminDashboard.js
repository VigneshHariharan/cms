import React, { Component } from 'react'
import Form from './technicianForm/form'
import UserDashboard from "./userDashboard"
import { Redirect } from "react-router-dom"
import "./dashboard.css"
import { connect } from "react-redux"

import ComplaintForm from "./complaintForm"
import Table from "./Tables/adminTable/Table"


class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("adminToken"),
      visible: false,
      show: false
    }
  }

  handleClick = (e) => {
    if (e.target.name === "form") {
      this.setState({ visible: !this.state.visible, show: false })
    }
    else if (e.target.name === "complaintform") {
      this.setState({ show: !this.state.show, visible: false })
    }
    else if (e.target.name === "logout") {
      this.props.logout()
      this.setState({ token: localStorage.getItem("adminToken") })
    }
  }

  render() {

    if (localStorage.getItem("adminToken"))
      return (
        <div>
          <UserDashboard handleClick={this.handleClick} token={this.state.token} />
          <button id="Add-a-Technican" name="form" onClick={this.handleClick}>Add a Technician</button>
          <button id="Add-a-Complaint" name="complaintform" onClick={this.handleClick}>Add a Complaint</button>
          <br />
          <div style={{ width: '100%', display: 'inline' }}>
            <Table></Table>

            {/* Complaint form only shows when "add a complaint" button is pressed
            ..................and add complaints to the table file.
         */}
            {
              this.state.visible ? <Form className="technicianform" show={this.handleClick} /> : ""
            }
            {
              this.state.show ? <ComplaintForm show={this.handleClick} /> : ""
            }
          </div>
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