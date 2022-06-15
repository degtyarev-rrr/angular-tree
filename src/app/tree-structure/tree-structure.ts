import { TreeItem } from './tree-item';

/* TODO необязательно использовать I (чисто на будущее)
   + заимплементить логику с селектами
   + переделать на абстрактный класс
*/

export abstract class Tree {
  parent?: Tree;
  children?: Tree[];
  treeItem?: TreeItem;
  selected: boolean = false;
  isBranch: boolean = false;
  static selectedItemsId: Set<string> = new Set();

  checkSiblings() {
    if (!this.parent) return;

    if (this.parent.children!.every(item => item.selected)) {
      Tree.selectedItemsId.add(this.parent.treeItem!.id);
      this.parent.selected = true;
      this.parent.checkSiblings();
    }
  }

  removeSelectForParent() {
    if (!this.parent) return;

    Tree.selectedItemsId.delete(this.treeItem!.id);
    this.parent.selected = false;
    this.parent.removeSelectForParent();
  }

  abstract changeSelect(selectValue: boolean): void;
}

export class Leaf extends Tree {
  changeSelect(selectValue: boolean) {
    if (!selectValue) {
      this.removeSelectForParent();
      Tree.selectedItemsId.delete(this.treeItem!.id);
    }

    if (selectValue) Tree.selectedItemsId.add(this.treeItem!.id);

    this.selected = selectValue;
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
    }

    if (selectValue) Tree.selectedItemsId.add(this.treeItem!.id);

    this.selected = selectValue;
    this.changeSelectForChildren(this.selected);
    this.checkSiblings();
  }

  changeSelectForChildren(selectValue: boolean): void {
    this.children.map((item: Tree) => item.changeSelect(selectValue));
  }
}
