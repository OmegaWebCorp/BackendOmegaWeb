const filterAvancesByProject = (projectId, avances) => {
    return avances.filter(avance => avance.proyecto._id == projectId)
}

export { filterAvancesByProject }
