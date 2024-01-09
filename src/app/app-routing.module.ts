import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,   canActivate: [LoginGuard],
        children: [
            { path: '', loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'home', loadChildren: () => import('./core/components/pages/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./core/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
        ]
    },
    { path: 'auth', loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent,   canActivate: [LoginGuard]},
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
