import { Injectable } from '@nestjs/common';

// Models
export type User = {
  userId: number;
  username: string;
  password: string;
};

// Mock
const users: User[] = [
  {
    userId: 1,
    username: 'Alice',
    password: 'topsecret',
  },
  {
    userId: 2,
    username: 'Bob',
    password: '123abc',
  },
];

@Injectable()
export class UserService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
