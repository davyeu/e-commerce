import { AppUser } from './moudles/app-user';
import { UserService } from './user.service';
import { map, switchMap, subscribeOn } from 'rxjs/operators';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase';

let result;
@Injectable(
  //{providedIn: 'root'}
)
export class AdminAuthGuardService implements CanActivate{

  private sub:Subscription;
  private userDetails;
  constructor(private auth:AuthService,
    private userService: UserService) { }
  
    canActivate():Observable<boolean>{ 
      let obsBoolean:Observable<boolean>;
      let obsAppUser:Observable<AppUser>;
      
      obsAppUser= this.auth.user$.pipe(switchMap(
        user=>{
          return this.userService.get(user.uid).valueChanges();
        }));
     
      obsBoolean=obsAppUser.pipe(map(
        appUser=>{return appUser.isAdmin}));
        return obsBoolean;
        
    }
    
}