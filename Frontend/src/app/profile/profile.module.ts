import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
// import { ProfileFollowsComponent } from './profile-follows/profile-follows.component';
@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    CommonModule
  ],
  declarations: [
    ProfileComponent,
    // ProfileFollowsComponent,
  ],
  providers: [
  ]
})
export class ProfileModule {}
