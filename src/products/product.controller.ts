import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ProductService } from './product.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) { }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile() file, @Req() req: Request) {
    try {
      let products = await this.productService.convertCSV(file.buffer.toString());
      let { errMessage } = await this.productService.validateProduct(products, req.body);
      if (errMessage.length) {
        return {
          success: false,
          message: errMessage
        }
      }
      await this.productService.saveProduct(products);
      return {
        success: true,
        message: [`${products.length} products are uploaded successfully`]
      }
    } catch (error) {
      return {
        success: false,
        message: [`Failed to upload products due to error: ${error.message}`]
      }
    }

  }

  @Get()
  async findAll(@Req() req: Request) {
    let page = Number(req.query.page) ?? 0;
    if(page > 0) page--;
    let perPage =  Number(req.query.perPage) || 10;
    let products = await this.productService.listProduct(page, perPage);
    return products;
  }
}