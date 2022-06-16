import { TreeItem } from './tree-item';

/* TODO необязательно использовать I (чисто на будущее)
   + заимплементить логику с селектами
   + переделать на абстрактный класс
*/

export abstract class Tree {
  parent?: Tree;
  children?: Tree[];
  treeItem?: TreeItem;
  isSelected: boolean = false;
  isBranch: boolean = false;
  static selectedItemsId: Set<string> = new Set();

  abstract changeSelect(selectValue: boolean): void;

  removeSelectForParent() {
    if (!this.parent) return;

    Tree.selectedItemsId.delete(this.treeItem!.id);
    this.parent.isSelected = false;
    this.parent.removeSelectForParent();
  }

  checkSiblings() {
    if (!this.parent) return;

    if (this.parent.children!.every((item) => item.isSelected)) {
      Tree.selectedItemsId.add(this.parent.treeItem!.id);
      this.parent.isSelected = true;
      this.parent.checkSiblings();
    }
  }
}

export class Leaf extends Tree {
  changeSelect(selectValue: boolean) {
    if (!selectValue) {
      this.removeSelectForParent();
      Tree.selectedItemsId.delete(this.treeItem!.id);
    } else {
      Tree.selectedItemsId.add(this.treeItem!.id);
    }

    this.isSelected = selectValue;
    this.checkSiblings();
  }
}

export class Branch extends Tree {
  override children: Tree[] = [];
  override isBranch = true;

  add(component: Tree, treeItem: TreeItem): void {
    component.treeItem = treeItem;
    component.parent = this;
    this.children.push(component);
  }

  changeSelect(selectValue: boolean): void {
    if (!selectValue) {
      this.removeSelectForParent();
      Tree.selectedItemsId.delete(this.treeItem!.id);
    } else {
      Tree.selectedItemsId.add(this.treeItem!.id);
    }

    this.isSelected = selectValue;
    this.changeSelectForChildren(this.isSelected);
    this.checkSiblings();
  }

  changeSelectForChildren(selectValue: boolean): void {
    this.children.map((item: Tree) => item.changeSelect(selectValue));
  }
}
