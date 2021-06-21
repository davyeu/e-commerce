import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService,
    private router: Router,private UserService:UserService){
      auth.user$.subscribe(user =>{
        if (user) { // if the user is log in
          //insert user details to the fireBase database and also to the local storage 
          UserService.save(user);
          localStorage.setItem('userId',user.uid);
          
        }
      })
    }
}
