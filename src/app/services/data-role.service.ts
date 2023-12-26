import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from 'src/environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';

// importacion de modelocion de datos
import { RolGeneralData, RolSetData, RolStatus, RolPutData, UserData } from "./../demo/api/datarole.module";
@Injectable({
  providedIn: 'root'
})
export class DataRoleService {

  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };
  constructor(private http: HttpClient) { }

  // funcion para obtner los roles registrados 
  GetDataRole() : Observable<RolGeneralData> {
    const url = `${this.baseUrl}/usuario/roles`;
    return this.http.get<RolGeneralData>(url, this.httpOptions)
  }

  PostSetDataRol(data : RolSetData) : Observable<RolSetData>{
    const url = `${this.baseUrl}/usuario/rol/registro`;
    return this.http.post<RolSetData>(url, data, this.httpOptions)
  }

  // este api debe ser revisador por el dev backend
  PutStatusRole(data : RolStatus) : Observable<RolStatus>{
    const url = `${this.baseUrl}/usuario/rol/estado`;
    return this.http.put<RolStatus>(url, data, this.httpOptions)
  }


  PutDataRole(data : RolPutData) : Observable<RolPutData>{
    const url = `${this.baseUrl}/usuario/rol/nombre`;
    return this.http.put<RolPutData>(url, data, this.httpOptions)
  }

  GetUserList() : Observable<UserData>{
    const url = `${this.baseUrl}/usuario/cuentas-usuario`;
    return this.http.get<UserData>(url, this.httpOptions)
  }

}
