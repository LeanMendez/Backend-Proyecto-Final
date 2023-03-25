import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUser } from './interface/users.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.usersService.getAllUsers();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.usersService.getUserById(id);
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  async updateUserById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      return await this.usersService.updateUserById(id, dto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    try {
      const product = await this.usersService.deleteUserById(id);
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
