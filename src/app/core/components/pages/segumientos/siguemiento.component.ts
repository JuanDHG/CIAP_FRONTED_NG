import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataService } from 'src/app/services/proyecto/data.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from "src/app/core/api/proyecto.module";



import { OverlayPanel } from 'primeng/overlaypanel';
import Swal from 'sweetalert2';
import { Message } from 'primeng/api';




@Component({
    templateUrl: './siguemiento.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./siguemiento.component.scss'],
})
export class SiguemientoComponent implements OnInit {

    customers1: Data = {
        iDproyecto: null,
        nombreProyecto: null,
        contrato: null,
        objeto: null,
        idEtado: null,
        Estado:null,
        clienteNombre:null,
        nitClente: null,
        idGerencia: null,
        Gerencia: null,
        idDireccion: null,
        direccion: null,
        idUsuario: null,
        gerente: null,
        fecha_inicio: null,
        fecha_final: null,
        duracion: null,
        valor_inicial: null,
        valor_final: null
    }
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;
    display: boolean = false;
    proyects: any[];
    selectedProyects: any[];
    indice: number = 0;
    DaoMenu: any;
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('miPanel') overlayPanel: OverlayPanel;

    constructor(
        private route: ActivatedRoute,
        private server: DataService,
        private messageService: MessageService
    ) {this.RenderDatos()}

    ngOnInit() {

    }




    // maenja y pinta las petiones para mostar los roles
    RenderDatos() {
        this.server.GetData().subscribe((response) => {
            const res = response;
            this.customers1 = res;
            this.loading = false;
        });
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    onGlobalFilter2(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    formatCurrency(value: number) {
        return value.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        });
    }


/*
    triggerModal(e: boolean) {
        this.displayEdit = e;
    }
*/

    triggerModaladd(e: boolean) {
        this.display = e;
/*        this.server.SetMenus().subscribe((res) => {
            this.DaoMenu = res;
            console.log(this.DaoMenu);
        });*/
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    msgs:Message[] = [];

    onAlertMessage(t: string, sms: string, i: any): void {
        Swal.fire({
            title: t,
            text: sms,
            icon: i,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#5fbb3a',
        });
    }

}
