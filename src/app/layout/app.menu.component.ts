import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {


    menu: any = localStorage.getItem('dataPermisos');
    model: any[];

    constructor(public layoutService: LayoutService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.model =
        [
                    {
                        label: 'Inicio',
                        items: [
                            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                        ]
                    }

            ]
        const MenuItem = JSON.parse(this.menu);

        let itemss: any[] = []


        for (const menuItem of MenuItem) {
            const modelItem = {
                label: menuItem.label,
                items: [

                ]
            };



            for (const subItem of menuItem.items) {

                        for (const subMenu of subItem.items) {

                            if (subMenu.id_padre === subItem.id.toString()) {
                                itemss.push({
                                  label: subMenu.label,
                                  icon: subMenu.icon,
                                  routerLink: subMenu.routerLink,
                                  queryParams: { md: subMenu.label }
                                });
                              }else{}
                        }

                        if (subItem.items.length > 0) {
                            modelItem.items.push({
                                label: subItem.label,
                                icon: subItem.icon,
                                items : itemss,
                                routerLink:  subItem.routerLink,
                                queryParams: { md: subItem.label }
                            });
                        }else{
                            modelItem.items.push({
                                label: subItem.label,
                                icon: subItem.icon,
                                routerLink:  subItem.routerLink,
                                queryParams: { md: subItem.label }
                            });
                        }



            }


            this.model.push(modelItem);
            localStorage.setItem('Menu_System', JSON.stringify(this.model));
        }




    // console.log(this.model);


    }

    isActive(menuItem: any): boolean {
        const currentParams = this.route.snapshot.queryParams;
        const currentRoute = this.router.url;

        if (menuItem.routerLink === currentRoute && this.matchQueryParams(menuItem.queryParams, currentParams)) {
          return true;
        }

        if (menuItem.items) {
          return menuItem.items.some(subItem => this.isActive(subItem));
        }

        return false;
      }

      private matchQueryParams(expected: any, actual: any): boolean {
        if (!expected) {
          return true; // No se especificaron parámetros esperados
        }

        return Object.keys(expected).every(key => actual[key] === expected[key]);
      }



}
