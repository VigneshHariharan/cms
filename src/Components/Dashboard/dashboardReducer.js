
const complaintInitialState = {
  form: {
    block: "",
    floor: "",
    systemNumber: 0,
    description: "",
    technician: '',
    completeStatus: 'In progress',
    assignStatus: '',
    assignedTechnician: '',
  },
  //complaints not working
  complaints: localStorage.getItem("complaints"),
}


export const complaintReducer = (state = complaintInitialState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      if (!localStorage.getItem("complaints")) {
        state.complaints = []
      }
      localStorage.setItem("complaints", JSON.stringify([...state.complaints, action.payload]))
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }

    case 'ASSIGN_TECHNICIAN':
      state.complaints[action.payload.index].technician = action.payload.technician
      state.complaints[action.payload.index].assignedTechnician = action.payload.technician
      localStorage.setItem("assign", true)
      state.complaints[action.payload.index].assignStatus = localStorage.getItem("assign")
      localStorage.setItem('complaints', JSON.stringify(state.complaints))
      return {
        ...state, complaints: JSON.parse(localStorage.getItem("complaints"))
      }

    case 'COMPLETED_STATUS':
      state.complaints[action.payload.index].completeStatus = 'Completed'
      localStorage.setItem('complaints', JSON.stringify(state.complaints))
      return {
        ...state, complaints: JSON.parse(localStorage.getItem("complaints"))
      }

    case "USER_LOGOUT":
      localStorage.removeItem("usernameOfUser")
      localStorage.removeItem("passwordOfUser")
      localStorage.removeItem("userToken")
      return { ...state }

    case "TECHNICIAN_LOGOUT":
      localStorage.removeItem("usernameOfTechnician")
      localStorage.removeItem("passwordOfTechnician")
      localStorage.removeItem("technicianToken")
      return { ...state }

    case "ADMIN_LOGOUT":
      localStorage.removeItem("usernameOfAdmin")
      localStorage.removeItem("passwordOfAdmin")
      localStorage.removeItem("adminToken")
      return { ...state }

    default:
      if (!localStorage.getItem("complaints")) {
        return { ...state, complaints: [] }
      }
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }
  }
}
