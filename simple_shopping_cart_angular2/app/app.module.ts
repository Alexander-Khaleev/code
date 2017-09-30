import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { UpComponent }   from './up.component';
import { CartComponent }   from './cart.component';

import { HttpModule }   from '@angular/http';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ AppComponent, UpComponent, CartComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }