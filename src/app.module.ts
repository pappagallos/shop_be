import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ProductsModule,
    PurchaseModule,
  ],
})
export class AppModule implements NestModule {
  private readonly isDevMode: boolean =
    process.env.NODE_ENV === 'dev' ? true : false;

  configure() {
    // 개발자 모드로 실행 시 쿼리 logger가 출력되도록 실행
    mongoose.set('debug', this.isDevMode);
  }
}
