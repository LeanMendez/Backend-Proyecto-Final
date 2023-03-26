import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { IOrderDocument, Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  @Inject(forwardRef(() => UsersService)) private userService: UsersService;
  @Inject(forwardRef(() => ProductsService))
  private productService: ProductsService;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<IOrderDocument>,
  ) {}

  async getAllOrders() {
    try {
      return await this.orderModel.find();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getOrderById(id: string) {
    try {
      return await this.orderModel.findById({ _id: id });
    } catch (err) {
      throw new HttpException({ message: 'error al buscar la orden' }, 400, {
        cause: new Error('Order by ID error'),
      });
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const checkUser = await this.userService.getUserById(createOrderDto.user);
      if (!checkUser) throw new NotFoundException("Order's User not found");
      const prodArray = createOrderDto.products;
      for (let index = 0; index < prodArray.length; index++) {
        const checkProduct = await this.productService.getProductById(
          prodArray[index],
        );
        if (!checkProduct) {
          throw new NotFoundException('Product not found');
        }
      }

      const order = await this.orderModel.create(createOrderDto);
      return { order, message: 'Order created successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateOrderById(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const checkOrder = await this.getOrderById(id);
      if (!checkOrder) {
        throw new NotFoundException({ message: 'Order not found' });
      }

      const order = await this.orderModel.findOneAndUpdate(
        { _id: id },
        updateOrderDto,
        { new: true },
      );

      return { order, message: 'Order updated successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteOrderbyId(id: string) {
    try {
      const order = await this.orderModel.findOneAndDelete({ _id: id });

      return { order, message: 'Order deleted successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
