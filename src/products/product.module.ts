import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller'
import { ProductService } from './product.service'
import { MongooseModule } from '@nestjs/mongoose';
import { Product,ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductsController],
})
export class ProductsModule {}
