import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import {HttpClient , HttpHeaders} from '@angular/common/http' ;
import {ActivatedRoute , Router} from "@angular/router";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  
  user = {} ;
  failMess ;
  succMess ;
  constructor(private userService : UserService ,private router: Router) { 

    
  }

  ngOnInit() {
  }

   
   login(){
    
    console.log(JSON.stringify(this.user));
 
    this.userService.login(JSON.stringify(this.user))
    .subscribe(

      data => {

        if(data['code'] === 200 ){


          console.log('succes');
          
         this.succMess = data['message'];
          setTimeout((router) => {
            this.router.navigate(['signup']);
          }, 2000);  //5s

        }

        else{

           this.failMess = data['message'];


        }
       
         
        console.log(data);

      }
)}

}
