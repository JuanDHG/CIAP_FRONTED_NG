import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';;
import Swal from 'sweetalert2';
import { DataGerenciaService } from 'src/app/services/data-gerencia.service';

import { DataEditGerencia, DataResponsabe, DataSendGerencia } from "./../../../../api/gerencia.module";

@Component({
    templateUrl: './gerencia.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls:['./gerencia.component.scss']
})
export class GerenciaComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    customers1: any;
    loading: boolean = true;
    isExpanded: boolean = false;
    idFrozen: boolean = false;

    display: boolean = false;
    displayEdit: boolean = false;
    steps = [
        { label: 'Gerencia' },
        { label: 'Dirección' },
        { label: 'Ceco' },
        { label: 'Cliente' },
        { label: 'Estados' }
    ];
    indice: number = 0;
    activeIndex = 0;
    
    responsables: DataResponsabe;
    responsable: DataResponsabe[];
     
    Dao: DataSendGerencia = {
        idGerenciaErp: null,
        idResponsable: null,
        nombre: null
    }; 


    DaoEdit: DataEditGerencia =  {
        idGerenciaErp: null,
        id: null,
        idResponsable: null,
        nombre: null
    }
    msgs: [];
    constructor(
        private serve: DataGerenciaService,
        private messageService: MessageService) {}

    ngOnInit(){ 
        this.GetGerencias()
    }

    GetGerencias():void {
        this.serve.GetDataRole().subscribe(response =>{
            console.log(response);
            console.log('ejecutado');
            
            const res = response;
            this.customers1 = res;
            this.loading = false;

            // lanza peticion para obterner la lista de usuarios activos con el 
            // objetivo de ser seleccionado como responsables
            this.serve.GetDataResponsableAct().subscribe( (res) =>{
               this.responsables = res;
            })
        }, err=>{
            console.log(err);
        })
    }

    // Función para cambiar el paso al hacer clic en el Steps
    changeTab(index: number) {
      this.activeIndex = index;
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
    SendEndPoind():void{
     
        if (this.Dao.idGerenciaErp === null) {
            
            this.messageService.add({ severity: 'error', summary: 'ID ERP no puede irse vacio' });

        } else{
            if (this.Dao.nombre === null) {
            
                this.messageService.add({ severity: 'error', summary: `Debe ingresar nombre de gerencia` });
            }else{
                console.log('vec: -->',this.responsable);
                
                var res_id: any = this.responsable?.[0];       
                this.Dao.idResponsable = res_id;
        
                if (this.Dao.idResponsable === null ||  res_id === 0 || res_id === undefined || res_id === null || res_id === '') {
            
                    this.messageService.add({ severity: 'error', summary: `Debe seleccionar un responsable de la gerencia: ${this.Dao.nombre}` });
                
                }else{
                    console.log(this.Dao) 
                    this.serve.PostDataGerencia(this.Dao).subscribe( res => {
                        this.onAlertMessage('Exito!!!', res['mensaje'], 'success');
                        this.display = false;
                        this.GetGerencias();
                    }, err => {
                        console.log(err);
                        this.messageService.add({ severity: 'error', summary: `Error interno, intentelo nuevamente en unos minutos`});
                    })
                }
            }
        }


        
    }
    

    responsableSelectEd: DataResponsabe[] = [];
    // edittar
    onPutDataGErencia(Dao: any) {
        this.displayEdit = true;

        this.DaoEdit = {
          idGerenciaErp: Dao.ceco,
          idResponsable: Dao.responsable,
          id: Dao.idGerencia,
          nombre: Dao.gerencia
        };
      
        const selectedResponsable: DataResponsabe = {
          id: Dao.id_responsable,
          nombreUsuario: Dao.responsable,
        };
      
        // Asigna un array que contiene el objeto seleccionado
        this.responsableSelectEd = [selectedResponsable];
      }


      SendEndPoindEd(){
        this.DaoEdit.idResponsable = this.responsableSelectEd[0].id;
        this.serve.PutDataGerencia(this.DaoEdit).subscribe( (res) => {

            setTimeout(() => {
                            this.GetGerencias();
            this.onAlertMessage('Exito!!!', res['mensaje'], 'success');
            this.displayEdit = false;
            }, 500);

            
        }, (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: `Error interno, intentelo nuevamente en unos minutos`});
        })
        
      }
      
    
    
}