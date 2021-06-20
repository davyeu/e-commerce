import { element } from 'protractor';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { product } from 'src/app/moudles/product';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {

  obsCategories:Observable<any>;
  product:product;
  products:string[];
  element$;
  element:any;
  keyElement;

  

  constructor(private db:AngularFireDatabase,
    private router:Router,
    private route:ActivatedRoute) {
      this.element={};
     this.element$={};
    this.obsCategories=this.db.object('/categories')
    .valueChanges();


    this.product=new product();
    this.keyElement=route.snapshot.paramMap.get('id'); //get element key in the url address
    if (this.keyElement){
        this.element$=this.db.object('/product/'+this.keyElement)
        .valueChanges().subscribe(elem=>{
          this.element=elem;
        })
    }
    
  }
  
  save(){
    this.db.list('/product/').push(this.product);
    this.router.navigate(['/admin/products']);
   
  }
  delete(){
    if (this.keyElement){
      if(confirm('Are you sure you want to delete this product?')){
      this.db.list('/product/'+this.keyElement).remove();
      this.router.navigate(['/admin/products']);
      }
    }
  }
  setTitle(title){
    this.product.title=title;
  }
  setPrice(price){
    this.product.price=price;
  
  }
  setCategory(category){
    this.product.category=category;
  }
  setImage(image){
    this.product.imageURL=image;
  }

  log(x){
    console.log(x);
  }
  ngOnDestroy(): void {
    if (this.keyElement)
    this.element$.unsubscribe();
  }

}
