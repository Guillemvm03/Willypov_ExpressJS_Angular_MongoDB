import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { ProfileProductsComponent } from '../shared/profile-products/profile-products.component'; 
// import { ProfileFavoritesComponent } from './profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileFollowsComponent } from '../shared/profile-follows/profile-follows.component';
import { ProfileFavoritesComponent } from '../shared/profile-favorites/profile-favorites.component';
// import { AuthGuard } from '../core/guards/auth.guard.service.ts';

const routes: Routes = [
{

    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },

          
     children: [
      {
        path: 'follows/:username',
        component: ProfileFollowsComponent,
        resolve: {
          profile: ProfileResolver
        },
      },

      { 
      path: '', 
      component: ProfileProductsComponent 
      },
      { path: 'favorites', 
      component: ProfileFavoritesComponent
      // canActivate: [AuthGuard], 
    }
      
    ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
