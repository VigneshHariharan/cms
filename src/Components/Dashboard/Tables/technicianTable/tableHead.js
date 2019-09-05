import React, { Component } from 'react'

export default class TableHead extends Component {
  render() {
    return (<tr><th className="block">Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      <th className="status">Status</th>
    </tr>)
  }
}
