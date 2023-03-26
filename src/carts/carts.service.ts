import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { Cart, ICartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {
  @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService;
  @Inject(forwardRef(() => UsersService)) private usersService: UsersService;

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<ICartDocument>,
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    // const checkOrder = await this.ordersService.getOrderById(
    //   createCartDto['order'],
    // );
    // console.log(checkOrder);
    // if (!checkOrder) {
    //   throw new NotFoundException('Order not found');
    // }

    // const checkUser = await this.usersService.getUserById(createCartDto.user);
    // if (!checkUser) {
    //   throw new NotFoundException('User not found');
    // }
    console.log(createCartDto.user);
    console.log(createCartDto.order);
    console.log(createCartDto);
    try {
      const cart = await this.cartModel.create(createCartDto);
      return { cart, message: 'Cart created successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getAllCarts() {
    try {
      const carts = await this.cartModel.find();
      return carts;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getCartById(id: string) {
    try {
      const cart = await this.cartModel.findOne({ _id: id });
      return cart;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async updateCartById(id: string, updateCartDto: UpdateCartDto) {
    try {
      const checkCart = await this.getCartById(id);
      if (!checkCart) {
        throw new NotFoundException('Cart not found');
      }

      const cart = await this.cartModel.findOneAndUpdate(
        { _id: id },
        updateCartDto,
        { new: true },
      );

      return { cart, message: 'Cart updated successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteCartById(id: string) {
    try {
      const cart = await this.cartModel.findOneAndDelete({ _id: id });

      return { cart, message: 'Cart deleted successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
