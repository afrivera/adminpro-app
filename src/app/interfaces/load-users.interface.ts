import { User } from '../models/user.model';

export interface LoadUsers {
    body: {
        total: number;
        users: User[]
    }
}