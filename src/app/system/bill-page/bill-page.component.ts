import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { componentDestroyed } from "ng2-rx-componentdestroyed";

import { BillService } from './../shared/services/bill.service';
import { Bill } from './../shared/models/bill.model';

@Component({
  selector: 'pai-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void { }

  bill: Bill;
  currency: any;
  isLoaded: boolean;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.isLoaded = false;
    Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).takeUntil(componentDestroyed(this))      
      .subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      })
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency()
      .takeUntil(componentDestroyed(this))      
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
}
