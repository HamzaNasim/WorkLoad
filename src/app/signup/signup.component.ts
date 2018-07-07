import { UserService } from './../../services/user.service';
import { User } from './../../services/user-model';
import {HttpClient , HttpHeaders} from '@angular/common/http' ;
import { Validators, FormBuilder, FormGroup, FormControl  , NgForm} from '@angular/forms';



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  user = {} ;
  mess ;
  resMes;
  failMes ;

  constructor(private userService : UserService) { 

   
    
  }



  ngOnInit() {
  }


  save(registrationForm : NgForm){
    console.log('sign up');
    console.log(JSON.stringify(this.user));
    
  
 
    this.userService.signup(JSON.stringify(this.user))
    .subscribe(

      data => {

        if(data['code'] === 200 ){

           this.resMes = data['message'] ;
           registrationForm.resetForm();

        }

        else {

        this.failMes = data['message'] ;
        console.log(data);
        }

      }


    )
    
    }

    getRevision(){

      this.user['FName'] = '' ;
   
                // <-------reset form here
}


}
