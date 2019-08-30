import React, { Component } from 'react'

import Table from "./Table"
import ComplaintForm from "./complaintForm"

export default class UserDashboard extends Component {

  render() {
    return (
      <div>
        <div id="dashboard">
          <h1 id="heading">Dashboard</h1>
          <button id="logout" name="logout" onClick={this.props.handleClick}>Logout</button>
        </div>
        {/* upper right */}
        <button id="Add-a-Complaint" onClick={this.props.handleClick}>Add a Complaint</button>
        <br></br>
        {/* Table - List of data*/}
        <Table></Table>

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
