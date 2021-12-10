import { Schema, model } from 'mongoose';

const userSchema = new Schema({
 
    correo: {
        type: String,
        required:true,
        unique:true
      },
      identificacion: {
        type: String,
        required:true,
        unique:true
      },
      nombre: {
        type: String,
        required:true,
        unique:true
      },
      apellido: {
        type: String,
        required:true,
        unique:true
      }
});
//Nombre de la tabla de BD
const UserModel=  model ('pr_usuarios', userSchema);

export  {UserModel};