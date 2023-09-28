import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
// import { ArticleResolver } from './article-resolver.service';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {},
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}