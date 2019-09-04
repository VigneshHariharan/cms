import React, { Component } from 'react'

export default class TableHead extends Component {
  render() {
    return (<tr><th className="block">Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      {localStorage.getItem("token") === "adminLoggedIn" ?

        <th className="assign-function">Assign Function</th> : <th></th>}
      {localStorage.getItem("token") === "technicianLoggedIn" ?
        <th className="status">Status</th> : <th className="hidden"></th>}</tr>)
  }
}
