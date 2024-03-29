import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {
    NameSw,
    DataLogin,
    DataValueEmail,
    DataOptNumberVale,
    DataOptSend,
    DataSendEmail,
    DataSendChangePassword,
} from '../../../api/auth.module';
import { Router } from '@angular/router';
import { AuthService as Services } from '../../../../services/auth/consulting.service';
import { sha256 } from 'js-sha256';
import Swal from 'sweetalert2';
import { Message } from 'primeng/api';
import { LoginService } from './../../../../guards/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    isPasswordStrong: boolean = false;
    isPasswordMatch: boolean = false;

    vs: NameSw = {
        mensaje: '¡Bienvenido!',
        nombre: 'CIAP',
        nombre_completo: 'CENTRO INTELIGENTE DE ADMINISTRACIÓN DE PROYECTOS',
        version: '1.0.0',
        mensaje_ol_c: '¿Has olvidado tu contraseña?',
    };

    dapp: DataLogin = {
        user: null,
        pass: null,
        mail: null,
    };

    dopp: DataValueEmail = {
        mail: null,
    };

    otpNum: DataOptNumberVale = {
        num1: null,
        num2: null,
        num3: null,
        num4: null,
    };

    dappotp: DataOptSend = {
        idUsuario: null,
        tokenUsuario: null,
    };

    dappEmail: DataSendEmail = {
        id_usuario: null,
        nombres: null,
        apellidos: null,
        email: null,
    };

    dappResPass: DataSendChangePassword = {
        idUsuario: null,
        contrasena: null,
        Recontrasena: null,
    };
    correo: string = null;
    display: boolean = false;
    displayChangePwwCA: boolean = false;
    fieldTextType: boolean;
    fieldChPw: boolean;
    anima: any;
    iconClass: string = 'pi';
    msmErr: string;
    DonClass: boolean = true;
    otpView: boolean = false;
    AuxPass: string = null;

    constructor(
        public layoutService: LayoutService,
        private rute: Router,
        private server: Services,
        private loginService: LoginService
    ) {}

    ViewPassword(): void {
        this.fieldTextType = !this.fieldTextType;
    }

    ViewPasswordNew(): void {
        this.fieldChPw = !this.fieldChPw;
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

    onAlertMessageCustonCahnPass(t: string, sms: string, i: any): void {
        Swal.fire({
            title: t,
            text: sms,
            icon: i,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#5fbb3a',
        }).then((result) => {
            if (result.isConfirmed) {
                this.displayChangePwwCA = true;
            }
        });
    }

    onLogin(): void {
        if (this.dapp.user.trim() === '' || this.dapp.user === null) {
            this.onAlertMessage('Error', 'debe ingresar usuario', 'warning');
        } else if (this.AuxPass.trim() === '' || this.AuxPass === null) {
            this.onAlertMessage('Error', 'debe ingresar contraseña', 'warning');
        } else {
            if (this.dapp.user.includes('@')) {
                this.dapp.user = this.dapp.user;
                this.dapp.user = '';
                this.dapp = {
                    mail: this.dapp.user,
                    pass: sha256.hex(this.AuxPass),
                };
                this.ServicesValueData();
            } else {
                this.dapp.mail = '';
                this.dapp = {
                    user: this.dapp.user,
                    pass: sha256.hex(this.AuxPass),
                };
                this.ServicesValueData();
            }
        }
    }

    ServicesValueData(): void {
        this.server.postData(this.dapp).subscribe((res) => {
            const response = res.response;
            const data = res.data;
            const menu = res.permisos;

            if (response.status === 'ok') {
                this.loginService.setAuthenticated(true, 1);
                var ifl = this.loginService.isAuthenticated();

                // var ifl = true
                if (ifl) {
                    localStorage.setItem('dataUSer', JSON.stringify(data));
                    localStorage.setItem('dataPermisos', JSON.stringify(menu));

                    this.rute.navigate(['/']);
                } else {
                    this.onAlertMessage(
                        'Error',
                        'La informacion ingresada no es correcta',
                        'question'
                    );
                }
            } else {
                if (response.status === 'ca') {
                    localStorage.setItem('DataOpt', JSON.stringify(data));
                    this.onAlertMessageCustonCahnPass(
                        'Error',
                        response.mensaje,
                        'error'
                    );
                }
                if (response.status === 'bl') {
                    this.onAlertMessage('Error', response.mensaje, 'error');
                }
                if (response.status === 'no') {
                    this.onAlertMessage('Error', response.mensaje, 'error');
                }
                if (response.status === 'pr') {
                    localStorage.setItem('DataOpt', JSON.stringify(data));
                    this.onAlertMessageCustonCahnPass(
                        'Error',
                        response.mensaje,
                        'success'
                    );
                }
            }
        });
    }

    showDialog() {
        this.display = true;
    }

    onBlur(): void {
        if (this.correo === '' || this.correo === null) {
            this.msmErr = 'El campo no puede ser verificado si esta vacio.';
        } else {
            var evalueCorreo = this.validarCorreo(this.correo);
        }
        this.AnamacionVerificar(evalueCorreo);
    }

    AnamacionVerificar(e: any): void {
        this.anima = false;
        if (e) {
            this.dopp.mail = this.correo;
            this.server.postDataValCorre(this.dopp).subscribe((res) => {
                const response = res['response'].status;
                const data = res['data'];
                if (response === 'ok') {
                    setTimeout(() => {
                        this.anima = true;
                        this.msmErr = null;
                        this.otpView = true;
                    }, 600);
                    localStorage.setItem('DataOpt', JSON.stringify(data));
                    this.dappEmail = {
                        id_usuario: data.id_usuario,
                        nombres: data.nombres,
                        apellidos: data.apellidos,
                        email: data.correo,
                    };

                    this.server
                        .postDataSendCorreo(this.dappEmail)
                        .subscribe((res) => {
                            console.log(res);
                            this.messageOtp = [];
                            this.messageOtp.push({
                                severity: 'info',
                                summary: '',
                                detail: 'Ingrese el código de verificación de cuatro dígitos que hemos enviado a su correo electrónico. ',
                            });
                        });
                } else {
                    setTimeout(() => {
                        this.anima = false;
                        this.msmErr = 'El correo ingresado no es valido.';
                        this.otpView = false;
                    }, 600);
                }
            });
        } else {
            this.msmErr =
                'El correo ingresado no posee @, .com, .co, o punto. Favor verifique';
            setTimeout(() => {
                this.anima = 'err';
                setTimeout(() => {
                    this.anima = false;
                    setTimeout(() => {
                        this.anima = null;
                    }, 900);
                }, 5000);
            }, 600);
        }
    }

    validarCorreo(correo: string): boolean {
        // Expresión regular para validar el formato de un correo electrónico básico
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    validarPassword(password: string): boolean {
        // Verificar longitud
        if (password.length < 8 || password.length > 15) {
            console.log(1);

            return false;
        }

        // Verificar que comience con una letra mayúscula
        if (password[0] !== password[0].toUpperCase()) {
            console.log(2);

            return false;
        }

        // Verificar la presencia de al menos un espacio
        let espacioEncontrado = false;
        for (const char of password) {
            if (char === ' ') {
                espacioEncontrado = true;
                break;
            }
        }

        // Si todas las condiciones se cumplen, la contraseña es válida
        return espacioEncontrado;
    }




    onBourNewPass(): void {
        var valueKey = this.validarPassword(this.AuxPass);
        console.log(valueKey);

        if (valueKey) {
            this.ErrPws = '';
        } else {
            this.ErrPws =
                'La contraseña digitada con cumple con las politicas de seguridad.';
        }
    }

    ErrPws: string;
    ErrPwsR: string;
    messageOtp: Message[] = [];
    messageOtpres: Message[] = [];
    ValidarNuevaClave() {
        const segura = this.validarPassword(this.dappResPass.contrasena);
        if (segura != false) {

            console.log(segura);

            this.messageOtp = [];
            this.messageOtp.push({
                severity: 'error',
                summary: '',
                detail: 'La contraseña digitada no cumple con las politicas de seguridad.',
            });
        }


        else {

            if (this.dappResPass.contrasena.length) {

            }

            if (this.dappResPass.Recontrasena != this.dappResPass.contrasena) {
                this.messageOtp = [];
                this.messageOtp.push({
                    severity: 'error',
                    summary: '',
                    detail: 'La verificación debe ser igual a la contraseña ingresada incialmente',
                });
                // this.ErrPwsR =
                //     'La verificación debe ser igual a la contraseña ingresada incialmente.';
            } else {
                this.ErrPwsR = '';
                var data = JSON.parse(localStorage.getItem('DataOpt'));
                this.dappResPass = {
                    idUsuario: data.id_usuario,
                    contrasena: sha256.hex(this.dappResPass.contrasena),
                };

                this.server
                    .postDataChangePass(this.dappResPass)
                    .subscribe((res) => {
                        const response = res;
                        if (response['status'] === 'ok') {

                            this.onAlertMessage(
                                'Exito',
                                response['mensaje'],
                                'success'
                            );
                            localStorage.setItem('DataOpt', '');
                            this.display = false;
                            this.dappResPass.contrasena = null;
                            this.displayChangePwwCA = false;
                        } else {
                            this.display = false;
                            this.displayChangePwwCA = true;
                            this.dappResPass.contrasena = null;
                            //this.onAlertMessage("Error", response['mensaje'],"error");
                            this.showErrorViaMessages(
                                'Error',
                                'Error Message',
                                response['mensaje']
                            );
                        }
                    });
            }
        }
    }

    validarOptDataSend(): void {
        var dataOpt = JSON.parse(localStorage.getItem('DataOpt'));
        var tk = parseInt(
            this.otpNum.num1 +
                this.otpNum.num2 +
                this.otpNum.num3 +
                this.otpNum.num4
        );
        this.dappotp = {
            idUsuario: dataOpt.id_usuario,
            tokenUsuario: tk,
        };
        this.server.posDataValueOpt(this.dappotp).subscribe((res) => {
            const response = res;

            if (response['status'] === 'no') {

                this.messageOtp.push({
                    severity: 'error',
                    summary: '',
                    detail: response['mensaje'],
                });
                this.DonClass = true;
            } else {
                this.messageOtp = [];
                this.DonClass = false;
                this.otpView = false;
            }
        });
    }

    msgs: Message[] = [];
    showErrorViaMessages(severity: string, summary: string, detail: any) {
        this.msgs = [];
        this.msgs.push({
            severity: severity,
            summary: summary,
            detail: detail,
        });
    }
}
