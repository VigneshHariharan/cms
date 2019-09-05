import React, { Component } from 'react'

import Table from "./Table"
import ComplaintForm from "./complaintForm"

import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Form from './technicianForm/form'



class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      userToken:localStorage.getItem("userToken") ? localStorage.getItem("userToken") : "",
    }
    console.log(this.state.userToken)
  }

  handleClick = (e) => {
    if (e.target.name === "complaintform") {
      this.setState({ show: !this.state.show })
    }
    else if (e.target.name === "logout") {
      this.props.logout()
      this.setState({ userToken: localStorage.getItem("userToken") })
    }
  }

  render() {
    if (this.state.userToken)
      return (
        <div>
          <div id="dashboard">
            <h1 id="heading">Dashboard</h1>
            <button id="logout" name="logout" onClick={this.handleClick}>Logout</button>
          </div>

          {localStorage.getItem('token') === 'adminLoggedIn' ? <button id="Add-a-Technican" name="form" onClick={this.props.handleClick}>Add a Technician</button> : ''}
          {localStorage.getItem("token") !== 'technicianLoggedIn' ? <button id="Add-a-Complaint" name="complaintform" onClick={this.handleClick}>Add a Complaint</button> : ''}

          {/* upper right */}
          <br></br><br /><br />
          {/* Table - List of data*/}
          <div style={{ width: '100%', display: 'inline' }}>
            <Table></Table>
            {/* Complaint form only shows when "add a complaint" button is pressed
            ..................and add complaints to the table file.
         */}

        {
          this.state.show ? <ComplaintForm show={this.handleClick} /> : ""
        }
          {this.props.visible ? <Form className="form"/> : ''}
        </div></div>
      )
    else {
      return <Redirect to="" />
    }
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: "LOGOUT" })
  }
}

export default connect(null, mapDispatchToProps)(UserDashboard)