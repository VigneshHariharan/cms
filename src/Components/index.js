import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./reduxManager"
// import ProtectRoutes from './protectRoutes';

import LoginPage from "./Login/loginpage"
import Dashboard from "./Dashboard/Dashboard"
import AdminDashboard from "./Dashboard/adminDashboard"
import TechnicianDashboard from "./Dashboard/technicianDashboard"
import ComplaintForm from "./Dashboard/complaintForm"



export default class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <Switch>
              <Route exact path="/" component={LoginPage}></Route>
              <Route exact path="/dashboard/" component={Dashboard} />
              <Route exact path="/admindashboard/" component={AdminDashboard} />
              <Route exact path="/techniciandashboard/" component={TechnicianDashboard} />
              <Route exact path="/dashboard/complaintform/" component={ComplaintForm} />
              <Route exact path="/admindashboard/complaintform/" component={ComplaintForm} />
              <Route exact path="*" component={() => <h1>Different Page</h1>} />
            </Switch>
          </Provider>
        </Router>
      </div >
    )
  }
}
