import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map, combineAll } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnDestroy {

  public orderSub:Subscription;
  public orderObs;
  public  orderCnt:string='0';
  public orderDb;
  public static NavBarcommponent:boolean=false;
  constructor(public auth: AuthService,
    public db:AngularFireDatabase) {
      this.orderDb=this.db.list('\orders');
        this.orderObs=this.orderDb.valueChanges();
    this.orderSub=this.db.list('\orders').valueChanges()
    .subscribe(order=>{
      let temp:any=Object.values(order);
      let localCnt=0;
      for(let i=0;i<temp.length;i++){
        localCnt=localCnt+parseInt(temp[i].cnt);
      }
      this.orderCnt=localCnt.toString();
    })

    
  }
  log(x){
    console.log(x);
  }
  update(items){
    for(let i=0;i<items.length;i++){
      //this.counter+=items[i].value.cnt;
    }
  }
    logOut(){
     this.auth.logOut();
   }
   ngOnDestroy(): void {
      this.orderSub.unsubscribe();
      NavbarComponent.NavBarcommponent=true;
    }
  }

