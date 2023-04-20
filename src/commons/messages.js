export const MESSAGES = {
  'NMP.REPORTES.200': {
    template: 'SUCCESS',
    description: 'Se ha realizado correctamente la operación.'
  },
  'NMP.REPORTES.201': {
    template: 'CREATED',
    description: 'Se ha realizado correctamente la operación.'
  },
  'NMP.REPORTES.400': {
    template: '<%= message %>',
    description: 'La solicitud no se encuentra bien formada.'
  },
  'NMP.REPORTES.404': {
    template: 'NOT FOUND',
    description: 'Recurso no encontrado.'
  },
  'NMP.REPORTES.409': {
    template: 'CONFLICT - <%= text %>',
    description: 'Ha ocurrido un conflicto de datos.'
  },
  'NMP.REPORTES.500': {
    template: 'INTERNAL SERVER ERROR - <%= text %>',
    description: 'Error en el servidor.'
  },
  'NMP.REPORTES.502': {
    template: 'BAD GATEWAY - <%= text %>',
    description: 'Error puerta de enlace incorrecta.'
  },
  'NMP.REPORTES.001': {
    template: '<%= message %>',
    description: 'Hay errores en la peticion.'
  }
}

export default null
