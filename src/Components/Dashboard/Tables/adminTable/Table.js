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
            return <TableData state={state}
              index={index} key={(index * 10000).toString()} />
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