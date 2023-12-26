import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { userDataGeneral } from "./../demo/api/user.module";
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    
    DataUser: userDataGeneral;
    DataLocal : any = localStorage.getItem('dataUSer');
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {
        this.DataLocal = JSON.parse(this.DataLocal);
        this.DataUser = {
            apellidos: this.DataLocal.apellidos,
            correo: this.DataLocal.correo,
            estado_bloqueo: this.DataLocal.estado_bloqueo,
            estado_contrasena: this.DataLocal.estado_contrasena,
            fechaContrasena: this.DataLocal.fechaContrasena,
            id_rol_usuario: this.DataLocal.id_rol_usuario,
            id_ua: this.DataLocal.id_ua,
            nombre_rol: this.DataLocal.nombre_rol,
            nombre_usuario: this.DataLocal.nombre_usuario,
            nombres: this.DataLocal.nombres,
            tipo_contrasena: this.DataLocal.tipo_contrasena
        }
     }
}
