import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { SearchDirective } from './directives/search.directive';

@NgModule({
  declarations: [
    AppComponent, TreeComponent, SearchDirective
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
