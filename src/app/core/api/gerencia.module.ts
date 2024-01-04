export interface DataGerencia {
    idGerencia: number, 
    gerencia: string,
    responsable: string
    fecha_creacion: any
}

export interface DataResponsabe {
    	
    id:number;
    nombreUsuario:string;
}

export interface DataSendGerencia {
    
    idGerenciaErp: string,
    nombre: string,
    idResponsable: number
}