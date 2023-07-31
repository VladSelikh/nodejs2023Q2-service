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
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { UserResponse } from './types/user.response';
import { UserService } from './user.service';
import {
  INVALID_BODY,
  NOT_VALID_UUID,
  USER_NOT_FOUND,
} from '../core/constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findById(@Param() params): Promise<UserResponse> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findById(params.id);

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { password, ...userResponse } = user;

    return userResponse;
  }

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    if (
      typeof createUserDto.login !== 'string' ||
      typeof createUserDto.password !== 'string'
    ) {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userService.create(createUserDto);
    const { password, ...userResponse } = newUser;

    return userResponse;
  }

  @Put(':id')
  public async updateById(
    @Param() params,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword) {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findById(params.id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Provided old password is not valid!',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = this.userService.updateById(user.id, updatePasswordDto);

    const { password, ...userResponse } = updatedUser;
    return userResponse;
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param() params) {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findById(params.id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.userService.deleteById(user.id);
  }
}
