import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataRoleService } from 'src/app/services/roles/data-role.service';
import { ActivatedRoute } from '@angular/router';
// importacion de interfaz

import {
    RolGeneralData,
    RolSetData,
    RolStatus,
    RolPutData,
    UserData,
    UserDataRegister,
    DataProyect,
    UserDataEdit,
    UserStatus,
    DataRolePermison,
} from '../../../api/datarole.module';
import { OverlayPanel } from 'primeng/overlaypanel';
import Swal from 'sweetalert2';
import { Message } from 'primeng/api';

// import  * as data  from '../../../../../assets/demo/data/countries.json';

@Component({
    templateUrl: './roles.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
    customers1: RolGeneralData;

    DataUser: UserData;
    DataRegUser: UserDataRegister = {
        apellidos: null,
        correo: null,
        identificacion: null,
        idProyecto: null,
        idRol: null,
        nombres: null,
    };
    Apellido1: string = null;
    Apellido2: string = null;

    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;
    loading2: boolean = true;

    setData: RolSetData = {
        nombreRol: null,
    };

    putStatus: RolStatus = {
        idRol: null,
        estado: null,
    };

    putDataRole: RolPutData = {
        idRol: null,
        nombreRol: null,
    };

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('miPanel') overlayPanel: OverlayPanel;

    display: boolean = false;
    displayEdit: boolean = false;
    displayAddUser: boolean = false;
    displayEditUser: boolean = false;
    displayVIew: boolean = false;
    displayPro: boolean = false;
    Proyect: any;
    loading3: boolean = false;

    proyects: DataProyect[];
    role: RolGeneralData[];


    selectedProyects: DataProyect[];
    selectedRole: RolGeneralData[];

    DataUserEdit: UserData = {
        id_usuario: null,
        usuario: null,
        identificacion: null,
        nombre: null,
        apellidos: null,
        correo: null,
        id_rol: null,
        rol: null,
        estado: null,
    };

    DaoEdit: UserDataEdit;
    DataEdit: any;
    DataRoleEdit: any;

    selectedProyectEdit: DataProyect[];
    selectedRoleEdit: RolGeneralData[];
    UserStatus: UserStatus;
    indice: number = 0;
    DaoMenu: any;
    miVariable: string = ''; // o 'rol'

    constructor(
        private route: ActivatedRoute,
        private server: DataRoleService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.RenderDatosRoles()

        this.route.queryParamMap
            .subscribe((params) => {
              console.log(params);
              this.miVariable = params.get('md')
              this.getTabIndex(this.miVariable);
        });
    }


    getTabIndex(e: string): number {
        return this.miVariable === 'Usuario' ? 0 : this.miVariable === 'Roles' ? 1 : 0;
      }

    // maenja y pinta las petiones para mostar los roles
    RenderDatosRoles() {
        this.server.GetDataRole().subscribe((response) => {
            const res = response;
            this.customers1 = res;
            this.loading = false;
            this.RenderDatosRolesUser()
        });
    }
    // maenja y pinta las petiones para mostar los usuarios
    RenderDatosRolesUser() {
        this.server.GetUserList().subscribe((res) => {
            const resp = res;
            this.DataUser = resp;
            this.loading2 = false;

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
        return value.toLocaleString('en-ES', {
            style: 'currency',
            currency: 'COP',
        });
    }

    triggerModal(e: boolean) {
        this.displayEdit = e;
    }

    triggerModaladd(e: boolean) {
        this.display = e;
        this.server.SetMenus().subscribe((res) => {
            this.DaoMenu = res;
            console.log(this.DaoMenu);
        });
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    vectorItems: { id_menu: string; id_permisos: number[] }[] = [];

    valuesCheck(id: any, p: number, ev: boolean): void {
        console.log('op menu: ', id, 'permiso: ', p, 'Evento: ', ev);

        const elementoExistenteIndex = this.vectorItems.findIndex(
            (existingItem) => existingItem.id_menu === id
        );

        if (ev) {
            console.log('Anexar a vector', p);

            if (elementoExistenteIndex === -1) {
                // Si el elemento no existe, crea uno nuevo con el array de permisos
                const nuevoElemento = {
                    id_menu: id,
                    id_permisos: [p],
                };

                this.vectorItems.push(nuevoElemento);
            } else {
                // Si el elemento ya existe y no contiene el permiso, agrégalo
                const elementoExistente =
                    this.vectorItems[elementoExistenteIndex];
                if (!elementoExistente.id_permisos.includes(p)) {
                    elementoExistente.id_permisos.push(p);
                }
            }
        } else {
            console.log('Eliminar permiso del vector', p);

            if (elementoExistenteIndex !== -1) {
                // Si el elemento existe, elimina solo el permiso específico
                const elementoExistente =
                    this.vectorItems[elementoExistenteIndex];
                const permisosFiltrados = elementoExistente.id_permisos.filter(
                    (permiso) => permiso !== p
                );

                // Actualiza los permisos del elemento existente
                elementoExistente.id_permisos = permisosFiltrados;

                // Si no hay más permisos, elimina la fila completa
                if (permisosFiltrados.length === 0) {
                    this.vectorItems.splice(elementoExistenteIndex, 1);
                }
            }
        }

        // Puedes hacer algo más con el vector actualizado si es necesario
        console.log('Vector actualizado:', this.vectorItems);
    }

    msgs:Message[] = [];
    onSetDataRole() {
        if (this.setData.nombreRol === null || this.setData.nombreRol === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'El nombre del rol no puede ser vacio',
            });
        }
        if (this.vectorItems.length <= 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'El rol debe contar minimo con un permiso',
            });
        } else {
            this.setData = {
                nombreRol: this.setData.nombreRol,
                menus: this.vectorItems,
            };
            console.log(this.setData);

            this.server.PostSetDataRol(this.setData).subscribe(
                (res) => {
                    var response = res;
                    if (response['status'] === 'ok') {
                        this.messageService.add({
                            severity: 'success',
                            summary: response['mensaje'],
                        });

                        setTimeout(() => {
                            this.display = false;
                            this.RenderDatosRoles();
                        }, 3000);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: response['mensaje'],
                        });
                    }
                },
                (error) => {
                    console.error(error);

                    this.messageService.add({
                        severity: 'error',
                        summary:
                            'Presentamos Problemas con el backend. Vuelva a intentar en unos minutos....',
                    });
                }
            );
        }
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

    onPutStatus(id: number, status: number) {
        this.putStatus = {
            idRol: id,
            estado: status,
        };
        this.server.PutStatusRole(this.putStatus).subscribe((res) => {
            if (res['status'] === 'ok') {
                // this.messageService.add({severity:'success', summary:res['mensaje']});
                this.onAlertMessage('Exito!!!', res['message'], 'success');
                this.RenderDatosRoles();
            } else {
                this.onAlertMessage('Error', res['message'], 'warning');
                this.RenderDatosRoles();
            }
        });
    }

    // Editar permisos y roles

    vectorItem: { menus: { id_menu: any; id_permisos: number[] }[] } = {
        menus: [],
    };
    id_rol: any;

    addRemovePermissions(id: any, permiso: number, event: boolean): void {
        console.log(
            'Modificar permisos para:',
            id,
            'permiso:',
            permiso,
            'Evento:',
            event
        );
        console.log(this.DaoMenu);

        // Actualizar vectorItem antes de realizar las actualizaciones
        this.vectorItem = this.getMenus();

        // Actualizar vectorItem
        const elementoExistenteIndex = this.vectorItem.menus.findIndex(
            (menu) => menu.id_menu === id
        );

        if (elementoExistenteIndex !== -1) {
            // Si el elemento existe, actualizar sus permisos
            const menuToUpdate = this.vectorItem.menus[elementoExistenteIndex];

            if (event) {
                // Añadir permiso
                if (!menuToUpdate.id_permisos.includes(permiso)) {
                    menuToUpdate.id_permisos.push(permiso);
                }
            } else {
                // Eliminar permiso
                menuToUpdate.id_permisos = menuToUpdate.id_permisos.filter(
                    (p) => p !== permiso
                );
            }
        } else {
            // Si el elemento no existe, agregarlo al vectorItem
            this.vectorItem.menus.push({ id_menu: id, id_permisos: [permiso] });
        }

        // Actualizar los checks en la tabla después de haber completado todas las modificaciones
        this.DaoMenu.forEach((item) => {
            const menu = this.vectorItem.menus.find(
                (m) => m.id_menu === item.id_menu
            );
            item.permiso_1 = menu?.id_permisos.includes(1) ? '1' : null;
            item.permiso_2 = menu?.id_permisos.includes(2) ? '2' : null;
            item.permiso_3 = menu?.id_permisos.includes(3) ? '3' : null;
            item.permiso_4 = menu?.id_permisos.includes(4) ? '4' : null;
        });

        // Puedes hacer algo más con el vector actualizado si es necesario
        console.log('Vector actualizado:', this.vectorItem);
    }

    getMenus(): { menus: { id_menu: any; id_permisos: number[] }[] } {
        const menus: { menus: { id_menu: any; id_permisos: number[] }[] } = {
            menus: [],
        };

        // Obtener todos los permisos activos para cada menú
        this.DaoMenu.forEach((item) => {
            const permisos: number[] = this.getPermisos(item);
            menus.menus.push({ id_menu: item.id_menu, id_permisos: permisos });
        });

        return menus;
    }

    getPermisos(item: any): number[] {
        const permisos: number[] = [];
        if (item.permiso_1 === '1') permisos.push(1);
        if (item.permiso_2 === '2') permisos.push(2);
        if (item.permiso_3 === '3') permisos.push(3);
        if (item.permiso_4 === '4') permisos.push(4);
        return permisos;
    }

    onPutDataRole(id: number, rol: string) {
        this.putDataRole = {
            idRol: id,
            nombreRol: rol,
        };
        this.displayEdit = true;
        this.server.GetMenus(id).subscribe((res) => {
            this.DaoMenu = res;
            console.log(this.DaoMenu);
        });
    }

    onViewDataRole(id: number, rol: string) {
        this.putDataRole = {
            idRol: id,
            nombreRol: rol,
        };
        this.displayVIew = true;
        this.server.GetMenus(id).subscribe((res) => {
            this.DaoMenu = res;
            console.log(this.DaoMenu);
        });
    }

    Permisos: DataRolePermison;

    SendServer() {
        console.log(this.vectorItem);
        this.Permisos = {
            idRol: this.putDataRole.idRol,
            menus: this.vectorItem.menus,
        };
        console.log(this.Permisos);

        if (this.Permisos.menus.length > 0) {
            this.SendEndPoind();
        } else {
            this.messageService.add({
                severity: 'error',
                summary:
                    'Debe moficiar el nombre permisos los permiso para editar',
            });
        }
    }

    SendEndPoind() {
        this.server.PutDataRole(this.putDataRole).subscribe((res) => {
            this.server.PostPutPermison(this.Permisos).subscribe(
                (res) => {
                    console.log(res);
                    this.displayEdit = false;
                    this.RenderDatosRoles();
                    this.onAlertMessage('Exito!!!', res['mensaje'], 'success');
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: error['error'].mensaje[0],
                    });
                }
            );
        });
    }

    // Añadir usuarios
    onAddUsers(e: boolean): void {
        this.displayAddUser = e;
        this.server.GetUserProyectAll().subscribe((res) => {
            const response: any = res;
            console.log(res);

            this.proyects = response;
        });

        setTimeout(() => {
            this.server.GetDataRoleAct().subscribe((res) => {
                const response: any = res;
                this.role = response;
            });
        }, 900);
    }

    // Manejador de errores

    private ManagerErr(m : string) : void {
        console.log(m);
        this.msgs = []
        this.msgs.push({
            severity: 'info',
            summary: '',
            detail: m,
        });
    }
    //enviar datos a servidor
    SendServerAddUser() {
        console.log(this.selectedRole);

        let idRole: any = this.selectedRole;
        if (idRole === undefined) {
            this.ManagerErr('Debe seleccionar rol');
        }else{
             idRole = idRole;
        }

        this.DataRegUser = {
            apellidos: this.Apellido1 + ' ' + this.Apellido2,
            identificacion: this.DataRegUser.identificacion,
            correo: this.DataRegUser.correo,
            idProyecto: this.selectedProyects,
            idRol: idRole[0],
            nombres: this.DataRegUser.nombres,
        };
        console.log('Add Info', this.DataRegUser);


        if (this.DataRegUser.identificacion === null || this.DataRegUser.identificacion.trim() === '') {
            this.ManagerErr('Debe ingresar identificación')
        }else{
            if (this.DataRegUser.nombres === null || this.DataRegUser.nombres.trim() === '') {
                this.ManagerErr('Debe ingresar nombre')
            }else{
                if (this.DataRegUser.apellidos === null || this.DataRegUser.apellidos.trim() === '') {
                    this.ManagerErr('Debe ingresar apellidos')
                }else{
                    if (this.DataRegUser.correo === null || this.DataRegUser.correo.trim() === '') {
                        this.ManagerErr('Debe ingresar correo')
                    }else{
                        if (this.DataRegUser.idProyecto === null ||this.DataRegUser.idProyecto === undefined ||this.DataRegUser.idProyecto.trim() === '') {
                            this.ManagerErr('Debe seleccionar proyectos')
                        }else{

                            this.server.PostAddUser(this.DataRegUser).subscribe((res) => {
                                var response = res;
                                console.log(res);

                                if (response['status'] === 'ok') {
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: response['message'],
                                    });

                                    this.DataRegUser = {
                                        apellidos: null,
                                        correo: null,
                                        identificacion: null,
                                        idProyecto: null,
                                        idRol: null,
                                        nombres: null,
                                    };
                                    this.selectedRole = null;
                                    this.selectedProyects = null;

                                    this.Apellido1 = null; this.Apellido2 = null;

                                    setTimeout(() => {
                                        //this.displayAddUser = false;
                                        this.RenderDatosRolesUser();
                                    }, 3000);
                                } else {
                                    this.messageService.add({
                                        severity: 'info',
                                        summary: 'Error',
                                        detail: response['message']
                                    });



                                }
                            });

                        }
                    }
                }
            }
        }
    }

    //  ver proyectos asociados
    onViewDataProyect(id: number): void {
        this.displayPro = true;
        this.server.GetUserProyect(id).subscribe(
            (res) => {
                this.loading3 = false;
                if (res['status'] === 'ok') {
                    const data = [
                        {
                            proyecto_id: 0,
                            nombre: 'Sin Proyecto Asociado',
                        },
                    ];
                    this.Proyect = data;
                } else {
                    this.Proyect = res;
                }
            },
            (error) => {
                console.error('Error en la solicitud GetUserProyect:', error);
                // Puedes manejar el error de manera adecuada aquí, por ejemplo, mostrando un mensaje al usuario.
            }
        );
    }

    onPutDataUser(Dao: any) {
        const id = Dao.id_usuario;
        this.SendDataSetRolesProyectos();
        this.displayEditUser = true;

        //coloca el check en la lista de datos de proyecto q1ue viene de base de datos
        this.server.GetUserProyect(id).subscribe((res) => {
            var resb: any = res;
            const DataRes: DataProyect[] = [];
            for (let i = 0; i < resb.length; i++) {
                const element = resb[i];
                DataRes.push({
                    id: element.proyecto_id,
                    nombre: element.nombre,
                });
            }
            this.selectedProyectEdit = DataRes;
        });

        //coloca el check en la lista de rolres
        const DataRes: RolGeneralData[] = [];

        var rol: string = Dao.rol;
        var id_: number = parseInt(Dao.id_rol);
        var date_r = Dao.fechasistema_rol;

        var data = {
            id: id_,
            tipo: rol,
            estado: Dao.estado_rol,
            fechasistema: date_r,
        };

        DataRes.push(data);

        this.selectedRoleEdit = DataRes;
        var ire: any = this.selectedRoleEdit[0].id;

        // Setea la data en el formulario para ser enviada al endponit
        this.DataUserEdit = {
            apellidos: Dao.apellidos,
            correo: Dao.correo,
            estado: Dao.estado_cuenta,
            id_rol: parseInt(ire),
            id_usuario: Dao.id_usuario,
            identificacion: Dao.identificacion,
            nombre: Dao.nombre,
            rol: parseInt(ire),
            usuario: Dao.usuario,
        };
    }

    SendServerEditUser() {
        let VecPro: string[] = [];

        for (let i = 0; i < this.selectedProyectEdit.length; i++) {
            const element = this.selectedProyectEdit[i].id;
            VecPro.push(element);
        }
        this.DaoEdit = {
            apellidos: this.DataUserEdit.apellidos,
            correo: this.DataUserEdit.correo,
            identificacion: this.DataUserEdit.identificacion.toString(),
            idProyecto: VecPro,
            idRol: this.selectedRoleEdit[0].id,
            idUsuario: this.DataUserEdit.id_usuario,
            nombres: this.DataUserEdit.nombre,
        };

        this.server.PutEditUSer(this.DaoEdit).subscribe(
            (res) => {
                const response = res['success'];
                if (response === false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: res['message'],
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: res['mensaje'],
                    });

                    setTimeout(() => {
                        this.displayEditUser = false;
                        this.RenderDatosRolesUser();
                    }, 5000);
                }
            },
            (error) => {
                const ms = error['error'].message[0];
                this.messageService.add({ severity: 'error', summary: ms });
            }
        );
    }

    triggerModal2(e: boolean) {
        this.displayEditUser = e;
    }

    SendDataSetRolesProyectos() {
        this.server.GetUserProyectAll().subscribe((res) => {
            const response: any = res;
            this.proyects = response;
        });

        setTimeout(() => {
            this.server.GetDataRole().subscribe((res) => {
                const response: any = res;
                this.role = response;
            });
        }, 900);
    }

    onPutStatususER(id: number, status: string) {
        this.UserStatus = {
            idUsuario: id,
            idEstado: status,
        };
        this.server.PutStatusRolUser(this.UserStatus).subscribe((res) => {
            if (res['status'] === 'ok') {
                // this.messageService.add({severity:'success', summary:res['mensaje']});
                this.onAlertMessage('Exito!!!', res['message'], 'success');
                this.RenderDatosRolesUser();
            } else {
                this.onAlertMessage('Error', res['message'], 'warning');
                this.RenderDatosRolesUser();
            }
        });
    }
}
