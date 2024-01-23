export interface Data {
    iDproyecto: string;
    nombreProyecto: string;
    contrato: string;
    objeto: string;
    idEtado: number;
    Estado: string;
    clienteNombre: string;
    nitClente: number;
    idGerencia: number;
    Gerencia: string;
    idDireccion: number;
    direccion: string;
    idUsuario: number;
    gerente: string;
    fecha_inicio: string;
    fecha_final: string;
    duracion: number;
    valor_inicial: number;
    valor_final: number;
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
