import { Component, OnInit } from '@angular/core';
import {HttpClient , HttpHeaders , HttpParams} from '@angular/common/http' ;
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor() { 

     

  }

  ngOnInit() {
  }

}
