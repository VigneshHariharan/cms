import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./reduxManager"
import ProtectRoutes from './protectRoutes';

import LoginPage from "./Login/loginpage"
import Dashboard from "./Dashboard/Dashboard"
import ComplaintForm from "./Dashboard/complaintForm"


export default class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Provider store={store}>
              <Route exact path="/" component={LoginPage}></Route>
              <ProtectRoutes exact path="/dashboard/" component={Dashboard} />
              <ProtectRoutes exact path="/dashboard/complaintform/" component={ComplaintForm} />
              {/* <Route exact path="*" component={() => <h1>Different Page</h1>} /> */}
            </Provider>
          </Switch>
        </Router>
      </div >
    )
  }
}
