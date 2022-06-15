import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
  searchForm!: FormGroup;
  searchText!: string;
  onChange: Function = (_: any): void => {};

  constructor(private treeService: TreeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.buildSearchForm();
    this.tree = this.treeService.getTree(data);
  }

  buildSearchForm(): FormGroup {
    return this.fb.group({
      searchText: '',
    });
  }

  submitSearchForm(): void {
    this.searchText = this.searchForm.get('searchText')?.value;
  }

  onCheckboxChange(event: any, item: Tree) {
    item.changeSelect(!item.selected);
    this.onChange(Array.from(Tree.selectedItemsId));
  }

  writeValue(val: string[]): void {
    Tree.selectedItemsId = new Set(val);
    this.tree = this.treeService.getTree(data, val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
