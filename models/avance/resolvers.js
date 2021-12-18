import { ModeloAvance } from './avance.js';
import { filterAvancesByProject } from './filters.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      return filterAvancesByProject(args.project, avances);
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
    crearObservacionAvance: async (parents, args) => {
      const avanceActualizado = ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          $push: { observaciones: args.observaciones }
        }
      );
      return avanceActualizado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          fecha: args.fecha,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        },
        { new: true }
      );

      return avanceEditado;
    }
  },
};

export { resolversAvance };
