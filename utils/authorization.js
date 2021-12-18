'use strict'
const ALL_ROLES = ['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE']
const ADMIN_LIDER_ROLES = ['ADMINISTRADOR', 'LIDER']


const isAuthorized = (context) => {
    const authorized = context.userData && context.userData.rol && ALL_ROLES.includes(context.userData.rol)
    if (!authorized) {
        throw new Error('Operacion prohibida')
    }
}

const isAuthorizedAdminLeader = (context) => {
    const authorized = context.userData && context.userData.rol && ADMIN_LIDER_ROLES.includes(context.userData.rol)
    if (!authorized) {
        throw new Error('Operacion prohibida')
    }
}

export { isAuthorized , isAuthorizedAdminLeader}