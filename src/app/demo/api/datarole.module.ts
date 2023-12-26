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

export interface UserData {
    id_usuario: number;
    usuario: string;
    identificacion: number;
    nombre: string;
    apellidos: string;
    correo: string;
    id_rol: number;
    rol: number;
    estado: number;
}