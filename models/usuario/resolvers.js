import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';
import { InscriptionModel } from '../inscripcion/inscripcion.js';
import { filterUsersByRole } from './filters.js'
import { isAuthorized, isAuthorizedAdminLeader } from '../../utils/authorization.js';
//import { usuario_sample } from "../../documents/usuario_sample";

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return InscriptionModel.find({ estudiante: parent._id });
    },
  },
  Query: {

    Usuarios: async (parent, args, context) => {
      const { userData } = context
      isAuthorized(context)
      let usuarios = await UserModel.find({ ...args.filtro });
      usuarios = filterUsersByRole(usuarios, userData.rol)
      return usuarios;

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
      isAuthorizedAdminLeader(context)
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
    editarPerfil: async (parent, args, context) => {
      const { userData } = context
      isAuthorized(context)
      if (userData._id !== args._id) throw new Error('Operacion prohibida')
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );

      return usuarioEditado;
    }
  },
};

export { resolversUsuario };
