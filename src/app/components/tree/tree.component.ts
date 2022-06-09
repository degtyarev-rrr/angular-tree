import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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

  constructor(private treeService: TreeService) {
    this.items = this.treeService.getTree(data, null);
  }
  
  onCheckboxChange(event: any, item: ITree) {
    (item.treeItem!.selected)? this.removeSelect(item) : this.addSelect(item);

    this.onChange(this.selected.map(item => item.treeItem!.id));
  }

  addSelect(item: ITree) {
    if(!!item.treeItem!.selected) return;

    item.treeItem!.selected = !item.treeItem!.selected;
    this.selected.push(item);
    this.showSelectedItem(item);
    this.checkSiblings(item);

    if(!!item.getChildren().length)
      item.getChildren().forEach(treeItem => this.addSelect(treeItem));
  }
  
  removeSelect(item: ITree) {
    if(!item.treeItem!.selected) return;

    item.treeItem!.selected = !item.treeItem!.selected;
    this.removeSelectedItem(this.selected.splice(this.selected.findIndex(treeItem => treeItem === item), 1)[0]);

    if(!!item.getChildren().length)
      item.getChildren().forEach(treeItem => this.removeSelect(treeItem));
  }

  showSelectedItem(item: ITree) {
    const element = document.getElementById(item.treeItem!.id) as HTMLInputElement;

    if(!!element) 
      element.checked = true;
   }

  removeSelectedItem(item: ITree) {
    const element = document.getElementById(item.treeItem!.id) as HTMLInputElement;
    
    if(!!item.getParent()!.parent) 
      this.removeSelectForParent(item.getParent()!);

    if(!!element) 
      element.checked = false;
  }

  checkSiblings(item: ITree) {
    if(!item.getParent()?.parent) return;

    if(item.getParent()?.getChildren().every(item => item.treeItem?.selected))
      this.addSelect(item.getParent()!) 
  }

  removeSelectForParent(item: ITree) {
    if(!item.treeItem!.selected) return;

    item.treeItem!.selected = !item.treeItem!.selected;
    this.removeSelectedItem(this.selected.splice(this.selected.findIndex(treeItem => treeItem === item), 1)[0]);
  }

  writeValue(val: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;      
  }

  registerOnTouched(fn: any): void {
      
  }
}