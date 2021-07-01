import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DaysDto } from '../dto/days.dto';

export type CustomersDocument = Customers & Document;

@Schema()
export class Customers {
  @Prop() customerNo: string;
  @Prop() name: string;
  @Prop() address: string;
  @Prop() days: DaysDto;
  @Prop() notify: boolean;
  @Prop() contactName: string;
  @Prop() contactPhone: string;
  @Prop() productsCodes: string[];
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
