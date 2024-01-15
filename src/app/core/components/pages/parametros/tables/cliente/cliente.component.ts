import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/cliente/data.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { DataEdit, DataSend,DataStatus } from 'src/app/core/api/cliente.module';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})



export class clienteComponent  implements OnInit {

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

    Dao: DataSend = {
        identificacion: null,
        razonSocial: null,
        clienteIdErp: null,
    };

    DaoEdit: DataEdit = {
        id: null,
        identificacion: null,
        razonSocial: null,
        clienteIdErp: null,
    };
    msgs: [];

    Status: DataStatus = {
        id: null,
        estado: null
    };



    uploadedFiles: any[] = [];

    constructor(
        private serve: DataService,
        private messageService: MessageService,
        private el: ElementRef
    ) {        this.GatData();}

    ngOnInit() {
    }
// gerencias init
        GatData(): void {
            this.serve.GetData().subscribe(
                (response) => {
                    const res = response;
                    this.customers1 = res;
                    this.loading = false;
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
            if (this.Dao.clienteIdErp === null) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'ID Cliente no puede ser vacio',
                });
            } else {
                if (this.Dao.razonSocial === null) {
                    this.messageService.add({
                        severity: 'error',
                        summary: `Debe ingresar nombre de cliente`,
                    });
                } else {

                       if (  this.Dao.identificacion === null) {
                        this.messageService.add({
                            severity: 'error',
                            summary: `Debe ingresar nit del cliente`,
                        });
                    } else {
                        this.serve.PostData(this.Dao).subscribe(
                            (res) => {
                                this.onAlertMessage(
                                    'Exito!!!',
                                    res['mensaje'],
                                    'success'
                                );
                                this.display = false;
                                this.GatData();
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
                clienteIdErp: Dao.cliente,
                identificacion: Dao.NIT,
                razonSocial: Dao.razon_social,
                id: Dao.id
            };

        }

        SendEndPoindEd() {
            this.DaoEdit.identificacion = parseInt(this.DaoEdit.identificacion.toString())
            this.serve.PutData(this.DaoEdit).subscribe(
                (res) => {
                    setTimeout(() => {
                        this.GatData();
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
                clienteIdErp: Dao.cliente,
                identificacion: Dao.NIT,
                razonSocial: Dao.razon_social,
                id: Dao.id
            };



        }
        //   funcion para actuliza el estado de una direccion
        onPutStatususER(ids: number, status: number) {
            this.Status = {
                id: ids,
                estado: status,
            };

            this.serve.PutStatus(this.Status).subscribe(
                (res) => {
                    if (res['status'] === 'ok') {
                        this.onAlertMessage('Actulizado', res['mensaje'], 'success');
                        this.GatData();
                    } else {
                        this.onAlertMessage('Error', res['mensaje'], 'warning');
                        this.GatData();
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
        }

        uploadFile() {
          if (this.selectedFile) {
            // Aquí puedes implementar la lógica para enviar el archivo al servidor
            // Puedes usar servicios HttpClient para enviar el archivo al servidor
            // Ejemplo: this.http.post('url_del_servidor', formData).subscribe(response => console.log(response));
            const formData = new FormData();
            formData.append('file', this.selectedFile);


            // this.serve.PostDataGerenciaUpload(formData).subscribe((res)=>{
            //     console.log(res);
            //     this.GatData();
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
