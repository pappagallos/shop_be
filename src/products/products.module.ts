import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],

  // 다른 Module에서 Model을 사용하게 하려면 MongooseModule를 exports에 추가
  // If you also want to use the models in another module, add MongooseModule to the exports section of CatsModule and import CatsModule in the other module.
  // https://docs.nestjs.com/techniques/mongodb
  exports: [MongooseModule],
})
export class ProductsModule {}
