import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get('my-products')
  async getMyProducts(@Req() req) {
    return this.productsService.getMyProducts(req.user.id);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() body, @Req() req) {
    return this.productsService.createProduct(body, req.user.id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body, @Req() req) {
    return this.productsService.updateProduct(id, body, req.user.id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Req() req) {
    return this.productsService.deleteProduct(id, req.user.id);
  }
}
