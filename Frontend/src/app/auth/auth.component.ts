import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  boton_login: boolean = false;
  errors: Errors = {errors: {}};
  // errors!: String;
  isSubmitting = false;
  authType: String = '';
  ruta_boton!: string | null;
  authForm: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private ActivateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.ruta_boton = this.ActivateRoute.snapshot.url[0].path;

    if(this.ruta_boton === 'register'){
      this.boton_login = true;
      this.authType = 'register';
      this.authForm.addControl('username', new FormControl('', Validators.required));
    }else{
      this.boton_login = false;
      this.authType = 'login';
    }

  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    // this.errors = ''
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data:any) => this.router.navigateByUrl('/'),
      (err:any) => {
        this.isSubmitting = false;
        this.errors = err;
        console.log(this.errors);
        this.cd.markForCheck();

        // const errorResponse = new HttpErrorResponse({
        //   error: 'Internal Server Error',
        //   status: 500,
        //   statusText: 'Server Error'
        // });
        
        // throw errorResponse;
      }
    );
  }


}
