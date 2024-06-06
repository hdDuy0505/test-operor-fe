import { User } from './users';

export interface UserList {
    data: User[];
    page: number;
    perPage: number;
    totalPages: number;
}
