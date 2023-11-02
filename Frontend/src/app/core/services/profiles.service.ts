import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

const URL_profile = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  get(username: string): Observable<Profile> {
    return this.http.get<{profile: Profile}>(URL_profile + username)
      .pipe(map((data) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.http.post<Profile>( URL_profile +  username + '/follow', {});
  }

  unfollow(username: string): Observable<Profile> {
    return this.http.delete<Profile>( URL_profile +  username + '/follow', {})
  }

}
