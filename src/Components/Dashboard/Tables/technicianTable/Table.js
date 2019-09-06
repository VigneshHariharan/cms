import React from 'react'
import { connect } from "react-redux"

import "../table.css"

const Table = (props) => {
  let complaints = localStorage.getItem("complaints") ? props.complaints : [];
  return (

    <table id="table" style={{ width: '60%', display: 'inline' }}>
      <thead>
        <tr><th className="block">Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      <th className="status">Status</th>
    </tr>
        </thead>
        <tbody>
          {complaints ? complaints.map((state, index) => {
             const completeStatus = JSON.parse(localStorage.getItem('complaints'))[index].completeStatus === 'Completed'
             const approvedStatus = JSON.parse(localStorage.getItem('complaints'))[index].approvedStatus === 'Completed'
            return (props.technicianUsername === state.technician ?
              <tr key={(index*1001).toString()}>
      <td className="block">{state.block}</td>
      <td>{state.floor}</td>
      <td>{state.systemNumber}</td>
      <td>{state.description}</td>
      <td>{state.createdTime}</td>
      <td className="status">
        <button disabled={completeStatus}
          onClick={() => props.isCompleted(index)}>
          Completed</button>{approvedStatus? "approved" : completeStatus?'Completed':'in-progress'}</td>
          </tr>
              : <tr key={((index + 1) * 8000).toString()}></tr>)
          }) : ""
          }
        </tbody>
      </table>)
 }

const mapStateToProps = (state) => {
  return {
    complaints: state.complaint.complaints,
    technicians: state.login.technicians,
    technicianUsername: state.login.technicianLogin.username
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isCompleted: (index) => dispatch({
      type: 'COMPLETED_STATUS',
      payload: { index: index }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
