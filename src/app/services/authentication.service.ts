import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from 'src/app/app-config'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api: string = API;
  constructor(private http: HttpClient) { }

  public get currentUserValue() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  login(email: string, password: string) {
    console.log(email, password)
    return this.http.post<any>(`${this.api}/login`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user)
          localStorage.setItem('currentUser', JSON.stringify(user));
          //this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
