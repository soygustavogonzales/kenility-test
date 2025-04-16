import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  client_name: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  product_list: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
