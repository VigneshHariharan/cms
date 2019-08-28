
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
    username: "adminiams",
    password: "AdminPass1"
  }],
  technicians: localStorage.getItem("technicians") ? JSON.parse(localStorage.getItem("technicians")) : []

}

export const loginReducer = (state = loginInitialState, action) => {

  switch (action.type) {
    // Login checks in their respective storage login for users,admin,technicians
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

    case "TECHNICIAN_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        token: localStorage.setItem("token", "technicianLoggedIn")
      }

    // reducer to add new technicians
    case "ADD_TECHNICIAN":
      const technician = {
        username: action.payload.username,
        password: action.payload.password
      }
      localStorage.setItem("technicians",
        JSON.stringify([...state.technicians, technician]))
      return {
        ...state,
        technicians: JSON.parse(localStorage.getItem("technicians")),
      }

    default:
      return state
  }
}
