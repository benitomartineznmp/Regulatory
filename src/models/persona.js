/* eslint-disable camelcase */
class People {
  // Modulo exportado
  constructor(
    NOMBRE_PARTNER,
    APELLIDO_PATERNO,
    APELLIDO_MATERNO,
    RFC,
    TIPO_CLIENTE,
    FECHA_NACIMIENTO,
    CURP,
    GENERO_ACRED,
    ACT_ECONOMICA,
    TIPO_ACRED_REL,
    PERS_JURIDICA,
    GRP_RIESGO_COM,
    CALLE,
    NUM_EXT,
    COLONIA,
    CODIGO_POSTAL,
    LOCALIDAD,
    HITSIC,
    NACIONALIDAD,
    INGRESO_MENSUAL,
    NUM_TRABAJADORES,
    TIPO_ZONA,
    MANDT,
    FECHA_EJEC,
    PARTNER,
    MUNICIPIO
  ) {
    this.NOMBRE_PARTNER = NOMBRE_PARTNER
    this.APELLIDO_PATERNO = APELLIDO_PATERNO
    this.APELLIDO_MATERNO = APELLIDO_MATERNO
    this.RFC = RFC
    this.TIPO_CLIENTE = TIPO_CLIENTE
    this.FECHA_NACIMIENTO = FECHA_NACIMIENTO
    this.CURP = CURP
    this.GENERO_ACRED = GENERO_ACRED
    this.ACT_ECONOMICA = ACT_ECONOMICA
    this.TIPO_ACRED_REL = TIPO_ACRED_REL
    this.PERS_JURIDICA = PERS_JURIDICA
    this.GRP_RIESGO_COM = GRP_RIESGO_COM
    this.CALLE = CALLE
    this.NUM_EXT = NUM_EXT
    this.COLONIA = COLONIA
    this.CODIGO_POSTAL = CODIGO_POSTAL
    this.LOCALIDAD = LOCALIDAD
    this.HITSIC = HITSIC
    this.NACIONALIDAD = NACIONALIDAD
    this.INGRESO_MENSUAL = INGRESO_MENSUAL
    this.NUM_TRABAJADORES = NUM_TRABAJADORES
    this.TIPO_ZONA = TIPO_ZONA
    this.MANDT = MANDT
    this.FECHA_EJEC = FECHA_EJEC
    this.PARTNER = PARTNER
    this.MUNICIPIO = MUNICIPIO
  }

  getMUNICIPIO() {
    return this.MUNICIPIO
  }

  setMUNICIPIO(newMUNICIPIO) {
    this.MUNICIPIO = newMUNICIPIO
  }

  getPARTNER() {
    return this.PARTNER
  }

  setPARTNER(newPARTNER) {
    this.PARTNER = newPARTNER
  }

  getFECHA_EJEC() {
    return this.FECHA_EJEC
  }

  setFECHA_EJEC(newFECHA_EJEC) {
    this.FECHA_EJEC = newFECHA_EJEC
  }

  getMANDT() {
    return this.MANDT
  }

  setMANDT(newMANDT) {
    this.MANDT = newMANDT
  }

  getTIPO_ZONA() {
    return this.TIPO_ZONA
  }

  setTIPO_ZONA(newTIPO_ZONA) {
    this.TIPO_ZONA = newTIPO_ZONA
  }

  getNUM_TRABAJADORES() {
    return this.NUM_TRABAJADORES
  }

  setNUM_TRABAJADORES(newNUM_TRABAJADORES) {
    this.NUM_TRABAJADORES = newNUM_TRABAJADORES
  }

  getINGRESO_MENSUAL() {
    return this.INGRESO_MENSUAL
  }

  setINGRESO_MENSUAL(newINGRESO_MENSUAL) {
    this.INGRESO_MENSUAL = newINGRESO_MENSUAL
  }

  getNACIONALIDAD() {
    return this.NACIONALIDAD
  }

  setNACIONALIDAD(newNACIONALIDAD) {
    this.NACIONALIDAD = newNACIONALIDAD
  }

  getHITSIC() {
    return this.HITSIC
  }

  setHITSIC(newHITSIC) {
    this.HITSIC = newHITSIC
  }

  getLOCALIDAD() {
    return this.LOCALIDAD
  }

  setLOCALIDAD(newLOCALIDAD) {
    this.LOCALIDAD = newLOCALIDAD
  }

  getCODIGO_POSTAL() {
    return this.CODIGO_POSTAL
  }

  setCODIGO_POSTAL(newCODIGO_POSTAL) {
    this.CODIGO_POSTAL = newCODIGO_POSTAL
  }

  getCOLONIA() {
    return this.COLONIA
  }

  setCOLONIA(newCOLONIA) {
    this.COLONIA = newCOLONIA
  }

  getNUM_EXT() {
    return this.NUM_EXT
  }

  setNUM_EXT(newNUM_EXT) {
    this.NUM_EXT = newNUM_EXT
  }

  getCALLE() {
    return this.CALLE
  }

  setCALLE(newCALLE) {
    this.CALLE = newCALLE
  }

  getGRP_RIESGO_COM() {
    return this.GRP_RIESGO_COM
  }

  setGRP_RIESGO_COM(newGRP_RIESGO_COM) {
    this.GRP_RIESGO_COM = newGRP_RIESGO_COM
  }

  getPERS_JURIDICA() {
    return this.PERS_JURIDICA
  }

  setPERS_JURIDICA(newPERS_JURIDICA) {
    this.PERS_JURIDICA = newPERS_JURIDICA
  }

  getTIPO_ACRED_REL() {
    return this.TIPO_ACRED_REL
  }

  setTIPO_ACRED_REL(newTIPO_ACRED_REL) {
    this.TIPO_ACRED_REL = newTIPO_ACRED_REL
  }

  getACT_ECONOMICA() {
    return this.ACT_ECONOMICA
  }

  setACT_ECONOMICA(newACT_ECONOMICA) {
    this.ACT_ECONOMICA = newACT_ECONOMICA
  }

  getGENERO_ACRED() {
    return this.GENERO_ACRED
  }

  setGENERO_ACRED(newGENERO_ACRED) {
    this.GENERO_ACRED = newGENERO_ACRED
  }

  getNOMBRE_PARTNER() {
    return this.NOMBRE_PARTNER
  }

  setNOMBRE_PARTNER(newNOMBRE_PARTNER) {
    this.NOMBRE_PARTNER = newNOMBRE_PARTNER
  }

  getAPELLIDO_PATERNO() {
    return this.APELLIDO_PATERNO
  }

  setAPELLIDO_PATERNO(newAPELLIDO_PATERNO) {
    this.APELLIDO_PATERNO = newAPELLIDO_PATERNO
  }

  getAPELLIDO_MATERNO() {
    return this.APELLIDO_MATERNO
  }

  setAPELLIDO_MATERNO(newAPELLIDO_MATERNO) {
    this.APELLIDO_MATERNO = newAPELLIDO_MATERNO
  }

  getRFC() {
    return this.RFC
  }

  setRFC(newRFC) {
    this.RFC = newRFC
  }

  getTIPO_CLIENTE() {
    return this.TIPO_CLIENTE
  }

  setTIPO_CLIENTE(newTIPO_CLIENTE) {
    this.TIPO_CLIENTE = newTIPO_CLIENTE
  }

  getFECHA_NACIMIENTO() {
    return this.FECHA_NACIMIENTO
  }

  setFECHA_NACIMIENTO(newFECHA_NACIMIENTO) {
    this.FECHA_NACIMIENTO = newFECHA_NACIMIENTO
  }

  getCURP() {
    return this.CURP
  }

  setCURP(newCURP) {
    this.CURP = newCURP
  }
}

export const Reportes = {
  People
}

export default null
