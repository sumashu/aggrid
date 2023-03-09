import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL:string='http://localhost:3000/enquiry';
  constructor(private http:HttpClient) { }

  postRegistartion(registerObj:User){
     return this.http.post<User>(`${this.baseURL}`,registerObj);
  }

  getRegisterUser(){
    return this.http.get<User[]>(`${this.baseURL}`);
  }
  updateRegisterUser(registerObj:User , id:number){
    return this.http.put<User>(`${this.baseURL}/${id}`,registerObj);
  }
  deleteRegistered(id:number){
    return this.http.delete<User>(`${this.baseURL}/${id}`);
  }
  getRegisterUserId(id:number){
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }
}
