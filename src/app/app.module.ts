import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { SearchComponent } from './components/search/search.component';

import { SearchDirective } from './directives/search.directive';

import { FormatPipe } from './pipes/format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    SearchComponent,
    SearchDirective,
    FormatPipe,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
