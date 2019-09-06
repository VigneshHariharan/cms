import React, { Component } from 'react'
import { connect } from "react-redux"
import "../table.css"

class Table extends Component {
  constructor() {
    super()
    this.state = {
      selectedOption:localStorage.getItem('technicians')? JSON.parse(localStorage.getItem('technicians'))[0].username:'',
    }
  }

  handleSelect = (e) => {
    this.setState({ selectedOption: e.target.value })
  }

  handleClick = (index) => {
    this.props.assignTechnician(this.state.selectedOption,index)
  }

  render() {
    const technicians = localStorage.getItem("technicians") ? this.props.technicians : []
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (
      <table id="table" style={{ width: '60%', display: 'inline' }}>
        <thead>
      <tr><th className="block">Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      <th className="assign-function">Assign Function</th>
    </tr>
        </thead>
        <tbody>
          {complaints ? complaints.map((state, index) => {
            return <tr key={(index*2000).toString()}><td className="block">{state.block}</td>
            <td>{state.floor}</td>
            <td>{state.systemNumber}</td>
            <td>{state.description}</td>
            <td>{state.createdTime}</td>
            <td><select value={state.assignedTechnician} disabled={state.assignStatus ? true : ""}
              onChange={this.handleSelect}><option>--select any one--</option>
              {
                technicians.map((tech, i) => {
                  return (
                    <option key={(i * 1000).toString()}>{tech.username}</option>
                  )
                })
              }</select>
              <button onClick={()=>this.handleClick(index)} 
              disabled={state.assignStatus ? true : ""}>Assign</button></td>
          </tr>
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
const mapDispatchToProps = (dispatch) => {
  return {
    assignTechnician: (technicianName, index) => dispatch({
      type: 'ASSIGN_TECHNICIAN',
      payload: { technician: technicianName, index }
    }),
    isCompleted: (index) => dispatch({
      type: 'COMPLETED_STATUS',
      payload: { index: index }
    }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table)
