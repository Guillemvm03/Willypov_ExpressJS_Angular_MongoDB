import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject} from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

import { User } from '../models';

const URL = 'http://localhost:8080/api/users';
const URL_user = 'http://localhost:8080/api/user';

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
        private jwtService: JwtService
        ) { }


    attemptAuth(type:any, credentials:any): Observable<User> {
        // console.log(type, credentials);
        const route = (type === 'login') ? 'login' : '';
        return this.http.post<User>(`${URL}/${route}`,  credentials)
          .pipe(map(
          (data:any) => {
            this.setAuth(data.user);
            return data;
          }
        ));
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


      populate() {
        // If JWT detected, attempt to get & store user's info
        const token = this.jwtService.getToken();
        if (token) {
            // console.log(token);
          this.http.get<User>(`${URL_user}`).subscribe(
            (data:any) => {
              return this.setAuth(data.user);
            },
            (err) => this.purgeAuth()
          );
        } else {
          // Remove any potential remnants of previous auth states
          this.purgeAuth();
        }
      }


      update(user : User): Observable<User> {
        console.log(user);
        
        return this.http.put<User>(`${URL_user}`,  { user } )
        .pipe(map(data => {
          // Update the currentUser observable
          this.currentUserSubject.next(user);
          return data;
        }));
      }


      getCurrentUser(): User {
        return this.currentUserSubject.value;
      }
}




