import { Component } from '@angular/core';
import { data } from '../../assets/data';
import { TreeItem } from '../tree-item';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  items: TreeItem[] = data;
}