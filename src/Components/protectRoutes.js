import React from "react"
import { Redirect, Route } from "react-router-dom"

class ProtectRoutes extends React.Component {
  render() {
    if (localStorage.getItem("token")) {
      //....................................try render

      return <Route path={this.props.path} component={this.props.component} />
    }
    else {
      return <Redirect to="/"></Redirect>
    }
  }
}


export default ProtectRoutes