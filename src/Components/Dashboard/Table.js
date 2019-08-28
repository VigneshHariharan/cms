import React, { Component } from 'react'
import { connect } from "react-redux"

class Table extends Component {
  constructor(){
    super()
    this.state={
      selectedOption:localStorage.getItem('technicians')?JSON.parse(localStorage.getItem('technicians'))[0].username:'',
    
    }
  }
  handleSelect=(e)=>{
    this.setState({selectedOption:e.target.value})
  }

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
              localStorage.getItem('token')!=="technicianLoggedIn"?
              complaints ? complaints.map((state, index) => {
                return <tr key={index}>
                  {console.log("adm")}
                  <td>{state.block}</td>
                  <td>{state.floor}</td>
                  <td>{state.systemNumber}</td>
                  <td>{state.description}</td>
                  <td>{state.createdTime}</td>
                  {localStorage.getItem("token") === "adminLoggedIn" ?
                    <td><select onChange={this.handleSelect}>
                      {
                        technicians.map((tech, i) => {
                          return (
                          <option key={(i * 1000).toString()}>{tech.username}</option>
                          )
                        })
                      }
                    </select>
                    <button onClick={()=>this.props.assignTechnician(this.state.selectedOption,index)}>Assign</button>  
                    </td> : ""}
                </tr>
              }) : "" 
              :
              complaints ? complaints.filter((state, index) => {
                console.log(index,"technicianloggedin")
                 return this.props.technicianUsername===state.technician
               })
               :""
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
    technicians: state.login.technicians,
    technicianUsername:state.login.username
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    assignTechnician: (technicianName,index)=>dispatch({type:'ASSIGN_TECHNICIAN',payload:{technician:technicianName,index}})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Table)

//  localStorage.setItem("arrs",JSON.stringify([...JSON.parse(arr),{keys3:"val3"}]))