export class User {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    jwt?: string;
    role: string;
    emailAddress: string;
    enabled: boolean;
    password?:string;
}