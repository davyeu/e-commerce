import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
//import 'rxjs/add/operator/map'

@Injectable(
 // {providedIn: 'root'}
  )
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,
    private auth:AuthService) { }

    // cheak whether the user have the authoretiy to enter to the request commponent
  canActivate(route,state:RouterStateSnapshot){
    return this.auth.user$.pipe(map( user =>{
      if (user) return true;

      this.router.navigate(['/login'],
    {queryParams: {returnUrl:state.url}} 
    // if the user tries to enter to sepcefic url 
    // we redirect him to requested url.
      );
      return false;
    }));
    
   
  }
}
