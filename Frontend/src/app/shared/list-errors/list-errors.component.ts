import { Component, OnInit, Input } from '@angular/core';

import { Errors } from '../../core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})

export class ListErrorsComponent {

  formattedErrors: Array<string> = [];
  // @Input() errors: Errors = {} as Errors;
  // @Input() errors: Errors = {errors: {}};

  // constructor() { }

  // ngOnInit(): void {
  //   console.log(this.errors);

  // }

  @Input()
  set errors(errorList: any) {
    // console.log(Object.keys(errorList.error || {}));
    // errorList=errorList.error.message
    this.formattedErrors = errorList.error.message;
    // Object.keys(errorList.errors || {})
    //   .map(key => `${key} ${errorList.errors[key]}`);
      console.log(this.formattedErrors)
  }
  
  // @Input()
  // set errors(errorList: HttpErrorResponse) {
  //   console.log(errorList);
  //   const errorMessage = errorList.error.message;
  //   console.log(errorMessage);
  // }

  get errorList() { return this.formattedErrors; }

  trackByFn(index:any, item:any) {
    return index;
  }
}