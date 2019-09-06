import React from 'react'


class UserDashboard extends React.Component{
  render(){
    return (
      <div>
        <div id="dashboard">
          <h1 id="heading">Dashboard</h1>
          <button id="logout" name="logout" onClick={this.props.handleClick}>Logout</button>
        </div>
        {/* upper right */}
        {/* <br></br><br /><br /> */}
        {/* Table - List of data*/}
      </div>
    )
  
}}

export default UserDashboard