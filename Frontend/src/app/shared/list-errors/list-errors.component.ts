import { Component, OnInit, Input } from '@angular/core';

import { Errors } from '../../core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})

export class ListErrorsComponent {

  formattedErrors: Array<string> = [];
  
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.error || {})
      .map(key => `${key} ${errorList.error[key]}`);
      console.log(this.formattedErrors);
  }

  get errorList() { return this.formattedErrors; }

  trackByFn(index:any, item:any) {
    return index;
  }
}