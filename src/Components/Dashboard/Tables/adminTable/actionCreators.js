export const assignTechnician = (technicianName, index) => {
  return {
    type: 'ASSIGN_TECHNICIAN',
    payload: { technician: technicianName, index }
  }
}