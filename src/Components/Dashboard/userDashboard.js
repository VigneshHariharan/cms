import React, { Component } from 'react'
import Table from "./Table"
import ComplaintForm from "./complaintForm"


class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  handleClick = (e) => {
    if (e.target.name === "complaintform") {
      this.setState({ show: !this.state.show })
    }
  }

  render() {

    return (
      <div>
        <div id="dashboard">
          <h1 id="heading">Dashboard</h1>
          <button id="logout" name="logout" onClick={this.props.handleClick}>Logout</button>
        </div>


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
        </div></div>
    )
  }
}

export default UserDashboard