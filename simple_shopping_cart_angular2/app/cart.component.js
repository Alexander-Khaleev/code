"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service");
var CartComponent = (function () {
    function CartComponent(httpService) {
        this.httpService = httpService;
        this.count = 0;
        this.summa = 0;
        this.goods = [];
    }
    CartComponent.prototype.increase = function (good) {
        this;
        good = good;
        good.count++;
        this.count++;
        this.summa += good.price;
    };
    CartComponent.prototype.reduction = function (good) {
        if (this.count > 0) {
            this;
            good = good;
            if (good.count > 0) {
                this.summa -= good.price;
                this.count--;
                good.count--;
            }
        }
    };
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.getData()
            .subscribe(function (data) { return _this.goods = data.json(); });
    };
    return CartComponent;
}());
CartComponent = __decorate([
    core_1.Component({
        selector: 'my-cart',
        template: "     <div *ngFor=\"let good of goods; let i = index\" class=\"block\">\n                    <div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-3\"> <img src={{good?.photo}} width=\"200\"></div>\n\t\t\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-3\"> <p> <b>{{good?.name}}</b> </p></div>\n\t\t\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-3\"> <p> {{good?.price}} </p></div>\n\t\t\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-3\"> <p> <button (click)=\"increase(good)\">+</button> {{good?.count}}  <button (click)=\"reduction(good)\">-</button> </p></div>\n                    <div class=\"clear\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"count\"> \u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: {{count}}</div>\n\t\t\t\t\t<div class=\"summa\"> \u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430: {{summa}}</div>",
        providers: [http_service_1.HttpService],
        styles: [" \n\t\t\t.block {width:100%; margin-bottom: 100px;}\n\t\t\t.clear {clear: both}\n\t\t\t.count, .summa {margin-top:30px; margin-left: 20px; font-weight: bold;}\n    "]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], CartComponent);
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map