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
        if (user) {
          //insert user details to the database
          UserService.save(user);
          localStorage.setItem('userId',user.uid);
          
        }
      })
    }
}
