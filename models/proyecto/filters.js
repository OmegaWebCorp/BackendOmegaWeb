

const filterProjectsByRole = (proyects, role, userId) => {
    if (role == 'LIDER') {
        return proyects.filter(proyect => proyect.lider._id.toString() == userId)
    } else if (role == 'ESTUDIANTE') {
        return proyects.filter(proyect => proyect.estado == 'ACTIVO')
    }
    else {
        return proyects
    }
}

export { filterProjectsByRole }

