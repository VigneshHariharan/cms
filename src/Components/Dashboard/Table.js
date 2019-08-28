import React, { Component } from 'react'
import { connect } from "react-redux"

class Table extends Component {

  render() {
    let complaints = localStorage.getItem("complaints") ? this.props.complaints : []
    let technicians = localStorage.getItem("technicians") ? this.props.technicians : []
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
              {localStorage.getItem("token") === "adminLoggedIn" ?
                <th>Assign Function</th> : ""}
            </tr>
          </thead>
          <tbody>
            {
              complaints ? complaints.map((state, index) => {
                console.log(complaints)
                return <tr key={index}>
                  <td>{state.block}</td>
                  <td>{state.floor}</td>
                  <td>{state.systemNumber}</td>
                  <td>{state.description}</td>
                  <td>{state.createdTime}</td>

                  {localStorage.getItem("token") === "adminLoggedIn" ?
                    <td><select>
                      {
                        technicians.map((tech, i) => {
                          return <option key={(i * 1000).toString()}>{tech.username}</option>
                        })
                      }
                    </select>
                      <button>Assign</button>
                    </td> : ""}
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
    complaints: state.complaint.complaints,
    technicians: state.login.technicians
  }
}


export default connect(mapStateToProps)(Table)

//  localStorage.setItem("arrs",JSON.stringify([...JSON.parse(arr),{keys3:"val3"}]))