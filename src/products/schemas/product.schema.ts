import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product extends Document {
    @Prop()
    handle: string;

    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    variantPrice: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);