import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Directive ,  forwardRef} from "@angular/core";
import {AsyncValidator , AbstractControl , ValidationErrors , NG_ASYNC_VALIDATORS} from "@angular/forms";

@Directive({

    selector:'[uniqueUser] [ngModel]]',
    providers : [{provide: NG_ASYNC_VALIDATORS , useExisting : forwardRef(() => UniqueUsernameValidatorDirective) , multi : true}]
})

export class UniqueUsernameValidatorDirective implements AsyncValidator{


    constructor(private userService : UserService){}

    validate(c : AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> { 

        return this.userService.getUserByUsername(c.value).pipe(

            map(users => {

                return users  ? {'uniqueUser' : true } : null ;


            })
        );
    }


}