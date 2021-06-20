import { UserService } from './user.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from './moudles/app-user';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable(
  //{providedIn: 'root'}}
  )
export class AuthService {

  router:Router
   user$:Observable<firebase.User>
   obsAppUser:Observable<AppUser>;

  constructor(private afAuth:AngularFireAuth,
    private userService:UserService,
    private route: ActivatedRoute,) {
    this.user$=afAuth.authState;
   this.obsAppUser=this.appUser();
   
   }

  login(){
    //log in and redirect us to the requested component
    let returnUrl= this.route.snapshot.queryParamMap.
    get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect
    (new firebase.auth.GoogleAuthProvider())
    .then((val:void)=>{this.router.
      navigate([returnUrl])});
    
  }
  logOut(){
    this.afAuth.auth.signOut();
  }

   appUser():Observable<AppUser>{
      this.obsAppUser= this.user$.pipe(switchMap(
        user=>{
          if(user)
            {return this.userService.get(user.uid)
              .valueChanges();}
              return of(null);
        }));
        return this.obsAppUser;
  }
}
