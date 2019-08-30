import React, { Component } from 'react'
import { connect } from "react-redux"
import TableData from "./tableData"
import TableHead from "./tableHead"

class Table extends Component {

  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (
      
        <table style={{width:'60%',display:'inline'}}>
          <thead>
            <TableHead></TableHead>
          </thead>
          <tbody>
            {(localStorage.getItem("token") === "adminLoggedIn" ||
              localStorage.getItem("token") === "loggedIn") ?
              complaints ? complaints.map((state, index) => {
                return <TableData state={state} index={index} key={(index * 10000).toString()} />
              }) : ""
              :
              complaints ? complaints.map((state, index) => {
                return (this.props.technicianUsername === state.technician ?
                  <TableData state={state} index={index} key={((index + 1) * 9000).toString()}></TableData>
                  : <tr key={((index + 1) * 8000).toString()}></tr>)
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
