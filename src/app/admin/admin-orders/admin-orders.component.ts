import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {

  public displayedColumns: string[] = 
  ['No.','user key','name', 'date'];
  public dataSource;
  public transactionsObs:Subscription;
  public elements=[];

  constructor(private db:AngularFireDatabase) {
    this.db.object("/transactions").valueChanges()
    .subscribe((trans:any)=>{
      var userKey;
      var transaction;
      let Userskeys=Object.keys(trans);
      for(let i=0;i<Userskeys.length;i++){
        userKey=Userskeys[i];
        transaction=Object.values(trans[userKey]) // transaction object
        for (let j=0;j<transaction.length;j++){
          this.elements.push({
            userKey:userKey,
            name: transaction[j][0].name,
            date: transaction[j][1].dateCreated
          })
        }   
      }
      this.dataSource =  new MatTableDataSource(this.elements);
     })

   }
  ngOnDestroy(): void {
    if(this.transactionsObs) this.transactionsObs.unsubscribe();
  }


  

}
