import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { SinginComponent } from './components/singin/singin.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { NavbarComponent } from './components/user-panel/navbar/navbar.component';
import { DiagramComponent } from './components/user-panel/diagram/diagram.component';
import { PowerButtonComponent } from './components/user-panel/power-button/power-button.component';
import { StatusComponent } from './components/user-panel/status/status.component';
import { DangerousComponent } from './components/user-panel/dangerous/dangerous.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    LoginComponent,
    DashboardComponent,
    UserPanelComponent,
    NavbarComponent,
    DiagramComponent,
    PowerButtonComponent,
    StatusComponent,
    DangerousComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
