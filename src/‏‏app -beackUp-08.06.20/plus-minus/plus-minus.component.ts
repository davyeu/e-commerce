import { Component, OnInit, Input } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.css']
})
export class PlusMinusComponent implements OnInit {

  @Input('counter')counter=0;
  constructor() { }
 

  increase(){
    this.counter++;
  }

  decrease(){
    if(this.counter>0) {
      this.counter--;
    }
  }
  log(x){
    console.log('input-value',x);
    console.log('counter',this.counter);
  }
  ngOnInit(): void {
  }

}
