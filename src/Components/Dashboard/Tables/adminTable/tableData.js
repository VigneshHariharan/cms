import React, { Component } from 'react'
import { connect } from "react-redux"

class TableData extends Component {
  constructor() {
    super()
    this.state = {
      selectedOption: localStorage.getItem('technicians') ?
        JSON.parse(localStorage.getItem('technicians'))[0].username : '',
      assign: localStorage.getItem("assign") ? true : "",
    }
  }

  handleSelect = (e) => {
    this.setState({ selectedOption: e.target.value })
  }

  handleClick = () => {
    localStorage.setItem("assign", true)
    this.setState({ assign: localStorage.getItem("assign") })
    this.props.assignTechnician(this.state.selectedOption, this.props.index)
  }

  render() {
    const technicians = localStorage.getItem("technicians") ? this.props.technicians : []
    const state = this.props.state
    return (<tr><td className="block">{state.block}</td>
      <td>{state.floor}</td>
      <td>{state.systemNumber}</td>
      <td>{state.description}</td>
      <td>{state.createdTime}</td>
      <td><select disabled={this.state.assign} onChange={this.handleSelect}>
        {
          technicians.map((tech, i) => {
            return (
              <option key={(i * 1000).toString()}>{tech.username}</option>
            )
          })
        }</select>
        <button onClick={this.handleClick} disabled={this.state.assign}>Assign</button></td>
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