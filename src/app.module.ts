import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/shopify'), ProductsModule]
})
export class AppModule {}
