import conectarBD from './db/db';
import { UserModel } from './models/users';

const main = async () => {
    await conectarBD();


    // await UserModel.create({
    //     correo: 'prueba@prueba.com',
    //     identificacion:'123456',
    //     nombre:'prueba',
    //     apellido:'prueba   apellido'
    // }).then((u)=>{
    //     console.log('Usuario Insertado', u);

    // }).catch((e)=>{
    //     console.log('Error insertando usuario', e);

    // });

    await UserModel.find()
        .then((u) => {
            console.log('Consulta exitosa todos los usuarios', u);

        }).catch((e) => {
            console.log('error consultando usaurios', e);
        });
};
main();
