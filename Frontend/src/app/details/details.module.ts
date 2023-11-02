import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
// import { DetailsCommentComponent } from './details-comment.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DetailsRoutingModule, 
    ],
    declarations: [
        DetailsComponent
        // DetailsCommentComponent
    ],
    providers: [
    ],
})

export class DetailsModule { }