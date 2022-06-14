import { TreeItem } from '../app/tree-structure/tree-item';

export const data: TreeItem[] = [
  {id: 'id1', name: '', age: 40, children: []},
  {id: 'id2', name: 'Edwin', age: 0, children: [{id: 'id4', name: 'James', age: 20, children: []},
                                               {id: 'id5', name: 'Ruby', age: 25, children: []}]},
  {id: 'id3', name: 'Sandra', age: 48, children: [{id: 'id6', name: '', age: 13, children: []}, 
                                                {id: 'id7', name: 'Robert', age: 32, children: [{id: 'id9', name: 'Kelly', age: 0, children: []},
                                                                                              {id: 'id10', name: 'Kevin', age: 15, children: []}]}, 
                                                {id: 'id8', name: '', age: 17, children: []}]}];