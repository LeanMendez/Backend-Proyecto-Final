import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUser } from './interface/users.interface';
import { User, IUserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUserDocument>,
  ) {}

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      return await this.userModel.findById({ _id: id });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const checkUser = await this.getUserById(id);
      if (!checkUser) {
        throw new NotFoundException({ message: 'Product not found' });
      }
      const product = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      return { product, message: 'User updated successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteUserById(id: string) {
    try {
      const user = await this.userModel.findOneAndDelete({ _id: id });

      return { user, message: 'User deleted successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
