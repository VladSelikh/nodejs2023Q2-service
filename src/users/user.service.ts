import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { DBService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DBService) {}

  public async findAll(): Promise<User[]> {
    return this.dbService.getAllUsers();
  }

  public async findById(id: string): Promise<User> {
    return this.dbService.getUserById(id);
  }

  public async create(userDto: CreateUserDto): Promise<User> {
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

    await this.dbService.createUser(newUser);

    return newUser;
  }

  public async updateById(
    id: string,
    passwordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.dbService.getUserById(id);

    const updatedUser: User = {
      ...user,
      password: passwordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    await this.dbService.updateUserById(id, updatedUser);

    return updatedUser;
  }

  public async deleteById(id: string) {
    await this.dbService.deleteUserById(id);
  }
}
