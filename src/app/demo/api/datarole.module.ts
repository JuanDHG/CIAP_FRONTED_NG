export interface RolGeneralData {
    id:any;
    tipo:string;
    estado: number;
    fechasistema: any;
}


export interface RolSetData {
    nombreRol: string;
}

export interface RolStatus {
    idRol: number,
    estado: number
}


export interface RolPutData {
    idRol: number,
    nombreRol: any
}