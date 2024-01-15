export interface Data {
    id: any;
    cliente: any;
    NIT: any;
    fecha_creacion: any;
    estado: any;
}


export interface DataStatus {
    id: any;
    estado: any;
}

export interface DataSend {
    identificacion: string;
    clienteIdErp: string;
    razonSocial: any;
}

export interface DataEdit {
    id: any;
    identificacion: number;
    clienteIdErp: any;
    razonSocial: any;
}
