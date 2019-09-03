import React, { Component } from 'react'

import Table from "./Table"
import ComplaintForm from "./complaintForm"

import { connect } from "react-redux"
import { Redirect } from "react-router-dom"



class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",

    }
  }


  handleClick = (e) => {
  
     if (e.target.name === "logout") {
      this.props.logout()
      this.setState({ token: localStorage.getItem("token") })
    }
  }

  render() {
    if (this.state.token)
      return (
        <div style={{ width: '100%', display: 'inline' }}>
          <div id="dashboard">
            <h1 id="heading">Dashboard</h1>
            <button id="logout" name="logout" onClick={this.handleClick}>Logout</button>
          </div>

          {localStorage.getItem('token') === 'adminLoggedIn' ? <button id="Add-a-Technican" name="form" onClick={this.props.handleClick}>Add a Technician</button> : ''}
          {localStorage.getItem("token") !== 'technicianLoggedIn' ? <button id="Add-a-Complaint" name="complaintform" onClick={this.props.handleClick}>Add a Complaint</button> : ''}

          {/* upper right */}
          <br></br><br /><br />
          {/* Table - List of data*/}
            <Table></Table>
        {
          this.props.show ? <ComplaintForm show={this.handleClick} /> : ""
        }
            {/* Complaint form only shows when "add a complaint" button is pressed
            ..................and add complaints to the table file.
         */}
         </div>
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