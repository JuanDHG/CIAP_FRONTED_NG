import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from 'src/environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';

// importacion de modelocion de datos
import { RolGeneralData, RolSetData, RolStatus, RolPutData, UserData , UserDataRegister, UserDataEdit, UserStatus, DataRolePermison} from "../../core/api/datarole.module";
@Injectable({
  providedIn: 'root'
})
export class DataRoleService {

  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend
  private module:string  = '/usuario'


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };
  constructor(private http: HttpClient) { }

  // funcion para obtner los roles registrados
  GetDataRole() : Observable<RolGeneralData> {
    const url = `${this.baseUrl}${this.module}/roles`;
    return this.http.get<RolGeneralData>(url, this.httpOptions)
  }

  PostSetDataRol(data : RolSetData) : Observable<RolSetData>{
    const url = `${this.baseUrl}${this.module}/rol/registro`;
    return this.http.post<RolSetData>(url, data, this.httpOptions)
  }

  // este api debe ser revisador por el dev backend
  PutStatusRole(data : RolStatus) : Observable<RolStatus>{
    const url = `${this.baseUrl}${this.module}/rol/estado`;
    return this.http.put<RolStatus>(url, data, this.httpOptions)
  }


  PutStatusRolUser(data : UserStatus) : Observable<UserStatus>{
    const url = `${this.baseUrl}${this.module}/actualizar/cuenta`;
    return this.http.put<UserStatus>(url, data, this.httpOptions)
  }


  PutDataRole(data : RolPutData) : Observable<RolPutData>{
    const url = `${this.baseUrl}${this.module}/rol/nombre`;
    return this.http.put<RolPutData>(url, data, this.httpOptions)
  }

  GetUserList() : Observable<UserData>{
    const url = `${this.baseUrl}${this.module}/cuentas-usuario`;
    return this.http.get<UserData>(url, this.httpOptions)
  }


  GetUserProyect(id: number) {
    // La URL para incluir el parámetro 'id'
    const url = `${this.baseUrl}${this.module}/proyectos-de-usuario?id=${id}`;
    return this.http.get(url, this.httpOptions);
  }

  GetUserProyectAll() {
    const url = `${this.baseUrl}${this.module}/proyectos`;
    return this.http.get(url, this.httpOptions);
  }

  PostAddUser(data: UserDataRegister) : Observable<UserDataRegister>{
    const url = `${this.baseUrl}${this.module}/registrar`;
    return this.http.post<UserDataRegister>(url, data, this.httpOptions)
  }

  PutEditUSer (data : UserDataEdit) : Observable<UserDataEdit>{
    const url = `${this.baseUrl}${this.module}/actualizar`;
    return this.http.put<UserDataEdit>(url, data, this.httpOptions)

  }

  SetMenus() {
    const url = `${this.baseUrl}${this.module}/rol/menu`;
    return this.http.get(url, this.httpOptions);
  }

  GetMenus(id: number) {
    // La URL para incluir el parámetro 'id'
    const url = `${this.baseUrl}${this.module}/rol/permisos?id=${id}`;
    return this.http.get(url, this.httpOptions);
  }

  PostPutPermison(data: DataRolePermison) : Observable<DataRolePermison>{
    const url = `${this.baseUrl}${this.module}/rol/permisos`;
    return this.http.post<DataRolePermison>(url, data, this.httpOptions)
  }

}
