import { NgModule } from '@angular/core';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared';
import { SettingsRoutingModule } from './settings-routing.module';

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
export class SettingsModule {}
