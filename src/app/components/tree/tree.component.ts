import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeService } from 'src/app/services/tree.service';
import { data } from '../../../assets/data';
import { ITree } from 'src/app/tree-structure/tree-structure';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [ TreeService, { 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeComponent),
    multi: true
   }]
})
export class TreeComponent implements ControlValueAccessor {
  items: ITree;
  selected: ITree[] = [];
  onChange(_: any) {};

  constructor(private treeService: TreeService, private fb: FormBuilder){
    this.items = this.treeService.getTree(data, null);
  }
  
  onCheckboxChange(event: any, item: ITree) {
    (item.treeItem!.selected)? this.removeSelect(item) : this.addSelect(item);

    this.onChange(this.selected);
  }

  removeSelect(item: ITree) {
    if(!item.treeItem!.selected) {
      return;
    }

    item.treeItem!.selected = !item.treeItem!.selected;
    this.removeSelectedItem(this.selected.splice(this.selected.findIndex(treeItem => treeItem === item), 1)[0])

    if(!!item.getChildren().length) {
      item.getChildren().forEach(treeItem => this.removeSelect(treeItem));
    }
  }

  addSelect(item: ITree) {
    if(!!item.treeItem!.selected) {
      return;
    }

    item.treeItem!.selected = !item.treeItem!.selected;
    this.selected.push(item);
    this.showSelectedItems();

    if(!!item.getChildren().length) {
      item.getChildren().forEach(treeItem => this.addSelect(treeItem));
    }
  }
  
  showSelectedItems() {
    const arrayOfItems = this.selected.map(item => {
      return {
        id: item.treeItem!.id,
        selected: item.treeItem!.selected
      }
    });

    arrayOfItems.forEach(item => {
      const element = document.getElementById(item.id) as HTMLInputElement | null;

      if(!!element) 
        element.checked = item.selected;
    })
   }

  removeSelectedItem(item: ITree) {
    const element = document.getElementById(item.treeItem!.id) as HTMLInputElement | null;

    if(!!element) 
      element.checked = false;
  }

  writeValue(val: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;      
  }

  registerOnTouched(fn: any): void {
      
  }
}