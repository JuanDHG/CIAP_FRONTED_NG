import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { CountryService } from './core/service/country.service';
import { EventService } from './core/service/event.service';
import { IconService } from './core/service/icon.service';
import { NodeService } from './core/service/node.service';
import { PhotoService } from './core/service/photo.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { LoginService } from './guards/login.service';
import { CardModule } from 'primeng/card';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        HttpClientModule,
        AppRoutingModule,
        AppLayoutModule,
        CardModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, EventService, IconService, NodeService,
        PhotoService, FormsModule,
        LoginGuard, LoginService  
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
