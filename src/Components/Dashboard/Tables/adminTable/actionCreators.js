export const assignTechnician = (technicianName, index) => {
  return {
    type: 'ASSIGN_TECHNICIAN',
    payload: { technician: technicianName, index }
  }
}

export const approveStatus = (index) => {
  return {
    type: 'APPROVED_STATUS',
    payload: { index }
  }
}