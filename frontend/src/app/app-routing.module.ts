/**
 * Created by Anastasiia on 10.03.2018.
 */

import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { SinginComponent } from './components/singin/singin.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';



const appRoutes: Routes = [
  {
    path: 'register',
    component: SinginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'dashboard',
    component: UserPanelComponent,
    canActivate: [AuthGuard]

  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [NotAuthGuard],
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
    data: {
      externalUrl: 'https://akostiv8.github.io/MakerSpace_Graduation/UI/'
    }
  },


  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
