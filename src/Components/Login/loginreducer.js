

const loginInitialState = {
  userLogin: {
    username: localStorage.getItem("usernameOfUser"),
    password: localStorage.getItem("passwordOfUser"),
    token: localStorage.getItem('userToken') ? localStorage.getItem("userToken") : "",
  },
  adminLogin: {
    username: localStorage.getItem("usernameOfAdmin"),
    password: localStorage.getItem("passwordOfAdmin"),
    token: localStorage.getItem('adminToken') ? localStorage.getItem("adminToken") : "",
  },
  technicianLogin: {
    username: localStorage.getItem("usernameOfTechnician"),
    password: localStorage.getItem("passwordOfTechnician"),
    token: localStorage.getItem('technicianToken') ? localStorage.getItem("technicianToken") : "",
  },
  loggedIn: "",
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
      localStorage.setItem('usernameOfUser', action.payload.username)
      localStorage.setItem('passwordOfUser', action.payload.password)
      localStorage.setItem("userToken", "loggedIn")
      localStorage.setItem("token", 'loggedIn')
      return {
        ...state, userLogin: {
          username: localStorage.getItem("usernameOfUser"),
          password: localStorage.getItem("passwordOfUser"),
          token: localStorage.getItem("userToken"),
        },
        loggedIn: "user"
      }

    case "ADMIN_LOGIN":
      localStorage.setItem('usernameOfAdmin', action.payload.username)
      localStorage.setItem('passwordOfAdmin', action.payload.password)
      localStorage.setItem("adminToken", 'adminLoggedIn')
      localStorage.setItem("token", 'adminLoggedIn')
      return {
        ...state, adminLogin: {
          username: localStorage.getItem("usernameOfAdmin"),
          password: localStorage.getItem("passwordOfAdmin"),
          token: localStorage.setItem("adminToken", "adminLoggedIn"),
        },
        loggedIn: "admin"
      }

    case "TECHNICIAN_LOGIN":
      localStorage.setItem('usernameOfTechnician', action.payload.username)
      localStorage.setItem('passwordOfTechnician', action.payload.password)
      localStorage.setItem("technicianToken", 'technicianLoggedIn')
      localStorage.setItem("token", 'technicianLoggedIn')
      return {
        ...state,
        technicianLogin: {
          username: localStorage.getItem("usernameOfTechnician"),
          password: localStorage.getItem("passwordOfTechnician"),
          token: localStorage.setItem("technicianToken", "technicianLoggedIn"),
        }
        , loggedIn: "technician"
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
      return { ...state, loggedIn: "" }
  }
}
