import React, { Component } from 'react'
import { connect } from "react-redux"
import TableData from "./tableData"
import TableHead from "./tableHead"
import "../table.css"

class Table extends Component {

  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (

      <table id="table" style={{ width: '60%', display: 'inline' }}>
        <thead>
          <TableHead></TableHead>
        </thead>
        <tbody>
          {complaints ? complaints.map((state, index) => {
            return (this.props.technicianUsername === state.technician ?
              <TableData state={state} index={index} key={((index + 1) * 9000).toString()}>{console.log(state)}</TableData>
              : <tr key={((index + 1) * 8000).toString()}></tr>)
          }) : ""
          }
        </tbody>
      </table>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    complaints: state.complaint.complaints,
    technicians: state.login.technicians,
    technicianUsername: state.login.technicianLogin.username
  }
}

export default connect(mapStateToProps)(Table)
