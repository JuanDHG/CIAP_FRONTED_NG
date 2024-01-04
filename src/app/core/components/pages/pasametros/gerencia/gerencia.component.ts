import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';;
import Swal from 'sweetalert2';
import { DataGerenciaService } from 'src/app/services/data-gerencia.service';

import { DataResponsabe } from "./../../../../api/gerencia.module";



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
      // Función para cambiar el paso al hacer clic en el Steps
 
    constructor(
        private serve: DataGerenciaService,
        private messageService: MessageService) {}

    ngOnInit(){ 
        this.GetGerencias()
    }

    GetGerencias():void {
        this.serve.GetDataRole().subscribe(response =>{
            console.log(response);
            const res = response;
            this.customers1 = res;
            this.loading = false;

            // lanza peticion para obterner la lista de usuarios activos con el 
            // objetivo de ser seleccionado como responsables
            this.serve.GetDataResponsableAct().subscribe( (res) =>{
                console.log(res);
                
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

    
}