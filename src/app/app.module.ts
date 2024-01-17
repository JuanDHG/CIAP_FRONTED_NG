import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { LoginService } from './guards/login.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        HttpClientModule,
        AppRoutingModule,
        AppLayoutModule,
        CardModule,
        ButtonModule,
        DropdownModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        FormsModule,
        LoginGuard,
        LoginService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
