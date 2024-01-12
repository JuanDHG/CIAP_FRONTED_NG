export interface DataDireccion {
    idDireccion: any;
    direccion: any;
    idGerencia: any;
    gerencia: any;
    fecha_crearcion: any;
    estado: any;
}

export interface DataList {
    id: number;
    nombreGerencia: string;
}

export interface DataStatus {
    idDireccion: any;
    estadoDireccion: any;
}

export interface DataSend {
    idDireccionErp: string;
    nombre: string;
    idGerencia: number;
}

export interface DataEdit {
    id:any;
    idDireccionErp:any;
    nombre:any;
    idGerencia:any;
}
