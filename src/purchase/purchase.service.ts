import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './schemas/purchase.schema';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createPurchase(productId: string, buyerId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = new this.purchaseModel({
      productId,
      buyerId,
      sellerId: product.sellerId,
      price: product.price,
      createdAt: new Date(),
    });

    await purchase.save();

    product.stock -= 1;
    await product.save();

    return purchase;
  }

  async getPurchaseHistory(buyerId: string) {
    return this.purchaseModel.find({ buyerId }).populate('productId').exec();
  }
}
