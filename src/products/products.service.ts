import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './interface/products.interface';
import { Product, IProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<IProductDocument>,
  ) {}

  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await this.productModel.find();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productModel.findById({ _id: id });
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getProductsByCategory(category: string) {
    try {
      const products = await this.productModel.find({ category: category });
      return products;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createProduct(dto: CreateProductDto) {
    try {
      const newProduct = {
        ...dto,
        category: dto.category.toLowerCase().trim().replace(' ', '_'),
      };
      return this.productModel.create(newProduct);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    try {
      const checkProduct = await this.getProductById(id);
      if (!checkProduct) {
        throw new NotFoundException({ message: 'Product not found' });
      }
      const product = await this.productModel.findOneAndUpdate(
        { _id: id },
        updateProductDto,
        { new: true },
      );

      return { product, message: 'Product updated successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteProductById(id: string) {
    try {
      const product = await this.productModel.findOneAndDelete({ _id: id });

      return { product, message: 'Product deleted successfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
