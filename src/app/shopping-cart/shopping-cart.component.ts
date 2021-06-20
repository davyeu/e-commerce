
import { Subscription, Observable } from 'rxjs';
import { map, switchMap, subscribeOn } from 'rxjs/operators';
import { product } from './../moudles/product';
import { element } from 'protractor';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HomeComponent } from '../home/home.component';

export interface order {
  image;
  product;
  quantity;
  price;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements AfterViewInit {
  @ViewChild('CheakOutBtn') CheakOutBtn: ElementRef;
  @ViewChild('clearBtn') clearBtn: ElementRef;
  public orderObs:Subscription;
  public dataSource;
  public elements:order[]=[];
  public elems:any;
  @Input('displayedColumns')displayedColumns: string[] = ['image','product', 'quantity','price'];
  @Input('clearBtn')clearBtnInput;
  @Input('CheakOutBtnInput')CheakOutBtnInput;
  temp;
  NumOfProduct=0;
  totalCost=0;
  customerKey:string;

  constructor(private db:AngularFireDatabase){
    this.customerKey= localStorage.getItem("customerKey");
    this.orderObs=db.list('/orders/'+ this.customerKey+'/items/').valueChanges()
    .subscribe(items=>{
      this.elems=items;
      let keys= Object.keys(this.elems);
      this.NumOfProduct=0;
      this.totalCost=0;
      for( let i=0;i<keys.length;i++){
        this.NumOfProduct+=parseInt(this.elems[i].cnt);
        this.totalCost+=parseInt(this.elems[i].Name.price)*parseInt(this.elems[i].cnt);
        this.temp=this.elems[i].Name.imageURL;
        this.elements.push({
          image:this.elems[i].Name.imageURL,
          product:this.elems[i].Name.title,
          quantity:this.elems[i].cnt,
          price: this.elems[i].Name.price,
        })
        this.dataSource =  new MatTableDataSource(this.elements);
    }
    })
  }
  ngAfterViewInit() {
    this.CheakOutBtnInput=this.CheakOutBtn;
    this.clearBtnInput=this.clearBtn;
  
}

 log(x){
   console.log(x);
 }
  
 clearAllProducts(){
   //first clear the product from the local storage
  let itemsRef: AngularFireList<any>;
  let items: Observable<any[]>;
  itemsRef=this.db.list('/orders/'+ this.customerKey);
  items=itemsRef.snapshotChanges()
  .pipe(
    map(changes =>
      changes.map(c => ({  key: c.payload.key, ...c.payload.val() }))
    
  ));
  items.subscribe(orders=>{
    for(let i=0;i<orders.length;i++){
      if(localStorage.getItem(orders[i].key)){
        localStorage.removeItem(orders[i].key)
      }
    }
 }) 
 // now clear the table and the firebase database
  this.orderObs.unsubscribe();
  this.dataSource =  new MatTableDataSource([])
  this.db.list('/orders/'+ this.customerKey).remove();
  this.NumOfProduct=0;
      this.totalCost=0;
 }

 
}
