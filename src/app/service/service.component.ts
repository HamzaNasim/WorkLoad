import { Component, OnInit } from '@angular/core';
import {HttpClient , HttpHeaders , HttpParams} from '@angular/common/http' ;
import { UserService } from './../../services/user.service';
import {ActivatedRoute , Router} from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  resMessage ;
  failMessage;

  constructor(private userService : UserService , private route : ActivatedRoute , private router: Router) { 

    var par = this.route.params.subscribe( params => console.log(params));
    
 
    
  }

  ngOnInit() {

      var routeParams = this.route.snapshot.params;
      console.log(routeParams.id);
      
 
    this.userService.Activation(routeParams.id)
    .subscribe(

      data => {

         if(data['success'] === true ){
           console.log(data);
           this.resMessage = data['message'];
           setTimeout((router) => {
            this.router.navigate(['login']);
          }, 4000);  //4s
         }

         else {

           this.failMessage = data['message'];
           setTimeout((router) => {
             this.router.navigate(['signup']);
           }, 8000);  //8s


         }
        
    // this.userService.Activation();
    });

  }
}