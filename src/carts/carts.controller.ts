import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Role } from 'src/auth/roles/roles';
import { Roles } from 'src/auth/decorator/role.decorator';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

//Token required
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  GetAllCarts() {
    return this.cartsService.getAllCarts();
  }

  @Get(':id')
  getCartById(@Param('id') id: string) {
    return this.cartsService.getCartById(id);
  }

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    console.log('createCart - CONTROLLER', createCartDto);
    return this.cartsService.createCart(createCartDto);
  }

  @Put(':id')
  updateCartById(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.updateCartById(id, updateCartDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteCartById(@Param('id') id: string) {
    return this.cartsService.deleteCartById(id);
  }
}
