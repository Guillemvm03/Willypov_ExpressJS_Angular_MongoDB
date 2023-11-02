import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';

const URL_comment = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // add(slug:any, payload:any): Observable<Comment> {
  //   return this.http.post<{comment: Comment}>(URL_comment + `${slug}/comments`,{ comment: { body: payload } }
  //   ).pipe(map(data => data.comment));
  // }

  // getAll(slug:any): Observable<Comment[]> {
  //   return this.http.get<{comments: Comment[]}>(URL_comment + `${slug}/comments`)
  //     .pipe(map(data => data.comments));
  // }

  // destroy(commentId:any, articleSlug:any) {
  //   return this.http.delete(URL_comment + `/${articleSlug}/comments/${commentId}`);
  // }

  add(slug: String, data: any): Observable<Comment> {
    return this.apiService.post(`${slug}/comments`, { comment: data }).pipe(map(data => data.comment));
}

  get_all(slug: String): Observable<Comment[]> {      
    return this.http.get<Comment[]>(`${URL_comment}/${slug}/comments`);
}

  destroy(slug:String, id: String) {
    return this.apiService.delete(`${slug}/comments/${id}`);
}
}
