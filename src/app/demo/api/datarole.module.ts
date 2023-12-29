export interface RolGeneralData {
    id: number;
    tipo: string;
    estado: number;
    fechasistema: any;
}


export interface RolSetData {
    nombreRol: string;
    menus?: any;
}

export interface RolStatus {
    idRol: number,
    estado: number
}

export interface UserStatus {
    idUsuario: number,
    idEstado: string
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

export interface UserDataRegister {
    
    nombres: string;
    apellidos: string;
    identificacion: string;
    idRol: number;
    correo: string;
    idProyecto: any;
}


export interface UserDataEdit {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    identificacion: string;
    idRol: number;
    correo: string;
    idProyecto: any;
}

export interface DataProyect {
    nombre: string,
    id: string
}