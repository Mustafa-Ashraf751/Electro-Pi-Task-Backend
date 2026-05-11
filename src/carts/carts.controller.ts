import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/cart.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto, @CurrentUser() user: any): Promise<Cart> {
    return this.cartsService.create(createCartDto, user.sub as string);
  }

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cart | null> {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto): Promise<Cart | null> {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Cart | null> {
    return this.cartsService.remove(id);
  }
}
