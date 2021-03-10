import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as CSV from 'csvtojson';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { IDataBody } from './interfaces/IDataBody.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) { }
    async convertCSV(csv: string): Promise<object[]> {
        return CSV().fromString(csv);
    }

    async validateProduct(products: object[], data: IDataBody): Promise<any> {
        let index: number = 0, errMessage: string[] = [];
        for (let p of products) {
            ++index;
            if(!p['Handle']) continue;
            if (!p['Title']) {
                errMessage.push(`Row ${index}: Title is empty`);
            }
            if (!p['Image Src']) {
                errMessage.push(`Row ${index}: Image source is empty`);
            }
            let productExist = await this.productModel.findOne({'handle': p['Handle']});
           
            if (productExist && data.replace === 'false') {
                errMessage.push(`Row  ${index}: product handle ‘${p['Handle']}’ is already existed`);
            }
        }
        return {
            errMessage
        }
    }

    async saveProduct(products: object[]): Promise<void> {
        for(let p of products){
            if(!p['Handle']) continue;
            let data: object = {
                image: p['Image Src'],
                title: p['Title'],
                variantPrice: parseInt(p['Variant Price']) ?? 0
            }
            this.productModel.updateOne({
                handle: p['Handle']
            }, data , {upsert: true, setDefaultsOnInsert: true}, (err, res) => {
                if(err) throw err;
            })
        }
    }

    async listProduct(page, perPage): Promise<any>{
        let total = await this.productModel.countDocuments();
        let data = await this.productModel.find().limit(perPage).skip(page * perPage);
        return {
            total,
            data
        }
    }
}
