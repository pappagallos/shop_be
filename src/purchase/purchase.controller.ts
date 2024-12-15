import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('api/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(@Body() body, @Req() req) {
    const buyerId = req.user.id; // Assume user is attached to the request after authentication
    return this.purchaseService.createPurchase(body.productId, buyerId);
  }

  @Get('history')
  async getPurchaseHistory(@Req() req) {
    const buyerId = req.user.id; // Assume user is attached to the request after authentication
    return this.purchaseService.getPurchaseHistory(buyerId);
  }
}
