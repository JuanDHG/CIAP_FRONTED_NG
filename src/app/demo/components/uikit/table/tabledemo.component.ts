import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataRoleService } from 'src/app/services/data-role.service';


// importacion de interfaz

import { UserRoles } from "./../../../api/datarole.module";

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls:['./tabledemo.component.scss']
})
export class TableDemoComponent implements OnInit {

    customers1:  any;

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private server: DataRoleService) { }

    ngOnInit() {
        this.RenderDatos();
    }

    RenderDatos(){
            this.server.GetDataRole().subscribe((response)=>{
                console.log(response);
                const res = response;
                this.customers1 = res;
                this.loading = false;
                //this.customers1.forEach(UserRoles => res.fechasistema = new Date(UserRoles.fechasistema));
            });
          
    }




    // expandAll() {
    //     if (!this.isExpanded) {
    //         this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    //     } else {
    //         this.expandedRows = {};
    //     }
    //     this.isExpanded = !this.isExpanded;
    // }

    formatCurrency(value: number) {
        return value.toLocaleString('en-ES', { style: 'currency', currency: 'COP' });
    }



    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
}