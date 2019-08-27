import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import UserDashboard from "./userDashboard"



class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleClick = (e) => {
    this.setState({ show: !this.state.show })
    if (e.target.name === "logout") {
      localStorage.removeItem("token")
    }
  }

  render() {
    if (localStorage.getItem("token") === "loggedIn") {
      return (
        <div>
          <UserDashboard handleClick={this.handleClick}
            complaints={this.state.complaints}
            show={this.state.show}
          />
      
        </div>
      )
    }
    else if (localStorage.getItem("token") === "adminLoggedIn") {
      return (
        <div>
           <UserDashboard handleClick={this.handleClick}
            complaints={this.state.complaints}
            show={this.state.show}
          />
          
        </div>
      )

    }
    else {
      return <Redirect to="/"></Redirect>
    }

  }
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//     shouldLogout: () => dispatch({
//       type: "LOGOUT"
//     })
//   }
// }
export default Dashboard