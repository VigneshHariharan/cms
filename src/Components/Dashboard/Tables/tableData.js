import React, { Component } from 'react'

class TableData extends Component {
  render() {
    const state = this.props.state
    return (<tr><td className="block">{state.block}</td>
      <td>{state.floor}</td>
      <td>{state.systemNumber}</td>
      <td>{state.description}</td>
      <td>{state.createdTime}</td>
    </tr>)
  }
}

export default TableData