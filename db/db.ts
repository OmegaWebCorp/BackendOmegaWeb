import {
    connect
} from 'mongoose';

const conectarBD = async () => {
    return await connect(
        'mongodb+srv://admin:axppEepj4IuwvyKN@proyectomintic.m7qai.mongodb.net/MinTic4?retryWrites=true&w=majority'
    ).then(() => {
        console.log('Conexión Exitosa');
    }).catch((e) => {
        console.error('Error conectado la BD' + e);
    });
};

export default conectarBD;
