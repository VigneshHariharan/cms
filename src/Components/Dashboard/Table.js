import React, { Component } from 'react'
import { connect } from "react-redux"

class Table extends Component {

  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Block</th>
              <th>Floor</th>
              <th>System Number</th>
              <th>Description</th>
              <th>Created Time</th>
            </tr>
          </thead>
          <tbody>
            {
              complaints ? complaints.map((state, index) => {
                return <tr key={index}>
                  <td>{state.block}</td>
                  <td>{state.floor}</td>
                  <td>{state.systemNumber}</td>
                  <td>{state.description}</td>
                  <td>{state.createdTime}</td>
                </tr>
              }) : ""
            }
          </tbody>
        </table>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    complaints: state.complaint.complaints
  }
}


export default connect(mapStateToProps)(Table)

//  localStorage.setItem("arrs",JSON.stringify([...JSON.parse(arr),{keys3:"val3"}]))