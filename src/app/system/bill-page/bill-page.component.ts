import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BillService } from './../shared/services/bill.service';
import { Bill } from './../shared/models/bill.model';
import { componentDestroyed } from "ng2-rx-componentdestroyed";

@Component({
  selector: 'pai-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void { }
  
  constructor(private billService: BillService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).takeUntil(componentDestroyed(this))
    .subscribe((data: [Bill, any]) => {
      console.log(data);
    })
  }
}
