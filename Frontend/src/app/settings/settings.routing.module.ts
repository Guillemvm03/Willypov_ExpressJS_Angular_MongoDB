import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
    { 
      path: 'settings',
      component: SettingsComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule{}