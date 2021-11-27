import {
    connect
} from 'mongoose';

const conectarBD = async () => {
    return await connect(
        ''
    ).then(() => {
        console.log('Conexión Exitosa');
    }).catch((e) => {
        console.error('Error conectado la BD' + e);
    });
};

export default conectarBD;
