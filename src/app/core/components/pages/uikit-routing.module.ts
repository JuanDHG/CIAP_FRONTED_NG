import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'roles', data: { breadcrumb: 'roles' }, loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
        { path: 'gerencia', data: { breadcrumb: 'gerencia' }, loadChildren: () => import('./pasametros/gerencia/gerencia.module').then(m => m.gerenciaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
