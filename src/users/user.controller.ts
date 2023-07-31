/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { UserResponse } from './types/user.response';
import { UserService } from './user.service';
import { USER_NOT_FOUND } from '../core/constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { password, ...userResponse } = user;

    return userResponse;
  }

  @Post()
  public async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const newUser = await this.userService.create(createUserDto);
    const { password, ...userResponse } = newUser;

    return userResponse;
  }

  @Put(':id')
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Provided old password is not valid!',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.userService.updateById(
      user.id,
      updatePasswordDto,
    );

    const { password, ...userResponse } = updatedUser;
    return userResponse;
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.userService.deleteById(user.id);
  }
}
