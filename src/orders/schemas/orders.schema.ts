import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductsDto } from '../dto/products.dto';

export type OrdersDocument = Orders & Document;

@Schema()
export class Orders {
  @Prop() dropdown: string;
  @Prop() orderNo: number;
  @Prop() customer: string;
  @Prop() customerNo: string;
  @Prop() items: number;
  @Prop() notes: string;
  @Prop() ordered: number;
  @Prop() delivery: number;
  @Prop() status: boolean;
  @Prop() address: string;
  @Prop() products: ProductsDto[];
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
