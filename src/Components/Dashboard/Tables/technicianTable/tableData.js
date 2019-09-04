import React, { Component } from 'react'
import { connect } from "react-redux"

class TableData extends Component {

  render() {
    console.log(this.props)
    const state = this.props.state
    const completeStatus = JSON.parse(localStorage.getItem('complaints'))[this.props.index].completeStatus === 'Completed'
    return (<tr>
      {console.log(state, this.props)}
      <td className="block">{state.block}</td>
      <td>{state.floor}</td>
      <td>{state.systemNumber}</td>
      <td>{state.description}</td>
      <td>{state.createdTime}</td>
      <td className="status">
        <button disabled={completeStatus}
          onClick={() => this.props.isCompleted(this.props.index)}>
          Completed</button>{completeStatus ? "Completed" : "in-progess"}</td>
    </tr>)
  }
}

const mapStateToProps = (state) => {
  return {
    technicians: state.login.technicians
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
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableData)