import { ITreeItem } from '../app/tree-structure/tree-item';

export const data: ITreeItem[] = [
  {id: 'id1', name: '', age: 40, selected: false, children: []},
  {id: 'id2', name: 'Edwin', age: 0, selected: false, children: [{id: 'id4', name: 'James', age: 20, selected: false, children: []},
                                               {id: 'id5', name: 'Ruby', age: 25, selected: false, children: []}]},
  {id: 'id3', name: 'Sandra', age: 48, selected: false, children: [{id: 'id6', name: '', age: 13, selected: false, children: []}, 
                                                {id: 'id7', name: 'Robert', age: 32, selected: false, children: [{id: 'id9', name: 'Kelly', age: 0, selected: false, children: []},
                                                                                              {id: 'id10', name: 'Kevin', age: 15, selected: false, children: []}]}, 
                                                {id: 'id8', name: '', age: 17, selected: false, children: []}]}];