import { product } from './../moudles/product';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap, subscribeOn } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { IpServiceService } from '../ip-service.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy,OnInit{
  public products$;
  public categories$;
  public chosenCategory;
  public orders$:Subscription;
  public quantity;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  ipAddress:string;
  
  public firstTime:boolean=true; // first time enter to commponent


  
  constructor(private db:AngularFireDatabase,private ip:IpServiceService,
    private route:ActivatedRoute) {
    this.route.queryParamMap.subscribe(param=>{
     this.chosenCategory=param.get("category");
    });
    this.products$=this.db.object('/product/').valueChanges();
    this.categories$=this.db.list('/categories').valueChanges();
    
    this.itemsRef=this.db.list('/orders');
    this.items=this.itemsRef.snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({  key: c.payload.key, ...c.payload.val() }))
      
    ));
   }

  ngOnInit(): void {
    this.getIP();  
  } 

  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip; 
      this.db.list('/orders/').push({
        ipAddress: this.ipAddress,
        dateCreated: new Date().toString()
      })      
    }); 
  }  
  
   firstUpdate(product,cnt){
     let temp=localStorage.getItem(product.key);
     if(temp){
       return temp
     }
     else{
       return cnt;
     }
   }

   pushOrders(product){
     this.db.object('/orders/'+product.key).set({
       Name:product.value,
       cnt:1
     })
   }

   
   update(cardInput:any,product){ // update firebase database and return current counter
     let cnt=cardInput.counter;
     if(cnt>0){
      this.db.list('/orders').
      update(product.key, {cnt: cnt.toString() })
     }
     else{ //if counter == 0
      if(localStorage.getItem(product.key)){
        localStorage.removeItem(product.key)
      }
        this.db.object('/orders/'+product.key).remove();
      
     }
   }
   
   log(x){
     console.log(x);
   }
   
   ngOnDestroy(): void { //saving shopping cart orders in local storage
    
   this.items.subscribe(orders=>{
     for(let i=0;i<orders.length;i++){
       localStorage.setItem(orders[i].key,orders[i].cnt);
       // order[i].key is equalvlent to product.key
     }
  }) 
  
    }
}
