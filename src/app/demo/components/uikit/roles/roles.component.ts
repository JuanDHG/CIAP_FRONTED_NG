import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataRoleService } from 'src/app/services/data-role.service';

// importacion de interfaz

import { RolGeneralData, RolSetData, RolStatus, RolPutData,UserData } from "../../../api/datarole.module";
import { OverlayPanel } from 'primeng/overlaypanel';
import Swal from 'sweetalert2';


@Component({
    templateUrl: './roles.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls:['./roles.component.scss']
})
export class RolesComponent implements OnInit {

    customers1:  RolGeneralData;
    DataUser: UserData;

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;
    loading2: boolean = true;

    setData: RolSetData = {
        nombreRol: null
    };

    putStatus: RolStatus = {
        idRol: null,
        estado: null
    }

    putDataRole: RolPutData = {
        idRol: null,
        nombreRol : null
    }

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('miPanel') overlayPanel: OverlayPanel;

    display: boolean = false;
    displayEdit: boolean =  false; 
    displayAddUser: boolean = false;
    displayPro: boolean = false;


    constructor(private server: DataRoleService, private messageService: MessageService) {  }

    ngOnInit() {
       this.RenderDatosRolesUser();

       setTimeout(() => {
        this.RenderDatosRoles()
       },1500);
       
    }

    RenderDatosRoles(){
            this.server.GetDataRole().subscribe((response)=>{
                const res = response;
                this.customers1 = res;
                this.loading = false;
            });

    }

    RenderDatosRolesUser(){
        this.server.GetUserList().subscribe((res)=>{
            const resp = res;                
            this.DataUser = resp;
            this.loading2 = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    onGlobalFilter2(table: Table, event: Event) {
        
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-ES', { style: 'currency', currency: 'COP' });
    }

    triggerModal(e: boolean){
            this.display = e;
            this.displayEdit = e;
    }

    clear(table : Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
    msgs: [];
    onSetDataRole() {
        this.server.PostSetDataRol(this.setData).subscribe((res)=>{
            console.log(res);

            var response = res
            if (response['status'] === 'ok') {
                this.messageService.add({severity:'success', summary:response['mensaje']});
                
                setTimeout(() => {
                    this.display = false;
                    this.RenderDatosRoles()
                }, 3000);
            }else{
                this.messageService.add({severity:'error', summary:response['mensaje']});
            }

        })
    }

    onAlertMessage(t: string, sms: string, i: any): void {
        Swal.fire({
            title: t,
            text: sms,
            icon: i,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#5fbb3a"
        });
    }

    onPutStatus(id: number, status: number) {
        this.putStatus = {
            idRol : id,
            estado: status
        }
        this.server.PutStatusRole(this.putStatus).subscribe((res)=>{
            console.log(res);
      

             if (res['status'] === 'ok') {
                // this.messageService.add({severity:'success', summary:res['mensaje']});
                this.onAlertMessage("Exito!!!", res['message'], "success");
                this.RenderDatosRoles()
            }else{
                this.onAlertMessage("Error", res['message'], "warning");
                this.RenderDatosRoles()
            }
        });
    }

    onPutDataRole(id: number, rol: string) {
        this.putDataRole = {
            idRol : id ,
            nombreRol : rol
        }
        this.displayEdit = true;
        console.log(this.putDataRole);
    }


    SendServer(){
  
        this.server.PutDataRole(this.putDataRole).subscribe((res)=>{
            console.log(res);
            this.displayEdit = false;
            this.RenderDatosRoles()
        });
    }



//    ver proyectos asociados 
  
    onViewDataProyect(id: number):void {
        console.log(id);
        this.displayPro = true;
    }
}