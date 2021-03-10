import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/product.module';

const uriMongodb: string = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/shopify';

@Module({
  imports: [MongooseModule.forRoot(uriMongodb), ProductsModule]
})
export class AppModule {}
