import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import UserDashboard from "./userDashboard"
import Table from "./Tables/Table"
import ComplaintForm from "./complaintForm"
import { connect } from "react-redux"
import "./dashboard.css"



class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("userToken") ? localStorage.getItem("userToken") : "",
      show: false
    }
  }
  handleComplaintform=(e)=>{
    this.setState({ show: !this.state.show })
  }

  handleLogout = (e) => {
      this.props.logout()
      this.setState({ token: localStorage.getItem("userToken") })
    }
  render() {
    if (this.state.token) {
      return (
        <div>
          <UserDashboard handleClick={this.handleLogout} token={this.state.token} />
          <button id="Add-a-Complaint" name="complaintform" onClick={this.handleComplaintform}>Add a Complaint</button>
          <br />
          <div style={{ width: '100%', display: 'flex' }}>
            <Table></Table>

            {/* Complaint form only shows when "add a complaint" button is pressed
            ..................and add complaints to the table file.
         */}

            {
              this.state.show ? <ComplaintForm show={this.handleComplaintform} sendBy="user" /> : ""
            }
          </div>
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