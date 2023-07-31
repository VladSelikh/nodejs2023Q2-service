import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  public findAll(): User[] {
    return this.users;
  }

  public findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  public create(userDto: CreateUserDto): User {
    const id = uuid();
    const version = 1;
    const createdAt = Date.now();
    const { login, password } = userDto;

    const newUser = {
      id,
      login,
      password,
      version,
      createdAt,
      updatedAt: createdAt,
    };

    this.users.push(newUser);

    return newUser;
  }

  public updateById(id: string, passwordDto: UpdatePasswordDto): User {
    const user = this.users.find((user) => user.id === id);

    const updatedUser: User = {
      ...user,
      password: passwordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  public deleteById(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
  }
}
