import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/* TODO вынести форму в onInit*/

/*
  onPush, trachBy - почитать + применить
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  treeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.treeForm = this.buildForm(['id1', 'id4', 'id8', 'id10']);
  }

  buildForm(arrayOfSelectedId: string[]): FormGroup {
    return this.fb.group({
      selectedItems: [arrayOfSelectedId],
    });
  }
}
