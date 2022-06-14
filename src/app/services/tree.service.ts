import { TreeItem } from '../tree-structure/tree-item';
import { Tree, Leaf, Branch } from '../tree-structure/tree-structure';

/* TODO reduce + тернарник */
export class TreeService {
  getTree(items: TreeItem[]): Tree {
    const tree: Tree = items.reduce((tree, item) => {
      if (item.children.length) tree.add(this.getTree(item.children), item);

      if (!item.children.length) tree.add(new Leaf(), item);

      return tree;
    }, new Branch());

    return tree;
  }
}
