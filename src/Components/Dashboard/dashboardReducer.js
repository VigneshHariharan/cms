
const complaintInitialState = {
  form: {
    block: "",
    floor: "",
    systemNumber: 0,
    description: "",
    technician: ''
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
      // console.log(action.payload.index, state.complaints[action.payload.index].technician, action.payload.technician)
      state.complaints[action.payload.index].technician = action.payload.technician
      localStorage.setItem('complaints', JSON.stringify(state.complaints))
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }

    default:
      if (!localStorage.getItem("complaints")) {
        return { ...state, complaints: [] }
      }
      return { ...state, complaints: JSON.parse(localStorage.getItem("complaints")) }
  }
}
