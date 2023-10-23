import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';

import { User } from '../models';

const URL = 'http://localhost:8080/api/users';
const URL_get = 'http://localhost:8080/api/user';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }


    populate() {
      // If JWT detected, attempt to get & store user's info
      
      const token = this.jwtService.getToken();

      if (token) {
        this.http.get(`${URL_get}`).subscribe(
          (data:any) => {
            return this.setAuth({ ...data.user, token });
            console.log(data);
          },
          (err) => this.purgeAuth()
        );
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
      }
    }


    setAuth(user: User) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
      }
    
      purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
      }

    attemptAuth(type:any, credentials:any): Observable<User> {
      
      const route = (type === 'login') ? 'login' : '';
      
        return this.http.post<User>(`${URL}/${route}`, credentials)
          .pipe(map(
          (data:any) => {
            this.setAuth(data.user);
            return data;
          }
        ));
      }
      
      getCurrentUser(): User {
        return this.currentUserSubject.value;
      }
    
      // Update the user on the server (email, pass, etc)
      update(user:any): Observable<User> {
        return this.http.put(`${URL_get}`, user ).pipe(map(
          (data:any) => {
          // Update the currentUser observable
          this.currentUserSubject.next(data.user);
          return data.user;
        }));
      }
   
}
