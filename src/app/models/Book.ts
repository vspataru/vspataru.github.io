import { Author } from "./Author";
import { Category } from "./Category";

export class Book {
    bookId: string;
    title: string;
    description: string;
    authors: Author[];
    category: Category;
    stock: number;
    available: boolean;
  }