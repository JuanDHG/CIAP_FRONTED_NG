import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {DataEditGerencia,    DataResponsabe,    DataSendGerencia,    DataStatus,} from '../../../../../api/gerencia.module';
import { DataGerenciaService } from 'src/app/services/gerencia/data-gerencia.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.scss']
})



export class GerenciaComponent  implements OnInit {

    @ViewChild('filter') filter!: ElementRef;
    customers1: any;
    loading: boolean = true;
    isExpanded: boolean = false;
    idFrozen: boolean = false;

    display: boolean = false;
    displayEdit: boolean = false;
    displayView: boolean = false;
    displayTempl: boolean = false;

    indice: number = 0;


    responsables: DataResponsabe;
    responsable: DataResponsabe[];

    Dao: DataSendGerencia = {
        idGerenciaErp: null,
        idResponsable: null,
        nombre: null,
    };

    DaoEdit: DataEditGerencia = {
        idGerenciaErp: null,
        id: null,
        idResponsable: null,
        nombre: null,
    };
    msgs: [];

    Status: DataStatus = {
        estadoGerencia: null,
        idGerencia: null,
    };

    responsableSelectEd: DataResponsabe[] = [];

    uploadedFiles: any[] = [];

    constructor(
        private serve: DataGerenciaService,
        private messageService: MessageService,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.GetGerencias();
    }
// gerencias init
        GetGerencias(): void {
            this.serve.GetDataRole().subscribe(
                (response) => {

                    const res = response;
                    this.customers1 = res;
                    this.loading = false;

                    // lanza peticion para obterner la lista de usuarios activos con el
                    // objetivo de ser seleccionado como responsables
                    this.serve.GetDataResponsableAct().subscribe((res) => {
                        this.responsables = res;
                    });
                },
                (err) => {
                    console.error(err);
                }
            );
        }



        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal(
                (event.target as HTMLInputElement).value,
                'contains'
            );
        }
        clear(table: Table) {
            table.clear();
            this.filter.nativeElement.value = '';
        }

        onAlertMessage(t: string, sms: string, i: any): void {
            Swal.fire({
                title: t,
                text: sms,
                icon: i,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#5fbb3a',
            });
        }
        // funcion alertas del sistema metodo 1
        // this.onAlertMessage('Exito!!!', res['mensaje'], 'success'); // ejemplo

        // metodo 2 mensaje services
        // this.messageService.add({ severity: 'error', summary: error['error'].mensaje[0], });  // ejemplo
        SendEndPoind(): void {
            if (this.Dao.idGerenciaErp === null) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'ID ERP no puede irse vacio',
                });
            } else {
                if (this.Dao.nombre === null) {
                    this.messageService.add({
                        severity: 'error',
                        summary: `Debe ingresar nombre de gerencia`,
                    });
                } else {

                    var res_id: any = this.responsable?.[0];
                    this.Dao.idResponsable = res_id;

                    if (
                        this.Dao.idResponsable === null ||
                        res_id === 0 ||
                        res_id === undefined ||
                        res_id === null ||
                        res_id === ''
                    ) {
                        this.messageService.add({
                            severity: 'error',
                            summary: `Debe seleccionar un responsable de la gerencia: ${this.Dao.nombre}`,
                        });
                    } else {
                        this.serve.PostDataGerencia(this.Dao).subscribe(
                            (res) => {
                                this.onAlertMessage(
                                    'Exito!!!',
                                    res['mensaje'],
                                    'success'
                                );
                                this.display = false;
                                this.GetGerencias();
                            },
                            (err) => {
                                console.error(err);
                                this.messageService.add({
                                    severity: 'error',
                                    summary: `Error interno, intentelo nuevamente en unos minutos`,
                                });
                            }
                        );
                    }
                }
            }
        }

        // edittar
        onPutDataGErencia(Dao: any) {
            this.displayEdit = true;

            this.DaoEdit = {
                idGerenciaErp: Dao.ceco,
                idResponsable: Dao.responsable,
                id: Dao.idGerencia,
                nombre: Dao.gerencia,
            };

            const selectedResponsable: DataResponsabe = {
                id: Dao.id_responsable,
                nombreUsuario: Dao.responsable,
            };

            // Asigna un array que contiene el objeto seleccionado
            this.responsableSelectEd = [selectedResponsable];
        }

        SendEndPoindEd() {
            this.DaoEdit.idResponsable = this.responsableSelectEd[0].id;
            this.serve.PutDataGerencia(this.DaoEdit).subscribe(
                (res) => {
                    setTimeout(() => {
                        this.GetGerencias();
                        this.onAlertMessage('Exito!!!', res['mensaje'], 'success');
                        this.displayEdit = false;
                    }, 500);
                },
                (err) => {
                    console.error(err);
                    this.messageService.add({
                        severity: 'error',
                        summary: `Error interno, intentelo nuevamente en unos minutos`,
                    });
                }
            );
        }

        onViewData(Dao: any) {
            this.displayView = true;

            this.DaoEdit = {
                idGerenciaErp: Dao.ceco,
                idResponsable: Dao.responsable,
                id: Dao.idGerencia,
                nombre: Dao.gerencia,
            };

            const selectedResponsable: DataResponsabe = {
                id: Dao.id_responsable,
                nombreUsuario: Dao.responsable,
            };

            // Asigna un array que contiene el objeto seleccionado
            this.responsableSelectEd = [selectedResponsable];
        }

        //   funcion para actuliza el estado de una gerencia
        onPutStatususER(ids: number, status: number) {
            this.Status = {
                idGerencia: ids,
                estadoGerencia: status,
            };

            this.serve.PutStatus(this.Status).subscribe(
                (res) => {
                    if (res['status'] === 'ok') {
                        // this.messageService.add({severity:'success', summary:res['mensaje']});
                        this.onAlertMessage('Exito!!!', res['message'], 'success');
                        this.GetGerencias();
                    } else {
                        this.onAlertMessage('Error', res['message'], 'warning');
                        this.GetGerencias();
                    }
                },
                (err) => {
                    console.error(err);
                    this.onAlertMessage('Error', 'Error', 'warning');
                }
            );
        }


        selectedFile: File | null = null;
        values: string[] = null;
        shouldShowChips = true;

        onChipsChange() {
            // Este método se llama cuando hay cambios en el modelo de chips
            // Puedes ajustar la lógica según tus necesidades
            this.values = null;
            this.selectedFile  = null;;
        }

        onFileSelected(event: any) {
          this.selectedFile = event.target.files[0];
          this.values = [
            this.selectedFile.name
          ]
          console.log(this.selectedFile.name);

        }

        uploadFile() {
          if (this.selectedFile) {
            // Aquí puedes implementar la lógica para enviar el archivo al servidor
            console.log('Archivo seleccionado:', this.selectedFile);
            // Puedes usar servicios HttpClient para enviar el archivo al servidor
            // Ejemplo: this.http.post('url_del_servidor', formData).subscribe(response => console.log(response));
            const formData = new FormData();
            formData.append('file', this.selectedFile);


            // this.serve.PostDataGerenciaUpload(formData).subscribe((res)=>{
            //     console.log(res);
            //     this.GetGerencias();
            //     this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Archivo enviado correctamente.' });

            //   }, (err)=>{
            //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el archivo.' });
            //     console.error(err);
            //   });

            const res: any = {
                "log_transaccion_excel": {
                    "Repuesta" : {
                        "registros": [
                            {
                                "unidad_gerencia_id_erp": "nit invalido 1",
                                "nombre": "bkjh+0",
                                "responsable_id": 1
                            },
                            {
                                "unidad_gerencia_id_erp": "nuevo 2",
                                "nombre": "bkjh+1",
                                "responsable_id": 1
                            },
                            {
                                "unidad_gerencia_id_erp": "outsorcing 2",
                                "nombre": "bkjh+2",
                                "responsable_id": 1
                            },
                            {
                                "unidad_gerencia_id_erp": "dbnewidchie 2,2",
                                "nombre": "bkjh+3",
                                "responsable_id": 1
                            }
                        ],
                        "errores" : {
                            "gerencias_sin_cambios": [],
                            "gerencia_nit_no_existe": [],
                            "gerencia_filtro_nit_invalido": [],
                            "gerencias_duplicadas": []
                        }

                    },
                    "Status" : {
                        "id" :  1
                    }

                }
            };





            if (res.log_transaccion_excel.Status === 1) {
                const miBoton: HTMLElement | null = this.el.nativeElement.querySelector('#miBoton');
                miBoton.click();
                console.log(res);
            }



          } else {
            console.log('Ningún archivo seleccionado');
          }
        }

        DecargarExcel() {
            this.serve.descargarExcel().subscribe((blob: Blob) => {
                const enlace = document.createElement('a');
                enlace.href = window.URL.createObjectURL(blob);
                enlace.download = 'Plantilla_de_cargue_Parametros.xlsx';
                enlace.click();
                window.URL.revokeObjectURL(enlace.href);
            });
        }


//gerencia fin
}
