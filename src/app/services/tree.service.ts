import { ITreeItem } from "../tree-structure/tree-item";
import { ITree, Leaf, Branch } from "../tree-structure/tree-structure";

export class TreeService {
  getTree(items: ITreeItem[], parent: ITree | null, treeItem?: ITreeItem): ITree {
    const tree = (treeItem)? new Branch(parent, treeItem) : new Branch(parent, null);

    items.forEach(item => {
      if(item.children.length) {
        const branch = this.getTree(item.children, tree, item);
        tree.add(branch);     
      } else {
        const leaf = new Leaf(tree, item);
        tree.add(leaf)
      }
    })

    return tree;
  }
}
