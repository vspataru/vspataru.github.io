import { Book } from "./Book";
import { User } from "./User";

export class Request{
    requestID: string; 
    approved: boolean;
    active: boolean;
    requestedDate: Number;
    approvedDate: Date;
    requester: User;
    requestedBooks: Book[];
}