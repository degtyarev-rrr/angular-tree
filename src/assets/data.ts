import { TreeItem } from '../app/tree-item';

export const data: TreeItem[] = [
  {id: '1', name: 'John', age: 40, children: []},
  {id: '2', name: 'Edwin', age: 54, children: [{id: '4', name: 'James', age: 20, children: []},
                                               {id: '5', name: 'Ruby', age: 25, children: []}]},
  {id: '3', name: 'Sandra', age: 48, children: [{id: '6', name: 'Erin', age: 13, children: []}, 
                                                {id: '7', name: 'Robert', age: 32, children: [{id: '9', name: 'Kelly', age: 12, children: []},
                                                                                              {id: '10', name: 'Kevin', age: 15, children: []}]}, 
                                                {id: '8', name: 'Stanley', age: 17, children: []}]}];