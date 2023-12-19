import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from 'src/environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';

// importacion de modelocion de datos
import { UserRoles } from "./../demo/api/datarole.module";
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
  GetDataRole(): Observable<UserRoles> {
    const url = `${this.baseUrl}/usuario/roles`;
    return this.http.get<UserRoles>(url, this.httpOptions)
  }


}
