// import { InterceptorModule } from './interceptor.module';
import { UserService } from './../services/user.service';
import { SignupComponent } from './signup/signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http' ;
import { CustomFormsModule } from 'ng2-validation' ;
import { ReactiveFormsModule } from '@angular/forms';
import {UniqueUsernameValidatorDirective} from './../services/user-unique-validator.directive';
import { LoginComponent } from './login/login.component';
import { MyElementDirective } from './my-element.directive';
import { ServiceComponent } from './service/service.component'




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    UniqueUsernameValidatorDirective,
    LoginComponent,
    MyElementDirective,
    ServiceComponent
  
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // InterceptorModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([

      {path : '' , component : HomeComponent  },
      {path :'signup' ,  component : SignupComponent },
       {path :'login' ,  component : LoginComponent },
      {path :'service/:id' ,  component : ServiceComponent },


    ])
  ],
  providers: [

    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
