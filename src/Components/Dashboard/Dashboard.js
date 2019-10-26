import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import UserDashboard from "./userDashboard"
import Form from './technicianForm/form'

import "./dashboard.css"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      visible: false,
    }
  }

  handleClick = (e) => {
    this.setState({ show: !this.state.show })
    if (e.target.name === "logout") {
      localStorage.removeItem("token")
    }
    else if (e.target.name === "form") {
      this.setState({ visible: !this.state.visible })
    }
  }

  render() {
    switch (localStorage.getItem("token")) {
      case "loggedIn":
        return (
          <div>
            <UserDashboard handleClick={this.handleClick}
              complaints={this.state.complaints}
              show={this.state.show}
            />
          </div>
        )
      case "adminLoggedIn":
        return (
          <div>
            <UserDashboard handleClick={this.handleClick}
              complaints={this.state.complaints}
              show={this.state.show}
            />
            <br /><br />
            <button id="Add-a-Technican" name="form" onClick={this.handleClick}>Add a Technician</button>
            {this.state.visible ? <Form /> : ''}

          </div>
        )
      case "technicianLoggedIn":
        return (<div>
          <h1>Technician</h1>
          <UserDashboard handleClick={this.handleClick}
            complaints={this.state.complaints}
            show={this.state.show}
          />
        </div>
        )

      default:
        return <Redirect to="/"></Redirect>
    }

    // if (localStorage.getItem("token") === "loggedIn") {
    //   return (
    //     <div>
    //       <UserDashboard handleClick={this.handleClick}
    //         complaints={this.state.complaints}
    //         show={this.state.show}
    //       />
    //     </div>
    //   )
    // }
    // else if (localStorage.getItem("token") === "adminLoggedIn") {
    //   return (
    //     <div>
    //       <UserDashboard handleClick={this.handleClick}
    //         complaints={this.state.complaints}
    //         show={this.state.show}
    //       />
    //       <br /><br />
    //       <button name="form" onClick={this.handleClick}>Add a Technician</button>
    //       {this.state.visible ? <Form /> : ''}

    //     </div>
    //   )
    // }
    // else if (localStorage.getItem("token") === "technicianLoggedIn") {
    //   return (<div>
    //     <h1>Technician</h1>
    //     <UserDashboard handleClick={this.handleClick}
    //       complaints={this.state.complaints}
    //       show={this.state.show}
    //     />
    //   </div>
    //   )
    // }
    // else {
    //   return <Redirect to="/"></Redirect>
    // }

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