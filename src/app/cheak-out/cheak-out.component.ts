import { Order } from './../moudles/order';
import { AppUser } from './../moudles/app-user';
import { Subscription, PartialObserver, } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { timer, combineLatest } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cheak-out',
  templateUrl: './cheak-out.component.html',
  styleUrls: ['./cheak-out.component.css']
})
export class CheakOutComponent implements OnDestroy {

  user$
  Order$
  combinedObs$:Subscription;
  constructor(private UserService:UserService,
    private db:AngularFireDatabase,
    private router:Router) { }
  

 log(x){
    console.log(x);
  }

 removeItem(htmlItem:any){
   if(htmlItem){
    htmlItem.nativeElement.remove();
   }
  }

   placeOrder(){
    let userId=localStorage.getItem('userId');
    let customerKey=localStorage.getItem('customerKey');
    this.user$=this.UserService.get(userId).valueChanges();
    this.Order$=this.db.object('/orders/'+customerKey)
    .valueChanges();
    this.combinedObs$=combineLatest(this.user$,this.Order$).
    subscribe(combined=>{
     this.db.list('/transactions/'+userId+'/').push(
        combined).then(transaction=>{
            //router navigate to 'order success' router
          this.router.navigate(['/order-success',transaction.key])
        })
      
      }
        );
   
   }


   ngOnDestroy(): void {
    let customerKey=localStorage.getItem('customerKey');
    if(this.combinedObs$){
      this.combinedObs$.unsubscribe();
      this.Order$=this.db.list('/orders/'+customerKey).remove()
    }
  }
 }


