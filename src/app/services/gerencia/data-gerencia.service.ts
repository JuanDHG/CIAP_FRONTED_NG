import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from 'src/environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';
import {  DataEditGerencia, DataGerencia,DataResponsabe, DataSendGerencia, DataStatus } from "../../core/api/gerencia.module";
@Injectable({
  providedIn: 'root'
})
export class DataGerenciaService {
  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend nest
  private baseUrlPy = env.endPointPy; // Reemplaza con la URL de tu backend
  private module:string = '/gerencia';



  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };
  constructor(private http: HttpClient) { }


  // funcion para obtner de las  gerencias
  GetDataRole() : Observable<DataGerencia> {
    const url = `${this.baseUrl}${this.module}`;
    return this.http.get<DataGerencia>(url, this.httpOptions);
  }

  GetDataResponsableAct() : Observable<DataResponsabe>{
    const url = `${this.baseUrl}${this.module}/responsables`;
    return this.http.get<DataResponsabe>(url, this.httpOptions);
  }

  PostDataGerencia(Data: DataSendGerencia) : Observable<DataSendGerencia>{
    const url = `${this.baseUrl}${this.module}/registrar`;
    return this.http.post<DataSendGerencia>(url,Data, this.httpOptions);
  }

  PutDataGerencia(Data: DataEditGerencia) : Observable<DataEditGerencia> {
    const url = `${this.baseUrl}${this.module}/actualizar`;
    return this.http.put<DataEditGerencia>(url,Data, this.httpOptions);
  }

  PutStatus(Data: DataStatus) : Observable<DataStatus> {
    const url = `${this.baseUrl}${this.module}/actualizar-estado`;
    return this.http.put<DataStatus>(url,Data, this.httpOptions);
  }


  descargarExcel(): Observable<Blob> {
    const url = 'assets/documents/templates/Plantilla de cargue - Parametros.xlsx';
    return this.http.get(url, { responseType: 'blob' });
  }

  PostDataGerenciaUpload(file: any): Observable<any> {
    const url = `${this.baseUrlPy}/parametros/gerencia/subir-archivo`;
    return this.http.post<any>(url, file, this.httpOptions).pipe(
      catchError(error => {
        console.error('Error al enviar el archivo:', error);
        // Puedes manejar errores aquí, por ejemplo, enviando un objeto con información sobre el error
        return throwError({ error: 'Ocurrió un error al subir el archivo.' });
      })
    );
  }


}
