import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from 'src/environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';
import {  DataGerencia } from "../core/api/gerencia.module";
@Injectable({
  providedIn: 'root'
})
export class DataGerenciaService {
  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };
  constructor(private http: HttpClient) { }


  // funcion para obtner de las  gerencias 
  GetDataRole() : Observable<DataGerencia> {
    const url = `${this.baseUrl}/gerencia`;
    return this.http.get<DataGerencia>(url, this.httpOptions)
  }
}
