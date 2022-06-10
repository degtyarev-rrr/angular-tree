import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeComponent } from './components/tree/tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selected: []
    });

    this.form.valueChanges.subscribe(val => {
      console.log(val)
    })
  }  
}
