import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'roles', data: { breadcrumb: 'roles' }, loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
        { path: 'parametrizacion', data: { breadcrumb: 'gerencia' }, loadChildren: () => import('./parametros/parametros.module').then(m => m.gerenciaModule) },
        // { path: 'gerencia', data: { preload: true }, loadChildren: () => import('./parametros/tables/gerencia/gerencia.component').then(c => c.GerenciaComponent) },
        // { path: 'direccion', data: { preload: true }, loadChildren: () => import('./parametros/tables/direccion/direccion.component').then(c => c.DireccionComponent) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
