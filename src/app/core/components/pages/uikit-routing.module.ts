import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'roles', data: { breadcrumb: 'roles' }, loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
        { path: 'parametrizacion', data: { breadcrumb: 'gerencia' }, loadChildren: () => import('./parametros/parametros.module').then(m => m.gerenciaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
