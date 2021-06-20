import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnDestroy {

  public displayedColumns: string[] = ['No.','name', 'date','view' /*'transaction number'*/];
  public dataSource;
  public transactionsObs:Subscription;
  public elements=[];
  public transactionkey=localStorage.getItem('userId');

  constructor(private db:AngularFireDatabase) {
    this.db.list("/transactions"+'/'+this.transactionkey).valueChanges()
    .subscribe((trans:any)=>{
      for(let i=0;i<trans.length;i++){
        this.elements.push({
          name: trans[i][0].name,
          date: trans[i][1].dateCreated
        })
      }
      this.dataSource =  new MatTableDataSource(this.elements);
    })

   }
  ngOnDestroy(): void {
    if(this.transactionsObs) this.transactionsObs.unsubscribe();
  }

  

}
