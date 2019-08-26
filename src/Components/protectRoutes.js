import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

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


const mapStateToProps = (state) => {
  return {
    token: state.login.token
  }
}

export default connect(mapStateToProps)(ProtectRoutes)