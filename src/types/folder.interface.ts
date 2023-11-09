import { ICategory } from "./category.interface";

export interface IFolder {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: ICategory extends { folder: number } ? ICategory[] : never[];
}
