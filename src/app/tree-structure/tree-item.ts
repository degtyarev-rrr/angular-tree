export interface ITreeItem {
  id: string;
  name: string;
  age: number;
  selected: boolean;
  children: ITreeItem[];
}
