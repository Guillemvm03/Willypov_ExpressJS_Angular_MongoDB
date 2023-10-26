import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing.module';
import { SharedModule } from '../shared';
import { AuthGuard } from '../core/guards/auth-guard.service';




@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class SettingsModule { }
