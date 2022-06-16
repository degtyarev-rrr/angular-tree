import { TreeItem } from '../tree-structure/tree-item';
import { Tree, Leaf, Branch } from '../tree-structure/tree-structure';

/* TODO reduce + тернарник */
export class TreeService {
  initiallySelectedItems!: string[];

  getTree(items: TreeItem[]): Tree {
    const tree: Tree = items.reduce((tree, item) => {
      const component = this.createComponent(item);

      tree.add(component, item);

      return tree;
    }, new Branch());

    return tree;
  }

  createComponent(item: TreeItem): Tree {
    if (item.children.length) {
      const branch = this.getTree(item.children);
      this.addSelectedForItem(branch, item);

      return branch;
    }

    const leaf = new Leaf();
    this.addSelectedForItem(leaf, item);

    return leaf;
  }

  setInitiallySelectedItems(arrayOfId: string[]): void {
    this.initiallySelectedItems = arrayOfId;
  }

  addSelectedForItem(component: Tree, item: TreeItem): void {
    if (this.initiallySelectedItems.includes(item.id)) {
      component.isSelected = true;
    }
  }
}
