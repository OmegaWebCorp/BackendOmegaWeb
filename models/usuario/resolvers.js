import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';
import { InscriptionModel } from '../inscripcion/inscripcion.js';
//import { usuario_sample } from "../../documents/usuario_sample";

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return InscriptionModel.find({ estudiante: parent._id });
    },
  },
  Query: {

    Usuarios: async (parent, args, context) => {
      if ('userData' in context && 'rol' in context.userData && context.userData.rol === 'ADMINISTRADOR') {
        const usuarios = await UserModel.find({ ...args.filtro });
        return usuarios;
      } else {
        throw new Error("Operacion prohibida")
      }
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
  },
    
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args, context) => {
      const esAdmin = 'userData' in context && 'rol' in context.userData && context.userData.rol === 'ADMINISTRADOR'
      const esEstudianteOLider = 'userData' in context && 'rol' in context.userData && (context.userData.rol === 'LIDER' || context.userData.rol === 'ESTUDIANTE')
      if (!esAdmin && !esEstudianteOLider) throw new Error('Operacion prohibida')
      if (esEstudianteOLider && (args._id !== context.userData._id)) throw new Error('Operacion prohibida')
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
