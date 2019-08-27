import React, { Component } from 'react'

import Table from "./Table"
import ComplaintForm from "./complaintForm"
import Form from './technicianForm/form'

export default class UserDashboard extends Component {
  constructor(){
    super()
    this.state={
      visible:false,
    }
  }
  handleClick=()=>{
    this.setState({visible:!this.state.visible})
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {/* upper right */}
        <button onClick={this.props.handleClick}>Add a Complaint</button>
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
        <br/><br/>
        <button onClick={this.handleClick}>Add a Technician</button>
        {this.state.visible?<Form/>:''}

      </div>
    )
  }
}
