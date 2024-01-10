import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {


    menu: any = localStorage.getItem('dataPermisos');
    model: any[];

    constructor(public layoutService: LayoutService) {
        
    }

    ngOnInit() {
        this.model = 
        [
                    {
                        label: 'Inicio',
                        items: [
                            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                            { label: 'Icon', icon: 'pi pi-microsoft', routerLink: ['/utilities/icons'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } }
                        ]
                    }        

            ]
        const MenuItem = JSON.parse(this.menu); 

        

        for (const menuItem of MenuItem) {
            const modelItem = {
                label: menuItem.label,
                items: []
            };
        
            for (const subItem of menuItem.items) {
                
                modelItem.items.push({
                    label: subItem.label,
                    icon: subItem.icon,
                    routerLink:  subItem.routerLink,
                    queryParams: { md: subItem.label }              
                });
                console.log(subItem.routerLink)
            }


        
            this.model.push(modelItem);
        }



        
    console.log(this.model);
    
        
    }

}
// [
//     {
//         label: 'Home',
//         items: [
//             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
//         ]
//     },
//     {
//         label: 'Configuración',
//         items: [

//             { label: 'roles', icon: 'pi pi-tags', routerLink: ['/home/roles'] },
//             { label: 'Icon', icon: 'pi pi-microsoft', routerLink: ['/utilities/icons'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

//         ]
//     },
//     {
//         label: 'Parametrización',
//         items: [

//             { label: 'gerencia', icon: 'pi pi-briefcase', routerLink: ['/home/gerencia'] },
//         ]
//     },

// ];

// {
//     label: 'Pages',
//     icon: 'pi pi-fw pi-briefcase',
//     items: [
//         {
//             label: 'Landing',
//             icon: 'pi pi-fw pi-globe',
//             routerLink: ['/landing']
//         },
//         {
//             label: 'Auth',
//             icon: 'pi pi-fw pi-user',
//             items: [
//                 {
//                     label: 'Login',
//                     icon: 'pi pi-fw pi-sign-in',
//                     routerLink: ['/auth/login']
//                 },
//                 {
//                     label: 'Error',
//                     icon: 'pi pi-fw pi-times-circle',
//                     routerLink: ['/auth/error']
//                 },
//                 {
//                     label: 'Access Denied',
//                     icon: 'pi pi-fw pi-lock',
//                     routerLink: ['/auth/access']
//                 }
//             ]
//         },
//         {
//             label: 'Crud',
//             icon: 'pi pi-fw pi-pencil',
//             routerLink: ['/pages/crud']
//         },

//     ]
// },