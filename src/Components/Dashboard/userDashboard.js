import React from 'react'
const UserDashboard =(props)=>{
    return (
      <div>
        <div id="dashboard">
          <h1 id="heading">Dashboard</h1>
          <button id="logout" name="logout" onClick={props.handleClick}>Logout</button>
        </div>
      </div>
    )
}

export default UserDashboard