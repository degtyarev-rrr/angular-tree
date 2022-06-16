import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TreeService } from 'src/app/services/tree.service';
import { Tree } from 'src/app/tree-structure/tree-structure';
import { data } from '../../../assets/data';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [
    TreeService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true,
    },
  ],
})
export class TreeComponent implements ControlValueAccessor, OnInit {
  tree!: Tree;
  searchText!: string;
  onChange: Function = (_: any): void => {};

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {}

  search(searchText: string): void {
    this.searchText = searchText;
  }

  trackByFn(index: number, item: Tree): string {
    return item.treeItem!.id;
  }

  onCheckboxChange(event: any, item: Tree) {
    item.changeSelect(!item.isSelected);
    this.onChange(Array.from(Tree.selectedItemsId));
  }

  writeValue(selectedItems: string[]): void {
    Tree.selectedItemsId = new Set(selectedItems);
    this.treeService.setInitiallySelectedItems(selectedItems);
    this.tree = this.treeService.getTree(data);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
