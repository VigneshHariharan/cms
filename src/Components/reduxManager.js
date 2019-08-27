import { createStore, compose, combineReducers } from "redux"
import { loginReducer } from "./Login/loginreducer"
import { complaintReducer } from "./Dashboard/dashboardReducer"


const rootReducer = combineReducers({
  login: loginReducer,
  complaint: complaintReducer
})

const store = createStore(rootReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store