import { element } from 'protractor';
import { product } from './../moudles/product';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map, switchMap, subscribeOn } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { IpServiceService } from '../ip-service.service';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnDestroy,OnInit{
  public products$;
  public categories$;
  public chosenCategory;
  public customerItems:any[]=[]
  public customerItemsKeys=[];
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  public  customerkey:string;
  public items$;
  public itemsRef$;
  customerItems$
  public screenWidth=window.innerWidth
  public numOfCol=2;
 
  constructor(private db:AngularFireDatabase,
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
   
    let flag:boolean=false;
    this.items.subscribe(keys=>{
      if(localStorage.getItem('customerKey')){
       
        //cheak if the customerKey exist in the database
        for(let i=0;i<keys.length;i++){
          if (keys[i].key==localStorage.getItem('customerKey')){
            this.items$=keys[i]
            this.customerkey=keys[i].key
              flag=true;
          }
        }
        if(flag==false){
          localStorage.removeItem('customerKey')}
        else{
          let itemsRef:AngularFireList<any>=this.db.list('/orders/'+this.customerkey+'/items/');
          if(itemsRef){ // if the client have exsit order in the db
             let customerItems:Observable<any[]>=itemsRef.snapshotChanges().pipe(
               map(changes =>changes.map(c => 
                 ({  key: c.payload.key, ...c.payload.val() }))));
             this.customerItems$=customerItems.subscribe((items:any) =>{
               this.customerItems=items;
             })
          }
        } 
    }
    })

    if(!localStorage.getItem('customerKey')){
      this.db.list('/orders/').push({
        dateCreated: new Date().toString(),          
      }).then(customer=>{
        this.customerkey=customer.key;
        localStorage.setItem('customerKey',this.customerkey);})
     }
    
  
  }  
  
  onResize(event) {
    this.screenWidth=event.target.innerWidth;
    //console.log("screen width",this.screenWidth)

    if(this.screenWidth<700)this.numOfCol=1;
    else this.numOfCol=2
  }

  getQuantity(product,cnt?){
    for(let i=0; i<this.customerItems.length;i++){
      if(this.customerItems[i].key==product.key){
        return this.customerItems[i].cnt
      }
    }
   return cnt || 0;
  }


   pushOrders(product){
     this.db.object('/orders/'+this.customerkey+'/items/'+product.key).set({
       Name:product.value,
       cnt:1
     })
   }

   
   update(cardInput:any,product){ // update firebase database and return current counter
     let cnt=cardInput.counter;
     if(cnt>0){
      this.db.list('/orders/'+this.customerkey+'/items/').
      update(product.key, {cnt: cnt.toString() })
     }
     else{ //if counter == 0
        this.db.object('/orders/'+this.customerkey+'/items/'+product.key).remove();
      
     }
   }
   
   log(x){
     console.log(x);
   }
   
   ngOnDestroy(): void {
    
   }
}
