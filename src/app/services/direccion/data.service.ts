import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env} from '../../../environments/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';
import { DataDireccion, DataEdit, DataList, DataSend, DataStatus } from "src/app/core/api/direccion.module";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend nest
  private baseUrlPy = env.endPointPy; // Reemplaza con la URL de tu backend
  private module:string  = '/unidad-organizativa'

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };
  constructor(private http: HttpClient) { }


  // funcion para obtner de las  gerencias
  GetData() : Observable<DataDireccion> {
    const url = `${this.baseUrl}${this.module}`;
    return this.http.get<DataDireccion>(url, this.httpOptions);
  }

  GetDataList() : Observable<DataList>{
    const url = `${this.baseUrl}${this.module}/gerencia`;
    return this.http.get<DataList>(url, this.httpOptions);
  }

  PostData(Data: DataSend) : Observable<DataSend>{
    const url = `${this.baseUrl}${this.module}/registrar`;
    return this.http.post<DataSend>(url,Data, this.httpOptions);
  }

  PutData(Data: DataEdit) : Observable<DataEdit> {
    const url = `${this.baseUrl}${this.module}/actualizar`;
    return this.http.put<DataEdit>(url,Data, this.httpOptions);
  }

  PutStatus(Data: DataStatus) : Observable<DataStatus> {
    console.log(Data);

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
