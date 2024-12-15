import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts() {
    return this.productModel.find();
  }

  async getMyProducts(sellerId: string) {
    return this.productModel.find({ sellerId });
  }

  async getProduct(id: string) {
    return this.productModel.findById(id);
  }

  async createProduct(body, sellerId: string) {
    const product = new this.productModel({ ...body, sellerId });
    return product.save();
  }

  async updateProduct(id: string, body, sellerId: string) {
    return this.productModel.findOneAndUpdate({ _id: id, sellerId }, body, {
      new: true,
    });
  }

  async deleteProduct(id: string, sellerId: string) {
    return this.productModel.findOneAndDelete({ _id: id, sellerId });
  }
}
