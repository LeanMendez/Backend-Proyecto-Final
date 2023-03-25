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
import { CreateProductDto, UpdateProductDto } from './dto';
import { IProduct } from './interface/products.interface';
import { ProductsService } from './products.service';

@Controller('productos')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await this.productsService.getAllProducts();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.productsService.getProductById(id);
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('/categories/:category')
  async getProductsByCategory(@Param('category') category: string) {
    try {
      const normalizedParam = category.toLowerCase().trim().replace(' ', '_');
      return await this.productsService.getProductsByCategory(normalizedParam);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    try {
      return await this.productsService.createProduct(dto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Patch('/:id')
  async updateProductById(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    try {
      console.log('updateProductById', id, dto);
      return await this.productsService.updateProductById(id, dto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') id: string) {
    try {
      const product = await this.productsService.deleteProductById(id);
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
