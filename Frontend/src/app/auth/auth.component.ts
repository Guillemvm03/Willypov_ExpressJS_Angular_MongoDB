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
  authType: String = '';
  errors: Errors = {errors: {}};
  ruta_boton!: string | null;

  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private ActivateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.authForm = this.fb.group({
      'username': [''],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.ruta_boton = this.ActivateRoute.snapshot.url[0].path;

    if(this.ruta_boton == 'register'){
      this.boton_login = true;
      this.authType = 'register';
    }else{
      this.boton_login = false;
      this.authType = 'login';
      
    }
    // console.log(this.ruta_boton);
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    // console.log(credentials);
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => this.router.navigateByUrl('/home'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }


//   submitForm() {
//     this.isSubmitting = true;
//     const credentials = this.authForm.value;

//         this.userService.attemptAuth(this.authType, credentials).subscribe(
//         (data:any) => {
//             if(this.authType === 'login'){
//                 this.router.navigateByUrl('/');
//             } else if(this.authType === 'register'){
//                 this.router.navigateByUrl('/login');
//             }
//         },
//         (err:any) => {
//           const errorResponse = new HttpErrorResponse({
//             error: 'Internal Server Error',
//             status: 500,
//             statusText: 'Server Error'
//           });
          
//           throw errorResponse;
//         }
//         );
    
// }


}
