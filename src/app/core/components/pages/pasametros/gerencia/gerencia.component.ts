import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';;
import Swal from 'sweetalert2';




@Component({
    templateUrl: './gerencia.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls:['./gerencia.component.scss']
})
export class GerenciaComponent implements OnInit {

    customers1:  any;
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;
    display: boolean = false;

    constructor(private messageService: MessageService) {}

    ngOnInit(){}



    
}