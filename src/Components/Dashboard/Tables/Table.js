import React, { Component } from 'react'
import { connect } from "react-redux"
import "./table.css"

class Table extends Component {
  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (
      <table id="table" style={{ width: '60%', display: 'inline' }}>
        <thead>
        <tr><th className="block">Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      <th>Status</th></tr>
        </thead>
        <tbody>
          {complaints ? complaints.map((state, index) => {
            return state.sendBy!=='admin'?<tr key={index}><td className="block">{state.block}</td>
            <td>{state.floor}</td>
            <td>{state.systemNumber}</td>
            <td>{state.description}</td>
            <td>{state.createdTime}</td>
            <td>{state.approvedStatus==='Completed'?'completed':'in-progress'}</td>
            </tr>:<tr className="hidden" key={index} ><td></td></tr>
          }) : ""
          }
        </tbody>
      </table>
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
