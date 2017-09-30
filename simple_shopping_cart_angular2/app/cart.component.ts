import { Component } from '@angular/core';
import { Response} from '@angular/http';
import { HttpService} from './http.service';
import {Goods} from './goods';

@Component({
    selector: 'my-cart',
    template: `     <div *ngFor="let good of goods; let i = index" class="block">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3"> <img src={{good?.photo}} width="200"></div>
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3"> <p> <b>{{good?.name}}</b> </p></div>
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3"> <p> {{good?.price}} </p></div>
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3"> <p> <button (click)="increase(good)">+</button> {{good?.count}}  <button (click)="reduction(good)">-</button> </p></div>
                    <div class="clear"></div>
					</div>
					<div class="count"> Всего товаров: {{count}}</div>
					<div class="summa"> Сумма заказа: {{summa}}</div>`,
	providers: [HttpService],
	styles: [` 
			.block {width:100%; margin-bottom: 100px;}
			.clear {clear: both}
			.count, .summa {margin-top:30px; margin-left: 20px; font-weight: bold;}
    `]	
})


export class CartComponent implements OnInit { 
  
	count: number = 0;
	summa: number = 0;
	
	increase(good) : void {
		this good = good;
		good.count++;
        this.count++;
		this.summa += good.price;
    }
	
	reduction(good) : void {
		if (this.count > 0) {
			this good = good;
			if (good.count > 0) {
				this.summa -= good.price;
				this.count--;
				good.count--;
			}
		}
    }
	
    goods: Goods[]=[];
     
    constructor(private httpService: HttpService){}
     
    ngOnInit(){
         
          this.httpService.getData()
                        .subscribe((data: Response) => this.goods=data.json());
    }
}



