import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders , HttpParams} from '@angular/common/http' ;
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root'
})

 export class UserService {
  private url = 'http://localhost:3000/users/';




  constructor(private http : HttpClient) { }

  signup(body:any){

    return this.http.post('http://localhost:3000/users/signup' , body  , {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
                             .set('Accept', 'application/json')
                             .set('Access-Control-Allow-Headers', 'Content-Type')
});

  }


   login(body:any){

    return this.http.post('http://localhost:3000/users/login' , body  , {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
                             .set('Accept', 'application/json')
                             .set('Access-Control-Allow-Headers', 'Content-Type')
});

  }



  Activation(token : HttpParams)
  
  {
   
    return this.http.put('http://localhost:3000/users/activated/'+token , {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
                             .set('Accept', 'application/json')
                             .set('Access-Control-Allow-Headers', 'Content-Type')
    });

  }


    getUserByUsername(uname : string) {
      return this.http.get<any[]>(`${this.url}username/${uname}`);

    }


}