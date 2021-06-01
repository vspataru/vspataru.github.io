import { Author } from "./Author";
import { Category } from "./Category";
import {Review} from "./Review";

export class Book {
    bookId: string;
    title: string;
    description: string;
    authors: Author[];
    reviews: Review[];
    category: Category;
  }