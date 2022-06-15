import { TreeItem } from '../tree-structure/tree-item';
import { Tree, Leaf, Branch } from '../tree-structure/tree-structure';

/* TODO reduce + тернарник */
export class TreeService {
  getTree(items: TreeItem[], initiallySelectedItems: string[] = []): Tree {
    const tree: Tree = items.reduce((tree, item) => {
      const component = this.createComponent(
        item.children,
        item,
        initiallySelectedItems
      );

      tree.add(component, item);

      return tree;
    }, new Branch());

    return tree;
  }

  createComponent(
    children: TreeItem[],
    item: TreeItem,
    initiallySelectedItems: string[]
  ): Tree {
    if (children.length) {
      const branch = this.getTree(item.children, initiallySelectedItems);
      this.addSelect(branch, item, initiallySelectedItems);

      return branch;
    }

    const leaf = new Leaf();
    this.addSelect(leaf, item, initiallySelectedItems);

    return leaf;
  }

  addSelect(
    component: Tree,
    item: TreeItem,
    initiallySelectedItems: string[]
  ): void {
    if (!initiallySelectedItems.length) return;

    if (initiallySelectedItems.includes(item.id)) {
      component.selected = true;
    }
  }
}
