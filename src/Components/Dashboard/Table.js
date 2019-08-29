import React, { Component } from 'react'
import { connect } from "react-redux"
import TableData from "./tableData"
import TableHead from "./tableHead"

class Table extends Component {

  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (
      <div>
        <table>
          <thead>
            <TableHead></TableHead>
          </thead>
          <tbody>
            {(localStorage.getItem("token") === "adminLoggedIn" ||
              localStorage.getItem("token") === "loggedIn") ?
              complaints ? complaints.map((state, index) => {
                return <TableData state={state} index={index} key={(index * 2000).toString()} />
              }) : ""
              :
              complaints ? complaints.map((state, index) => {
                return (this.props.technicianUsername === state.technician ?
                  <TableData state={state} index={index} key={(index * 3000).toString()}></TableData> : "")
              }) : <tr><td></td></tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    complaints: state.complaint.complaints,
    technicians: state.login.technicians,
    technicianUsername: state.login.username
  }
}

export default connect(mapStateToProps)(Table)
