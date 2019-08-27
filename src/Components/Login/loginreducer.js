
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
  technicians: [

  ]
}

export const loginReducer = (state = loginInitialState, action) => {

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
    case "TECHNICIAN_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        technicians: [...state.technicians,
        {
          username: action.payload.username,
          password: action.payload.password
        }]
      }

    case "TECHNICIAN_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        token: localStorage.setItem("token", "technicianLoggedIn")
      }

    default:
      return state
  }
}
