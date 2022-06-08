import { ITreeItem } from "./tree-item";

export interface ITree {
  parent: ITree| null;
  treeItem: ITreeItem | null; 
  getParent(): ITree | null;
  getChildren(): ITree[];
  add?(component: ITree): void;
}

export class Leaf implements ITree {
  treeItem: ITreeItem | null;
  parent: ITree | null;

  constructor(parent: ITree | null, treeItem: ITreeItem | null) {
    this.parent = parent;
    this.treeItem = treeItem;
  } 

  getChildren() {
    return [];
  }

  getParent(): ITree | null {
      return this.parent;
  }
}

export class Branch implements ITree {
  parent: ITree | null;
  children: ITree[] = [];
  treeItem: ITreeItem | null; 

  constructor(parent: ITree | null, treeItem: ITreeItem | null) {
    this.parent = parent;
    this.treeItem = treeItem;
  } 

  add(component: ITree): void {
      this.children.push(component);
  }

  getChildren(): ITree[] {
    return this.children;
  }

  getParent(): ITree | null {
    return this.parent;
  }
}