import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  boton_login: boolean = false;
  authType: boolean = false;

  ruta_boton!: string | null;

  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private ActivateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
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
      this.authType = true;
    }else{
      this.boton_login = false;
      this.authType = false;
    }



    

    console.log(this.ruta_boton);
  }

  submitForm() {

  }
}
