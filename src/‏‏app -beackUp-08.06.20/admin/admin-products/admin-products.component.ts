import { product } from 'src/app/moudles/product';

import { Component, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns: string[] =['No.','title','price','Edit'];
  public products$:Subscription;
  dataSource;
  elements:any[]
  element:product;

  constructor(private db:AngularFireDatabase) {
    this.elements=[];
    this.products$=this.db.object('/product/').valueChanges()
    .subscribe(elements=>{
      let keys= Object.keys(elements);
      for( let i=0;i<keys.length;i++){
        this.element=new product();
        this.element.key=keys[i];
        this.element.title=elements[keys[i]].title;
        this.element.price=elements[keys[i]].price;
        this.element.category=elements[keys[i]].category;
        this.element.imageURL=elements[keys[i]].imageURL;
        this.elements.push( this.element);
      }
      this.dataSource = new MatTableDataSource(this.elements);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    console.log("event",event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   log(x){
     console.log(x);
   }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }
}
