import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { User } from '../core/models/user.model';
import { Router, ActivatedRoute} from '@angular/router';
import { JwtService } from '../core/services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm!: FormGroup;
  isSubmitting = false;

  

  constructor(
    private userService: UserService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private jwtService: JwtService,
    private fb: FormBuilder,
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: ['', Validators.required],
      bio: '',
      email: ['', Validators.required],
      password: ''
    });
  }

  ngOnInit(): void {
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe(
      (updatedUser:any) => this.router.navigateByUrl('/'),
      (err:any) => {
        this.isSubmitting = false;
        const errorResponse = new HttpErrorResponse({
          error: 'Internal Server Error',
          status: 500,
          statusText: 'Server Error'
        });
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
