import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TreeService } from 'src/app/services/tree.service';
import { Tree, Leaf } from 'src/app/tree-structure/tree-structure';
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
  tree: Tree | undefined;
  searchText: string = '';
  onChange: Function = (_: any): void => {};

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.tree = this.treeService.getTree(data);
  }

  onCheckboxChange(event: any, item: Tree) {
    item.changeSelect(!item.selected);
    this.onChange();
  }

  writeValue(val: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
