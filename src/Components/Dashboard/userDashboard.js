import React, { Component } from 'react'

import Table from "./Table"
import ComplaintForm from "./complaintForm"

export default class UserDashboard extends Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {/* upper right */}
        {localStorage.getItem('token')!=='technicianLoggedIn'?
        <button onClick={this.props.handleClick}>Add a Complaint</button>:''}
        <br></br>
        {/* Table - List of data*/}
        <Table></Table>
        <button name="logout" onClick={this.props.handleClick}>Logout</button>

        {/* Complaint form only shows when "add a complaint" button is pressed
            ..................and add complaints to the table file.
         */}
        {
          this.props.show ? <ComplaintForm show={this.props.handleClick} /> : ""
        }

      </div>
    )
  }
}
