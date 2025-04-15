import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  client_name: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  product_list: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
