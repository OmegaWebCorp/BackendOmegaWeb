

const filterUsersByRole = (users, role) => {
    if (role == 'LIDER') {
        return users.filter(user => user.rol == 'ESTUDIANTE')
    } else if (role == 'ESTUDIANTE') {
        return []
    }
    else {
        return users
    }
}

export { filterUsersByRole }

