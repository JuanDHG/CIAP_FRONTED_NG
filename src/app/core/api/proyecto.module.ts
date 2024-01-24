export interface Data {
    Estado: any;
    Gerencia: any;
    clienteNombre: any;
    contrato: any;
    direccion: any;
    duracion: any;
    fecha_final: any;
    fecha_inicio: any;
    gerente: any;
    iDproyecto: any;
    idDireccion: any;
    idEtado: any;
    idGerencia: any;
    idUsuario: any;
    nitClente: any;
    nombreProyecto: any;
    objeto: any;
    valor_final: any;
    valor_inicial: any;
    estadoProyecto?: any;

}

export interface DataStatus {
    idCeco: any;
    estadoCeco: any;
}

export interface DataSend {
    idCecoErp:any
    nombre:any
}

export interface DataEdit {
    id:any;
    idCecoErp:any;
    nombre:any;
}
