import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataRoleService } from 'src/app/services/data-role.service';

// importacion de interfaz

import { RolGeneralData, RolSetData, RolStatus, RolPutData,UserData, UserDataRegister,DataProyect, UserDataEdit, UserStatus } from "../../../api/datarole.module";
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
    DataRegUser: UserDataRegister = {
        apellidos: null,
        correo: null,
        identificacion: null,
        idProyecto:null,
        idRol:null,
        nombres:null
    };
    Apellido1: string;
    Apellido2: string;

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
    displayEditUser: boolean = false;
    displayPro: boolean = false;
    Proyect: any;
    loading3: boolean = false;


    proyects: DataProyect[];
    role: RolGeneralData[];

    selectedProyects: DataProyect[];
    selectedRole: RolGeneralData[];


    DataUserEdit: UserData  = {
        id_usuario: null,
        usuario: null,
        identificacion: null,
        nombre: null,
        apellidos: null,
        correo: null,
        id_rol: null,
        rol: null,
        estado: null
    };

    DaoEdit: UserDataEdit;

    constructor(private server: DataRoleService, private messageService: MessageService) { 
     }

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
            console.log(this.DataUser);
            
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

    }

    SendServer(){
  
        this.server.PutDataRole(this.putDataRole).subscribe((res)=>{

            this.displayEdit = false;
            this.RenderDatosRoles()
        });
    }



    // Añadir usuarios
    onAddUsers(e: boolean): void{
        this.displayAddUser = e; 
        this.server.GetUserProyectAll().subscribe((res)=>{
            const response: any = res
            this.proyects = response;
        });

        setTimeout(() => {
            this.server.GetDataRole().subscribe((res)=>{
                const response: any = res
                this.role = response;
            });
        }, 900);
    }

    //enviar datos a servidor 
    SendServerAddUser():void{

        const idRole: any = this.selectedRole[0];
        this.DataRegUser = {
            apellidos: this.Apellido1 +' '+this.Apellido2,
            identificacion: this.DataRegUser.identificacion,
            correo:this.DataRegUser.correo,
            idProyecto: this.selectedProyects,
            idRol:idRole,
            nombres: this.DataRegUser.nombres
        }


       this.server.PostAddUser(this.DataRegUser).subscribe((res)=>{


                var response = res
                if (response['status'] === 'ok') {
                    this.messageService.add({severity:'success', summary:response['mensaje']});
                    
                    setTimeout(() => {
                        this.displayAddUser = false;
                        this.RenderDatosRolesUser()
                    }, 3000);
                }else{
                    this.messageService.add({severity:'error', summary:response['mensaje']});
                }
                
       })
      
    }

    //  ver proyectos asociados 
    onViewDataProyect(id: number):void {
        this.displayPro = true;
        this.server.GetUserProyect(id).subscribe((res)=>{
                this.loading3 = false;
            if (res['status']=== 'ok') {

                const data  = 
                [
                    {
                        "proyecto_id": 0,
                        "nombre": "Sin Proyecto Asociado"
                    }
                ]
                this.Proyect = data;  
            }else{
                this.Proyect = res;
            }
        },(error) => {
        console.error('Error en la solicitud GetUserProyect:', error);
        // Puedes manejar el error de manera adecuada aquí, por ejemplo, mostrando un mensaje al usuario.
    } );
    }


    DataEdit: any;
    DataRoleEdit: any;

    selectedProyectEdit: DataProyect[];
    selectedRoleEdit: RolGeneralData[];

    onPutDataUser(Dao: any){

        
        console.log('Dao: ',Dao);
        
        const id = Dao.id_usuario; 
        this.SendDataSetRolesProyectos()
        this.displayEditUser = true; 
        
                   

        //coloca el check en la lista de datos de proyecto q1ue viene de base de datos
        this.server.GetUserProyect(id).subscribe((res) => {
            
            var resb: any = res;
            const DataRes: DataProyect[] = [];
            for (let i = 0; i < resb.length; i++) {
                const element = resb[i];
                 DataRes.push({
                    id: element.proyecto_id,
                    nombre:  element.nombre
                });
            }
            this.selectedProyectEdit = DataRes;

        });


        //coloca el check en la lista de rolres      
        const DataRes: RolGeneralData[] = [];

        var rol : string = Dao.rol;
        var id_ : number  = parseInt(Dao.id_rol);
        var date_r = Dao.fechasistema_rol;

        var data = {
            "id": id_ ,
            "tipo": rol,
            "estado": Dao.estado_rol,
            "fechasistema": date_r
        }
        
        DataRes.push(data);

        this.selectedRoleEdit = DataRes;
        var ire: any =  this.selectedRoleEdit[0].id;
        

        // Setea la data en el formulario para ser enviada al endponit
        this.DataUserEdit = {
            apellidos : Dao.apellidos,
            correo:  Dao.correo,
            estado: Dao.estado_cuenta,
            id_rol: parseInt(ire),
            id_usuario: Dao.id_usuario,
            identificacion: Dao.identificacion,
            nombre: Dao.nombre,
            rol: parseInt(ire),
            usuario: Dao.usuario
        }
  
        

    }

    SendServerEditUser(){
            //console.log(this.selectedProyectEdit);

                let VecPro: string[] = [];

                for (let i = 0; i < this.selectedProyectEdit.length; i++) {
                    const element = this.selectedProyectEdit[i].id;
                    VecPro.push(element);
                }
            this.DaoEdit = {
                apellidos: this.DataUserEdit.apellidos,
                correo: this.DataUserEdit.correo,
                identificacion:this.DataUserEdit.identificacion.toString(),
                idProyecto: VecPro,
                idRol: this.selectedRoleEdit[0].id,
                idUsuario: this.DataUserEdit.id_usuario,
                nombres: this.DataUserEdit.nombre
            }

            console.log(this.DaoEdit);

            this.server.PutEditUSer(this.DaoEdit).subscribe((res)=>{
                    console.log(res);
                    const response  = res['success'];
                        if (response === false) {
                            this.messageService.add({severity:'error', summary:res['message']});
                        } else {
                            this.messageService.add({severity:'success', summary:res['mensaje']});
                    
                            setTimeout(() => {
                                this.displayEditUser = false;
                                this.RenderDatosRolesUser()
                            }, 5000);
                        }
            },  (error) => {
                const ms = error['error'].message[0];
                this.messageService.add({severity:'error', summary:ms});
              });
            
    }

    triggerModal2(e: boolean){
        this.displayEditUser = e;
    }

    SendDataSetRolesProyectos(){
        this.server.GetUserProyectAll().subscribe((res)=>{
            
            const response: any = res
            this.proyects = response;
        });

        setTimeout(() => {
            this.server.GetDataRole().subscribe((res)=>{
                const response: any = res
                this.role = response;
                console.log('rol: ', this.role);
            });
        }, 900);
        
    }

    UserStatus: UserStatus;

    onPutStatususER(id: number, status: string) {
         this.UserStatus = {
            idUsuario : id,
            idEstado: status
        }
        this.server.PutStatusRolUser(this.UserStatus).subscribe((res)=>{

      

             if (res['status'] === 'ok') {
                // this.messageService.add({severity:'success', summary:res['mensaje']});
                this.onAlertMessage("Exito!!!", res['message'], "success");
                this.RenderDatosRolesUser()
            }else{
                this.onAlertMessage("Error", res['message'], "warning");
                this.RenderDatosRolesUser()
            }
        });
    }
    
}