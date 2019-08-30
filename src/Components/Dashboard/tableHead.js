import React, { Component } from 'react'

export default class TableHead extends Component {
  render() {
    return (<tr><th>Block</th>
      <th>Floor</th>
      <th>System Number</th>
      <th>Description</th>
      <th>Created Time</th>
      {localStorage.getItem("token") === "adminLoggedIn" ?
        <th>Assign Function</th> : <th></th>}
      {localStorage.getItem("token") === "technicianLoggedIn"?
        <th>Status</th> : <th></th>}</tr>)
  }
}
