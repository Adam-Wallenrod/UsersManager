import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { User } from './user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class UsersService {
  usersUrl = 'api/users';
  //private handleError: HandleError;

  constructor( private http: HttpClient) { }

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        //catchError(this.handleError('getUsers', []))
      );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<User[]>(this.usersUrl, options)
      .pipe(
        //catchError(this.handleError<User[]>('searchUsers', []))
      );
  }

  searchUserById(id: number): Observable<User> {

    return this.http.get<User>(this.usersUrl + "/" + id)
  }

  //////// Save methods //////////

  /** POST: add a new user to the database */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('addUser', user))
      );
  }

  /** DELETE: delete the user from the server */
  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; // DELETE api/users/42
    return this.http.delete(url, httpOptions)
      .pipe(
        //catchError(this.handleError('deleteUser'))
      );
  }

  /** PUT: update the user on the server. Returns the updated user upon success. */
  updateUser (user: User): Observable<User> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(this.usersUrl, user, httpOptions)
      .pipe(
        //catchError(this.handleError('updateUser', user))
      );
  }
}
