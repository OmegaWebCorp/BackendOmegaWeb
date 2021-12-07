import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('¡Perfecto, conexión exitosa!');
    })
    .catch((e) => {
      console.error('Algo salió mal conectando a la BD', e);
    });
};

export default conectarBD;
