import { createStore, compose, combineReducers } from "redux"

const loginInitialState = {
  username: "",
  password: "",
  token: localStorage.getItem('token'),
  users: [
    {
      username: "vigneshph",
      password: "Pass1strong"
    },
    {
      username: "watercans",
      password: "Regexp33"
    }
  ],
  admin: [{
    username: "adminiam",
    password: "AdminPass1"
  }],
  technicians: [

  ]
}

const loginReducer = (state = loginInitialState, action) => {

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        token: localStorage.setItem("token", "loggedIn")
      }

    case "ADMIN_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        token: localStorage.setItem("token", "adminLoggedIn")
      }

    default:
      return state
  }
}

const complaintInitialState = {
  form: {
    block: "",
    floor: "",
    systemNumber: 0,
    description: "",
  },
  //complaints not working
  complaints: [],
}


const complaintReducer = (state = complaintInitialState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      if (!localStorage.getItem("complaints")) {
        state.complaints = []
      }
      localStorage.setItem("complaints", JSON.stringify([...state.complaints, action.payload]))
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }

    default:
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }

  }
}

const rootReducer = combineReducers({
  login: loginReducer,
  complaint: complaintReducer
})

const store = createStore(rootReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store